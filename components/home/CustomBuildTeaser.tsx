'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { customTankMessage, waLink } from '@/lib/whatsapp';

export function CustomBuildTeaser({ whatsappNumber = '233241234567' }: { whatsappNumber?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [clientType, setClientType] = useState('Home');
  const [size, setSize] = useState('');
  const [idea, setIdea] = useState('');

  const steps = [
    { num: '01', title: 'Share Your Space', desc: 'Tell us where you want your aquarium and send photos of the room.' },
    { num: '02', title: 'Custom 3D CAD Design', desc: 'We tailor dimensions, filtration chambers, and cabinet finish.' },
    { num: '03', title: 'Master Glass Crafting', desc: 'Hand-assembled with ultra-clear glass, precision silicone & plumbing.' },
    { num: '04', title: 'White-Glove Installation', desc: 'Delivered, filled, aquascaped, and biologically established.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !idea) return;
    const text = customTankMessage({
      name,
      phone,
      location: location || 'Accra / Kasoa',
      clientType,
      size: size || undefined,
      idea,
    });
    window.open(waLink(whatsappNumber, text), '_blank');
  };

  return (
    <section id="custom" className="dark bg-background text-foreground py-24 px-6 sm:px-10 lg:px-16 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & 4 Steps */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-primary">
                Bespoke Architectural Systems
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-2 font-heading">
                Turn Any Wall into a Living Coral or Freshwater Oasis
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed max-w-xl">
                Whether you envision a sleek room-divider in an East Legon penthouse, a serene freshwater nature tank in your living room, or a statement marine aquarium in a restaurant lobby, our artisans build it to perfection.
              </p>
            </div>

            {/* 4 Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {steps.map((step) => (
                <div key={step.num} className="p-5 rounded-2xl bg-card border border-border/40">
                  <span className="text-sm font-mono font-bold text-primary">
                    {step.num}
                  </span>
                  <h3 className="text-base font-bold text-foreground mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Image Preview of Past Kasoa Build */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-border/40">
              <Image
                src="/images/project-08-marine-reef-at-home-main.jpg"
                alt="Custom In-Wall Aquarium Installation in Kasoa"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-foreground/90">
                <span className="font-semibold">Recent Custom Living Wall Build · Kasoa, Ghana</span>
                <span className="text-primary font-mono text-[11px]">480 Litres</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div className="lg:col-span-5">
            <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-2xl">
              <h3 className="text-xl font-bold tracking-tight text-foreground font-heading">
                Request a Custom Quote
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Tell us your concept. We will calculate specs and reply directly on WhatsApp with designs and pricing.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="024 XXX XXXX"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Location in Ghana
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Kasoa, Accra"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Space Type
                    </label>
                    <select
                      value={clientType}
                      onChange={(e) => setClientType(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    >
                      <option value="Home Residence">Home Residence</option>
                      <option value="Executive Office">Executive Office</option>
                      <option value="Restaurant / Lounge">Restaurant / Lounge</option>
                      <option value="Hotel Lobby">Hotel Lobby</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Approx. Size
                    </label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="e.g. 5ft / 150cm"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Your Concept / Vision *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="Describe what you want (marine reef, planted aquascape, in-wall divider...)"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs tracking-wide text-white bg-whatsapp hover:bg-whatsapp/90 shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Send Request on WhatsApp</span>
                </button>
                <p className="text-[10px] text-center text-muted-foreground">
                  You can immediately send room photos &amp; dimensions directly in the WhatsApp chat.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
