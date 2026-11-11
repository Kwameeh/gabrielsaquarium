'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';

export default function ContactPage() {
  const whatsappNumber = '233241234567';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    const text = [
      "*Website Contact Inquiry*",
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Message:* ${message}`,
    ].join('\n');
    window.open(waLink(whatsappNumber, text), '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-16 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-primary">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-2 font-heading">
            We&apos;re Here to Help
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            Have a question about a tank, custom build, live fish availability, or maintenance service? Connect with Gabriel directly via WhatsApp or phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Showroom &amp; Workshop</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">American House, East Legon, Accra, Ghana</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Phone &amp; WhatsApp</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">+233 24 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Email</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">gabrielsaquarium@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Working Hours</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Monday – Saturday: 8:00 AM – 6:00 PM</p>
                  <p className="text-xs text-muted-foreground">Sunday: By Appointment</p>
                </div>
              </div>
            </div>

            <a
              href={waLink(whatsappNumber, "Hello Gabriel's Aquarium, I'd like to chat.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Chat with Gabriel on WhatsApp</span>
            </a>
          </div>

          {/* Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-3xl border border-border p-8 shadow-xs">
              <h2 className="text-xl font-bold text-foreground font-heading mb-1">
                Send a Direct Message
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Fill out the quick form below and it will instantly open a pre-filled WhatsApp chat with our team.
              </p>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Your Message / Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about tank dimensions, fish stock, delivery to your area..."
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl font-semibold text-xs text-white bg-primary hover:bg-primary/90 shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
