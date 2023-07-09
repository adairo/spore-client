import CarCard from "@/components/Cars/CarCard";
import { CarData } from "@/components/Cars/cars.schema";
import { getSession, getToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const cars: CarData[] = [
  {
    id: 123,
    color: "blue",
    plate: "TYGX89",
    model: "Fiesta 2013",
    position: { lattitude: 12312.123, longitude: 124554.2 },
    vendor: "Ford",
  },
  {
    id: 1245,
    color: "red",
    plate: "SYGX42",
    model: "Focus 2020",
    position: { lattitude: 12312.123, longitude: 124554.2 },
    vendor: "Ford",
  },
];

const useCars = () => {
  const [cars, setCars] = useState<any>([]);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const token = getToken() as string;
    fetch("http://localhost:3001/cars", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if ("error" in data) {
          throw new Error(data.error);
        }

        return data;
      })
      .then(setCars)
      .catch((error) => setError(error));
  }, []);

  return {
    cars,
    error,
    isError: !!error,
  };
};

export default function CarsPage() {
  const navigate = useNavigate();
  const session = getSession();
  const _cars = useCars();
  console.log("🚀 ~ file: CarsPage.tsx:63 ~ CarsPage ~ _cars:", _cars)

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session]);
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
        <Button asChild className="w-full mt-4" size="lg">
          <Link to="register">Registrar nuevo auto</Link>
        </Button>
      </section>
    </div>
  );
}
