import { useForm } from "react-hook-form";
import { CarPosition, carPositionSchema } from "./cars.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const INITIAL_VALUES: CarPosition = {
  lattitude: 0.0,
  longitude: 0.0,
};

type CarPositionFormProps = {
  initialValues?: CarPosition;
  onSubmit: (data: CarPosition) => void;
  onCancel: () => void;
};

export default function CarPositionForm({
  initialValues = INITIAL_VALUES,
  ...props
}: CarPositionFormProps) {
  const form = useForm<CarPosition>({
    resolver: zodResolver(carPositionSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(props.onSubmit)}>
        <FormField
          control={form.control}
          name="lattitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitud</FormLabel>
              <FormControl>
                <Input {...field} placeholder="p.ej. 1567.322" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitud</FormLabel>
              <FormControl>
                <Input {...field} placeholder="p.ej. -1267.525" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-2">
          <Button className="w-full" type="submit">
            Actualizar
          </Button>
          <Button
            onClick={props.onCancel}
            className="w-full"
            variant="outline"
            type="button"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
