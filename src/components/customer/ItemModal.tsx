"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import { MenuItem, MenuItemVariant } from "@/lib/mockData";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const MOCK_ADDONS = [
  { id: "a1", name: "Fries with Drink", price: 290 },
  { id: "a2", name: "Masala Fries", price: 280 },
  { id: "a3", name: "Love Bomb Mocktail", price: 370 },
  { id: "a4", name: "Waffle Fries", price: 360 },
];

export function ItemModal({ 
  item, 
  isOpen, 
  onClose 
}: { 
  item: MenuItem | null, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<MenuItemVariant | undefined>(item?.variants?.[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [heatLevel, setHeatLevel] = useState<string>("Country Heat");

  if (!item) return null;

  const basePrice = selectedVariant ? selectedVariant.price : item.price;
  const addonsTotal = selectedAddons.reduce((sum, addonId) => {
    const addon = MOCK_ADDONS.find(a => a.id === addonId);
    return sum + (addon?.price || 0);
  }, 0);
  const currentTotal = (basePrice + addonsTotal) * quantity;

  const handleAdd = () => {
    const addonNames = selectedAddons.map(id => MOCK_ADDONS.find(a => a.id === id)?.name).join(", ");
    let finalNotes = instructions;
    
    if (["c-1", "c-2", "c-5"].includes(item.categoryId)) {
      finalNotes = `Spice: ${heatLevel}${finalNotes ? ` | ${finalNotes}` : ""}`;
    }
    
    if (addonNames) {
      finalNotes = finalNotes ? `Addons: ${addonNames} | ${finalNotes}` : `Addons: ${addonNames}`;
    }

    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      menuItem: item,
      variant: selectedVariant,
      quantity,
      notes: finalNotes,
    });
    
    // Reset state
    setQuantity(1);
    setSelectedVariant(item.variants?.[0]);
    setSelectedAddons([]);
    setInstructions("");
    setHeatLevel("Country");
    onClose();
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden border-[2px] border-ink bg-white shadow-xl rounded-2xl md:rounded-[24px]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-50 w-8 h-8 md:w-10 md:h-10 bg-white border-[2px] border-ink rounded-full flex items-center justify-center hover:bg-gray-100 transition-all shadow-sm"
        >
          <X className="w-4 h-4 md:w-5 md:h-5 text-ink" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[90vh] md:h-[600px] overflow-hidden">
          
          {/* Left Column: Image Area */}
          <div className="w-full md:w-2/5 bg-cream relative border-b-[2px] md:border-b-0 md:border-r-[2px] border-ink flex items-center justify-center p-4 md:p-8 shrink-0 h-[30vh] min-h-[220px] md:h-auto overflow-hidden">
            <div className="absolute w-[80%] h-[80%] bg-primary rounded-full blur-3xl opacity-20" />
            
            <div className="relative w-full h-full max-h-[300px]">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-contain p-2 hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            {/* Popular Sticker */}
            {item.isPopular && (
              <div className="absolute top-4 left-4 bg-[#EF4444] text-white px-3 py-1 rounded-md text-[10px] sm:text-xs font-bold shadow-sm z-20">
                POPULAR 🔥
              </div>
            )}
          </div>

          {/* Right Column: Details & Options */}
          <div className="w-full md:w-3/5 flex flex-col bg-white flex-1 relative overflow-hidden">
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 scrollbar-hide pb-6">
              <DialogTitle className="sr-only">{item.name}</DialogTitle>
              
              {/* Header */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink leading-tight mb-1">{item.name}</h2>
                <p className="text-xl font-bold text-primary-dark mb-2">
                  Rs. {basePrice.toLocaleString()}
                </p>
                <p className="text-ink/60 text-sm sm:text-base leading-snug">
                  {item.description}
                </p>
              </div>

              {/* Heat Levels */}
              {["c-1", "c-2", "c-5"].includes(item.categoryId) && (
                <div className="space-y-3">
                  <h3 className="font-heading text-lg font-bold text-ink">
                    Select Spice Level 🌶️
                  </h3>
                  <div className="grid gap-2">
                    {["No Heat", "Country Heat", "Screamer"].map((level) => (
                      <label 
                        key={level} 
                        onClick={() => setHeatLevel(level)}
                        className={`flex items-center gap-3 p-3 sm:p-4 border-[2px] border-ink rounded-xl cursor-pointer transition-all ${
                          heatLevel === level ? "bg-[#EF4444]/10 border-[#EF4444]" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-[2px] ${heatLevel === level ? "border-[#EF4444] bg-[#EF4444]" : "border-ink bg-transparent"} flex items-center justify-center`}>
                          {heatLevel === level && <div className="w-2 h-2 bg-[#EF4444] rounded-full" />}
                        </div>
                        <span className="font-bold text-sm sm:text-base">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Variants (if applicable) */}
              {item.variants && item.variants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-heading text-xl font-bold text-ink uppercase bg-accent inline-block px-3 py-1 border-[2px] border-ink rounded-md rotate-[-1deg]">Select Variant</h3>
                  <div className="grid gap-3">
                    {item.variants.map((v) => (
                      <label 
                        key={v.name} 
                        className={`flex items-center justify-between p-4 border-[3px] border-ink rounded-2xl cursor-pointer transition-all ${
                          selectedVariant?.name === v.name ? "bg-primary shadow-brutal translate-y-[-2px]" : "bg-white hover:bg-white/80"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-[3px] border-ink flex items-center justify-center ${selectedVariant?.name === v.name ? "bg-white" : "bg-transparent"}`}>
                            {selectedVariant?.name === v.name && <div className="w-2.5 h-2.5 bg-ink rounded-full" />}
                          </div>
                          <span className="font-bold text-lg">{v.name}</span>
                        </div>
                        <span className="font-bold">Rs. {v.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Frequently Bought Together (Mock Addons) */}
              <div className="space-y-3">
                <h3 className="font-heading text-lg font-bold text-ink">Frequently bought together</h3>
                
                <div className="space-y-2">
                  {MOCK_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <label 
                        key={addon.id} 
                        className={`flex items-center justify-between p-3 border-[2px] border-ink rounded-xl cursor-pointer transition-all ${
                          isSelected ? "bg-primary/10 border-primary" : "bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 border-[2px] rounded-md flex items-center justify-center transition-colors ${isSelected ? "border-primary bg-primary" : "border-ink bg-white"}`}>
                            {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className="font-bold text-sm sm:text-base text-ink">{addon.name}</span>
                        </div>
                        <span className="font-bold text-xs sm:text-sm text-ink/70">Rs. {addon.price.toFixed(2)}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <h3 className="font-heading text-lg font-bold text-ink">Instructions</h3>
                <div className="relative">
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value.slice(0, 150))}
                    placeholder="Any special requests?"
                    className="w-full bg-white border-[2px] border-ink rounded-xl p-3 sm:p-4 min-h-[80px] resize-none text-sm outline-none focus:border-primary transition-all"
                  />
                  <div className="absolute bottom-3 right-3 text-xs font-medium text-ink/40">
                    {instructions.length}/150
                  </div>
                </div>
              </div>

            </div>

            {/* Sticky Bottom Bar */}
            <div className="mt-auto bg-white border-t-[2px] border-ink p-3 sm:p-4 z-20 flex items-center justify-between gap-3 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3 sm:gap-4 bg-gray-100 rounded-full px-1 py-1 shrink-0">
                <button 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white border-[2px] border-ink shadow-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4 text-ink" />
                </button>
                <span className="font-bold text-sm sm:text-lg w-4 sm:w-6 text-center">{quantity}</span>
                <button 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-primary border-[2px] border-ink shadow-sm hover:bg-primary-dark transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4 text-ink" />
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                className="flex-1 bg-primary text-ink border-[2px] border-ink rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 font-bold text-sm sm:text-base shadow-sm hover:bg-primary-dark active:translate-y-[1px] transition-all uppercase tracking-wide flex justify-between items-center"
                onClick={handleAdd}
              >
                <span>Rs. {currentTotal.toLocaleString()}</span>
                <span>Add To Cart</span>
              </button>
            </div>
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
