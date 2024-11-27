"use client";

import { Toaster } from "@/components/ui/toaster";
import { CanchaFromDB } from "@/interfaces/cancha";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import CreateOrEditFieldForm from "@/components/admin/CanchaForm";
import { deleteField } from "@/actions/field";
import ConfirmActionModal from "@/components/ConfirmActionModal";
import BookingModal from "@/components/BookingModal";
import { set } from "zod";
import { tree } from "next/dist/build/templates/app-page";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
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

  async function handleDeleteField(id?: number) {
    if (!id) return;
    try {
      await deleteField(id);
      toast({
        title: "Success",
        description: "Court deleted successfully",
        variant: "default",
      });
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
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
                <h1 className="font-semibold text-xl">Create new court</h1>
                <CreateOrEditFieldForm
                  onSuccess={() => window.location.reload()}
                />
              </div>
            )}
            {action === "editing" && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center">
                  <h1 className="font-semibold text-xl">
                    Edit {selectedField?.nombre}
                  </h1>
                  <Button
                    variant="outline"
                    onClick={() => setAction("creating")}
                  >
                    Create new
                  </Button>
                </div>
                <CreateOrEditFieldForm
                  onSuccess={() => window.location.reload()}
                  fieldToEdit={selectedField || undefined}
                />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col justify-start gap-5 p-1 ">
            <h1 className="text-2xl font-bold">Active Courts</h1>
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
                        variant="outline"
                        className="sm:w-auto  w-20 p-1 text-wrap"
                        onClick={() => {
                          setIsBookingModalOpen(true);
                          setSelectedField(f);
                        }}
                      >
                        View bookings
                      </Button>
                      <Button
                        variant="outline"
                        className="w-20 p-1"
                        onClick={() => {
                          setAction("editing");
                          setSelectedField(f);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-20 p-1 "
                        onClick={() => {
                          setSelectedField(f);
                          setIsConfirmModalOpen(true);
                        }}
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
      <ConfirmActionModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={() => handleDeleteField(selectedField?.id)}
        message={`Are you sure you want to delete '${selectedField?.nombre}' ?`}
      />
      <BookingModal
        field={selectedField}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedField(null);
        }}
      />
    </section>
  );
}
