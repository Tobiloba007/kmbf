/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    const { reference, orderData } = await request.json();

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    // 1. Verify transaction with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    // 2. Create the Order document in Sanity Studio
    await sanityClient.create({
      _type: "order",
      orderNumber: reference,
      status: "pending",
      customer: {
        name: `${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}`,
        email: orderData.customer.email,
        phone: orderData.customer.phone,
      },
      shippingAddress: {
        address: orderData.shippingAddress.address,
        apartment: orderData.shippingAddress.apartment,
        city: orderData.shippingAddress.city,
        state: orderData.shippingAddress.state,
        country: orderData.shippingAddress.country,
      },
      items: orderData.cartItems.map((item: any) => ({
        _key: `${item.id}-${item.size}-${Date.now()}`,
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      totals: {
        subtotal: orderData.totals.subtotal,
        shippingFee: orderData.totals.shippingFee,
        grandTotal: orderData.totals.grandTotal,
      },
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified and order saved to Sanity",
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Paystack verification / Sanity save error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}





// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const { reference, orderData } = await request.json();

//     if (!reference) {
//       return NextResponse.json({ error: "Missing reference" }, { status: 400 });
//     }

//     const response = await fetch(
//       `https://api.paystack.co/transaction/verify/${reference}`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = await response.json();

//     if (!data.status || data.data.status !== "success") {
//       return NextResponse.json(
//         { success: false, message: "Payment verification failed" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Payment verified successfully",
//       reference: data.data.reference,
//     });
//   } catch (error) {
//     console.error("Paystack verification error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }