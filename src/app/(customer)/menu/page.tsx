"use client";

import { useState, useRef, useEffect } from "react";
import { MOCK_MENU, MOCK_CATEGORIES, MenuItem } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ItemModal } from "@/components/customer/ItemModal";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(MOCK_CATEGORIES[0].id);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer for ScrollSpy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveCategory(visibleEntry.target.id);
          
          // Scroll horizontal nav without affecting vertical page scroll
          const button = document.getElementById(`nav-btn-${visibleEntry.target.id}`);
          if (button && scrollRef.current) {
            const container = scrollRef.current;
            const scrollLeft = button.offsetLeft - (container.offsetWidth / 2) + (button.offsetWidth / 2);
            container.scrollTo({ left: scrollLeft, behavior: "smooth" });
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Trigger when the top of the section reaches the upper part of the screen
        threshold: 0,
      }
    );

    MOCK_CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [search]); // re-run if search changes since sections might disappear

  const filteredMenu = MOCK_MENU.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Sticky Categories */}
      <div className="sticky top-14 sm:top-[68px] z-40 bg-white border-b-[2px] border-ink shadow-sm group/nav">
        <div className="container mx-auto relative flex items-center px-0 sm:px-4">
          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
            className="hidden md:flex shrink-0 z-10 bg-white border-[2px] border-ink rounded-full p-1 hover:bg-cream transition-colors text-ink ml-4"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div ref={scrollRef} className="flex-1 flex overflow-x-auto scrollbar-hide relative scroll-smooth">
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`nav-btn-${cat.id}`}
                className={`snap-start shrink-0 px-5 py-4 font-bold text-sm tracking-wide transition-colors whitespace-nowrap border-b-[3px] ${
                  activeCategory === cat.id ? "text-ink border-ink bg-cream" : "text-ink/60 border-transparent hover:text-ink hover:bg-cream/50"
                }`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
            className="hidden md:flex shrink-0 z-10 bg-white border-[2px] border-ink rounded-full p-1 hover:bg-cream transition-colors text-ink mr-4"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative mb-12 max-w-md mx-auto md:mx-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-6 h-6" />
          <Input 
            placeholder="Search our menu..." 
            className="pl-12 rounded-full bg-white border-[3px] border-ink py-6 font-bold text-lg shadow-brutal-sm focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Menu Sections */}
        {MOCK_CATEGORIES.map(cat => {
          const items = filteredMenu.filter(item => 
            cat.id === "c-0" ? item.isPopular : item.categoryId === cat.id
          );
          
          if (items.length === 0) return null;

          return (
            <div key={cat.id} id={cat.id} className="scroll-mt-36 mb-16">
              <h2 className="text-3xl font-heading font-bold mb-6 text-ink tracking-wide">
                {cat.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {items.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-white border-[2px] border-ink rounded-[20px] overflow-hidden hover:shadow-brutal-sm transition-all duration-300 cursor-pointer group flex flex-col"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative h-32 sm:h-48 w-full bg-cream border-b-[2px] border-ink p-2 sm:p-4">
                      {/* Heart Icon */}
                      <button className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 bg-white rounded-full p-1.5 sm:p-2 border-[2px] border-ink hover:bg-primary transition-colors">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill
                        className="object-contain p-2 sm:p-4 group-hover:scale-105 transition-transform duration-500 z-10"
                      />
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                          <span className="bg-[#EF4444] text-white font-bold px-2 py-1 sm:px-4 sm:py-2 rounded-lg border-[2px] border-ink text-[10px] sm:text-xs">SOLD OUT</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 sm:p-5 flex flex-col flex-1">
                      <h3 className="font-heading text-lg sm:text-xl font-bold leading-tight mb-1 sm:mb-2 text-ink line-clamp-1">{item.name}</h3>
                      <p className="text-ink/60 text-[11px] sm:text-sm font-medium line-clamp-2 mb-3 sm:mb-4 flex-1">{item.description}</p>
                      <div className="flex flex-col gap-2 mt-auto">
                        <span className="font-bold text-sm sm:text-lg text-ink">Rs. {item.price.toLocaleString()}</span>
                        <button 
                          className="w-full bg-primary text-ink border-[2px] border-ink rounded-xl py-1.5 sm:py-2.5 font-bold text-xs sm:text-sm shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                          disabled={!item.isAvailable}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ItemModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
}
