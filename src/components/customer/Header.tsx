"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { MapPin, ShoppingBag, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/customer/CartDrawer";
import { Logo } from "@/components/brand/Logo";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function Header() {
  const { selectedBranch, setBranchModalOpen, orderType, selectedRegion } = useStore();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Menu", href: "/menu" },
    { name: "Full Menu", href: "/full-menu" },
    { name: "Deals", href: "/menu#deals" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!pillRef.current) return;
    const target = e.currentTarget;
    gsap.to(pillRef.current, {
      x: target.offsetLeft,
      width: target.offsetWidth,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleNavLeave = () => {
    if (!pillRef.current) return;
    gsap.to(pillRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    });
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full bg-secondary transition-all duration-300 ease-in-out border-b-[3px] border-ink",
        scrolled ? "py-1 shadow-brutal-sm" : "py-3"
      )}
    >
      <div className="container mx-auto px-2 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 relative min-h-[56px]">
        <div className="flex items-center gap-2 shrink-0">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 hover:text-white p-1" />}>
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-secondary border-r-[3px] border-ink p-6">
              <SheetHeader className="mb-8 text-left">
                <SheetTitle className="text-white font-heading text-2xl tracking-wide">MENU</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white font-heading text-xl uppercase tracking-wide hover:text-primary transition-colors border-b-2 border-white/10 pb-4"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <button 
                  onClick={() => setBranchModalOpen(true)}
                  className="mt-4 flex items-center justify-between w-full bg-white text-ink border-[3px] border-ink rounded-full px-4 py-3 font-bold shadow-brutal-sm"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>
                      {orderType === "delivery" && selectedRegion
                        ? selectedRegion.name
                        : selectedBranch 
                          ? selectedBranch.name 
                          : "Select Location"}
                    </span>
                  </div>
                </button>

              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="group block">
            <div className="group-hover:animate-[wiggle_0.5s_ease-in-out_infinite]">
              <Logo variant="full" size={scrolled ? 28 : 36} theme="dark" className="hidden sm:flex transition-all duration-300" />
              <Logo variant="mark" size={scrolled ? 28 : 36} className="sm:hidden flex drop-shadow-md transition-all duration-300" />
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center relative h-12 px-2" ref={navRef} onMouseLeave={handleNavLeave}>
          {/* GSAP Hover Pill */}
          <div 
            ref={pillRef} 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-10 bg-white/20 rounded-full opacity-0 pointer-events-none"
          />
          
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={handleNavHover}
                className={cn(
                  "relative px-5 py-2 rounded-full font-heading text-xl tracking-wide transition-all duration-200 border-[2px] border-transparent z-10",
                  isActive
                    ? "bg-primary text-ink border-ink shadow-brutal-sm"
                    : "text-white hover:text-white"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Location Pill (Mobile & Desktop) */}
          <div 
            onClick={() => setBranchModalOpen(true)}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 w-[170px] sm:w-[220px] md:w-[260px] flex items-center bg-white border-[2px] border-ink rounded-[12px] sm:rounded-full px-2 py-1 sm:px-4 sm:py-2 cursor-pointer shadow-sm hover:bg-gray-50 transition-all text-ink z-10"
          >
             <MapPin className="w-4 h-4 text-primary mr-2 shrink-0 hidden sm:block" />
             <div className="flex flex-col min-w-0 flex-1 justify-center">
               <span className="text-[10px] sm:text-xs font-bold text-ink/60 leading-tight text-center md:text-left">{orderType === "pickup" ? "Pickup at ▼" : "Delivery to ▼"}</span>
               <span className="text-[11px] sm:text-sm font-bold truncate leading-tight text-center md:text-left">
                 {orderType === "delivery" && selectedRegion
                   ? selectedRegion.name
                   : selectedBranch 
                     ? selectedBranch.name 
                     : "Select Location"}
               </span>
             </div>
          </div>

          <Link href="/account" className="hidden sm:flex items-center justify-center size-10 rounded-full border-[2px] border-ink bg-white text-ink shadow-brutal-sm hover:translate-y-[-2px] transition-all">
            <User className="w-5 h-5" />
          </Link>

          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
