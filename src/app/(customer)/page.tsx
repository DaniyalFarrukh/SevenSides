"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MOCK_CATEGORIES, MOCK_MENU } from "@/lib/mockData";
import { ArrowRight, MessageCircle, Star, Sparkles, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function HomePage() {
  const bestSellers = MOCK_MENU.filter((item) => item.isPopular).slice(0, 4);
  const container = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Media query for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    
    const tl = gsap.timeline();
    
    // Intro Animations
    tl.fromTo(".hero-text-anim", 
      { y: 50, opacity: 0, rotate: 5 },
      { y: 0, opacity: 1, rotate: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)" }
    );
    
    tl.fromTo(".hero-blob", 
      { scale: 0, rotate: -45 },
      { scale: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.6"
    );
    
    tl.fromTo(".hero-cutout", 
      { scale: 0, y: 100 },
      { scale: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.5)" },
      "-=0.8"
    );

    tl.fromTo(".hero-sticker", 
      { scale: 0 },
      { scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(2)" },
      "-=0.5"
    );
    
    // Parallax on mouse move
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to(".parallax-bg", { x: x * 1, y: y * 1, duration: 1 });
      gsap.to(".parallax-mg", { x: x * 2, y: y * 2, duration: 1 });
      gsap.to(".parallax-fg", { x: x * 3, y: y * 3, duration: 1 });
    };
    
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, { scope: container });

  return (
    <div className="flex flex-col min-h-screen overflow-x-clip bg-secondary" ref={container}>
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100svh-72px)] flex items-center justify-center overflow-x-clip pt-8 pb-16 lg:py-0 border-b-[3px] border-ink">
        <div className="absolute inset-0 z-0 bg-dots opacity-40 pointer-events-none" />
        
        {/* Yellow Diagonal Block */}
        <div className="absolute right-0 top-0 bottom-0 w-[60%] bg-primary skew-x-[-15deg] translate-x-12 hidden lg:block -z-10 border-l-[3px] border-ink" />

        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          {/* Left: Text Content */}
          <div className="flex flex-col items-start pt-8 lg:pt-0 z-20">
            <h1 className="flex flex-col font-heading font-bold mb-6 tracking-wide z-10" style={{ lineHeight: 0.9 }}>
              <span className="hero-text-anim text-white text-[clamp(4.5rem,10vw,7rem)] text-stroke shadow-brutal pb-1">
                HOME OF
              </span>
              <span className="hero-text-anim text-primary text-[clamp(5rem,11vw,8rem)] text-stroke shadow-brutal rotate-[-2deg] origin-left mt-[-4px]">
                RED TENDERS
              </span>
            </h1>
            
            <p className="hero-text-anim text-lg md:text-xl text-white font-semibold mb-10 max-w-[34ch] text-balance leading-snug drop-shadow-md">
              Crispy, spicy, and unforgettable. Order Lahore&apos;s most loved fast food right to your doorstep.
            </p>
            
            {/* CTA Row */}
            <div className="hero-text-anim flex flex-col sm:flex-row gap-5 mb-8 relative w-full items-start">
              <Link href="/menu" className="group w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 bg-primary text-ink border-[3px] border-ink rounded-full font-bold text-xl shadow-brutal hover:translate-y-[-3px] hover:shadow-brutal-lg active:translate-y-[2px] active:shadow-none transition-all relative">
                ORDER NOW <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="relative w-full sm:w-auto">
                <Link href="/menu#deals" className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 bg-white text-ink border-[3px] border-ink rounded-full font-bold text-xl shadow-brutal hover:translate-y-[-3px] hover:shadow-brutal-lg active:translate-y-[2px] active:shadow-none transition-all">
                  SEE THE MENU
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Visual Composition */}
          <div className="relative w-full aspect-square md:h-[600px] flex items-center justify-center mt-12 lg:mt-0 parallax-bg">
            {/* Faint watermark logo behind composition */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none mix-blend-overlay w-[120%] aspect-square -z-10">
              <Image src="/brand/seven-sides-logo.svg" alt="Watermark" fill className="object-contain" />
            </div>

            {/* Big Yellow Blob Base */}
            <div className="hero-blob absolute w-[80%] h-[80%] bg-primary border-[3px] border-ink rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-brutal-lg" />
            
            {/* Main Cutouts inside masks */}
            <div className="hero-cutout absolute top-[10%] left-[10%] w-[55%] h-[55%] rounded-full overflow-hidden border-[3px] border-ink shadow-brutal bg-white rotate-[-5deg] hover:rotate-0 transition-transform duration-300 parallax-fg z-20">
               <Image src="/images/home/tenders.jpg" alt="Red Tenders" fill className="object-cover scale-110" priority />
            </div>

            <div className="hero-cutout absolute bottom-[15%] left-[5%] w-[40%] h-[40%] rounded-full overflow-hidden border-[3px] border-ink shadow-brutal bg-white rotate-[8deg] hover:rotate-12 transition-transform duration-300 parallax-mg z-30">
               <Image src="/images/home/fries.jpg" alt="Waffle Fries" fill className="object-cover scale-110" />
            </div>

            <div className="hero-cutout absolute top-[20%] right-[5%] w-[45%] h-[45%] rounded-[30%] overflow-hidden border-[3px] border-ink shadow-brutal bg-white rotate-[15deg] hover:rotate-[5deg] transition-transform duration-300 parallax-mg z-10">
               <Image src="/images/home/shake.jpg" alt="Strawberry Shake" fill className="object-cover scale-[1.3]" />
            </div>

            {/* Bold Stickers */}
            <div className="hero-sticker parallax-fg absolute top-[5%] left-[30%] sm:left-[40%] bg-[#EF4444] text-white border-[2px] sm:border-[3px] border-ink rounded-full px-3 py-1 sm:px-5 sm:py-2 font-bold text-sm sm:text-xl rotate-[-12deg] shadow-brutal animate-[pulse_2s_infinite] z-40">
              HOT! 🔥
            </div>
            
            <div className="hero-sticker parallax-mg absolute bottom-[10%] right-[10%] sm:right-[20%] bg-white border-[2px] sm:border-[3px] border-ink rounded-full px-4 py-1.5 sm:px-5 sm:py-2 font-heading text-lg sm:text-2xl text-ink rotate-[10deg] shadow-brutal z-40">
              100% FRESH
            </div>

            <div className="hero-sticker parallax-fg absolute top-[45%] right-[2%] md:right-[-5%] bg-primary border-[2px] sm:border-[3px] border-ink rounded-xl px-3 py-2 sm:px-5 sm:py-3 font-bold text-ink rotate-[-6deg] shadow-brutal flex items-center gap-2 z-50 group hover:rotate-0 transition-all cursor-pointer">
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[10px] uppercase tracking-wider font-black">Red Tenders</span>
                <span className="text-base sm:text-xl font-heading">PKR 1390</span>
              </div>
              <div className="bg-white rounded-full p-1.5 sm:p-2 border-[2px] border-ink group-hover:bg-accent transition-colors">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            {/* Circular Text Badge */}
            <div className="absolute top-[-5%] right-[5%] sm:right-[15%] w-24 h-24 sm:w-32 sm:h-32 border-[2px] sm:border-[3px] border-dashed border-ink rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center bg-accent z-0">
              <div className="absolute w-full h-full flex items-start justify-center pt-2 rotate-[0deg]">
                <span className="font-bold text-[9px] sm:text-[11px] tracking-widest text-ink">CRISPY</span>
              </div>
              <div className="absolute w-full h-full flex items-start justify-center pt-2 rotate-[120deg]">
                <span className="font-bold text-[9px] sm:text-[11px] tracking-widest text-ink">SPICY</span>
              </div>
              <div className="absolute w-full h-full flex items-start justify-center pt-2 rotate-[240deg]">
                <span className="font-bold text-[9px] sm:text-[11px] tracking-widest text-ink">FRESH</span>
              </div>
            </div>

            {/* Doodles */}
            <Sparkles className="hero-sticker absolute top-[15%] left-[0%] w-12 h-12 text-white fill-white drop-shadow-md parallax-fg rotate-12" />
            <Sparkles className="hero-sticker absolute bottom-[30%] right-[-10%] w-10 h-10 text-primary fill-primary drop-shadow-[2px_2px_0_rgba(37,39,42,1)] parallax-mg -rotate-12" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-background overflow-hidden border-b-[3px] border-ink relative z-20 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-heading font-bold mb-12 text-ink text-center rotate-[-1deg]">
            EXPLORE <span className="text-primary text-stroke bg-white px-4 border-[3px] border-ink shadow-brutal-sm rotate-[2deg] inline-block">MENU</span>
          </h2>
          
          <div className="flex items-center gap-2 sm:gap-4 w-full">
            {/* Left Scroll Button */}
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: window.innerWidth >= 768 ? -232 : -200, behavior: "smooth" })}
              className="hidden md:flex shrink-0 bg-white border-[3px] border-ink rounded-full p-2 sm:p-3 shadow-brutal-sm hover:translate-y-[-2px] hover:shadow-brutal transition-all text-ink hover:text-primary"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <div ref={scrollRef} className="flex-1 flex overflow-x-auto pb-12 pt-4 gap-6 scrollbar-hide snap-x snap-mandatory px-4 items-center">
              {MOCK_CATEGORIES.map((cat, index) => {
                const bgColors = ["bg-primary", "bg-secondary", "bg-white", "bg-accent"];
                const bgColor = bgColors[index % bgColors.length];
                const textColors = bgColor === "bg-secondary" ? "text-white" : "text-ink";
                
                return (
                  <Link 
                    key={cat.id} 
                    href={`/menu#${cat.id}`}
                    className={`snap-start shrink-0 flex flex-col items-center w-44 md:w-52 group/card ${bgColor} border-[3px] border-ink rounded-[24px] p-5 shadow-brutal hover:translate-y-[-6px] hover:shadow-brutal-lg transition-all duration-300 relative`}
                  >
                    <div className="absolute top-2 right-2 bg-white border-[2px] border-ink rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs shadow-brutal-sm z-10 rotate-[15deg]">
                      {index + 1}
                    </div>
                    
                    <div className="w-32 h-32 md:w-40 md:h-40 mb-5 rounded-[20%] overflow-hidden border-[3px] border-ink bg-white shadow-brutal-sm relative group-hover/card:scale-110 group-hover/card:rotate-6 transition-transform duration-300 ease-out z-0">
                      <Image 
                        src={`https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80&sig=${index}`} 
                        alt={cat.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className={`font-heading text-3xl font-bold tracking-wide ${textColors} text-center uppercase leading-none`}>
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right Scroll Button */}
            <button 
              onClick={() => scrollRef.current?.scrollBy({ left: window.innerWidth >= 768 ? 232 : 200, behavior: "smooth" })}
              className="hidden md:flex shrink-0 bg-white border-[3px] border-ink rounded-full p-2 sm:p-3 shadow-brutal-sm hover:translate-y-[-2px] hover:shadow-brutal transition-all text-ink hover:text-primary"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMiIgZmlsbD0iIzI1MjdDMSIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
            <h2 className="text-[clamp(3rem,6vw,4rem)] font-heading font-bold text-ink rotate-[-1deg]">BEST <span className="text-white text-stroke">SELLERS</span></h2>
            <Link href="/menu" className="group bg-primary text-ink border-[3px] border-ink rounded-full px-6 py-2 font-bold shadow-brutal-sm hover:translate-y-[-2px] hover:shadow-brutal transition-all">
              View all <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {bestSellers.map((item, i) => (
              <Link href={`/menu/${item.id}`} key={item.id} className="bg-white border-[2px] border-ink rounded-[20px] overflow-hidden hover:shadow-brutal-sm transition-all duration-300 group flex flex-col">
                <div className="relative h-32 sm:h-48 w-full bg-cream border-b-[2px] border-ink p-2 sm:p-4">
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#EF4444] text-white border-[2px] border-ink px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-[9px] sm:text-xs font-bold z-20">
                    POPULAR
                  </div>
                  <button className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 bg-white rounded-full p-1.5 sm:p-2 border-[2px] border-ink hover:bg-primary transition-colors">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500 z-10" />
                </div>
                <div className="p-3 sm:p-5 flex flex-col flex-1">
                  <h3 className="font-heading text-lg sm:text-xl font-bold leading-tight mb-1 sm:mb-2 text-ink line-clamp-1">{item.name}</h3>
                  <p className="text-ink/60 text-[11px] sm:text-sm font-medium line-clamp-2 mb-3 sm:mb-4 flex-1">{item.description}</p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <span className="font-bold text-sm sm:text-lg text-ink">Rs. {item.price.toLocaleString()}</span>
                    <button className="w-full bg-primary text-ink border-[2px] border-ink rounded-xl py-1.5 sm:py-2.5 font-bold text-xs sm:text-sm shadow-sm hover:bg-primary-dark transition-colors uppercase">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
