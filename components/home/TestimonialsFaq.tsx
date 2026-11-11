'use client';

import React, { useState } from 'react';
import { Star, ChevronDown, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Dr. Michael Antwi',
    role: 'Homeowner, Airport Residential',
    quote:
      'Gabriel built a 6-foot curved front aquarium for our living room. The glass clarity is stunning, and his team handled the delivery, plumbing, and fish acclimatization flawlessly.',
  },
  {
    name: 'Sarah Koomson',
    role: 'General Manager, The Vista Lounge (Osu)',
    quote:
      'We contracted Gabriel’s Aquarium for our commercial marine reef tank. Their monthly maintenance plan has kept our tank spotless and thriving with zero effort from our staff.',
  },
  {
    name: 'Kojo Bempong',
    role: 'Aquarist & Hobbyist, East Legon',
    quote:
      'The healthiest discus and African cichlids I have found in Ghana. Gabriel knows his water chemistry and always provides honest advice.',
  },
];

const FAQS = [
  {
    q: 'How do I place an order for fish, food, or ready-made tanks?',
    a: 'Add your selected items to your cart, fill in your delivery or pickup preference, and tap "Send Order on WhatsApp". Our team immediately reviews the order with you in the chat, confirms stock and delivery logistics, and provides payment options (MoMo, Bank Transfer, or Cash on delivery/pickup).',
  },
  {
    q: 'How are live fish safely transported within Ghana?',
    a: 'Live fish are packed in specialized heavy-duty aquatic bags filled with pure oxygen and temperature-insulating containers. We deliver directly to your doorstep in Greater Accra with a live-arrival health guarantee.',
  },
  {
    q: 'Can you build a custom aquarium to match my specific interior?',
    a: 'Yes. We specialize in custom architectural tanks, room dividers, in-wall setups, and bespoke cabinetry. Simply share your measurements and space photos with us on WhatsApp or through our quote form.',
  },
  {
    q: 'What is included in an aquarium maintenance visit?',
    a: 'A standard visit includes thorough interior/exterior glass scrubbing, 25-30% RO water change, gravel vacuuming, filter media rinse/replacement, chemical parameter testing (pH, Ammonia, Nitrite, Nitrate), and a health check for all fish.',
  },
  {
    q: 'Where is Gabriel’s Aquarium located?',
    a: 'Our central showroom and glass workshop are located at American House, East Legon, Accra, with daily delivery and installation teams operating across Greater Accra and nationwide.',
  },
];

interface TestimonialsFaqProps {
  sanityTestimonials?: any[];
  sanityFaqs?: any[];
}

export function TestimonialsFaq({
  sanityTestimonials,
  sanityFaqs,
}: TestimonialsFaqProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayTestimonials =
    sanityTestimonials && sanityTestimonials.length > 0
      ? sanityTestimonials.map((t) => ({
          name: t.name,
          role: t.role || 'Aquarium Client',
          quote: t.quote,
        }))
      : TESTIMONIALS;

  const displayFaqs =
    sanityFaqs && sanityFaqs.length > 0
      ? sanityFaqs.map((f) => ({
          q: f.question,
          a: f.answer,
        }))
      : FAQS;

  return (
    <section className="py-24 px-6 sm:px-10 lg:px-16 bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Client Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-1 font-heading">
              Trusted by Homes &amp; Businesses in Ghana
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((t) => (
              <div
                key={t.name}
                className="p-7 rounded-3xl bg-card border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F8B828] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/30 mb-2" />
                  <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/50">
                  <h4 className="text-sm font-bold text-foreground font-heading">
                    {t.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div id="faq" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-primary">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1 font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {displayFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-foreground"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/30">
                      <p className="mt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
