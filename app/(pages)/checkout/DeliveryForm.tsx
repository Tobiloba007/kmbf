"use client";

import React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import FloatingInput from "./FloatingInput";
import FloatingSelect from "./FloatingSelect";

export const NIGERIAN_STATES = [
  { label: "Abia", value: "Abia" },
  { label: "Adamawa", value: "Adamawa" },
  { label: "Akwa Ibom", value: "Akwa Ibom" },
  { label: "Anambra", value: "Anambra" },
  { label: "Bauchi", value: "Bauchi" },
  { label: "Bayelsa", value: "Bayelsa" },
  { label: "Benue", value: "Benue" },
  { label: "Borno", value: "Borno" },
  { label: "Cross River", value: "Cross River" },
  { label: "Delta", value: "Delta" },
  { label: "Ebonyi", value: "Ebonyi" },
  { label: "Edo", value: "Edo" },
  { label: "Ekiti", value: "Ekiti" },
  { label: "Enugu", value: "Enugu" },
  { label: "FCT - Abuja", value: "FCT - Abuja" },
  { label: "Gombe", value: "Gombe" },
  { label: "Imo", value: "Imo" },
  { label: "Jigawa", value: "Jigawa" },
  { label: "Kaduna", value: "Kaduna" },
  { label: "Kano", value: "Kano" },
  { label: "Katsina", value: "Katsina" },
  { label: "Kebbi", value: "Kebbi" },
  { label: "Kogi", value: "Kogi" },
  { label: "Kwara", value: "Kwara" },
  { label: "Lagos", value: "Lagos" },
  { label: "Nasarawa", value: "Nasarawa" },
  { label: "Niger", value: "Niger" },
  { label: "Ogun", value: "Ogun" },
  { label: "Ondo", value: "Ondo" },
  { label: "Osun", value: "Osun" },
  { label: "Oyo", value: "Oyo" },
  { label: "Plateau", value: "Plateau" },
  { label: "Rivers", value: "Rivers" },
  { label: "Sokoto", value: "Sokoto" },
  { label: "Taraba", value: "Taraba" },
  { label: "Yobe", value: "Yobe" },
  { label: "Zamfara", value: "Zamfara" },
];

export interface DeliveryFormData {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  saveInfo: boolean;
}

interface DeliveryFormProps {
  formData: DeliveryFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const DeliveryForm = ({ formData, handleInputChange }: DeliveryFormProps) => (
  <section className="space-y-3">
    <h2 className="text-lg font-bold text-gray-900">Delivery</h2>

    {/* Email included in Delivery Section */}
    <FloatingInput
      label="Email address"
      name="email"
      type="email"
      required
      value={formData.email}
      onChange={handleInputChange}
    />

    {/* Country fixed to Nigeria */}
    <FloatingSelect
      label="Country/Region"
      name="country"
      value="Nigeria"
      disabled
      required
      onChange={handleInputChange}
      options={[{ label: "Nigeria", value: "Nigeria" }]}
    />

    {/* First Name & Last Name */}
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <FloatingInput
        label="First name"
        name="firstName"
        required
        value={formData.firstName}
        onChange={handleInputChange}
      />
      <FloatingInput
        label="Last name"
        name="lastName"
        required
        value={formData.lastName}
        onChange={handleInputChange}
      />
    </div>

    <FloatingInput
      label="Address"
      name="address"
      required
      value={formData.address}
      onChange={handleInputChange}
    />

    <FloatingInput
      label="Apartment, suite, etc."
      name="apartment"
      required
      value={formData.apartment}
      onChange={handleInputChange}
    />

    {/* City, State & Postal Code */}
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <FloatingInput
        label="City"
        name="city"
        required
        value={formData.city}
        onChange={handleInputChange}
      />
      <FloatingSelect
        label="State"
        name="state"
        required
        value={formData.state || "Lagos"}
        onChange={handleInputChange}
        options={NIGERIAN_STATES}
      />
      <FloatingInput
        label="Postal code"
        name="postalCode"
        required
        value={formData.postalCode}
        onChange={handleInputChange}
      />
    </div>

    <FloatingInput
      label="Phone"
      name="phone"
      type="tel"
      required
      value={formData.phone}
      onChange={handleInputChange}
      icon={
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <HelpCircle className="h-4 w-4 text-gray-400" />
          <span className="font-bold text-green-700">🇳🇬</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </div>
      }
    />

    <label className="flex items-center gap-2 pt-1 text-xs text-gray-700 cursor-pointer">
      <input
        type="checkbox"
        name="saveInfo"
        checked={formData.saveInfo}
        onChange={handleInputChange}
        className="h-4 w-4 rounded border-gray-300 text-[#10B981] focus:ring-[#10B981] accent-[#10B981]"
      />
      Save this information for next time
    </label>
  </section>
);

export default DeliveryForm;
