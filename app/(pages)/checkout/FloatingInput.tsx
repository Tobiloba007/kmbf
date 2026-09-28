"use client";

import React from "react";

interface FloatingInputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const FloatingInput = ({
  label,
  name,
  type = "text",
  required = true,
  value,
  onChange,
  icon,
}: FloatingInputProps) => (
  <div className="relative w-full">
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      value={value}
      onChange={onChange}
      placeholder=" "
      className={`w-full rounded-lg border border-gray-300 pl-3.5 ${
        icon ? "pr-10" : "pr-3.5"
      } pt-5 pb-2 text-sm text-gray-900 outline-none transition-all focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981]`}
    />
    <label
      htmlFor={name}
      className="pointer-events-none absolute left-3.5 top-1.5 text-[10px] font-medium text-gray-500"
    >
      {label}
    </label>
    {icon && (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
        {icon}
      </div>
    )}
  </div>
);

export default FloatingInput;
