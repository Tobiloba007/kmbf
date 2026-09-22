"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "WHO DO YOU SHIP WITH?",
    answer:
      "We ship with trusted delivery partners to make sure your order arrives safely and on time.",
  },
  {
    question: "CAN I RETURN MY ORDER?",
    answer:
      "Yes. You can return your order within 14 days of receiving it, provided the item is unworn and in its original condition.",
  },
  {
    question: "CAN I EXCHANGE MY ORDER?",
    answer:
      "Yes. You Can Exchange Your Order Within 14 Days Of Receiving Your Item(S). You Can Arrange An Exchange Through The Aftercare Portal Linked In Your Order Confirmation.",
  },
  {
    question: "CAN I GET FREE SHIPPING?",
    answer:
      "Orders over $200 qualify for free shipping. Shipping costs are calculated at checkout for smaller orders.",
  },
  {
    question: "DO YOU SHIP INTERNATIONAL?",
    answer:
      "Yes, we ship internationally. Available delivery options and costs are shown at checkout.",
  },
  {
    question: "DO YOU OFFER DISCOUNT?",
    answer:
      "Yes, If You Sign Up To Our Mailing List You Can Get 10% Off Your First Order.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#f5f2ec] px-3.5 py-12 text-[#222] sm:px-7 md:py-12 md:px-8 lg:py-16 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-xl font-bold tracking-tight md:text-xl">
          FAQ
        </h1>
        <div className="grid gap-x-12 md:grid-cols-2">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="border-t border-[#d5d0c8] md:[&:nth-child(5)]:border-b md:[&:nth-child(6)]:border-b"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-18 w-full items-center justify-between gap-6 text-left text-[19px] font-bold md:min-h-18 md:text-sm"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-xs xl:text-[13px]">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    strokeWidth={1}
                    className={`shrink-0 transition-transform duration-300 md:size-4 lg:size-5.5 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-10 text-base leading-tight md:pb-9 md:leading-snug xl:text-[17px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
                <div className="border-b border-[#d5d0c8] md:hidden" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
