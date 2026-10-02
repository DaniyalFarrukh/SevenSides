"use client";

import { useStore } from "@/lib/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, selectedBranch } = useStore();
  const [open, setOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.variant?.price || item.menuItem.price) * item.quantity, 0);
  const deliveryFee = selectedBranch?.deliveryFee || 0;
  const tax = subtotal * 0.16; // 16% GST
  const total = subtotal + deliveryFee + tax;

  const minOrder = selectedBranch?.minOrder || 0;
  const canCheckout = subtotal >= minOrder && cart.length > 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="relative flex items-center gap-2 bg-primary text-ink border-[2px] border-ink rounded-full px-3 sm:px-5 h-10 font-bold shadow-sm hover:bg-primary-dark transition-all outline-none">
        <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Rs. {subtotal}</span>
        {cartItemsCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-ink text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full border-[2px] border-ink shadow-sm">
            {cartItemsCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-[2px] border-ink bg-white">
        <SheetHeader className="p-4 sm:p-6 border-b border-ink/10 bg-gray-50">
          <SheetTitle className="flex items-center gap-2 font-heading text-2xl">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Your Order
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag className="w-16 h-16 mb-4 text-muted-foreground" />
              <p className="text-lg font-bold">Your cart is empty</p>
              <p className="text-sm">Add some delicious Red Tenders!</p>
              <Button variant="outline" className="mt-6 rounded-full" onClick={() => setOpen(false)}>
                Browse Menu
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <Image src={item.menuItem.image} alt={item.menuItem.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm">{item.menuItem.name}</h4>
                      <button onClick={() => removeFromCart(item.id)} className="text-destructive p-1 hover:bg-destructive/10 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {item.variant && <p className="text-xs text-muted-foreground">{item.variant.name}</p>}
                    <div className="flex justify-between items-center mt-3">
                      <span className="font-bold text-primary">PKR {(item.variant?.price || item.menuItem.price) * item.quantity}</span>
                      <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                        <button 
                          className="w-6 h-6 flex items-center justify-center hover:bg-background rounded-full transition-colors"
                          onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          className="w-6 h-6 flex items-center justify-center hover:bg-background rounded-full transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-2 pt-4 text-sm border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">PKR {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-semibold">PKR {deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (16%)</span>
                  <span className="font-semibold">PKR {tax.toFixed(0)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="p-6 border-t bg-card mt-auto flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">PKR {total.toFixed(0)}</span>
            </div>
            
            {!canCheckout && (
              <p className="text-xs text-destructive text-center font-semibold bg-destructive/10 p-2 rounded-lg">
                Add PKR {minOrder - subtotal} more to reach minimum order for {selectedBranch?.name}
              </p>
            )}

            {canCheckout ? (
              <Link href="/checkout" onClick={() => setOpen(false)} className="inline-flex items-center justify-center w-full h-11 rounded-full text-lg shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors">
                Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            ) : (
              <Button size="lg" className="w-full rounded-full text-lg shadow-lg bg-primary hover:bg-primary/90" disabled>
                Checkout
              </Button>
            )}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
