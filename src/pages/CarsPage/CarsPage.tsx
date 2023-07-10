import CarCard from "@/components/Cars/CarCard";
import { CarData, CarPosition } from "@/components/Cars/cars.schema";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import CarImage from "@/assets/caricon.png";

import { Link, useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { type LatLngTuple, icon } from "leaflet";
import { useQuery } from "react-query";
import { getCars } from "@/components/Cars/cars.services";

// Create custom car Icon
const CarIcon = icon({
  iconUrl: CarImage,
  iconSize: [65, 65],
});

const CARS_UPDATE_INTERVAL = 2000; // milliseconds

const useCars = () => {
  // Refetch query every 2 seconds
  const {
    data: cars,
    error,
    isLoading,
  } = useQuery<CarData[]>({
    queryKey: ["cars"],
    queryFn: getCars,
    refetchInterval: CARS_UPDATE_INTERVAL,
  });

  return {
    cars: isLoading ? [] : (cars as CarData[]),
    error,
    isError: !!error,
    isLoading,
  };
};

const parsePosition = ({ lattitude, longitude }: CarPosition): LatLngTuple => [
  lattitude,
  longitude,
];

export default function CarsPage() {
  const navigate = useNavigate();
  const session = getSession();
  const { cars } = useCars();

  useEffect(() => {
    // Protect this page
    if (!session) {
      return navigate("/login");
    }
  }, [session]);

  return (
    <div className="p-4 mt-4 w-full grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
      <section>
        <h2 className="mb-3 scroll-m-20 text-xl font-semibold tracking-tight">
          Mapa en vivo
        </h2>
        {/* <div className="aspect-square mt-2 rounded-md touch-none"> */}
        <MapContainer
          center={[20.710332339207074, -103.40994389779895]}
          zoom={12}
          scrollWheelZoom={false}
          className="w-full h-[400px] z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright>OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cars.map((car) => (
            <Marker icon={CarIcon} position={parsePosition(car.position)}>
              <Popup>{car.plate}</Popup>
            </Marker>
          ))}
        </MapContainer>
        {/* </div> */}
      </section>

      <section>
        <h2 className="mb-3 scroll-m-20 text-xl font-semibold tracking-tight">
          Administra tus autos
        </h2>
        <div className="space-y-3">
          {cars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
          {cars.length === 0 ? (
            <p className="text-slate-600">
              No tienes autos registrados. Haz click en Registrar nuevo auto
              para iniciar
            </p>
          ) : null}
        </div>
        <Button asChild className="w-full mt-4" size="lg">
          <Link to="register">Registrar nuevo auto</Link>
        </Button>
      </section>
    </div>
  );
}
