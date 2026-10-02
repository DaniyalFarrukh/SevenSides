"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings, X, RefreshCw } from "lucide-react";

export function DemoSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[100] rounded-full shadow-2xl bg-foreground text-background hover:bg-foreground/90 w-12 h-12 p-0 flex items-center justify-center border-2 border-border"
      >
        <Settings className="w-5 h-5 animate-spin-slow" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-[100] w-64 bg-card text-card-foreground rounded-2xl shadow-2xl overflow-hidden border flex flex-col">
      <div className="bg-muted p-3 flex justify-between items-center border-b">
        <span className="font-bold text-sm tracking-widest text-primary">DEMO MODE</span>
        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4 space-y-2 flex flex-col">
        <Link href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full justify-start bg-muted text-foreground hover:bg-accent transition-colors">
          Customer Website
        </Link>
        <Link href="/admin" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full justify-start bg-muted text-foreground hover:bg-accent transition-colors">
          Admin Console
        </Link>
        <Link href="/rider" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full justify-start bg-muted text-foreground hover:bg-accent transition-colors">
          Rider App
        </Link>
        <Link href="/features" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg w-full justify-start bg-muted text-foreground hover:bg-accent transition-colors">
          Features Printout
        </Link>
        
        <div className="h-px w-full bg-border my-2" />
        
        <Button variant="outline" className="w-full border-border text-muted-foreground hover:text-foreground hover:bg-muted bg-transparent text-xs" onClick={() => { localStorage.clear(); window.location.reload(); }}>
          <RefreshCw className="w-3 h-3 mr-2" /> Reset Demo Data
        </Button>
      </div>
    </div>
  );
}
