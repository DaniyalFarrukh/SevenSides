"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Clock, CreditCard, Banknote, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, selectedBranch, user, clearCart } = useStore();
  const router = useRouter();
  
  const [step, setStep] = useState(user ? "address" : "auth");
  const [payment, setPayment] = useState("cod");

  const subtotal = cart.reduce((acc, item) => acc + (item.variant?.price || item.menuItem.price) * item.quantity, 0);
  const deliveryFee = selectedBranch?.deliveryFee || 0;
  const tax = subtotal * 0.16; 
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    // In a real app we'd call an API
    clearCart();
    router.push("/tracking");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => router.push("/menu")}>Go to Menu</Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Checkout Forms */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-heading font-bold text-foreground">Secure Checkout</h1>
          
          <Accordion value={[step]} onValueChange={(val: string[]) => setStep(val[0] || "")} className="w-full space-y-4">
            
            <AccordionItem value="auth" className="bg-card border rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-lg">
                1. Contact Information
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-4 pt-4 border-t">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="03XX XXXXXXX" defaultValue={user?.phone || ""} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Ali Khan" defaultValue={user?.name || ""} />
                  </div>
                  <Button onClick={() => setStep("address")} className="w-full md:w-auto">Continue to Address</Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="address" className="bg-card border rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-lg">
                2. Delivery Details
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="space-y-6 pt-4 border-t">
                  
                  {/* Map Placeholder */}
                  <div className="w-full h-48 bg-muted rounded-xl border-2 border-dashed flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Lahore,Pakistan&zoom=13&size=600x300&sensor=false')] bg-cover bg-center" />
                    <div className="z-10 bg-card p-3 rounded-full shadow-lg">
                      <MapPin className="text-primary w-6 h-6" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Input id="address" placeholder="House 123, Street 4, Block A" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="instructions">Rider Instructions (Optional)</Label>
                    <Input id="instructions" placeholder="Ring the bell, don't call" />
                  </div>

                  <div className="bg-muted p-4 rounded-xl flex items-center gap-4">
                    <Clock className="text-primary w-5 h-5" />
                    <div>
                      <p className="font-bold text-sm">Delivery Time</p>
                      <p className="text-xs text-muted-foreground">Standard Delivery (35-45 mins)</p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto bg-background">Schedule</Button>
                  </div>

                  <Button onClick={() => setStep("payment")} className="w-full md:w-auto">Continue to Payment</Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="bg-card border rounded-2xl px-6">
              <AccordionTrigger className="hover:no-underline font-bold text-lg">
                3. Payment Method
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pt-4 border-t">
                  <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                    <div className="flex items-center justify-between border p-4 rounded-xl cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="font-bold cursor-pointer">Cash on Delivery</Label>
                      </div>
                      <Banknote className="w-5 h-5 text-muted-foreground" />
                    </div>
                    
                    <div className="flex items-center justify-between border p-4 rounded-xl cursor-pointer hover:bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="font-bold cursor-pointer">Credit/Debit Card</Label>
                      </div>
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="flex items-center justify-between border p-4 rounded-xl cursor-pointer hover:bg-muted/50 opacity-60">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="jazzcash" id="jazzcash" disabled />
                        <Label htmlFor="jazzcash" className="font-bold cursor-not-allowed">JazzCash (Unavailable)</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-2xl p-6 sticky top-24 shadow-sm">
            <h2 className="font-bold text-xl mb-4 font-heading">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.menuItem.name} {item.variant ? `(${item.variant.name})` : ''}</span>
                  <span className="font-semibold">PKR {(item.variant?.price || item.menuItem.price) * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4 border-y text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>PKR {subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>PKR {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (16%)</span>
                <span>PKR {tax.toFixed(0)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-6">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">PKR {total.toFixed(0)}</span>
            </div>

            <Button 
              size="lg" 
              className="w-full rounded-full text-lg shadow-lg bg-primary hover:bg-primary/90"
              onClick={handlePlaceOrder}
              disabled={step !== "payment"}
            >
              Place Order <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
