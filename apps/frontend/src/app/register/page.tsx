import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign Up — Algebra Learning Tool",
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}
