"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Phone, CheckCircle } from "lucide-react";

export default function RiderPage() {
  return (
    <div className="space-y-4">
      {/* Current Active Order */}
      <Card className="border-primary/50 shadow-lg overflow-hidden border-2">
        <div className="bg-primary p-3 text-primary-foreground flex justify-between items-center">
          <span className="font-bold text-sm">NEW ORDER: #7S-8921</span>
          <span className="font-bold">4.2 km</span>
        </div>
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-3 items-start">
            <div className="mt-1"><MapPin className="text-primary w-5 h-5" /></div>
            <div>
              <p className="font-bold">Dropoff</p>
              <p className="text-sm text-muted-foreground">House 123, Street 4, Block A, DHA Phase 5</p>
            </div>
          </div>
          <div className="flex gap-3 items-start border-t pt-4">
            <div className="mt-1"><Navigation className="text-accent w-5 h-5" /></div>
            <div>
              <p className="font-bold">Instructions</p>
              <p className="text-sm text-muted-foreground">&quot;Ring the bell, don&apos;t call&quot;</p>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button className="flex-1 bg-success hover:bg-success/90 h-12 text-lg">Accept</Button>
            <Button variant="outline" className="flex-1 h-12 text-lg">Reject</Button>
          </div>
        </CardContent>
      </Card>

      {/* Accepted Order (Mock state) */}
      <Card className="opacity-60">
        <div className="bg-muted p-3 flex justify-between items-center border-b">
          <span className="font-bold text-sm">#7S-8919</span>
          <span className="text-xs font-bold text-success flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Delivered</span>
        </div>
        <CardContent className="p-4">
          <p className="text-sm">Model Town • PKR 950 (Cash collected)</p>
        </CardContent>
      </Card>
    </div>
  );
}
