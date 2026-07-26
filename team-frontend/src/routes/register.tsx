import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Users } from "lucide-react";
import { TagInput } from "@/components/common/TagInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Sign up — SmartTeam.AI" }, { name: "description", content: "Create your SmartTeam.AI account." }] }),
  component: RegisterPage,
});

const SKILL_SUGGESTIONS = ["Java", "Spring Boot", "React", "Node.js", "Python", "AI", "ML", "TypeScript", "MongoDB", "DevOps", "AWS", "Docker"];
const DOMAIN_SUGGESTIONS = ["Frontend", "Backend", "Machine Learning", "Mobile", "DevOps", "Data Science", "Cybersecurity", "UI/UX"];

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", email: "", password: "", college: "", city: "", experienceLevel: "Intermediate",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register({ ...form, skills, domains });
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 grid-bg">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-2xl glass rounded-2xl p-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-hero-gradient glow-primary flex items-center justify-center">
            <Users className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">SmartTeam<span className="text-gradient">.AI</span></span>
        </Link>
        <h1 className="text-2xl font-bold">Create your developer profile</h1>
        <p className="text-sm text-muted-foreground mt-1">We'll use this to recommend the best teammates for you.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full name</Label>
              <Input required value={form.fullName} onChange={update("fullName")} placeholder="Uday Singh" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" required value={form.email} onChange={update("email")} placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" required value={form.password} onChange={update("password")} placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label>Experience level</Label>
              <Select value={form.experienceLevel} onValueChange={(v) => setForm((f) => ({ ...f, experienceLevel: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>College</Label>
              <Input required value={form.college} onChange={update("college")} placeholder="XYZ Engineering College" />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input required value={form.city} onChange={update("city")} placeholder="Bangalore" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <TagInput value={skills} onChange={setSkills} placeholder="Type a skill and press Enter" suggestions={SKILL_SUGGESTIONS} />
          </div>
          <div className="space-y-2">
            <Label>Domains</Label>
            <TagInput value={domains} onChange={setDomains} placeholder="Add domains you focus on" suggestions={DOMAIN_SUGGESTIONS} />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90 glow-primary">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Creating…</> : "Create account"}
          </Button>
        </form>

        <div className="mt-6 text-sm text-muted-foreground text-center">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}
