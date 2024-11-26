"use client";

import { CanchaFromDB } from "@/interfaces/cancha";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFields] = useState<CanchaFromDB[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    fetch(`${API_URL}/canchas`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data + "CANCHAS");
        setFields(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;
  return <></>;
}


