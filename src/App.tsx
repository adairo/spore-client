import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, { message: "La contraseña debe ser de al menos 4 caracteres" }),
});

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(form)

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    console.log(data);
  };

  return (
    <div className="grid w-full min-h-screen place-items-center bg-slate-50 px-4">
      <div className="border max-w-lg w-full py-12 px-8 bg-white rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Inicia sesión
            </h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="ejemplo@hotmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              {/* <p>
                ¿Aún no tienes cuenta?{" "}
                <Button className="p-0" variant="link">
                  Registrate
                </Button>
              </p> */}
              <Button type="submit" className="w-full text-base">
                Iniciar sesión
              </Button>
              <Button variant={"outline"} className="w-full text-base">
                Crear cuenta
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
