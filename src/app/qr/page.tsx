"use client";

import { useState, useEffect } from 'react';
import { MOCK_BRANCHES } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Printer } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function QRPrintPage() {
  const [baseUrl, setBaseUrl] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
    setInputValue(window.location.origin);
  }, []);

  const getReviewUrl = (branchId: string, table: string, kiosk: boolean) => {
    let cleanBaseUrl = baseUrl.trim().replace(/\/$/, '');
    if (cleanBaseUrl && !cleanBaseUrl.startsWith('http')) {
      cleanBaseUrl = `http://${cleanBaseUrl}`;
    }
    return `${cleanBaseUrl}/review?branch=${branchId}&table=${table}&src=qr${kiosk ? '&kiosk=1' : ''}`;
  };

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 print:hidden gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading">QR Codes & Kiosk Links</h1>
            <p className="text-muted-foreground">Print these for tables, or open the Kiosk links on store tablets.</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold whitespace-nowrap">QR Base URL:</span>
              <div className="flex items-center gap-2">
                <Input 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setBaseUrl(inputValue) }}
                  className="w-64 h-9 text-xs bg-white border-primary/20 focus-visible:ring-primary" 
                  placeholder="http://192.168.x.x:3000"
                />
                <Button size="sm" variant="outline" onClick={() => setBaseUrl(inputValue)}>
                  Update QRs
                </Button>
              </div>
            </div>
            <Button onClick={() => window.print()} className="gap-2">
              <Printer className="w-4 h-4" /> Print Codes
            </Button>
          </div>
        </div>

        <div className="space-y-12">
          {MOCK_BRANCHES.map(branch => (
            <div key={branch.id} className="space-y-6">
              <div className="flex items-center gap-4 border-b pb-2">
                <h2 className="text-2xl font-bold text-primary">{branch.name}</h2>
                <div className="print:hidden">
                  <Link href={`/review?branch=${branch.id}&src=staff&kiosk=1`} target="_blank">
                    <Button variant="secondary" size="sm">Open Kiosk Mode Tablet</Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5].map(table => {
                  const url = getReviewUrl(branch.id, table.toString(), false);
                  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
                  
                  return (
                    <Card key={table} className="text-center overflow-hidden border-2 print:break-inside-avoid print:shadow-none">
                      <CardHeader className="bg-primary/5 py-3">
                        <CardTitle className="text-sm font-bold">Table {table}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <div className="w-full aspect-square relative mb-3">
                          <Image src={qrUrl} alt={`QR for Table ${table}`} fill className="object-contain" unoptimized />
                        </div>
                        <p className="text-xs font-bold font-heading text-primary">Scan to Rate Us!</p>
                        <p className="text-[10px] text-muted-foreground mt-1 truncate w-full px-2" title={url}>{url.replace('http://localhost:3000', '')}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
