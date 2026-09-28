"use client";

import React from "react";
import FloatingInput from "./FloatingInput";
import FloatingSelect from "./FloatingSelect";
import { NIGERIAN_STATES } from "./DeliveryForm";

export interface PaymentFormData {
  billingCountry?: string;
  billingFirstName?: string;
  billingLastName?: string;
  billingAddress?: string;
  billingApartment?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
  billingPhone?: string;
}

interface PaymentSectionProps {
  shippingFee: number;
  useDifferentBilling: boolean;
  setUseDifferentBilling: (val: boolean) => void;
  formData: PaymentFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const PaymentSection = ({
  shippingFee = 0,
  useDifferentBilling,
  setUseDifferentBilling,
  formData,
  handleInputChange,
}: PaymentSectionProps) => {
  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <>
      {/* Shipping Method */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Shipping method</h2>
        <div className="flex items-center justify-between rounded-xl border-2 border-[#10B981] bg-[#10B981]/[0.03] px-4 py-4 text-sm">
          <span className="font-medium text-gray-900">Standard</span>
          <span className="font-bold text-gray-900">
            ₦{formatCurrency(shippingFee)}
          </span>
        </div>
      </section>

      {/* Paystack Payment Widget */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Payment</h2>
          <p className="text-xs text-gray-500">
            All transactions are secure and encrypted.
          </p>
        </div>

        <div className="rounded-xl border border-[#10B981] bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#10B981]/[0.05] px-4 py-3.5">
            <span className="text-sm font-bold text-gray-900">Paystack</span>
            <div className="flex items-center gap-1">
              <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                MC
              </span>
              <span className="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                VISA
              </span>
              <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold text-black">
                MoMo
              </span>
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                +5
              </span>
            </div>
          </div>
          <div className="bg-gray-50/80 px-4 py-8 text-center text-xs text-gray-600">
            You&apos;ll be redirected to Paystack to complete your purchase
          </div>
        </div>
      </section>

      {/* Billing Address Options */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">Billing address</h2>

        <div className="rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-200 bg-white">
          {/* Option 1: Same as shipping */}
          <label
            className={`flex items-center gap-3.5 px-4 py-4 text-sm cursor-pointer transition-all ${
              !useDifferentBilling
                ? "bg-[#10B981]/[0.06] border-l-4 border-[#10B981]"
                : "hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="billingOption"
              className="sr-only"
              checked={!useDifferentBilling}
              onChange={() => setUseDifferentBilling(false)}
            />
            {/* Custom Radio Circle */}
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                !useDifferentBilling
                  ? "border-[#10B981] bg-[#10B981]"
                  : "border-gray-400 bg-white"
              }`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full bg-white transition-transform ${
                  !useDifferentBilling ? "scale-100" : "scale-0"
                }`}
              />
            </div>
            <span className="font-medium text-gray-900">
              Same as shipping address
            </span>
          </label>

          {/* Option 2: Use different billing address */}
          <label
            className={`flex items-center gap-3.5 px-4 py-4 text-sm cursor-pointer transition-all ${
              useDifferentBilling
                ? "bg-[#10B981]/[0.06] border-l-4 border-[#10B981]"
                : "hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="billingOption"
              className="sr-only"
              checked={useDifferentBilling}
              onChange={() => setUseDifferentBilling(true)}
            />
            {/* Custom Radio Circle */}
            <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                useDifferentBilling
                  ? "border-[#10B981] bg-[#10B981]"
                  : "border-gray-400 bg-white"
              }`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full bg-white transition-transform ${
                  useDifferentBilling ? "scale-100" : "scale-0"
                }`}
              />
            </div>
            <span className="font-medium text-gray-900">
              Use a different billing address
            </span>
          </label>
        </div>

        {useDifferentBilling && (
          <div className="space-y-3 pt-2">
            <FloatingSelect
              label="Country/Region"
              name="billingCountry"
              value="Nigeria"
              disabled
              required
              onChange={handleInputChange}
              options={[{ label: "Nigeria", value: "Nigeria" }]}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FloatingInput
                label="First name"
                name="billingFirstName"
                required
                value={formData.billingFirstName || ""}
                onChange={handleInputChange}
              />
              <FloatingInput
                label="Last name"
                name="billingLastName"
                required
                value={formData.billingLastName || ""}
                onChange={handleInputChange}
              />
            </div>

            <FloatingInput
              label="Address"
              name="billingAddress"
              required
              value={formData.billingAddress || ""}
              onChange={handleInputChange}
            />

            <FloatingInput
              label="Apartment, suite, etc."
              name="billingApartment"
              required
              value={formData.billingApartment || ""}
              onChange={handleInputChange}
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <FloatingInput
                label="City"
                name="billingCity"
                required
                value={formData.billingCity || ""}
                onChange={handleInputChange}
              />
              <FloatingSelect
                label="State"
                name="billingState"
                required
                value={formData.billingState || "Lagos"}
                onChange={handleInputChange}
                options={NIGERIAN_STATES}
              />
              <FloatingInput
                label="Postal code"
                name="billingPostalCode"
                required
                value={formData.billingPostalCode || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PaymentSection;
