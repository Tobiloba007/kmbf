"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const resources = [
  { label: "FAQ", href: "/under-development" },
  { label: "Shipping Policy", href: "/under-development" },
  { label: "Privacy Policy", href: "/under-development" },
  { label: "Refund Policy", href: "/under-development" },
  { label: "Terms Of Service", href: "/under-development" },
];

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="size-5.5 fill-none stroke-current"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="size-5.5 fill-none stroke-current"
  >
    <path d="m4 4 16 16M20 4 4 20" strokeWidth="1.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="size-5.5 fill-none stroke-current"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
    <path d="M14 7v7.5a3 3 0 1 1-2.5-2.95" strokeWidth="1.5" />
    <path d="M14 7c1 1.8 2.3 2.7 4 2.9" strokeWidth="1.5" />
  </svg>
);

type FooterPanel = "support" | "address";

type FooterProps = {
  reserveSummarySpace?: boolean;
};

const Footer = ({ reserveSummarySpace = false }: FooterProps) => {
  const pathname = usePathname();
  const [openPanels, setOpenPanels] = useState<Set<FooterPanel>>(new Set());

  const togglePanel = (panel: FooterPanel) => {
    setOpenPanels((current) => {
      const next = new Set(current);
      if (next.has(panel)) {
        next.delete(panel);
      } else {
        next.add(panel);
      }
      return next;
    });
  };

  const supportLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/under-development" },
  ];

  return (
    <footer
      id="site-footer"
      className={`z-70 bg-[#202020] px-3.5 pt-12 text-[#f5f2ec] sm:px-7 lg:px-8 xl:px-12 ${
        reserveSummarySpace ? "pb-36 md:pb-24" : "pb-9"
      }`}
    >
      <div className="grid gap-7 md:grid-cols-2 md:gap-x-16 md:gap-y-20 lg:grid-cols-4 lg:gap-6 xl:gap-8">
        <div>
          <h2 className="text-base font-bold lg:text-base">SOCIALS</h2>
          <div className="mt-4 flex items-center gap-4.5 px-2 lg:mt-8 lg:gap-6">
            <Link href="https://instagram.com" aria-label="Instagram">
              <InstagramIcon />
            </Link>
            <Link href="https://x.com" aria-label="X">
              <XIcon />
            </Link>
            <Link href="https://tiktok.com" aria-label="TikTok">
              <TikTokIcon />
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold lg:text-base">RESOURCES</h2>
          <nav className="mt-2 flex flex-col items-start gap-4.5 text-sm lg:mt-5 lg:gap-6 lg:text-base">
            {resources.map((resource) => {
              const isActive = pathname === resource.href;
              return (
                <Link
                  key={resource.label}
                  href={resource.href}
                  className="group relative inline-block"
                >
                  {resource.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[0.5px] w-full origin-left bg-[#f5f2ec] transition-all duration-300 ease-out ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-0 md:contents">
          <div className="border-t border-[#d8d1c5] md:border-0">
            <button
              type="button"
              onClick={() => togglePanel("support")}
              className="flex w-full items-center justify-between py-5 pr-3 text-left md:cursor-default md:py-0"
              aria-expanded={openPanels.has("support")}
            >
              <span className="text-base font-bold lg:text-base">SUPPORT</span>
              <ChevronDown
                size={20}
                strokeWidth={1}
                className={`transition-transform md:hidden ${
                  openPanels.has("support") ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`flex flex-col items-start gap-4.5 overflow-hidden text-sm transition-[max-height] duration-300 md:mt-5 md:max-h-none md:gap-6 md:text-base lg:mt-5 lg:gap-6 ${
                openPanels.has("support")
                  ? "max-h-40 pb-5 md:max-h-none md:pb-0"
                  : "max-h-0 md:max-h-none"
              }`}
            >
              {supportLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group relative inline-block text-left"
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[0.5px] w-full origin-left bg-[#f5f2ec] transition-all duration-300 ease-out ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="border-y border-[#d8d1c5] md:border-0">
            <button
              type="button"
              onClick={() => togglePanel("address")}
              className="flex w-full items-center justify-between py-5 pr-3 text-left md:cursor-default md:py-0"
              aria-expanded={openPanels.has("address")}
            >
              <span className="text-base font-bold lg:text-base">
                STORE ADDRESS
              </span>
              <ChevronDown
                size={20}
                strokeWidth={1}
                className={`transition-transform md:hidden ${
                  openPanels.has("address") ? "rotate-180" : ""
                }`}
              />
            </button>
            <address
              className={`overflow-hidden text-sm not-italic leading-relaxed transition-[max-height] duration-300 md:mt-5 md:max-h-none md:text-base lg:mt-5 lg:text-base ${
                openPanels.has("address")
                  ? "max-h-40 pb-5 md:max-h-none md:pb-0"
                  : "max-h-0 md:max-h-none"
              }`}
            >
              Admiralty Mall
              <br />
              Lekki Phase 1, 2nd Floor,
              <br />
              Lagos, Lagos State
              <br />
              Nigeria
            </address>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <p className="text-sm lg:ml-auto">© ZTTW 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
