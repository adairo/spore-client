import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

const carRegisterSchema = z.object({
  carId: z.string(),
  vendor: z.string(),
  model: z.string(),
  color: z.enum(["azul", "rojo"]),
  position: z.string().regex(/^([+-]?\d+.\d+),\s?([+-]?\d+.\d+)$/), // 14230.0023, -17237.433
});

export default function CarRegisterForm() {
  const form = useForm<z.infer<typeof carRegisterSchema>>({
    resolver: zodResolver(carRegisterSchema),
    defaultValues: {
      carId: "",
      color: "azul",
      model: "",
      position: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="vendor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca</FormLabel>
              <FormControl>
                <Input type="text" placeholder="p.ej. Ford" {...field} />
              </FormControl>
              <FormDescription>El fabricante de tu automóvil</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modelo</FormLabel>
              <FormControl>
                <Input type="text" placeholder="p.ej. Fiesta 2020" {...field} />
              </FormControl>
              <FormDescription>
                El modelo de tu auto, incluyendo el año
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>No hace falta incluir guiones</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={(v) => field.onChange(v as any)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el color de tu auto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="azul">azul</SelectItem>
                  <SelectItem value="rojo">rojo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coordenadas</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="p. ej. 14523.089, -1265.944"
                />
              </FormControl>
              <FormDescription>
                Ingresa los valores de latitud y longitud separados por coma
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 ">
          <Button variant="outline" className="w-full ">Cancelar</Button>
          <Button className="w-full">Guardar</Button>
        </div>
      </form>
    </Form>
  );
}
