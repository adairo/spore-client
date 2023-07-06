import CarCard from "@/components/Cars/CarCard";
import { Button } from "@/components/ui/button";

export default function CarsPage() {
  return (
    <div className="p-4 space-y-10">
      <section>
        <h2 className="mt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Mapa en vivo
        </h2>
        <div className="bg-slate-100 aspect-square mt-2 rounded-md"></div>
      </section>

      <section>
        <h2 className="mt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
          Administra tus autos
        </h2>
        <div className="mt-3 space-y-3">
          <CarCard
            color="blue"
            id="TYGX89"
            model="Fiesta 2013"
            position={{ lattitude: 12312.123, longitude: 124554.2 }}
            vendor="Ford"
          />
          <CarCard
            color="red"
            id="SYGX42"
            model="Focus 2020"
            position={{ lattitude: 12312.123, longitude: 124554.2 }}
            vendor="Ford"
          />
        </div>
        <Button className="w-full text-base py-6 mt-4">Agregar nuevo auto</Button>
      </section>
    </div>
  );
}
