// DEPRECATED
"use client";
import React from "react";
import { LoginForm } from "@/components/Login";

export default function LoginPage() {
  return (
    <div>
      <LoginForm
        onSuccess={() => alert("login success")}
        closeDialog={() => alert("close dialog")}
      />
    </div>
  );
}
