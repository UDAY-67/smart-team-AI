import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Gauge, Sparkles, Trophy, ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import type { RecommendationResponse } from "@/lib/api";

export const Route = createFileRoute("/_app/recommendation")({
  head: () => ({ meta: [{ title: "Recommendation — SmartTeam.AI" }] }),
  component: RecommendationPage,
});

function RecommendationPage() {
  const [data, setData] = useState<{ result: RecommendationResponse; requiredSkills: string[] } | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("stfs_last_recommendation");
    if (raw) setData(JSON.parse(raw));
  }, []);

  if (!data) {
    return (
      <div className="glass rounded-2xl p-10 text-center">
        <Sparkles className="h-8 w-8 mx-auto text-primary mb-3" />
        <h2 className="text-xl font-semibold">No recommendation yet</h2>
        <p className="text-muted-foreground mt-1">Head to the Team Finder to generate one.</p>
        <Link to="/team-finder"><Button className="mt-5 bg-hero-gradient text-primary-foreground glow-primary">Open Team Finder</Button></Link>
      </div>
    );
  }

  const { result, requiredSkills } = data;
  const score = Math.round(result.compatibilityScore);

  return (
    <div className="space-y-8">
      <Link to="/team-finder" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Team Finder
      </Link>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-2">
            <Trophy className="h-3.5 w-3.5 text-primary" /> Recommended team
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Your <span className="text-gradient">optimal team</span></h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {requiredSkills.map((s) => (
              <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-foreground border border-primary/30">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-6 relative">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Compatibility</div>
            <Gauge className="h-4 w-4 text-primary" />
          </div>
          <div className="h-56 relative">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: score, fill: "oklch(0.78 0.19 200)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "oklch(1 0 0 / 0.06)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-5xl font-bold text-gradient">{score}%</div>
              <div className="text-xs text-muted-foreground">team fitness</div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center mt-2">
            Based on greedy optimization across {result.recommendedTeam.length} role(s).
          </div>
        </motion.div>

        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {result.recommendedTeam.map((m, i) => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-5 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{m.role}</div>
                  <div className="font-semibold mt-1">{m.name}</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-hero-gradient glow-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Skill score</span>
                  <span className="font-medium">{m.skillScore}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, m.skillScore)}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }} className="h-full bg-hero-gradient" />
                </div>
              </div>
              <div className="mt-3 text-[10px] text-muted-foreground font-mono">ID: {m.id}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 font-semibold"><Users className="h-4 w-4 text-primary" /> Insights</div>
        <ul className="mt-3 text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
          <li>The recommendation engine considered {requiredSkills.length} required skill{requiredSkills.length === 1 ? "" : "s"}.</li>
          <li>{result.recommendedTeam.length} teammate{result.recommendedTeam.length === 1 ? "" : "s"} were selected greedily by skill score.</li>
          <li>Final compatibility score: <span className="text-foreground font-medium">{score}%</span>.</li>
        </ul>
      </div>
    </div>
  );
}
