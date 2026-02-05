'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Loader2,
  ArrowRight,
  Building2,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Kontakt Page
 * Design: Dark Linear/Vercel style with violet/fuchsia accents
 */

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  type: string;
  message: string;
}

export default function KontaktPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    type: 'demo',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Simulate form submission (replace with actual API call)
    try {
      // In production, send to your API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, open mailto with form data
      const subject = encodeURIComponent(`[${formData.type === 'demo' ? 'Demo-Anfrage' : formData.type === 'support' ? 'Support' : 'Allgemeine Anfrage'}] von ${formData.company || formData.name}`);
      const body = encodeURIComponent(`
Name: ${formData.name}
E-Mail: ${formData.email}
Unternehmen: ${formData.company || '-'}
Telefon: ${formData.phone || '-'}
Art der Anfrage: ${formData.type === 'demo' ? 'Demo-Termin' : formData.type === 'support' ? 'Support' : 'Allgemeine Anfrage'}

Nachricht:
${formData.message}
      `.trim());
      
      window.location.href = `mailto:kontakt@pflegeai.de?subject=${subject}&body=${body}`;
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-[#0a0a0b] min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] animate-drift-1" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[100px] animate-drift-2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <MessageSquare className="h-4 w-4 text-violet-400" />
              <span className="text-sm text-zinc-300">Wir freuen uns auf Sie</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              <span className="text-white">Sprechen wir über</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                Ihre Einrichtung
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-zinc-400 leading-relaxed">
              Ob Demo, Beratung oder technische Fragen – wir sind für Sie da.
              Antwort innerhalb von 24 Stunden.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Direct Contact */}
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8">
                <h2 className="text-xl font-bold text-white mb-6">Direkter Kontakt</h2>
                
                <div className="space-y-6">
                  <ContactItem 
                    icon={<Mail className="h-5 w-5" />}
                    label="E-Mail"
                    value="kontakt@pflegeai.de"
                    href="mailto:kontakt@pflegeai.de"
                  />
                  <ContactItem 
                    icon={<Phone className="h-5 w-5" />}
                    label="Telefon"
                    value="+49 30 123 456 78"
                    href="tel:+493012345678"
                  />
                  <ContactItem 
                    icon={<MapPin className="h-5 w-5" />}
                    label="Adresse"
                    value="Berlin, Deutschland"
                  />
                  <ContactItem 
                    icon={<Clock className="h-5 w-5" />}
                    label="Erreichbarkeit"
                    value="Mo–Fr, 9:00–18:00 Uhr"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 backdrop-blur-sm rounded-3xl border border-violet-500/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Schnellzugriff</h3>
                </div>
                
                <div className="space-y-3">
                  <Link 
                    href="/resident"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 transition-all group"
                  >
                    <span className="text-zinc-300 group-hover:text-white transition-colors">Live-Demo ausprobieren</span>
                    <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link 
                    href="/preise"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 transition-all group"
                  >
                    <span className="text-zinc-300 group-hover:text-white transition-colors">Preise ansehen</span>
                    <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link 
                    href="/sicherheit"
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 transition-all group"
                  >
                    <span className="text-zinc-300 group-hover:text-white transition-colors">Sicherheit & DSGVO</span>
                    <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3">
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-white/10 p-8 lg:p-10">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 mb-6">
                      <CheckCircle className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Vielen Dank!
                    </h3>
                    <p className="text-zinc-400 mb-8">
                      Ihre Nachricht wurde vorbereitet. Bitte senden Sie die E-Mail, 
                      die sich gerade geöffnet hat.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="text-white border-white/20 hover:bg-white/10"
                    >
                      Weitere Nachricht senden
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Kontaktformular
                      </h2>
                      <p className="text-zinc-500">
                        Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Email Row */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ihr Name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                            E-Mail *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ihre@email.de"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Company & Phone Row */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-2">
                            Einrichtung
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Name der Einrichtung"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
                            Telefon
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+49 123 456 789"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
                          />
                        </div>
                      </div>

                      {/* Inquiry Type */}
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-zinc-300 mb-2">
                          Art der Anfrage
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                        >
                          <option value="demo">Demo-Termin vereinbaren</option>
                          <option value="beratung">Beratungsgespräch</option>
                          <option value="support">Technischer Support</option>
                          <option value="partner">Partnerschaftsanfrage</option>
                          <option value="sonstiges">Sonstiges</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                          Ihre Nachricht *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Wie können wir Ihnen helfen? Erzählen Sie uns von Ihrer Einrichtung..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all resize-none"
                        />
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                          {error}
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full bg-white text-black hover:bg-zinc-200 rounded-xl py-6 font-semibold transition-all hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Wird gesendet...
                          </>
                        ) : (
                          <>
                            Nachricht senden
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-zinc-600 text-center">
                        Mit dem Absenden stimmen Sie unserer{' '}
                        <Link href="/datenschutz" className="text-violet-400 hover:text-violet-300">
                          Datenschutzerklärung
                        </Link>{' '}
                        zu.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map/Location Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 mb-6">
              <Building2 className="h-7 w-7 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              PflegeAI GmbH
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto">
              Mit Sitz in Berlin entwickeln wir KI-Lösungen für die Pflege der Zukunft.
              Besuchen Sie uns gerne nach Terminvereinbarung.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm">
              <MapPin className="h-4 w-4 text-violet-400" />
              Berlin, Deutschland
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function ContactItem({ 
  icon, 
  label, 
  value, 
  href 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-zinc-500 mb-1">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className="block hover:translate-x-1 transition-transform"
      >
        {content}
      </a>
    );
  }

  return content;
}
