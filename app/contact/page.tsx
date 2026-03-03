'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';
import { IMG_MISC } from '@/lib/images';

const formFieldClass =
  'rounded-md border-neutral-300 focus-visible:ring-0 focus-visible:border-black focus-visible:ring-offset-0';

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Form submission can be wired to an API or action
  }

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      {/* Hero */}
      <section className="relative w-full aspect-[21/9]">
        <Image
          src={IMG_MISC.contactHero}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
          <h1 className="text-4xl font-light tracking-tight text-white md:text-5xl lg:text-6xl">
            Contact
          </h1>
          <p className="mt-2 text-sm font-normal tracking-wide text-white/90 md:text-base">
            Get in touch with our team
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: Contact information */}
          <AnimatedSection className="space-y-12">
            <div>
              <h2 className="sr-only">Contact information</h2>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Head Office
              </p>
              <address className="not-italic">
                <p className="text-base text-neutral-800">
                  Riverside
                  <br />
                  22 Hester Road
                  <br />
                  London, SW11 4AN
                  <br />
                  United Kingdom
                </p>
                <p className="mt-3 text-base text-neutral-800">
                  <a
                    href="tel:+442077387999"
                    className="border-b border-transparent transition-colors hover:border-neutral-800 hover:underline"
                  >
                    +44 20 7738 7999
                  </a>
                </p>
                <p className="mt-1 text-base text-neutral-800">
                  <a
                    href="mailto:info@fosterandpartners.com"
                    className="border-b border-transparent transition-colors hover:border-neutral-800 hover:underline"
                  >
                    info@fosterandpartners.com
                  </a>
                </p>
              </address>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Careers Enquiries
              </p>
              <p className="text-base text-neutral-800">
                <a
                  href="mailto:careers@fosterandpartners.com"
                  className="border-b border-transparent transition-colors hover:border-neutral-800 hover:underline"
                >
                  careers@fosterandpartners.com
                </a>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Press Enquiries
              </p>
              <p className="text-base text-neutral-800">
                <a
                  href="mailto:press@fosterandpartners.com"
                  className="border-b border-transparent transition-colors hover:border-neutral-800 hover:underline"
                >
                  press@fosterandpartners.com
                </a>
              </p>
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection>
            <h2 id="contact-form-heading" className="mb-8 text-xs uppercase tracking-[0.2em] text-neutral-400">
              Send a message
            </h2>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
              aria-labelledby="contact-form-heading"
              noValidate
            >
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Full Name
                </label>
                <Input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className={formFieldClass}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className={formFieldClass}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <Input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className={formFieldClass}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Message"
                  required
                  rows={5}
                  className={formFieldClass}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="rounded-md bg-black px-6 py-3 text-white hover:opacity-90 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  Send
                </Button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="mt-24 w-full" aria-label="Office location">
        <div className="relative aspect-[21/9] w-full bg-neutral-200">
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
            <p className="text-sm text-neutral-400">
              Map placeholder — embed or link to Google Maps here
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
