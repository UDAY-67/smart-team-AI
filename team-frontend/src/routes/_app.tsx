import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthShell } from "@/components/layout/AuthShell";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("stfs_token");
      if (!token) throw redirect({ to: "/login" });
    }
  },
  component: AuthShell,
});
