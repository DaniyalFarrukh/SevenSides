"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Flip from "gsap/Flip";
import Draggable from "gsap/Draggable";
import { useStore } from "@/lib/store";
import { IMAGES } from "@/lib/images";
import { DELIVERY_AREAS } from "@/lib/delivery-areas";
import { MOCK_CATEGORIES } from "@/lib/mockData";
import { Download, Share2, PhoneCall, ShoppingBag, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, Draggable);
}

export default function FullMenuPage() {
  const { customMenuBoard, customDeliveryPoster } = useStore();
  const [activeTab, setActiveTab] = useState<"menu" | "delivery">("menu");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);

  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxImgRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const lastTapTime = useRef<number>(0);

  const activeImageSrc = activeTab === "menu" 
    ? (customMenuBoard || IMAGES.menuBoard.src) 
    : (customDeliveryPoster || IMAGES.deliveryPoster.src);
    
  const activeAlt = activeTab === "menu" ? IMAGES.menuBoard.alt : IMAGES.deliveryPoster.alt;

  useLayoutEffect(() => {
    // Update Tab Indicator
    if (!tabsRef.current || !indicatorRef.current) return;
    const activeTabEl = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`) as HTMLElement;
    if (activeTabEl) {
      gsap.to(indicatorRef.current, {
        x: activeTabEl.offsetLeft,
        width: activeTabEl.offsetWidth,
        duration: 0.4,
        ease: "power3.out"
      });
    }
    
    // Image reveal animation
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: "inset(10% 0% 0% 0%)", scale: 1.05, filter: "blur(10px)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "filter,clipPath" }
      );
    }
    
    // Chips stagger
    if (chipsRef.current && chipsRef.current.children.length > 0) {
      gsap.fromTo(
        chipsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [activeTab]);

  useEffect(() => {
    let draggables: Draggable[] = [];
    let lastTapTime = 0;

    if (isLightboxOpen && lightboxImgRef.current && lightboxRef.current) {
      draggables = Draggable.create(lightboxImgRef.current, {
        type: "x,y",
        bounds: lightboxRef.current,
        inertia: true,
        onClick: function() {
          const now = Date.now();
          if (now - lastTapTime < 300) {
            toggleZoom();
          }
          lastTapTime = now;
        }
      });
      
      // We don't disable it anymore so onClick always fires,
      // but recreating it ensures bounds are correct for scale-[2.5]
      document.body.style.overflow = "hidden";
    }
    return () => {
      draggables.forEach(d => d.kill());
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, lightboxZoomed]);

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setLightboxZoomed(false);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxZoomed(false);
    if (lightboxImgRef.current) {
      gsap.set(lightboxImgRef.current, { x: 0, y: 0 }); // reset pan
    }
  };

  const toggleZoom = () => {
    setLightboxZoomed(prev => {
      const newZoom = !prev;
      if (!newZoom && lightboxImgRef.current) {
        gsap.to(lightboxImgRef.current, { x: 0, y: 0, duration: 0.3 });
      }
      return newZoom;
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Seven Sides - " + (activeTab === "menu" ? "Menu Board" : "Delivery Areas"),
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32 lg:pb-16 pt-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-3 tracking-wide">
            THE <span className="text-primary">WHOLE</span> MENU
          </h1>
          <p className="text-muted-foreground text-lg">Browse our original store menu board and delivery zones.</p>
        </header>

        {/* Custom Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div 
            ref={tabsRef}
            className="relative flex items-center p-1 bg-muted rounded-full"
            role="tablist"
          >
            <div 
              ref={indicatorRef}
              className="absolute left-1 top-1 bottom-1 bg-primary rounded-full shadow-md z-0"
            />
            <button
              data-tab="menu"
              role="tab"
              aria-selected={activeTab === "menu"}
              onClick={() => setActiveTab("menu")}
              className={cn(
                "relative z-10 px-6 py-2.5 rounded-full font-bold text-sm transition-colors duration-300 outline-none focus-visible:ring-2 ring-primary ring-offset-2",
                activeTab === "menu" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Menu Board
            </button>
            <button
              data-tab="delivery"
              role="tab"
              aria-selected={activeTab === "delivery"}
              onClick={() => setActiveTab("delivery")}
              className={cn(
                "relative z-10 px-6 py-2.5 rounded-full font-bold text-sm transition-colors duration-300 outline-none focus-visible:ring-2 ring-primary ring-offset-2",
                activeTab === "delivery" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Delivery Areas
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Image Frame */}
          <div className="flex-1 w-full max-w-3xl mx-auto relative group perspective-1000">
            {/* Decoration Parallax Shapes */}
            <div className="absolute -left-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
            
            <div 
              ref={imageContainerRef}
              onClick={openLightbox}
              className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-secondary/20 cursor-zoom-in bg-card transition-transform duration-500 hover:shadow-primary/10 hover:-translate-y-1"
            >
              <Image 
                src={activeImageSrc}
                alt={activeAlt}
                width={2000}
                height={3000}
                quality={100}
                unoptimized
                className="w-full h-auto object-contain"
                priority
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/90 text-foreground px-4 py-2 rounded-full font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl backdrop-blur-sm">
                  Click to Expand
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Side Panel (Desktop) */}
          <div className="hidden lg:flex flex-col w-72 sticky top-24 bg-card rounded-3xl p-6 shadow-xl border">
            <h3 className="font-heading font-bold text-2xl mb-2 text-foreground">Actions</h3>
            <p className="text-muted-foreground text-sm mb-6">
              {activeTab === "menu" 
                ? "Ready to order? Use our digital menu for a faster experience." 
                : "Need help? Call our delivery hotline."}
            </p>
            
            <div className="space-y-3">
              <Link href="/menu" className="flex">
                <Button className="w-full h-12 text-md font-bold rounded-xl shadow-md group">
                  <ShoppingBag className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" /> Order Online
                </Button>
              </Link>
              
              {activeTab === "delivery" && (
                <a href="tel:03707743936" className="flex">
                  <Button variant="secondary" className="w-full h-12 text-md font-bold rounded-xl bg-secondary hover:bg-secondary/90 text-white">
                    <PhoneCall className="w-5 h-5 mr-2" /> 0370 7743936
                  </Button>
                </a>
              )}

              <div className="h-px w-full bg-border my-2" />

              <Button variant="outline" className="w-full h-12 rounded-xl border-border" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2 text-muted-foreground" /> Share Page
              </Button>
              
              <a href={activeImageSrc} download className="flex">
                <Button variant="outline" className="w-full h-12 rounded-xl border-border">
                  <Download className="w-4 h-4 mr-2 text-muted-foreground" /> Download Image
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t z-40 flex gap-3 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <Link href="/menu" className="flex-1">
          <Button className="w-full h-12 rounded-xl font-bold text-md shadow-lg">Order Now</Button>
        </Link>
        {activeTab === "delivery" && (
          <a href="tel:03707743936" className="flex-1">
            <Button className="w-full h-12 rounded-xl font-bold text-md bg-secondary text-white hover:bg-secondary/90">Call Us</Button>
          </a>
        )}
      </div>

      {/* Lightbox Fullscreen Viewer */}
      {isLightboxOpen && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          {/* Toolbar */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-[110]">
            <Button variant="outline" size="icon" onClick={toggleZoom} className="bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-full">
              {lightboxZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </Button>
            <Button variant="outline" size="icon" onClick={closeLightbox} className="bg-white/10 hover:bg-white/20 border-white/20 text-white rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-sm z-[110] pointer-events-none">
            {lightboxZoomed ? "Drag to pan" : "Double-tap to zoom"}
          </div>

          <div 
            ref={lightboxImgRef}
            className={cn(
              "relative transition-transform duration-300 origin-center cursor-grab active:cursor-grabbing",
              lightboxZoomed ? "scale-[2.5]" : "scale-100"
            )}
          >
            <Image 
              src={activeImageSrc}
              alt={activeAlt}
              width={2000}
              height={3000}
              quality={100}
              unoptimized
              className="max-h-[90vh] w-auto object-contain select-none shadow-2xl"
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
