"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Star, ChevronDown, ChevronUp, PartyPopper } from 'lucide-react';
import { useReviewStore, ReviewSource } from '@/lib/reviewStore';
import { MOCK_BRANCHES } from '@/lib/mockData';
import { Logo } from '@/components/brand/Logo';
import { motion, AnimatePresence } from 'framer-motion';

const GOOD_TAGS = ['Tasty', 'Fast service', 'Clean', 'Value for money', 'Friendly staff'];
const BAD_TAGS = ['Slow', 'Cold food', 'Wrong order', 'Rude staff', 'Not clean'];

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Okay",
  3: "Good",
  4: "Great",
  5: "Loved it!"
};

function ReviewFormContent() {
  const searchParams = useSearchParams();
  const branchId = searchParams.get('branch') || '1';
  const table = searchParams.get('table') || '';
  const orderId = searchParams.get('order') || '';
  const src = (searchParams.get('src') || 'web') as ReviewSource;
  const isKiosk = searchParams.get('kiosk') === '1';

  const branchName = MOCK_BRANCHES.find(b => b.id === branchId)?.name || '';
  const addReview = useReviewStore((state) => state.addReview);

  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactExpanded, setContactExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (rating > 0 && rating <= 3 && !contactExpanded && !submitted) {
      setContactExpanded(true);
    }
  }, [rating, contactExpanded, submitted]);

  useEffect(() => {
    if (submitted && isKiosk) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setRating(0);
            setTags([]);
            setComment('');
            setName('');
            setPhone('');
            setContactExpanded(false);
            setSubmitted(false);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submitted, isKiosk]);

  if (!isMounted) {
    return null; // Render absolutely nothing on the server to prevent hydration mismatches
  }

  const toggleTag = (tag: string) => {
    setTags((prev) => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleKeyDown = (e: React.KeyboardEvent, starValue: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setRating(starValue);
      setTags([]);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (rating === 0) return;

    addReview({
      branch: branchId,
      table: table || undefined,
      orderId: orderId || undefined,
      source: src,
      rating,
      tags,
      comment,
      name,
      phone
    });
    setSubmitted(true);
  };

  const currentTags = rating >= 4 ? GOOD_TAGS : BAD_TAGS;

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto bg-secondary text-secondary-foreground md:shadow-brutal md:rounded-3xl min-h-screen md:min-h-[700px] flex flex-col relative md:my-8 border-border md:border-brutal">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-8 text-center flex-1"
        >
          <PartyPopper className="w-20 h-20 text-[#F5AC53] mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold mb-4 font-heading text-white">Thank You!</h1>
          <p className="text-white/80 mb-8 text-lg max-w-sm">Your feedback is incredibly valuable to us.</p>
          
          <div className="bg-white/5 border border-[#F5AC53]/30 rounded-xl p-6 mb-8 max-w-sm w-full shadow-lg shadow-black/20">
            <p className="font-bold text-[#F5AC53] mb-3">Here&apos;s 10% Off Your Next Order</p>
            <div className="bg-secondary-dark font-mono text-2xl font-bold py-3 px-6 rounded-lg border-2 border-dashed border-[#F5AC53] text-white inline-block tracking-wider">
              THANKYOU10
            </div>
          </div>
          
          {!isKiosk && (
            <Button className="w-full max-w-sm mb-4 h-14 text-md font-bold rounded-xl bg-[#F5AC53] text-[#151C1A] hover:bg-[#F5AC53]/90 shadow-md" onClick={() => window.open('https://share.google/UJSVMhdlc6XP7eOGr', '_blank')}>
              Share on Google
            </Button>
          )}
          {!isKiosk && (
            <Button className="w-full max-w-sm h-14 text-md font-bold rounded-xl bg-white/10 border-2 border-white/20 text-white hover:bg-white/20" onClick={() => window.location.href = '/'}>
              Back to Menu
            </Button>
          )}
          {isKiosk && (
            <p className="text-white/60 font-bold text-lg mt-4 animate-pulse">Resetting in {countdown}...</p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-secondary text-secondary-foreground md:shadow-brutal md:rounded-3xl min-h-screen md:min-h-[700px] flex flex-col relative md:my-8 border-border md:border-brutal">
      <div className="p-6 md:p-8 flex flex-col items-center flex-1 pb-24 md:pb-8">
        <Logo size={48} variant="full" className="mb-6 mt-4" theme="dark" />
        
        <h1 className="text-3xl font-bold font-heading text-center mb-1">How was your meal?</h1>
        <p className="text-white/80 text-center mb-4">Takes 10 seconds</p>
        
        {(branchName || table) && (
          <div className="bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white mb-8 border border-white/20">
            {branchName} {table ? `· Table ${table}` : ''}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div 
            className="flex justify-center gap-1 sm:gap-2 mb-2 w-full relative z-50" 
            role="radiogroup" 
            aria-label="Rating"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={rating === star}
                aria-label={`${star} star`}
                onClick={() => {
                  setRating(star);
                  setTags([]);
                }}
                onPointerDown={() => {
                  setRating(star);
                  setTags([]);
                }}
                onKeyDown={(e) => handleKeyDown(e, star)}
                className="p-1 sm:p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5AC53] rounded-full active:scale-90 transition-transform touch-manipulation cursor-pointer"
              >
                <Star 
                  className={`pointer-events-none w-12 h-12 transition-colors duration-300 ${rating >= star ? 'fill-[#F5AC53] text-[#F5AC53]' : 'text-white/30 stroke-1'}`} 
                />
              </button>
            ))}
          </div>
          
          <div className="h-6 mb-8 w-full flex justify-center">
            <AnimatePresence mode="wait">
              {rating > 0 && (
                <motion.p 
                  key={rating}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-primary-light font-bold text-lg text-center"
                >
                  {RATING_LABELS[rating]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {rating > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full overflow-hidden"
              >
                <div className="space-y-8">
                  
                  {/* Tags */}
                  <div>
                    <h2 className="text-center font-bold text-lg mb-4">
                      {rating >= 4 ? "What did you love?" : "What went wrong?"}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                      {currentTags.map(tag => {
                        const isSelected = tags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`min-h-[44px] px-5 py-2 rounded-full border-2 text-sm font-medium transition-all ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'bg-white/10 border-white/20 hover:border-white/50 text-white'}`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="w-full">
                    <textarea
                      className="w-full rounded-2xl border-2 border-white/20 bg-white/10 text-white px-4 py-4 text-base placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-primary/50 transition-colors min-h-[120px] resize-none"
                      placeholder="Tell us more (optional)"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  {/* Contact Toggle */}
                  <div className="w-full border-2 border-white/20 rounded-2xl overflow-hidden bg-secondary-dark">
                    <button 
                      type="button"
                      onClick={() => setContactExpanded(!contactExpanded)}
                      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors font-medium text-sm text-left focus-visible:outline-none focus-visible:bg-white/10"
                    >
                      <span className="text-white">
                        Want us to contact you? <span className="text-white/60 font-normal">(optional)</span>
                      </span>
                      {contactExpanded ? <ChevronUp className="w-5 h-5 text-white/60" /> : <ChevronDown className="w-5 h-5 text-white/60" />}
                    </button>
                    <AnimatePresence>
                      {contactExpanded && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 space-y-4 border-t-2 border-white/10 mt-2">
                            {rating <= 3 && (
                              <p className="text-xs text-primary-light font-bold mt-2">So we can make it right.</p>
                            )}
                            <div>
                              <Input className="h-12 border-2 border-white/20 bg-white/5 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:border-primary rounded-xl px-4" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                              <Input className="h-12 border-2 border-white/20 bg-white/5 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:border-primary rounded-xl px-4" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Sticky Bottom Submit */}
      <div className="fixed md:static bottom-0 left-0 right-0 p-4 bg-secondary border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] md:shadow-none md:border-t-0 md:bg-transparent md:pt-0 z-50 mt-auto w-full">
        <Button 
          onClick={() => handleSubmit()}
          disabled={rating === 0}
          size="lg" 
          className="w-full h-14 text-lg font-bold rounded-xl"
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <div className="min-h-screen flex items-start md:items-center justify-center">
      <Suspense fallback={null}>
        <ReviewFormContent />
      </Suspense>
    </div>
  );
}
