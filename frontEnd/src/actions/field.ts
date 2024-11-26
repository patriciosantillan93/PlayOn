"use server";

import { CreateCanchaDto } from "@/interfaces/cancha";


const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";


export async function createField(data: CreateCanchaDto) {
     const response = await fetch(`${API_URL}/canchas`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(data),
     });

     if (!response.ok) {
       const errorData = await response.json();

       if (response.status !== 201) {
         throw new Error(errorData.error || "Server error occurred");
       } else {
         throw new Error("Unexpected error occurred");
       }
     }
     return await response.json();
}

export async function updateField(id:number, data: CreateCanchaDto) {
    const response = await fetch(`${API_URL}/canchas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
  
      if (response.status !== 200) {
        throw new Error(errorData.error || "Server error occurred");
      } else {
        throw new Error("Unexpected error occurred");
      }
    }
    return await response.json();
    
}

export async function deleteField(id: number) {
  const response = await fetch(`${API_URL}/canchas/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errorData = await response.json();

    if (response.status !== 200) {
      throw new Error(errorData.error || "Server error occurred");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
  return await response.json();
}

