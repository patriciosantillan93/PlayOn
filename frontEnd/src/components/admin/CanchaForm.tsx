import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../hooks/useToast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@radix-ui/themes";
import { createField } from "@/actions/field";
import { CreateCanchaDto } from "@/interfaces/cancha";

const fieldSchema = z.object({
  nombre: z.string().min(3, "Name must be at least 3 characters"),
  tipo: z.string(),
  precioPorHora: z.number().min(0, "Price must be at least 0"),
  imagen: z.string().url("Invalid URL"),
  descripcion: z.string(),
  dimensiones: z.string(),
  cantJugadores: z.number().min(0, "Number of players must be at least 0"),
});

type CreateFieldFormValues = z.infer<typeof fieldSchema>;

export default function CreateFieldForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateFieldFormValues>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      nombre: "",
      tipo: "",
      precioPorHora: 0,
      imagen: "",
      descripcion: "",
      dimensiones: "",
      cantJugadores: 0,
    },
  });

  const onSubmit = async (data: CreateFieldFormValues) => {
    setIsLoading(true);
    const newField: CreateCanchaDto = {
      nombre: data.nombre,
      tipo: data.tipo as "soccer" | "basketball" | "tennis" | "volleyball",
      precioPorHora: data.precioPorHora,
      imagen: data.imagen,
      descripcion: data.descripcion,
      dimensiones: data.dimensiones,
      cantJugadores: data.cantJugadores,
    };

    try {
      await createField(newField);
      onSuccess();
      toast({
        title: "Success",
        description: "New Court has been created.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:w-1/2">
      <h1>Create new court</h1>
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          {...form.register("nombre")}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.nombre && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.nombre.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="type" className="block text-sm font-semibold">
          Type
        </label>
        <select
          id="type"
          {...form.register("tipo")}
          className="w-full p-2 border rounded"
        >
          <option value="soccer">Soccer</option>
          <option value="tennis">Tennis</option>
          <option value="basketball">Basketball</option>
          <option value="volleyball">Volleyball</option>
        </select>
        {form.formState.errors.tipo && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.tipo.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm font-semibold">
          Price
        </label>
        <input
          id="price"
          type="number"
          min="0"
          {...form.register("precioPorHora", { valueAsNumber: true })}
        />
        {form.formState.errors.precioPorHora && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.precioPorHora.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="description" className="block text-sm font-semibold">
          Description
        </label>
        <input
          id="description"
          {...form.register("descripcion")}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.descripcion && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.descripcion.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="image" className="block text-sm font-semibold">
          Imagen
        </label>
        <input
          id="image"
          {...form.register("imagen")}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.imagen && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.imagen.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="dimensions" className="block text-sm font-semibold">
          Dimensions
        </label>
        <input
          id="dimensions"
          {...form.register("dimensiones")}
          className="w-full p-2 border rounded"
        />
        {form.formState.errors.dimensiones && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.dimensiones.message}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label htmlFor="players" className="block text-sm font-semibold">
          Max number of players
        </label>
        <input
          id="players"
          type="number"
          min="0"
          {...form.register("cantJugadores", { valueAsNumber: true })}
        />
        {form.formState.errors.cantJugadores && (
          <p className="text-red-500 text-xs">
            {form.formState.errors.cantJugadores.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full dark:border">
        {isLoading ? <Spinner /> : "Create"}
      </Button>
    </form>
  );
}
