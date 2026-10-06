"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Phone, MessageSquare, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const STEPS = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];

export default function TrackingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [eta, setEta] = useState(35);

  useEffect(() => {
    // Simulate live order updates
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 3) return prev + 1;
        clearInterval(interval);
        return prev;
      });
      setEta((prev) => Math.max(0, prev - 10));
    }, 5000); // Progress every 5 seconds for demo
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background min-h-screen relative flex flex-col">
      {/* Mock Map Background */}
      <div className="absolute inset-0 z-0 h-[60vh] bg-muted overflow-hidden">
        <div className="w-full h-full opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Lahore,Pakistan&zoom=14&size=800x600&sensor=false')] bg-cover bg-center" />
        
        {/* Animated Rider Marker */}
        {currentStep === 2 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
            <div className="bg-primary text-white p-2 rounded-full shadow-xl">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>

      {/* Floating UI */}
      <div className="container mx-auto px-4 max-w-lg z-10 flex-1 flex flex-col mt-32 md:mt-48 pb-12">
        <div className="bg-card rounded-3xl p-6 shadow-2xl border mb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold font-heading mb-1">Order #7S-8921</h1>
              <p className="text-muted-foreground text-sm">Estimated Delivery: <span className="font-bold text-foreground">{eta} mins</span></p>
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
              {STEPS[currentStep]}
            </div>
          </div>

          {/* Stepper */}
          <div className="relative flex justify-between mb-12">
            <div className="absolute top-4 left-0 right-0 h-1 bg-muted -translate-y-1/2 z-0" />
            <div 
              className="absolute top-4 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
            
            {STEPS.map((step, index) => {
              const isCompleted = index <= currentStep;
              const isActive = index === currentStep;
              let alignmentClass = "left-1/2 -translate-x-1/2 text-center";
              if (index === 0) {
                alignmentClass = "left-0 text-left";
              } else if (index === STEPS.length - 1) {
                alignmentClass = "right-0 text-right";
              }

              return (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${isCompleted ? 'bg-primary text-white' : 'bg-muted border-2 border-border text-muted-foreground'}`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                  <span className={`text-[10px] sm:text-xs mt-2 font-bold absolute top-full w-16 sm:w-20 leading-tight ${alignmentClass} ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-12 space-y-4">
            <div className="h-[1px] w-full bg-border" />
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted overflow-hidden relative border-2 border-border">
                <Image src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80" alt="Rider" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-bold">Usman Ali</p>
                <p className="text-xs text-muted-foreground">Your Rider • LEB-4521</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="rounded-full w-10 h-10 border-primary text-primary">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button size="icon" className="rounded-full w-10 h-10 bg-primary">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {currentStep === 3 && (
          <div className="bg-primary text-primary-foreground rounded-3xl p-6 shadow-xl mb-6 text-center animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold font-heading mb-2">How did we do?</h2>
            <p className="text-sm opacity-90 mb-4">Your feedback helps us improve.</p>
            <Button 
              variant="secondary" 
              className="w-full font-bold" 
              onClick={() => router.push('/review?order=7S-8921&src=web')}
            >
              Rate Your Order
            </Button>
          </div>
        )}

        <Button variant="outline" className="w-full bg-background/80 backdrop-blur" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
