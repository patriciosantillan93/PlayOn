"use client";

import { Toaster } from "@/components/ui/toaster";
import { CanchaFromDB } from "@/interfaces/cancha";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import CreateFieldForm from "@/components/admin/CanchaForm";
import { deleteField } from "@/actions/field";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFields] = useState<CanchaFromDB[]>([]);
  const [action, setAction] = useState<"creating" | "editing">("creating");
  const [selectedField, setSelectedField] = useState<CanchaFromDB | null>(null);
  const { toast } = useToast();

  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_URL}/canchas`)
      .then((res) => res.json())
      .then((data) => {
        setFields(data);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <p>Loading...</p>;

  async function handleDeleteField(id: number) {
    try {
      await deleteField(id);
      toast({
        title: "Success",
        description: "Court deleted successfully",
        variant: "default",
      });
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <section className="container  bg-background mx-auto px-4 py-8">
      <Toaster />
      {fields.length === 0 ? (
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold">No registered courts</h1>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Courts administrator</h1>
          </div>
          <div className="mb-5">
            {action === "creating" && (
              <div className="flex flex-col gap-5">
                <h1>Create new court</h1>
                <CreateFieldForm onSuccess={() => window.location.reload()} />
              </div>
            )}
            {action === "editing" && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center">
                  <h1>Edit {selectedField?.nombre}</h1>
                  <Button
                    variant="outline"
                    onClick={() => setAction("creating")}
                  >
                    Create new
                  </Button>
                </div>
                <CreateFieldForm
                  onSuccess={() => window.location.reload()}
                  fieldToEdit={selectedField || undefined}
                />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col justify-start gap-5 p-1 ">
            <table>
              <thead>
                <tr className="text-left text-md font-semibold">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Sport</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((f) => (
                  <tr
                    key={f.id}
                    className="hover:bg-background border-y text-md"
                  >
                    <td>{f.id}</td>
                    <td className="max-w-36 truncate ">{f.nombre}</td>
                    <td>{f.tipo}</td>
                    <td className="py-2 flex flex-col sm:flex-row items-center gap-2">
                      <Button
                        variant="default"
                        className="w-16 p-1"
                        onClick={() => {
                          setAction("editing");
                          setSelectedField(f);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-16 p-1"
                        onClick={() => handleDeleteField(f.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
