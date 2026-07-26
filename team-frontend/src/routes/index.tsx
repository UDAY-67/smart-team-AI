import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Brain, Users, Gauge, ArrowRight, Zap, Search, ListOrdered, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartTeam.AI — AI-Powered Smart Team Formation" },
      { name: "description", content: "Form optimal technical teams using DAA-powered recommendation algorithms. Search developers, score compatibility, and build winning hackathon teams." },
      { property: "og:title", content: "SmartTeam.AI — AI-Powered Smart Team Formation" },
      { property: "og:description", content: "Form optimal technical teams using DAA-powered recommendation algorithms." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-hero-gradient glow-primary flex items-center justify-center">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">SmartTeam<span className="text-gradient">.AI</span></span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/register"><Button size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90">Get Started</Button></Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden grid-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-24 md:py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            DAA-powered recommendation engine
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            AI-powered <span className="text-gradient">smart team formation</span><br />for developers & students
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Build winning hackathon teams in seconds. Our greedy optimization and compatibility scoring
            algorithms match the right developers to the right roles — automatically.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register"><Button size="lg" className="bg-hero-gradient text-primary-foreground hover:opacity-90 glow-primary">
              Start building teams <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link>
            <Link to="/login"><Button size="lg" variant="outline">I already have an account</Button></Link>
          </motion.div>

          {/* Preview card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 mx-auto max-w-3xl glass rounded-2xl p-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">Recommended team</div>
              <div className="text-xs px-2 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">Compatibility 92%</div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { name: "Rahul Sharma", role: "Frontend", score: 92 },
                { name: "Priya Verma", role: "Backend", score: 88 },
                { name: "Aisha Khan", role: "AI / ML", score: 95 },
              ].map((m) => (
                <div key={m.name} className="rounded-xl border border-border bg-card/60 p-4">
                  <div className="text-xs text-muted-foreground">{m.role}</div>
                  <div className="font-medium mt-1">{m.name}</div>
                  <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-hero-gradient" style={{ width: `${m.score}%` }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Skill score {m.score}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Built on real algorithms</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Every recommendation is powered by classic Design & Analysis of Algorithms — not vibes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Search, title: "Searching", desc: "Skill-indexed search across the developer graph." },
            { icon: ListOrdered, title: "Sorting", desc: "Rank candidates by skill score and role fit." },
            { icon: Zap, title: "Greedy Optimization", desc: "Pick optimal teammates one role at a time." },
            { icon: Gauge, title: "Compatibility", desc: "Score how well the chosen team will collaborate." },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-xl p-5 hover:border-primary/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center mb-3">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-semibold">{f.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">From skills to a perfect team — in 3 steps</h2>
            <p className="mt-3 text-muted-foreground">
              Tell us what roles your project needs. Our engine searches profiles, sorts by fit,
              and greedily assembles the most compatible team.
            </p>
            <ol className="mt-6 space-y-4">
              {[
                { icon: Brain, t: "Define required skills", d: "Frontend, Backend, AI, DevOps — anything." },
                { icon: Layers, t: "We run the recommendation", d: "Search → Sort → Greedy pick → Score." },
                { icon: Users, t: "Get your team", d: "Ranked teammates and a compatibility meter." },
              ].map((s) => (
                <li key={s.t} className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center border border-border">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{s.t}</div>
                    <div className="text-sm text-muted-foreground">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Link to="/register"><Button size="lg" className="bg-hero-gradient text-primary-foreground glow-primary">
                Try it free <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-6">
            <div className="text-xs text-muted-foreground mb-4">Recommendation flow</div>
            <pre className="text-xs leading-relaxed text-muted-foreground overflow-x-auto">
{`POST /api/team/recommend
{
  "requiredSkills": ["Frontend","Backend","AI"]
}

→ recommendedTeam: [...]
→ compatibilityScore: 92.0`}
            </pre>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {["Search", "Sort", "Greedy"].map((s) => (
                <div key={s} className="rounded-lg border border-border p-3 bg-card/50">
                  <div className="text-xs text-muted-foreground">{s}</div>
                  <div className="font-semibold text-gradient">O(n log n)</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SmartTeam.AI — Built with DAA algorithms.
      </footer>
    </div>
  );
}
