import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="font-bold text-xl">Admissions GPS</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">
              Log in
            </Link>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          🚀 Navigate your college journey with confidence
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6">
          Your AI-Powered<br />
          <span className="text-blue-600">College Admissions Tracker</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          From freshman year to decision day — track activities, manage deadlines, 
          build your school list, and stay on course for your dream schools.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/signup">Start Free Trial</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">See Features</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to stay on track
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            emoji="📅"
            title="Journey Roadmap"
            description="Grade-by-grade milestones with smart reminders. Never miss a deadline or opportunity."
          />
          <FeatureCard
            emoji="🎨"
            title="Activity Tracker"
            description="Log extracurriculars, jobs, and volunteer work. AI helps identify narrative themes."
          />
          <FeatureCard
            emoji="🏫"
            title="School Research"
            description="Build your balanced list with reach, match, and safety schools. Compare requirements at a glance."
          />
          <FeatureCard
            emoji="📝"
            title="Essay Workspace"
            description="Track all prompts across schools. Brainstorm with AI assistance (not AI writing)."
          />
          <FeatureCard
            emoji="📊"
            title="Progress Dashboard"
            description="Visual progress across all applications. Parent and counselor views available."
          />
          <FeatureCard
            emoji="🔔"
            title="Smart Reminders"
            description="Personalized notifications based on your target schools and timeline."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to navigate your admissions journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of students using Admissions GPS to stay organized 
            and confident throughout the college application process.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Get Started — It&apos;s Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          © 2026 Admissions GPS. Built with ❤️ for stressed-out families.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="text-4xl mb-2">{emoji}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
