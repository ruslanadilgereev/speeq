import { Metadata } from 'next';
import { 
  Heart, 
  Target, 
  Users, 
  Lightbulb, 
  Award,
  ArrowRight,
  Quote,
  Building2,
  GraduationCap,
  Stethoscope,
  Code2,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Über uns - PflegeAI',
  description: 'Lernen Sie das Team hinter PflegeAI kennen. Unsere Mission: Pflege menschlicher gestalten durch intelligente Technologie.',
};

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/50 mb-8">
                <Heart className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-700">Über PflegeAI</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                Pflege verdient{' '}
                <span className="relative">
                  <span className="relative z-10 text-teal-600">bessere</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-teal-200" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0 8 Q25 0 50 8 T100 8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>{' '}
                Werkzeuge.
              </h1>
              
              <p className="mt-8 text-xl text-slate-600 leading-relaxed">
                Wir sind ein Team aus Pflegefachkräften, Technologen und Designern, 
                vereint durch eine gemeinsame Überzeugung: Technologie sollte 
                Pflegekräfte unterstützen, nicht ersetzen.
              </p>

              <div className="mt-10 flex flex-wrap gap-8">
                <MiniStat value="2024" label="Gegründet" />
                <MiniStat value="München" label="Hauptsitz" />
                <MiniStat value="12" label="Teammitglieder" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-200/30 via-emerald-200/20 to-cyan-200/30 rounded-3xl blur-3xl" />
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-slate-900/10 border border-slate-100">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  {/* Team illustration placeholder */}
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center gap-4 flex-wrap p-8">
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center shadow-sm"
                          style={{
                            transform: `rotate(${(i - 2.5) * 5}deg)`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        >
                          <Users className="h-7 w-7 text-teal-600" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-teal-500/30">
                        <Heart className="h-14 w-14 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <Quote className="h-12 w-12 text-teal-400 mx-auto mb-8 opacity-50" />
          <blockquote className="text-3xl lg:text-4xl font-medium text-white leading-relaxed">
            „Unsere Mission ist es, Pflegekräften die Zeit zurückzugeben, 
            die sie für das Wichtigste brauchen: 
            <span className="text-teal-400"> menschliche Zuwendung.</span>"
          </blockquote>
          <div className="mt-10">
            <div className="inline-flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                <span className="text-lg font-bold text-teal-400">LS</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Laura Schmidt</div>
                <div className="text-sm text-slate-400">Gründerin & CEO</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Unsere Geschichte</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
                Aus der Praxis geboren
              </h2>
              <div className="mt-8 space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Die Idee für PflegeAI entstand 2023, als unsere Mitgründerin Laura — 
                  selbst examinierte Pflegefachkraft — den Alltag in einem Münchner 
                  Pflegeheim miterlebte.
                </p>
                <p>
                  Das ständige Klingeln, die unklaren Prioritäten, das endlose Laufen. 
                  Sie sah, wie erfahrene Kolleginnen aufgaben — nicht weil die Arbeit 
                  zu schwer war, sondern weil die Organisation es unmöglich machte, 
                  gute Pflege zu leisten.
                </p>
                <p>
                  Gemeinsam mit Experten für KI und Produktdesign entwickelte sie 
                  einen Prototypen. Das Ergebnis: Ein System, das Bewohneranfragen 
                  versteht, priorisiert und intelligent zuweist.
                </p>
                <p className="font-medium text-slate-900">
                  Heute helfen wir Pflegeeinrichtungen in ganz Deutschland, 
                  ihre Abläufe zu optimieren — ohne die Menschlichkeit zu verlieren.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200" />
              <div className="space-y-12">
                <TimelineItem 
                  year="2023"
                  title="Die Idee"
                  description="Erste Gespräche mit Pflegeeinrichtungen bestätigen den Bedarf"
                  icon={<Lightbulb className="h-5 w-5" />}
                />
                <TimelineItem 
                  year="Q1 2024"
                  title="Gründung"
                  description="PflegeAI GmbH wird in München gegründet. Erste Förderung gesichert."
                  icon={<Building2 className="h-5 w-5" />}
                />
                <TimelineItem 
                  year="Q2 2024"
                  title="Pilotprojekte"
                  description="Zusammenarbeit mit 3 Pflegeheimen in Bayern. Feedback-getriebene Entwicklung."
                  icon={<Stethoscope className="h-5 w-5" />}
                />
                <TimelineItem 
                  year="Q4 2024"
                  title="Marktstart"
                  description="Offizieller Launch. Erste zahlende Kunden."
                  icon={<Sparkles className="h-5 w-5" />}
                />
                <TimelineItem 
                  year="2025"
                  title="Skalierung"
                  description="Expansion in weitere Bundesländer. Neue Funktionen basierend auf Nutzer-Feedback."
                  icon={<Target className="h-5 w-5" />}
                  current
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-[#fafbfc]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Werte</span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
              Woran wir glauben
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Heart className="h-7 w-7" />}
              title="Mensch zuerst"
              description="Technologie unterstützt Menschen, ersetzt sie aber niemals. Jede Funktion wird daran gemessen."
            />
            <ValueCard
              icon={<Target className="h-7 w-7" />}
              title="Praxis-getrieben"
              description="Wir entwickeln nicht im Elfenbeinturm. Jede Entscheidung basiert auf echtem Feedback aus der Pflege."
            />
            <ValueCard
              icon={<Users className="h-7 w-7" />}
              title="Partnerschaftlich"
              description="Wir sehen unsere Kunden als Partner. Ihr Erfolg ist unser Erfolg."
            />
            <ValueCard
              icon={<Award className="h-7 w-7" />}
              title="Kompromisslose Qualität"
              description="Gesundheitsdaten verdienen den höchsten Standard. Sicherheit ist nicht verhandelbar."
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Team</span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
              Die Menschen hinter PflegeAI
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Pflege-Erfahrung trifft Technologie-Expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              initials="LS"
              name="Laura Schmidt"
              role="Gründerin & CEO"
              background="Examinierte Pflegefachkraft, 8 Jahre Erfahrung in der Altenpflege"
              icon={<Stethoscope className="h-4 w-4" />}
            />
            <TeamMember
              initials="MK"
              name="Maximilian Koch"
              role="CTO"
              background="Ex-Google, TU München, 12 Jahre AI/ML"
              icon={<Code2 className="h-4 w-4" />}
            />
            <TeamMember
              initials="SB"
              name="Sophie Brenner"
              role="Head of Product"
              background="UX Lead bei SAP Healthcare, Stanford d.school"
              icon={<Lightbulb className="h-4 w-4" />}
            />
            <TeamMember
              initials="TM"
              name="Thomas Müller"
              role="Head of Engineering"
              background="Senior Architect bei Siemens Healthineers"
              icon={<Code2 className="h-4 w-4" />}
            />
            <TeamMember
              initials="AN"
              name="Anna Neumann"
              role="Customer Success"
              background="10 Jahre Pflegedienstleitung, PDL-Qualifikation"
              icon={<Heart className="h-4 w-4" />}
            />
            <TeamMember
              initials="JW"
              name="Jonas Weber"
              role="Datenschutzbeauftragter"
              background="Rechtsanwalt, spezialisiert auf Gesundheitsdatenschutz"
              icon={<GraduationCap className="h-4 w-4" />}
            />
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-slate-600 mb-6">
              Wir wachsen! Interessiert, Teil der Mission zu werden?
            </p>
            <Link href="mailto:jobs@pflegeai.de">
              <Button variant="outline" className="rounded-full px-8">
                Offene Stellen ansehen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advisors / Partners */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-teal-400 tracking-wider uppercase">Netzwerk</span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white">
              Unterstützt von
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <PartnerCard
              name="TUM Venture Labs"
              description="Inkubator der TU München für Healthcare Startups"
            />
            <PartnerCard
              name="Bayern Kapital"
              description="Pre-Seed Förderung durch den Freistaat Bayern"
            />
            <PartnerCard
              name="Caritas Deutschland"
              description="Strategische Partnerschaft für Pilotprojekte"
            />
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Standort</span>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-slate-900">
                Besuchen Sie uns
              </h2>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Hauptsitz München</h3>
                    <p className="mt-1 text-slate-600">
                      Luisenstraße 41<br />
                      80333 München<br />
                      Deutschland
                    </p>
                  </div>
                </div>
                <p className="text-slate-600">
                  Unser Büro befindet sich im Herzen von München, in direkter Nähe 
                  zum Hauptbahnhof. Besucher sind jederzeit willkommen — 
                  vereinbaren Sie einen Termin!
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-50 rounded-3xl overflow-hidden border border-slate-200">
                {/* Map placeholder */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="h-8 w-8" />
                    </div>
                    <p className="font-semibold text-slate-700">München, Deutschland</p>
                    <p className="text-sm text-slate-500 mt-1">Maxvorstadt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-teal-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Lernen Sie uns kennen
          </h2>
          <p className="mt-6 text-xl text-teal-100 max-w-2xl mx-auto">
            Interessiert, wie PflegeAI Ihre Einrichtung unterstützen kann? 
            Wir freuen uns auf ein Gespräch.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:kontakt@pflegeai.de?subject=Gesprächsanfrage">
              <Button size="lg" className="w-full sm:w-auto bg-white text-teal-700 hover:bg-teal-50 text-lg px-8 py-6 rounded-2xl shadow-xl">
                Kontakt aufnehmen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/resident">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 rounded-2xl border-white/30 text-white hover:bg-white/10">
                Demo ansehen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

function TimelineItem({ 
  year, 
  title, 
  description, 
  icon,
  current 
}: { 
  year: string; 
  title: string; 
  description: string;
  icon: React.ReactNode;
  current?: boolean;
}) {
  return (
    <div className="relative pl-20">
      <div className={`
        absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center
        ${current 
          ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/30' 
          : 'bg-white border border-slate-200 text-teal-600'
        }
      `}>
        {icon}
      </div>
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm ml-4">
        <div className="text-sm font-semibold text-teal-600 mb-1">{year}</div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
        {current && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            Aktuell
          </div>
        )}
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all h-full">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function TeamMember({
  initials,
  name,
  role,
  background,
  icon,
}: {
  initials: string;
  name: string;
  role: string;
  background: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all">
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-teal-600 shadow-sm">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
        <p className="text-teal-600 font-medium mb-3">{role}</p>
        <p className="text-sm text-slate-500">{background}</p>
      </div>
    </div>
  );
}

function PartnerCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  );
}
