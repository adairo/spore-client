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

const REQUIRED_MESSAGE = "Este campo es requerido";

const carRegisterSchema = z.object({
  carId: z.string().nonempty(REQUIRED_MESSAGE),
  vendor: z.string().nonempty(REQUIRED_MESSAGE),
  model: z.string().nonempty(REQUIRED_MESSAGE),
  color: z.enum(["azul", "rojo"]),
  position: z.object({
    lattitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
});

type CardData = z.infer<typeof carRegisterSchema>;

/**
 * Provide onSubmit and onCancel callbacks as props.
 * This way the caller has full control of what to do with
 * the register form.
 */
type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

export default function CarRegisterForm(props: Props) {
  const form = useForm<CardData>({
    resolver: zodResolver(carRegisterSchema),
    defaultValues: {
      vendor: "",
      carId: "",
      color: "azul",
      model: "",
    },
  });

  const onSubmit = (data: CardData) => {
    console.log(data);
    // make post request
    props.onSuccess();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
          name="carId"
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

        <fieldset className="!mt-10 space-y-6">
          <legend className="font-semibold">Coordenadas</legend>
          <FormField
            control={form.control}
            name="position.lattitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitud</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="p. ej. 14523.089"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position.longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitud</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="p. ej. -1265.944"
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
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
