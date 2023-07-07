import CarRegisterForm from "@/components/Cars/CarRegisterForm";
import { useNavigate } from "react-router-dom";

export default function CarsRegisterPage() {
  const navigate = useNavigate()
  return (
    <div className="p-4 grid place-items-center">
      <div className="max-w-sm">
        <h1 className="mt-2 text-xl font-semibold ">Registrar nuevo auto</h1>
        <p className="text-slate-500 leading-normal mt-1 mb-6">
          Ingresa los datos de tu nuevo auto. Haz click en Guardar cuando hayas
          finalizado
        </p>
        <CarRegisterForm
          onSubmit={() => navigate("/cars")}
          onCancel={() => navigate("/cars")}
        />
      </div>
    </div>
  );
}
