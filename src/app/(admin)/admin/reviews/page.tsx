"use client";

import { useState } from 'react';
import { useReviewStore } from '@/lib/reviewStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, MessageCircle, Phone, CheckCircle } from 'lucide-react';

export default function AdminReviewsPage() {
  const { reviews, replyToReview } = useReviewStore();
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const filteredReviews = reviews.filter(r => filterRating ? r.rating === filterRating : true);

  const handleReply = (id: string) => {
    if (!replyText[id]) return;
    replyToReview(id, replyText[id]);
    setReplyText(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-heading text-primary">Customer Reviews</h1>
        <div className="flex gap-2">
          <Button variant={filterRating === null ? 'default' : 'outline'} onClick={() => setFilterRating(null)}>All</Button>
          {[5, 4, 3, 2, 1].map(r => (
            <Button key={r} variant={filterRating === r ? 'default' : 'outline'} onClick={() => setFilterRating(r)} className="flex gap-1 items-center px-3">
              {r} <Star className="w-3 h-3 fill-current" />
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredReviews.map(review => (
          <Card key={review.id} className={review.rating <= 2 ? 'border-destructive' : ''}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-5 h-5 ${s <= review.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} />
                      ))}
                    </div>
                    {review.status === 'new' && <Badge variant="destructive">NEW</Badge>}
                    <span className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleString()}</span>
                  </div>
                  
                  {review.comment && <p className="text-foreground text-lg">{review.comment}</p>}
                  
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-muted text-muted-foreground">{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Branch: {review.branch}</span>
                    <span>Source: <strong className="uppercase">{review.source}</strong></span>
                    {review.orderId && <span>Order: {review.orderId}</span>}
                    {review.table && <span>Table: {review.table}</span>}
                  </div>
                </div>

                <div className="md:w-72 space-y-4">
                  {(review.name || review.phone) && (
                    <div className="bg-muted/50 p-3 rounded-lg border">
                      <p className="font-bold text-sm">{review.name || 'Anonymous'}</p>
                      {review.phone && (
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground">{review.phone}</p>
                          <Button size="sm" variant="outline" className="h-7 text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800" onClick={() => window.open(`https://wa.me/${review.phone?.replace(/[^0-9]/g, '')}`)}>
                            <Phone className="w-3 h-3 mr-1" /> WhatsApp
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {review.status === 'replied' ? (
                    <div className="bg-accent/20 p-3 rounded-lg border border-primary/20">
                      <div className="flex items-center gap-1 text-primary text-xs font-bold mb-1">
                        <CheckCircle className="w-3 h-3" /> Replied
                      </div>
                      <p className="text-sm italic text-muted-foreground">&quot;{review.reply}&quot;</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Input 
                        placeholder="Write a reply..." 
                        value={replyText[review.id] || ''} 
                        onChange={(e) => setReplyText({ ...replyText, [review.id]: e.target.value })}
                        className="text-sm"
                      />
                      <Button size="sm" className="w-full" onClick={() => handleReply(review.id)}>
                        <MessageCircle className="w-4 h-4 mr-2" /> Reply
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredReviews.length === 0 && (
          <div className="text-center p-12 text-muted-foreground">No reviews found.</div>
        )}
      </div>
    </div>
  );
}
