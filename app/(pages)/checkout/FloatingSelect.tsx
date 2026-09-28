"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface FloatingSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  disabled?: boolean;
  required?: boolean;
}

const FloatingSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  disabled = false,
  required = true,
}: FloatingSelectProps) => (
  <div className="relative w-full">
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className="w-full appearance-none rounded-lg border border-gray-300 bg-transparent pl-3.5 pr-10 pt-5 pb-2 text-sm text-gray-900 outline-none transition-all focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] disabled:bg-gray-50 disabled:text-gray-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <label
      htmlFor={name}
      className="pointer-events-none absolute left-3.5 top-1.5 text-[10px] font-medium text-gray-500"
    >
      {label}
    </label>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
  </div>
);

export default FloatingSelect;
