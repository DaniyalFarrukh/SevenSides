"use client";

import { useState, useRef } from "react";
import { useStore } from "@/lib/store";
import { UploadCloud, Image as ImageIcon, X, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MenuManagerPage() {
  const { customMenuBoard, customDeliveryPoster, setMenuImages } = useStore();
  const [toastMessage, setToastMessage] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "menu" | "delivery") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (type === "menu") setMenuImages(base64, undefined);
        else setMenuImages(undefined, base64);
        
        setToastMessage(`${type === "menu" ? "Menu Board" : "Delivery Poster"} updated!`);
        setTimeout(() => setToastMessage(""), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (type: "menu" | "delivery") => {
    if (type === "menu") setMenuImages(null, undefined);
    else setMenuImages(undefined, null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">Menu Manager</h1>
          <p className="text-muted-foreground">Update your digital menu items and printed board images.</p>
        </div>
      </div>

      {/* Menu Board Images Card */}
      <div className="bg-card rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ImageIcon className="text-primary w-5 h-5" /> 
          Printed Menu Board Images
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Menu Board Upload */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm">Full Menu Board</h3>
              {customMenuBoard && <span className="text-xs text-muted-foreground">Custom active</span>}
            </div>
            
            {customMenuBoard ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-primary/20 aspect-[3/4] group bg-muted flex items-center justify-center">
                <img src={customMenuBoard} alt="Menu Board Preview" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button variant="destructive" size="sm" onClick={() => removeImage("menu")}>
                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-[3/4] border-2 border-dashed rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 border-border hover:border-primary transition-colors group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground group-hover:text-primary transition-colors">
                  <UploadCloud className="w-10 h-10 mb-3" />
                  <p className="mb-2 text-sm font-semibold">Click to upload Menu Board</p>
                  <p className="text-xs">PNG, JPG (Max 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "menu")} />
              </label>
            )}
          </div>

          {/* Delivery Poster Upload */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm">Delivery Areas Poster</h3>
              {customDeliveryPoster && <span className="text-xs text-muted-foreground">Custom active</span>}
            </div>

            {customDeliveryPoster ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-secondary/20 aspect-[3/4] group bg-muted flex items-center justify-center">
                <img src={customDeliveryPoster} alt="Delivery Poster Preview" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <Button variant="destructive" size="sm" onClick={() => removeImage("delivery")}>
                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full aspect-[3/4] border-2 border-dashed rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 border-border hover:border-secondary transition-colors group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground group-hover:text-secondary transition-colors">
                  <UploadCloud className="w-10 h-10 mb-3" />
                  <p className="mb-2 text-sm font-semibold">Click to upload Delivery Poster</p>
                  <p className="text-xs">PNG, JPG (Max 5MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, "delivery")} />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Placeholder for Digital Menu grid */}
      <div className="bg-card rounded-2xl shadow-sm border p-6 opacity-60">
        <h2 className="text-xl font-bold mb-6">Digital Items (Read-only demo)</h2>
        <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-xl bg-muted/50 text-muted-foreground font-medium">
          Digital menu categories and items would be listed here.
        </div>
      </div>

      {/* Animated Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-card border border-border shadow-2xl rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in z-50">
          <CheckCircle2 className="w-6 h-6 text-success" />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
