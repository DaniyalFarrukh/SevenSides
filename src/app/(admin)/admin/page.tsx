"use client";

import { useReviewStore } from "@/lib/reviewStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Star } from "lucide-react";

const data = [
  { name: '10am', sales: 4000 },
  { name: '12pm', sales: 12000 },
  { name: '2pm', sales: 25000 },
  { name: '4pm', sales: 18000 },
  { name: '6pm', sales: 32000 },
  { name: '8pm', sales: 45000 },
  { name: '10pm', sales: 38000 },
];

export default function AdminDashboard() {
  const { reviews } = useReviewStore();
  const lowRatings = reviews.filter(r => r.rating <= 2 && r.status === 'new');
  
  const getBranchAvg = (branchId: string) => {
    const branchReviews = reviews.filter(r => r.branch === branchId);
    if (branchReviews.length === 0) return "N/A";
    return (branchReviews.reduce((a, b) => a + b.rating, 0) / branchReviews.length).toFixed(1);
  };

  return (
    <div className="space-y-8">
      {lowRatings.length > 0 && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="font-bold">Attention: {lowRatings.length} new low-rated reviews (1-2 stars) require your response.</span>
          </div>
          <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-white shrink-0" onClick={() => window.location.href='/admin/reviews'}>View Reviews</Button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR 145,230</div>
            <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 preparing, 16 out for delivery</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">Signed up today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32m</div>
            <p className="text-xs text-muted-foreground">-3m from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Branch Ratings Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: '1', name: 'Model Town' },
          { id: '2', name: 'Cantt' },
          { id: '3', name: 'DHA' },
          { id: '4', name: 'Lake City' },
        ].map(branch => (
          <Card key={branch.id} className="bg-primary/5 border-primary/20">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider">{branch.name} Rating</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex items-center justify-between">
              <div className="text-xl font-bold flex items-center gap-1">
                {getBranchAvg(branch.id)} <Star className="w-4 h-4 fill-primary text-primary" />
              </div>
              <div className="text-xs text-muted-foreground">{reviews.filter(r => r.branch === branch.id).length} reviews</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="sales" stroke="#DC2626" strokeWidth={3} dot={false} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs${value/1000}k`} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Live Orders Kanban Mock */}
        <Card className="col-span-1 border-primary/20">
          <CardHeader className="flex flex-row justify-between items-center bg-primary/5 pb-4">
            <CardTitle>Live Orders Board</CardTitle>
            <Button size="sm" variant="outline">Simulate Order</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 space-y-3">
              {[
                { id: "7S-8921", time: "2 mins ago", items: "1x Red Tenders (5 Pcs), 1x Fries", total: 1200, status: "New" },
                { id: "7S-8920", time: "12 mins ago", items: "2x Smash Burger", total: 1700, status: "Preparing" },
                { id: "7S-8919", time: "25 mins ago", items: "1x Wings, 1x Shake", total: 950, status: "Rider Assigned" },
              ].map((order) => (
                <div key={order.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm">{order.id}</span>
                    <Badge variant={order.status === "New" ? "destructive" : "secondary"} className="text-[10px]">
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{order.items}</p>
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span>PKR {order.total}</span>
                    <span>{order.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
