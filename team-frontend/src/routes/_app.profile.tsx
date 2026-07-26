import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/common/TagInput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProfileAPI, type Profile } from "@/lib/api";
import { Loader2, Save, UserCircle } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "Profile — SmartTeam.AI" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (!user?.userId) return;
    ProfileAPI.get(user.userId)
      .then((p) => {
        setProfile(p);
        setSkills(p.skills || []);
        setDomains(p.domains || []);
      })
      .catch(() => setProfile({ id: user.userId, fullName: user.fullName, email: user.email }))
      .finally(() => setLoading(false));
  }, [user]);

  const update = (k: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfile((p) => (p ? { ...p, [k]: e.target.value } : p));

  const onSave = async () => {
    if (!profile || !user?.userId) return;
    setSaving(true); setMsg(null);
    try {
      const updated = await ProfileAPI.update(user.userId, { ...profile, skills, domains });
      setProfile(updated);
      setMsg({ type: "ok", text: "Profile updated successfully." });
    } catch (e: any) {
      setMsg({ type: "err", text: e?.response?.data?.message || e?.message || "Update failed" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="glass rounded-2xl p-10 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Your <span className="text-gradient">profile</span></h1>
        <p className="text-muted-foreground mt-2">Keep your skills sharp — better profiles get better recommendations.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-hero-gradient glow-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
            {(profile?.fullName || "U").split(" ").map((p) => p[0]).slice(0, 2).join("")}
          </div>
          <div>
            <div className="font-semibold">{profile?.fullName}</div>
            <div className="text-xs text-muted-foreground">{profile?.email}</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input value={profile?.fullName || ""} onChange={update("fullName")} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile?.email || ""} onChange={update("email")} />
          </div>
          <div className="space-y-2">
            <Label>College</Label>
            <Input value={profile?.college || ""} onChange={update("college")} />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input value={profile?.city || ""} onChange={update("city")} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Experience level</Label>
            <Select value={profile?.experienceLevel || "Intermediate"} onValueChange={(v) => setProfile((p) => p ? { ...p, experienceLevel: v } : p)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <Label>Skills</Label>
          <TagInput value={skills} onChange={setSkills} placeholder="Add a skill" />
        </div>
        <div className="mt-5 space-y-2">
          <Label>Domains</Label>
          <TagInput value={domains} onChange={setDomains} placeholder="Add a domain" />
        </div>

        {msg && (
          <div className={`mt-4 text-sm ${msg.type === "ok" ? "text-primary" : "text-destructive"}`}>{msg.text}</div>
        )}

        <div className="mt-6">
          <Button onClick={onSave} disabled={saving} className="bg-hero-gradient text-primary-foreground glow-primary hover:opacity-90">
            {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving…</> : <><Save className="h-4 w-4 mr-2" /> Save changes</>}
          </Button>
        </div>
      </motion.div>

      <div className="glass rounded-xl p-5 text-sm text-muted-foreground flex items-start gap-3">
        <UserCircle className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <div className="text-foreground font-medium">Profile API</div>
          Changes are sent via <code>PUT /api/profile/update/{"{id}"}</code>. Profile loaded via <code>GET /api/profile/{"{id}"}</code>.
        </div>
      </div>
    </div>
  );
}
