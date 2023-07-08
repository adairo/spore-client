import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const signupSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, { message: "La contraseña debe ser de al menos 8 caracteres" }),
  passwordConfirm: z.string().nonempty("Este campo no puede estar vacío"),
  role: z.enum(["regular", "admin"]),
});

function SignupPage() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      role: "regular",
    },
  });

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    if (data.password !== data.passwordConfirm) {
      form.setError("passwordConfirm", {
        type: "custom",
        message: "Las contraseñas no coinciden",
      });

      return;
    }

    const { passwordConfirm, ...payload } = data;

    fetch("http://localhost:3001/users/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if ("error" in res) {
          throw new Error(res.error);
        }

        sessionStorage.setItem("sporecar_token", res.token);
        navigate("/cars")
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="grid sm:place-items-center bg-slate-50">
      <Card className="w-full sm:max-w-md border-0 sm:border">
        <CardHeader className="mt-4 sm:mt-2">
          <CardTitle>Crea una cuenta</CardTitle>
          <CardDescription>
            Empieza a administrar tus autos desde SporeCar
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

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de usuario</FormLabel>
                    <Select
                      onValueChange={(e) =>
                        field.onChange(
                          e as z.infer<typeof signupSchema>["role"] // string is not asignable to ("regular" | "administrador")
                        )
                      }
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el rol del nuevo usuario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Los usuarios regulares solo pueden ver sus propios autos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button form="login-form" type="submit" className="w-full text-base">
            Crear cuenta
          </Button>
          <Button variant={"outline"} className="w-full text-base" asChild>
            <Link to="/login">Ya tengo una cuenta</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignupPage;
