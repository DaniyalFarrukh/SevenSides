export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/20 font-sans">
      <header className="h-16 bg-primary text-primary-foreground flex items-center justify-between px-4 shadow-md sticky top-0 z-50">
        <h1 className="font-bold text-lg">Seven Sides Rider</h1>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-success"></div> Online
        </div>
      </header>
      <main className="flex-1 max-w-md w-full mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
