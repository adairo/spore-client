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
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { NewCarData, carRegisterSchema } from "./cars.schema";

/**
 * Provide onSubmit and onCancel callbacks as props.
 * This way the caller has full control of what to do with
 * the register form.
 */
type Props = {
  initialValues?: NewCarData;
  onSubmit: (data: NewCarData) => void;
  onCancel: () => void;
};

export default function CarRegisterForm(props: Props) {
  const form = useForm<NewCarData>({
    resolver: zodResolver(carRegisterSchema),
    defaultValues: props.initialValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        id="register-form"
        className="space-y-6"
      >
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
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
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
              <FormControl>
                <select
                  {...field}
                  className="w-full bg-white border px-2 py-2 rounded-md"
                >
                  <option value="red">rojo</option>
                  <option value="blue">azul</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 flex-col-reverse sm:flex-row justify-stretch">
          <Button
            onClick={props.onCancel}
            variant="outline"
            className="flex-1"
            type="button"
          >
            Cancelar
          </Button>
          <Button form="register-form" className="flex-1" type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}
