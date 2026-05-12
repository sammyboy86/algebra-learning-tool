import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign In — Algebra Learning Tool",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
