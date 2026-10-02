import { BranchSelectorModal } from "@/components/customer/BranchSelectorModal";
import { Header } from "@/components/customer/Header";
import { Logo } from "@/components/brand/Logo";
import Link from "next/link";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      
      <footer className="bg-foreground text-background py-12 mt-12 border-t-[3px] border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="mb-6">
                <Logo variant="full" size={40} theme="dark" className="text-primary" />
              </div>
              <p className="font-bold opacity-90 tracking-wide">Home of Red Tenders. Premium fast-food delivery in Lahore.</p>
            </div>
            <div>
              <h4 className="font-heading text-xl tracking-wide mb-6 text-primary">Links</h4>
              <ul className="space-y-3 font-bold opacity-90">
                <li><Link href="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
                <li><Link href="/full-menu" className="hover:text-primary transition-colors">Full Menu</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Locations</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl tracking-wide mb-6 text-primary">Legal</h4>
              <ul className="space-y-3 font-bold opacity-90">
                <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl tracking-wide mb-6 text-primary">Contact</h4>
              <ul className="space-y-3 font-bold opacity-90">
                <li>UAN: 042 111 777 777</li>
                <li>Email: hello@sevensides.pk</li>
              </ul>
            </div>
          </div>
          
          {/* Copyright section */}
          <div className="border-t-[3px] border-background/20 pt-8 mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-sm font-bold opacity-70 text-center md:text-left">
            <p>© 2026 Seven Sides. All rights reserved.</p>
            <p className="text-xs font-normal opacity-75 hover:opacity-100 transition-opacity md:text-center">
              © 2026 Powered by <a href="https://hexalogictechandsolutions.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">hexalogicandtech</a>
            </p>
            <div className="hidden md:block"></div>
          </div>
        </div>
      </footer>

      <BranchSelectorModal />
    </div>
  );
}
