import React from 'react';
import { SiteHeader } from '@/components/header/SiteHeader';
import { Footer } from '@/components/home/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { FloatingWhatsApp } from '@/components/whatsapp/FloatingWhatsApp';

export default function DeliveryPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <main className="flex-1 py-16 px-6 sm:px-10 lg:px-16 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-heading mb-6">
          Delivery &amp; Live Arrival Policy
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Glass Tank Delivery &amp; Handling</h2>
            <p>
              Due to the delicate nature and weight of glass aquariums, all tanks are transported using dedicated vehicles with protective shock-absorption blankets. Delivery fees in Greater Accra and Kasoa are calculated based on distance and whether staircase carrying or crane placement is required.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Live Fish Health &amp; Transit Guarantee</h2>
            <p>
              We pride ourselves on the health of our livestock. All live fish are packaged in heavy-duty poly-bags filled with pure medical-grade oxygen and insulated containers. We guarantee live arrival on all deliveries arranged directly through our logistics team.
            </p>
            <p>
              In the unlikely event of transit loss, please send an unedited photo or video of the unopened bag within 2 hours of receipt to our WhatsApp support line for an immediate credit or replacement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. Shop Pickup in Kasoa</h2>
            <p>
              Customers choosing &ldquo;Pickup&rdquo; can collect their items from our Kasoa workshop. Our staff will assist with careful packaging and vehicle loading.
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <CartDrawer />
      <FloatingWhatsApp />
    </div>
  );
}
