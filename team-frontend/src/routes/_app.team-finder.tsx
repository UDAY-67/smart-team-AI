import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/common/TagInput";
import { TeamAPI } from "@/lib/api";

export const Route = createFileRoute("/_app/team-finder")({
  head: () => ({ meta: [{ title: "Team Finder — SmartTeam.AI" }] }),
  component: TeamFinder,
});

const PRESETS = ["Frontend", "Backend", "AI", "ML", "DevOps", "Mobile", "Data Science", "UI/UX"];

function TeamFinder() {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onGenerate = async () => {
    if (!skills.length) return;
    setLoading(true);
    setError(null);
    try {
      const res = await TeamAPI.recommend(skills);
      sessionStorage.setItem("stfs_last_recommendation", JSON.stringify({ result: res, requiredSkills: skills }));
      navigate({ to: "/recommendation" });
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to generate team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-3">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> DAA recommendation engine
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">Find your <span className="text-gradient">perfect team</span></h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Choose the skills your project needs. We'll search the developer graph, sort by skill score,
          and greedily assemble the most compatible team for you.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 md:p-8">
        <label className="text-sm font-medium">Required skills</label>
        <p className="text-xs text-muted-foreground mb-3">Press Enter or click a suggestion to add.</p>
        <TagInput value={skills} onChange={setSkills} placeholder="e.g. Frontend, Backend, AI" suggestions={PRESETS} />

        {error && <div className="mt-4 text-sm text-destructive">{error}</div>}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button onClick={onGenerate} disabled={loading || !skills.length}
            size="lg" className="bg-hero-gradient text-primary-foreground glow-primary hover:opacity-90">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Running recommendation…</>
              : <><Wand2 className="h-4 w-4 mr-2" /> Generate team</>}
          </Button>
          <div className="text-xs text-muted-foreground">
            POST <code>/api/team/recommend</code>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { t: "1. Search", d: "Indexed lookup of developers matching each requested skill." },
          { t: "2. Sort", d: "Candidates ranked by skill score and role fit." },
          { t: "3. Greedy pick", d: "Optimal teammate selected for each role, compatibility computed." },
        ].map((s, i) => (
          <motion.div key={s.t} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
            className="glass rounded-xl p-5">
            <div className="text-sm font-semibold text-gradient">{s.t}</div>
            <div className="text-sm text-muted-foreground mt-2">{s.d}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
