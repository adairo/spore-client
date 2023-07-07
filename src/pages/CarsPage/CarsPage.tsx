import CarCard, { CarInfo } from "@/components/Cars/CarCard";
import CarRegisterForm from "@/components/Cars/CarRegisterForm";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";

const cars: CarInfo[] = [
  {
    color: "blue",
    id: "TYGX89",
    model: "Fiesta 2013",
    position: { lattitude: 12312.123, longitude: 124554.2 },
    vendor: "Ford",
  },
  {
    color: "red",
    id: "SYGX42",
    model: "Focus 2020",
    position: { lattitude: 12312.123, longitude: 124554.2 },
    vendor: "Ford",
  },
];

export default function CarsPage() {
  return (
    <div className="p-4 space-y-10">
      <section>
        <h2 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
          Mapa en vivo
        </h2>
        <div className="bg-slate-100 aspect-square mt-2 rounded-md"></div>
      </section>

      <section>
        <h2 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
          Administra tus autos
        </h2>
        <div className="mt-3 space-y-3">
          {cars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
        <Button asChild className="w-full mt-4" size="lg" >
          <Link to="register">Registrar nuevo auto</Link>
        </Button>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="w-full mt-4">
              Registrar nuevo auto
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-auto">
            <DialogHeader className="text-left">
              <DialogTitle>Registrar un nuevo auto</DialogTitle>
              <DialogDescription>
                Ingresa los datos de tu nuevo auto. Haz clic en Guardar cuando
                estés listo
              </DialogDescription>
            </DialogHeader>
            <CarRegisterForm />
          </DialogContent>
        </Dialog> */}
      </section>
    </div>
  );
}
