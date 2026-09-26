/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  CircleUser,
  Handbag,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const NAV_LINKS = [
  { label: "SHOP", href: "/collections/all", expandable: true },
  { label: "ALL PRODUCTS", href: "/collections/all" },
  { label: "GALLERY", href: "/gallery" },
  // { label: "POP-UPS", href: "/pop-ups" },
  { label: "ABOUT", href: "/about" },
];

const SHOP_CATEGORIES = [
  "SHIRTS",
  "JACKETS",
  "HOODIES",
  "SWEATSHIRTS",
  "SHORTS",
  "PANTS",
  "HATS",
  "SETS",
];

const Navbar = ({ dark = false }: { dark?: boolean }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopPanelOpen, setIsShopPanelOpen] = useState(false);
  const [isShopPanelClosing, setIsShopPanelClosing] = useState(false);

  const closeShopPanel = () => {
    setIsShopPanelClosing(true);
    setIsShopPanelOpen(false);
    // Keep the closing animation mounted until its 300ms transition finishes.
    window.setTimeout(() => setIsShopPanelClosing(false), 300);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsShopPanelOpen(false);
  };


  const [mounted, setMounted] = useState(false);
  const getTotalQuantity = useCartStore((state) => state.getTotalQuantity);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalQuantity = mounted ? getTotalQuantity() : 0;

  return (
    <nav
      className={`relative top-0 left-0 z-50 w-full h-18 lg:h-30 ${
        dark ? "bg-white text-black" : "text-white"
      }`}
    >
      <div className="flex items-center justify-between w-full h-full px-3.5 py-4 sm:px-7 lg:px-12">
        {/* Left: mobile toggle + desktop nav links */}
        <div className="flex flex-1 items-center">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="lg:hidden"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={24} strokeWidth={1} />}
          </button>

          <ul className="hidden items-center gap-6 lg:gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.label} className="group/item relative">
                  <Link
                    href={link.href}
                    className="group relative inline-block text-sm font-medium tracking-wide"
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[0.5px] w-full origin-left transition-all duration-300 ease-out ${
                        dark ? "bg-black" : "bg-white"
                      } ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>

                  {link.expandable && (
                    <div
                      className={`invisible absolute top-full mt-6 left-0 z-50 w-48 translate-y-1 py-2 text-black opacity-0 transition-all duration-200 ease-out group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100 ${
                        dark ? "bg-white" : "bg-[#f5f2ec]"
                      }`}
                    >
                      <ul>
                        {SHOP_CATEGORIES.map((category) => {
                          const categoryHref = `/collections/${category.toLowerCase()}`;
                          const isCategoryActive = pathname === categoryHref;

                          return (
                            <li key={category}>
                              <Link
                                href={categoryHref}
                                className="group relative inline-block px-5 py-2 text-sm tracking-wide"
                              >
                                {category}
                                <span
                                  className={`absolute bottom-0 left-5 h-[0.5px] w-[calc(100%-2.5rem)] origin-left bg-black transition-all duration-300 ease-out ${
                                    isCategoryActive
                                      ? "scale-x-100"
                                      : "scale-x-0 group-hover:scale-x-100"
                                  }`}
                                />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="shrink-0 text-lg font-bold tracking-widest">
          KMBF
        </Link>

        {/* Account / cart */}
        <div className="flex flex-1 items-center justify-end gap-6">
          <button type="button" aria-label="Account">
            <CircleUser size={24} strokeWidth={1} />
          </button>
          <Link href="/cart">
          <button type="button" aria-label="Cart" className="relative">
            <Handbag size={24} strokeWidth={1} />
            {totalQuantity > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-black">
                {totalQuantity}
              </span>
            )}
          </button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full overflow-hidden bg-[#f5f2ec] text-black transition-transform duration-300 ease-out md:w-1/2 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Main links panel */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-300 ease-out ${
            isShopPanelOpen
              ? "-translate-x-2 opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="flex justify-end px-4 py-6">
            <button type="button" aria-label="Close menu" onClick={closeMenu}>
              <X size={20} strokeWidth={1} />
            </button>
          </div>
          <ul className="flex flex-col px-4">
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <li
                  key={link.label}
                  className={`transition-all duration-500 ease-out ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen
                      ? `${120 + index * 40}ms`
                      : "0ms",
                  }}
                >
                  {link.expandable ? (
                    <button
                      type="button"
                      onClick={() => setIsShopPanelOpen(true)}
                      className="flex w-full items-center justify-between py-5 text-xs tracking-wide"
                    >
                      <span className="relative inline-block">
                        {link.label}
                        <span
                          className={`absolute -bottom-1 left-0 h-[0.5px] w-full origin-left bg-black transition-all duration-300 ease-out ${
                            isActive ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </span>
                      <ChevronRight size={20} strokeWidth={1} />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between py-5 text-xs tracking-wide"
                    >
                      <span className="relative inline-block">
                        {link.label}
                        <span
                          className={`absolute -bottom-1 left-0 h-[0.5px] w-full origin-left bg-black transition-all duration-300 ease-out ${
                            isActive ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Shop categories panel */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-300 ease-out ${
            isShopPanelOpen
              ? "translate-x-0 opacity-100"
              : isShopPanelClosing
                ? "pointer-events-none -translate-x-2 opacity-0"
                : "pointer-events-none translate-x-2 opacity-0"
          }`}
        >
          <div className="relative flex items-center justify-center px-4 py-6">
            <button
              type="button"
              aria-label="Back to menu"
              onClick={closeShopPanel}
              className="absolute left-4"
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <span className="text-sm font-bold tracking-wide">SHOP</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="absolute right-4"
            >
              <X size={20} strokeWidth={1} />
            </button>
          </div>
          <ul className="flex flex-col px-4">
            {SHOP_CATEGORIES.map((category, index) => {
              const categoryHref = `/collections/${category.toLowerCase()}`;
              const isCategoryActive = pathname === categoryHref;

              return (
                <li
                  key={category}
                  className={`transition-all duration-500 ease-out ${
                    isShopPanelOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-2 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isShopPanelOpen
                      ? `${100 + index * 40}ms`
                      : "0ms",
                  }}
                >
                  <Link
                    href={categoryHref}
                    onClick={closeMenu}
                    className="flex items-center py-5 text-xs tracking-wide"
                  >
                    <span className="relative inline-block">
                      {category}
                      <span
                        className={`absolute -bottom-1 left-0 h-[0.5px] w-full origin-left bg-black transition-all duration-300 ease-out ${
                          isCategoryActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
