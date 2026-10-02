"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  return (
    <div className="bg-background min-h-screen p-8 md:p-16 text-foreground font-sans max-w-5xl mx-auto print:p-0">
      <div className="flex justify-between items-center mb-12 print:hidden">
        <h1 className="text-3xl font-heading font-bold text-primary">Seven Sides Demo</h1>
        <Button onClick={() => window.print()} variant="outline" className="border-primary text-primary">
          Save as PDF
        </Button>
      </div>

      <header className="mb-12 border-b-4 border-primary pb-8">
        <h1 className="text-5xl font-heading font-bold text-foreground mb-4">Direct Ordering Platform</h1>
        <p className="text-xl text-muted-foreground">Feature Specification & Business Benefits</p>
      </header>

      <section className="mb-12 bg-accent/20 border-l-4 border-primary p-6 rounded-r-lg">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Why Direct Ordering Beats Aggregators</h2>
        <ul className="space-y-3">
          <li className="flex gap-3"><CheckCircle2 className="text-primary w-6 h-6 shrink-0" /> <span><strong>Zero Commission:</strong> Stop paying 25-30% on every order. Keep your profits.</span></li>
          <li className="flex gap-3"><CheckCircle2 className="text-primary w-6 h-6 shrink-0" /> <span><strong>Own Your Customer Data:</strong> Directly market to your buyers, track their preferences, and build loyalty.</span></li>
          <li className="flex gap-3"><CheckCircle2 className="text-primary w-6 h-6 shrink-0" /> <span><strong>Brand Control:</strong> No competing restaurants listed next to your menu. A pure Seven Sides experience.</span></li>
        </ul>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary border-b pb-2">1. Customer Website</h2>
          <ul className="space-y-4">
            <li><strong>Branch Auto-Assign:</strong> Uses mock geo-fencing to route orders to the correct branch.</li>
            <li><strong>Mobile-First Menu:</strong> Sticky categories and visual-heavy cards drive higher conversion on phones.</li>
            <li><strong>Advanced Item Modifiers:</strong> Upsell easily with variants, add-ons, and special instructions.</li>
            <li><strong>Persistent Cart:</strong> Saves the user&apos;s cart via local storage so they don&apos;t lose items.</li>
            <li><strong>Live Order Tracking:</strong> Animated stepper with ETA keeps customers informed.</li>
            <li><strong>Interactive Print Menu:</strong> Full printed-menu viewer with zoom and delivery area poster.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary border-b pb-2">2. Admin Panel (Merchant Console)</h2>
          <ul className="space-y-4">
            <li><strong>Real-time Dashboard:</strong> Monitor today&apos;s revenue, active orders, and average delivery times.</li>
            <li><strong>Live Orders Kanban:</strong> Accept, reject, or update order statuses seamlessly.</li>
            <li><strong>Menu & Branch CMS:</strong> Instantly toggle item availability per branch or update pricing.</li>
            <li><strong>Dynamic Menu Boards:</strong> Owner-updatable menu images synced instantly to the customer site.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary border-b pb-2">3. Loyalty & CRM</h2>
          <ul className="space-y-4">
            <li><strong>Points & E-Wallet:</strong> Encourage repeat purchases by rewarding customers with points.</li>
            <li><strong>Automated Workflows:</strong> Send SMS/Push notifications for abandoned carts or birthdays.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary border-b pb-2">4. Delivery Management</h2>
          <ul className="space-y-4">
            <li><strong>Rider App (PWA):</strong> A mobile-optimized view for riders to accept routes.</li>
            <li><strong>Fleet Tracking:</strong> Admin map to monitor rider locations and performance.</li>
          </ul>
        </section>
      </div>

      <section className="mt-12 pt-8 border-t-2 border-dashed">
        <h2 className="text-2xl font-bold mb-4 text-muted-foreground">Roadmap / Add-ons (Optional)</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <li className="bg-muted p-4 rounded-lg"><strong>POS Integration:</strong> Sync online orders directly to your physical Point of Sale system.</li>
          <li className="bg-muted p-4 rounded-lg"><strong>Native iOS/Android Apps:</strong> Launch a dedicated app on the App Store and Google Play.</li>
          <li className="bg-muted p-4 rounded-lg"><strong>Third-Party Courier Sync:</strong> Fallback to Bykea/TCS if in-house riders are busy.</li>
        </ul>
      </section>
    </div>
  );
}
