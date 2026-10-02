"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  LayoutDashboard, ShoppingCart, Users, MapPin, 
  Settings, LogOut, Package, Tag, Star, Truck,
  Bell, Search, Menu, X, Calendar, Globe
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Live Orders", badge: "2" },
  { href: "/admin/menu", icon: Package, label: "Menu Manager" },
  { href: "/admin/branches", icon: MapPin, label: "Branches" },
  { href: "/admin/promotions", icon: Tag, label: "Promotions" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/loyalty", icon: Star, label: "Loyalty & CRM" },
  { href: "/admin/fleet", icon: Truck, label: "Fleet" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPath = "/admin"; // In real app, use usePathname

  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      {/* Desktop Sidebar (Turquoise) */}
      <aside className="hidden md:flex flex-col w-64 bg-secondary text-secondary-foreground border-r border-secondary/20 shadow-xl z-20 transition-all">
        <div className="h-16 flex items-center px-6 border-b border-secondary-foreground/10 bg-secondary/80 backdrop-blur">
          <Logo variant="full" size={32} theme="dark" />
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-medium",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-secondary-foreground/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 shrink-0" /> 
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                    isActive ? "bg-white text-primary" : "bg-primary text-primary-foreground"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-secondary-foreground/10">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-xl text-secondary-foreground/80 hover:bg-destructive/20 hover:text-white transition-colors">
            <LogOut className="w-5 h-5 shrink-0" /> 
            <span>Exit to Demo</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-8 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="hidden sm:flex relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search orders, customers..." className="pl-9 bg-muted/50 border-transparent focus-visible:border-primary rounded-full h-9" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-2 rounded-full h-9">
              <Calendar className="w-4 h-4 text-primary" /> Today
            </Button>
            <Button variant="outline" size="sm" className="hidden lg:flex items-center gap-2 rounded-full h-9">
              <MapPin className="w-4 h-4 text-primary" /> DHA Phase 5
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hidden sm:flex">
              <Globe className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
            </Button>
            <div className="w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold ml-2 shrink-0 border border-secondary/20">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-secondary text-secondary-foreground h-full flex flex-col animate-in slide-in-from-left shadow-2xl">
            <div className="h-16 flex items-center justify-between px-6 border-b border-secondary-foreground/10">
              <Logo variant="full" size={28} theme="dark" />
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-3 rounded-xl transition-all font-medium",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "text-secondary-foreground/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" /> 
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
