import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Users, Gauge, Brain, TrendingUp } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SmartTeam.AI" }] }),
  component: Dashboard,
});

const skillData = [
  { name: "Frontend", score: 82 },
  { name: "Backend", score: 76 },
  { name: "AI/ML", score: 68 },
  { name: "DevOps", score: 54 },
  { name: "Mobile", score: 48 },
];

function StatCard({ icon: Icon, label, value, hint }: any) {
  return (
    <motion.div whileHover={{ y: -2 }} className="glass rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
        <div className="h-8 w-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="mt-3 text-3xl font-bold text-gradient">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </motion.div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-sm text-muted-foreground">Welcome back</div>
        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          Hello, <span className="text-gradient">{user?.fullName || "Developer"}</span>
        </h1>
        <p className="text-muted-foreground mt-2">Here's a snapshot of your recommendation activity.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Sparkles} label="Recommendations" value="24" hint="+8 this week" />
        <StatCard icon=
{Users} label="Teams formed" value="6" hint="Last: 2 days ago" />
        <StatCard icon={Gauge} label="Avg compatibility" value="82%" hint="Across all teams" />
        <StatCard icon={Brain} label="Skills indexed" value="38" hint="In your profile" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold">Skill demand</div>
              <div className="text-xs text-muted-foreground">Most requested roles in recommendations</div>
            </div>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={skillData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="name" stroke="oklch(0.7 0.03 260)" fontSize={12} />
                <YAxis stroke="oklch(0.7 0.03 260)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.035 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Bar dataKey="score" fill="oklch(0.72 0.18 265)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass rounded-xl p-6">
          <div className="font-semibold">Compatibility</div>
          <div className="text-xs text-muted-foreground">Overall team fitness</div>
          <div className="h-64">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="65%" outerRadius="100%" data={[{ name: "score", value: 82, fill: "oklch(0.78 0.19 200)" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "oklch(1 0 0 / 0.06)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-44 pointer-events-none">
            <div className="text-4xl font-bold text-gradient">82%</div>
            <div className="text-xs text-muted-foreground">avg score</div>
          </div>
        </motion.div>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="font-semibold mb-1">Your profile</div>
        <div className="text-xs text-muted-foreground mb-4">Quick view of your developer identity</div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div><span className="text-muted-foreground">Name:</span> {user?.fullName}</div>
          <div><span className="text-muted-foreground">Email:</span> {user?.email}</div>
          <div><span className="text-muted-foreground">User ID:</span> <code className="text-xs">{user?.userId}</code></div>
        </div>
      </div>
    </div>
  );
}
