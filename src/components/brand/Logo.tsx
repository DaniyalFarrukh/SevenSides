"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "mark" | "full";
  className?: string;
  size?: number;
  theme?: "light" | "dark";
}

export function Logo({ variant = "full", className, size = 48, theme = "light" }: LogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation
    if (markRef.current) {
      gsap.fromTo(
        markRef.current,
        { scale: 0, rotation: -45, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }
  }, []);

  const handleHover = () => {
    if (markRef.current) {
      gsap.to(markRef.current, {
        rotation: "+=15",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("flex items-center gap-3 cursor-pointer select-none", className)}
      onMouseEnter={handleHover}
    >
      <div ref={markRef} className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
        <Image 
          src="/brand/seven-sides-logo.svg" 
          alt="Seven Sides Logo" 
          fill
          className="object-contain drop-shadow-sm"
          priority
        />
      </div>
      {variant === "full" && (
        <div className="flex flex-col justify-center">
          <span className={cn(
            "font-heading text-3xl leading-[0.8] font-bold tracking-wide mt-1",
            theme === "dark" ? "text-white" : "text-foreground"
          )}>SEVEN SIDES</span>
          <span className={cn(
            "text-[10px] uppercase font-bold tracking-widest mt-1 opacity-90",
            theme === "dark" ? "text-white/80" : "text-secondary"
          )}>Home of Red Tenders</span>
        </div>
      )}
    </div>
  );
}
