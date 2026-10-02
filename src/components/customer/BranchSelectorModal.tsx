"use client";

import { useEffect, useState, useRef } from "react";
import { useStore } from "@/lib/store";
import { MOCK_BRANCHES, MOCK_DELIVERY_REGIONS } from "@/lib/mockData";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Navigation, Crosshair, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function BranchSelectorModal() {
  const { selectedBranch, setBranch, isBranchModalOpen, setBranchModalOpen, orderType: globalOrderType, setOrderType: setGlobalOrderType, selectedRegion: globalRegion, setRegion } = useStore();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">(globalOrderType);
  const [branchId, setBranchId] = useState<string>(selectedBranch?.id || "");
  const [selectedRegionId, setSelectedRegionId] = useState<string>(globalRegion?.id || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open modal if no branch is selected
  useEffect(() => {
    if (!selectedBranch) {
      setBranchModalOpen(true);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBranchId(selectedBranch.id);
      if (globalRegion) setSelectedRegionId(globalRegion.id);
      setOrderType(globalOrderType);
    }
  }, [selectedBranch, setBranchModalOpen, globalRegion, globalOrderType]);

  const handleSelect = () => {
    if (orderType === "delivery" && !selectedRegionId) return;
    if (orderType === "pickup" && !branchId) return;
    
    const branch = MOCK_BRANCHES.find((b) => b.id === branchId);
    if (branch) {
      setGlobalOrderType(orderType);
      if (orderType === "delivery") {
        const region = MOCK_DELIVERY_REGIONS.find(r => r.id === selectedRegionId);
        setRegion(region || null);
      } else {
        setRegion(null);
      }
      setBranch(branch);
      setBranchModalOpen(false);
    }
  };

  return (
    <Dialog open={isBranchModalOpen} onOpenChange={setBranchModalOpen}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-visible bg-secondary/80 backdrop-blur-md border-[3px] border-ink shadow-brutal-lg rounded-[24px]">
        {/* Header / Logo */}
        <div className="flex flex-col items-center pt-8 pb-4">
          <div className="mb-6">
            <Logo variant="mark" size={80} />
          </div>
          <DialogTitle className="text-2xl font-heading font-bold text-ink mb-4 tracking-wide uppercase">
            Select your order type
          </DialogTitle>
          
          {/* Segmented Toggle */}
          <div className="flex items-center bg-white border-[3px] border-ink rounded-full p-1 shadow-brutal-sm w-full max-w-[280px]">
            <button 
              onClick={() => setOrderType("delivery")}
              className={`flex-1 text-center rounded-full py-2 px-4 font-bold transition-colors whitespace-nowrap text-sm border-[2px] ${orderType === "delivery" ? "bg-primary text-ink border-ink" : "bg-transparent text-ink border-transparent hover:bg-muted"}`}
            >
              Delivery
            </button>
            <button 
              onClick={() => setOrderType("pickup")}
              className={`flex-1 text-center rounded-full py-2 px-4 font-bold transition-colors whitespace-nowrap text-sm border-[2px] ${orderType === "pickup" ? "bg-primary text-ink border-ink" : "bg-transparent text-ink border-transparent hover:bg-muted"}`}
            >
              Pick-Up
            </button>
          </div>
        </div>

        <div className="px-8 pb-4 flex flex-col items-center">
          <p className="text-ink font-bold mb-4">Please select your location</p>
          
          <button className="flex items-center gap-2 px-6 py-2 bg-white text-ink font-bold text-sm border-[3px] border-ink rounded-full shadow-brutal-sm hover:translate-y-[-2px] hover:shadow-brutal transition-all mb-6">
            <Crosshair className="w-4 h-4" />
            Use Current Location
          </button>

          <div className="w-full space-y-4">
            {/* City Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-ink mb-1 ml-2 uppercase">Select City / Region</label>
              <div className="relative">
                <select disabled className="w-full appearance-none bg-white border-[3px] border-ink rounded-xl px-4 py-3 font-bold text-ink shadow-brutal-sm opacity-100 outline-none">
                  <option>Lahore</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-ink opacity-50" />
                </div>
              </div>
            </div>

            {/* Area Dropdown */}
            <div className="flex flex-col" ref={dropdownRef}>
              <label className="text-xs font-bold text-ink mb-1 ml-2 uppercase">
                {orderType === "delivery" ? "Select Lahore Region" : "Select Branch"}
              </label>
              <div className="relative">
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute bottom-[calc(100%+8px)] left-0 w-full bg-white border-[3px] border-ink rounded-xl shadow-brutal-md overflow-hidden z-50 flex flex-col max-h-[250px]">
                    <div className="overflow-y-auto bg-white custom-scrollbar">
                      {orderType === "pickup" ? (
                        MOCK_BRANCHES.map(branch => {
                          const isSelected = branch.id === branchId;
                          return (
                            <button
                              key={branch.id}
                              disabled={!branch.isOpen}
                              onClick={() => {
                                setBranchId(branch.id);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors border-b-[2px] border-ink/10 last:border-0 ${
                                !branch.isOpen 
                                  ? "opacity-50 cursor-not-allowed bg-gray-50 text-ink/50" 
                                  : isSelected 
                                    ? "bg-primary/20 text-ink font-bold" 
                                    : "bg-white hover:bg-gray-100 text-ink font-medium"
                              }`}
                            >
                              <span className="truncate">{branch.name} {!branch.isOpen && "(Closed)"}</span>
                              <span className={`text-xs whitespace-nowrap ml-2 ${isSelected ? "font-bold text-ink" : "font-normal text-ink/60"}`}>
                                ~ eta {branch.isOpen ? "45 min." : "--"}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        MOCK_DELIVERY_REGIONS.map(region => {
                          const isSelected = region.id === selectedRegionId;
                          const branch = MOCK_BRANCHES.find(b => b.id === region.branchId);
                          const isOpen = branch?.isOpen;
                          return (
                            <button
                              key={region.id}
                              disabled={!isOpen}
                              onClick={() => {
                                setSelectedRegionId(region.id);
                                setBranchId(region.branchId);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors border-b-[2px] border-ink/10 last:border-0 ${
                                !isOpen 
                                  ? "opacity-50 cursor-not-allowed bg-gray-50 text-ink/50" 
                                  : isSelected 
                                    ? "bg-primary/20 text-ink font-bold" 
                                    : "bg-white hover:bg-gray-100 text-ink font-medium"
                              }`}
                            >
                              <span className="truncate">{region.name} {!isOpen && "(Closed)"}</span>
                              <span className={`text-xs whitespace-nowrap ml-2 ${isSelected ? "font-bold text-ink" : "font-normal text-ink/60"}`}>
                                ~ eta {isOpen ? "45 min." : "--"}
                              </span>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
                
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between bg-white border-[3px] rounded-xl px-4 py-3 font-bold text-ink shadow-brutal-sm outline-none transition-all ${isDropdownOpen ? 'border-primary' : 'border-ink hover:shadow-brutal'}`}
                >
                  <span className={(orderType === "delivery" ? selectedRegionId : branchId) ? "text-ink" : "text-ink/60"}>
                    {orderType === "delivery" 
                      ? (selectedRegionId ? MOCK_DELIVERY_REGIONS.find(r => r.id === selectedRegionId)?.name : "Select your area")
                      : (branchId ? MOCK_BRANCHES.find(b => b.id === branchId)?.name : "Select nearest branch")
                    }
                  </span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-primary' : 'text-ink'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-6 bg-secondary/90 backdrop-blur-md border-t-[3px] border-ink mt-4">
          <button 
            onClick={handleSelect}
            disabled={orderType === "delivery" ? !selectedRegionId : !branchId}
            className="w-full bg-primary text-ink border-[3px] border-ink rounded-full py-4 font-bold text-xl uppercase tracking-wide shadow-brutal hover:translate-y-[-2px] hover:shadow-brutal-lg active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-brutal"
          >
            Select
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
