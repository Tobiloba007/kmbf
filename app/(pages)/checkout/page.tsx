/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { ShoppingBag } from "lucide-react";
import DeliveryForm from "./DeliveryForm";
import PaymentSection from "./PaymentSection";
import OrderSummary from "./OrderSummary";
import { useCartStore } from "@/app/store/useCartStore";

const Page = () => {
  const router = useRouter();
  const { cartItems, getSubtotal, clearCart } = useCartStore();
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    country: "Nigeria",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Lagos",
    postalCode: "",
    phone: "",
    saveInfo: false,
    billingCountry: "Nigeria",
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingState: "Lagos",
    billingPostalCode: "",
  });

  const subtotal = getSubtotal() || 0;
  const totalItemCount =
    cartItems?.reduce((acc, item) => acc + (item?.quantity || 0), 0) || 0;
  const shippingFee = cartItems?.length > 0 ? 10600 : 0;
  const grandTotal = subtotal + shippingFee;

  const handleBillingToggle = (useDifferent: boolean) => {
    setUseDifferentBilling(useDifferent);

    if (useDifferent) {
      setFormData((prev) => ({
        ...prev,
        billingCountry: "Nigeria",
        billingFirstName: "",
        billingLastName: "",
        billingAddress: "",
        billingApartment: "",
        billingCity: "",
        billingState: "Lagos",
        billingPostalCode: "",
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? (target as HTMLInputElement).checked
        : target.value;
    setFormData((prev) => ({ ...prev, [target.name]: value }));
  };

  // Helper function to verify payment server-side after successful popup
  const verifyPaymentAndCompleteOrder = async (
    reference: string,
    submissionData: any
  ) => {
    try {
      const res = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          orderData: submissionData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // 1. Clear cart state & persisted local storage
        clearCart();

        // 2. Redirect user back to home page
        router.push("/");
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Order verification error:", error);
      alert("An error occurred during payment verification.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.firstName || !formData.lastName) {
      alert("Please fill in required fields.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    const finalBillingAddress = useDifferentBilling
      ? {
          country: formData.billingCountry,
          firstName: formData.billingFirstName,
          lastName: formData.billingLastName,
          address: formData.billingAddress,
          apartment: formData.billingApartment,
          city: formData.billingCity,
          state: formData.billingState,
          postalCode: formData.billingPostalCode,
        }
      : {
          country: formData.country,
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        };

    const finalSubmissionData = {
      customer: {
        email: formData.email,
        phone: formData.phone,
        saveInfo: formData.saveInfo,
      },
      shippingAddress: {
        country: formData.country,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
      sameAsShipping: !useDifferentBilling,
      billingAddress: finalBillingAddress,
      cartItems,
      totals: {
        subtotal,
        shippingFee,
        grandTotal,
        totalItemCount,
      },
    };

    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!paystackKey) {
      alert("Paystack Public Key is missing! Check your .env.local file.");
      setLoading(false);
      return;
    }

    // Ensure Paystack Inline JS script is loaded
    if (typeof window !== "undefined" && (window as any).PaystackPop) {
      const handler = (window as any).PaystackPop.setup({
        key: paystackKey,
        email: formData.email,
        amount: Math.round(grandTotal * 100), // Convert Naira to Kobo
        currency: "NGN",
        ref: `KMBF_${new Date().getTime()}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Customer Name",
              variable_name: "customer_name",
              value: `${formData.firstName} ${formData.lastName}`,
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: formData.phone,
            },
            {
              display_name: "Items Summary",
              variable_name: "items_summary",
              value: cartItems
                .map((i) => `${i.name} (${i.size}) x${i.quantity}`)
                .join(", "),
            },
          ],
          cart_items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          })),
          shipping_address: finalSubmissionData.shippingAddress,
        },
        callback: (response: { reference: string }) => {
          verifyPaymentAndCompleteOrder(
            response.reference,
            finalSubmissionData
          );
        },
        onClose: () => {
          setLoading(false);
        },
      });

      handler.openIframe();
    } else {
      alert("Paystack SDK failed to load. Please check your network.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 font-sans selection:bg-[#10B981] selection:text-white">
      {/* Paystack Inline Script Loader */}
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
      />

      {/* Header */}
      <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white">
        <div className="w-full flex flex-col lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7 w-full flex justify-start lg:justify-end">
            <div className="w-full max-w-2xl px-4 py-4 sm:px-8 lg:pl-16 lg:pr-12 flex items-center justify-between mx-auto lg:mx-0">
              <Link href="/" className="text-xl font-extrabold tracking-tight">
                KMBF
              </Link>
              <Link href="/cart" className="text-[#10B981] lg:hidden">
                <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-5 bg-[#F5F5F5] lg:border-l border-gray-200 items-center justify-start">
            <div className="w-full max-w-lg px-4 py-4 sm:px-8 lg:pl-12 lg:pr-16 flex justify-end">
              <Link href="/cart" className="text-[#10B981]">
                <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 1ST SUMMARY FOR MOBILE/TABLET: Top Accordion Dropdown */}
      <OrderSummary
        variant="top-accordion"
        cart={cartItems}
        subtotal={subtotal}
        shippingFee={shippingFee}
        grandTotal={grandTotal}
        totalItemCount={totalItemCount}
      />

      {/* Body Layout */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-12 min-h-[calc(100vh-65px)]">
        {/* Desktop Sidebar Summary (Hidden on Mobile/Tablet) */}
        <aside className="hidden lg:flex w-full lg:col-span-5 bg-[#F5F5F5] lg:border-l border-gray-200 lg:order-last justify-start">
          <div className="w-full lg:max-w-lg lg:pl-12 lg:pr-16 lg:py-10 lg:sticky lg:top-[65px] lg:max-h-[calc(100vh-65px)] lg:overflow-y-auto">
            <OrderSummary
              variant="desktop"
              cart={cartItems}
              subtotal={subtotal}
              shippingFee={shippingFee}
              grandTotal={grandTotal}
              totalItemCount={totalItemCount}
            />
          </div>
        </aside>

        {/* Form Main Area */}
        <main className="w-full lg:col-span-7 bg-white flex justify-start lg:justify-end">
          <div className="w-full max-w-2xl px-4 py-6 sm:px-8 lg:pl-16 lg:pr-12 lg:py-10 mx-auto lg:mx-0">
            <form onSubmit={handleSubmit} className="space-y-8 w-full">
              <DeliveryForm
                formData={formData}
                handleInputChange={handleInputChange}
              />

              <PaymentSection
                shippingFee={shippingFee}
                useDifferentBilling={useDifferentBilling}
                setUseDifferentBilling={handleBillingToggle}
                formData={formData}
                handleInputChange={handleInputChange}
              />

              {/* 2ND SUMMARY FOR MOBILE/TABLET: Collapsible Accordion Dropdown Above Pay Button */}
              <OrderSummary
                variant="mobile-inline-accordion"
                cart={cartItems}
                subtotal={subtotal}
                shippingFee={shippingFee}
                grandTotal={grandTotal}
                totalItemCount={totalItemCount}
              />

              {/* Pay Button */}
              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                className="w-full rounded-xl bg-[#10B981] py-4 text-base font-bold text-white transition-all hover:bg-[#0e9f6e] active:scale-[0.99] disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : `Pay now • ₦${grandTotal.toLocaleString()}`}
              </button>

              <footer className="border-t border-gray-200 pt-6 text-center text-xs text-gray-600 space-x-3">
                <Link href="/privacy" className="hover:underline">
                  Refund policy
                </Link>
                <Link href="/shipping" className="hover:underline">
                  Shipping
                </Link>
                <Link href="/privacy" className="hover:underline">
                  Privacy policy
                </Link>
                <Link href="/terms" className="hover:underline">
                  Terms of service
                </Link>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </footer>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;




// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ShoppingBag } from "lucide-react";
// import DeliveryForm from "./DeliveryForm";
// import PaymentSection from "./PaymentSection";
// import OrderSummary from "./OrderSummary";
// import { useCartStore } from "@/app/store/useCartStore";

// const Page = () => {
//   const { cartItems, getSubtotal } = useCartStore();
//   const [useDifferentBilling, setUseDifferentBilling] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     country: "Nigeria",
//     firstName: "",
//     lastName: "",
//     address: "",
//     apartment: "",
//     city: "",
//     state: "Lagos",
//     postalCode: "",
//     phone: "",
//     saveInfo: false,
//     billingCountry: "Nigeria",
//     billingFirstName: "",
//     billingLastName: "",
//     billingAddress: "",
//     billingApartment: "",
//     billingCity: "",
//     billingState: "Lagos",
//     billingPostalCode: "",
//   });

//   const subtotal = getSubtotal() || 0;
//   const totalItemCount =
//     cartItems?.reduce((acc, item) => acc + (item?.quantity || 0), 0) || 0;
//   const shippingFee = cartItems?.length > 0 ? 10600 : 0;
//   const grandTotal = subtotal + shippingFee;

//   const handleBillingToggle = (useDifferent: boolean) => {
//     setUseDifferentBilling(useDifferent);

//     if (useDifferent) {
//       setFormData((prev) => ({
//         ...prev,
//         billingCountry: "Nigeria",
//         billingFirstName: "",
//         billingLastName: "",
//         billingAddress: "",
//         billingApartment: "",
//         billingCity: "",
//         billingState: "Lagos",
//         billingPostalCode: "",
//       }));
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const target = e.target;
//     const value =
//       target.type === "checkbox"
//         ? (target as HTMLInputElement).checked
//         : target.value;
//     setFormData((prev) => ({ ...prev, [target.name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const finalBillingAddress = useDifferentBilling
//         ? {
//             country: formData.billingCountry,
//             firstName: formData.billingFirstName,
//             lastName: formData.billingLastName,
//             address: formData.billingAddress,
//             apartment: formData.billingApartment,
//             city: formData.billingCity,
//             state: formData.billingState,
//             postalCode: formData.billingPostalCode,
//           }
//         : {
//             country: formData.country,
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//             address: formData.address,
//             apartment: formData.apartment,
//             city: formData.city,
//             state: formData.state,
//             postalCode: formData.postalCode,
//           };

//       const finalSubmissionData = {
//         customer: {
//           email: formData.email,
//           phone: formData.phone,
//           saveInfo: formData.saveInfo,
//         },
//         shippingAddress: {
//           country: formData.country,
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           address: formData.address,
//           apartment: formData.apartment,
//           city: formData.city,
//           state: formData.state,
//           postalCode: formData.postalCode,
//         },
//         sameAsShipping: !useDifferentBilling,
//         billingAddress: finalBillingAddress,
//         cartItems,
//         totals: {
//           subtotal,
//           shippingFee,
//           grandTotal,
//           totalItemCount,
//         },
//       };

//       console.log("=== CHECKOUT FORM SUBMISSION ===");
//       console.log(finalSubmissionData);
//       console.log("================================");
//     } catch (error) {
//       console.error("Order submit error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-white text-gray-900 font-sans selection:bg-[#10B981] selection:text-white">
//       {/* Header */}
//       <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white">
//         <div className="w-full flex flex-col lg:grid lg:grid-cols-12">
//           <div className="lg:col-span-7 w-full flex justify-start lg:justify-end">
//             <div className="w-full max-w-2xl px-4 py-4 sm:px-8 lg:pl-16 lg:pr-12 flex items-center justify-between mx-auto lg:mx-0">
//               <Link href="/" className="text-xl font-extrabold tracking-tight">
//                 KMBF
//               </Link>
//               <Link href="/cart" className="text-[#10B981] lg:hidden">
//                 <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
//               </Link>
//             </div>
//           </div>

//           <div className="hidden lg:flex lg:col-span-5 bg-[#F5F5F5] lg:border-l border-gray-200 items-center justify-start">
//             <div className="w-full max-w-lg px-4 py-4 sm:px-8 lg:pl-12 lg:pr-16 flex justify-end">
//               <Link href="/cart" className="text-[#10B981]">
//                 <ShoppingBag className="h-6 w-6 stroke-[1.5]" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* 1ST SUMMARY FOR MOBILE/TABLET: Top Accordion Dropdown */}
//       <OrderSummary
//         variant="top-accordion"
//         cart={cartItems}
//         subtotal={subtotal}
//         shippingFee={shippingFee}
//         grandTotal={grandTotal}
//         totalItemCount={totalItemCount}
//       />

//       {/* Body Layout */}
//       <div className="w-full flex flex-col lg:grid lg:grid-cols-12 min-h-[calc(100vh-65px)]">
//         {/* Desktop Sidebar Summary (Hidden on Mobile/Tablet) */}
//         <aside className="hidden lg:flex w-full lg:col-span-5 bg-[#F5F5F5] lg:border-l border-gray-200 lg:order-last justify-start">
//           <div className="w-full lg:max-w-lg lg:pl-12 lg:pr-16 lg:py-10 lg:sticky lg:top-[65px] lg:max-h-[calc(100vh-65px)] lg:overflow-y-auto">
//             <OrderSummary
//               variant="desktop"
//               cart={cartItems}
//               subtotal={subtotal}
//               shippingFee={shippingFee}
//               grandTotal={grandTotal}
//               totalItemCount={totalItemCount}
//             />
//           </div>
//         </aside>

//         {/* Form Main Area */}
//         <main className="w-full lg:col-span-7 bg-white flex justify-start lg:justify-end">
//           <div className="w-full max-w-2xl px-4 py-6 sm:px-8 lg:pl-16 lg:pr-12 lg:py-10 mx-auto lg:mx-0">
//             <form onSubmit={handleSubmit} className="space-y-8 w-full">
//               <DeliveryForm
//                 formData={formData}
//                 handleInputChange={handleInputChange}
//               />

//               <PaymentSection
//                 shippingFee={shippingFee}
//                 useDifferentBilling={useDifferentBilling}
//                 setUseDifferentBilling={handleBillingToggle}
//                 formData={formData}
//                 handleInputChange={handleInputChange}
//               />

//               {/* 2ND SUMMARY FOR MOBILE/TABLET: Collapsible Accordion Dropdown Above Pay Button */}
//               <OrderSummary
//                 variant="mobile-inline-accordion"
//                 cart={cartItems}
//                 subtotal={subtotal}
//                 shippingFee={shippingFee}
//                 grandTotal={grandTotal}
//                 totalItemCount={totalItemCount}
//               />

//               {/* Pay Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full rounded-xl bg-[#10B981] py-4 text-base font-bold text-white transition-all hover:bg-[#0e9f6e] active:scale-[0.99] disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : "Pay now"}
//               </button>

//               <footer className="border-t border-gray-200 pt-6 text-center text-xs text-gray-600 space-x-3">
//                 <Link href="/privacy" className="hover:underline">
//                   Refund policy
//                 </Link>
//                 <Link href="/shipping" className="hover:underline">
//                   Shipping
//                 </Link>
//                 <Link href="/privacy" className="hover:underline">
//                   Privacy policy
//                 </Link>
//                 <Link href="/terms" className="hover:underline">
//                   Terms of service
//                 </Link>
//                 <Link href="/contact" className="hover:underline">
//                   Contact
//                 </Link>
//               </footer>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Page;
