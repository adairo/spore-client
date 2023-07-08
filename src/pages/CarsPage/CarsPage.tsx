import { CarData } from "@/components/Cars/Car.schema";
import CarCard from "@/components/Cars/CarCard";
import { Button } from "@/components/ui/button";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

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

const getSession = () => {
  const token = sessionStorage.getItem("sporecar_token");

  const unauthorized = () => ({
    user: null,
  });

  if (!token) {
    return unauthorized();
  }

  const decodedUser = jwtDecode<{ userId: number; role: string; exp: number }>(
    token
  );
  if (Date.now() <= decodedUser.exp) {
    return unauthorized();
  }

  return {
    user: {
      id: decodedUser.userId,
      role: decodedUser.role,
    },
  };
};

export default function CarsPage() {
  const navigate = useNavigate();
  const { user } = getSession();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
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
