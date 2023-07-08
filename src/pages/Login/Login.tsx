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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const login = (userData: LoginPayload) => {
  return fetch("http://localhost:3001/users/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data) {
        throw new Error(data.error);
      }
      return data;
    });
};

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, { message: "La contraseña debe ser de al menos 8 caracteres" }),
});

type LoginPayload = z.infer<typeof loginSchema>;

function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data)
      .then((response) => {
        sessionStorage.setItem("sporecar_session", response.token);
        navigate("/cars");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="grid sm:place-items-center bg-slate-50">
      <Card className="w-full sm:max-w-md border-0 sm:border">
        <CardHeader className="mt-4 sm:mt-2">
          <CardTitle>Inicia sesión</CardTitle>
          <CardDescription>
            Visualiza la posición de tus autos en tiempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="login-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
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
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button form="login-form" type="submit" className="w-full text-base">
            Iniciar sesión
          </Button>
          <Button variant={"outline"} className="w-full text-base" asChild>
            <Link to="/sign-up">Crear cuenta</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginForm;
