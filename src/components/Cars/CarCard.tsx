import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CarRegisterForm from "./CarRegisterForm";
import { CAR_COLOR_MAP, CarData } from "./Car.schema";
import { useState } from "react";
import CarPositionForm from "./CarPositionForm";

export default function CarCard(props: CarData) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingPosition, setIsUpdatingPosition] = useState(false);

  return (
    <button className="py-4 px-5 block w-full shadow-md rounded-lg border border-b-0">
      <div className="grid grid-cols-[auto_1fr] items-center">
        <div
          data-color
          className={`${
            CAR_COLOR_MAP[props.color]
          } rounded-full aspect-square w-12 h-auto `}
        />
        <div className="text-right">
          <div>
            <p
              data-matricula
              className="uppercase font-semibold text-base inline"
            >
              {props.plate}
            </p>
          </div>
          <p data-marca-modelo>
            {props.vendor} {props.model}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Dialog open={isEditing} onOpenChange={(value) => setIsEditing(value)}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
              Editar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar auto</DialogTitle>
            </DialogHeader>
            <CarRegisterForm
              initialValues={props}
              onCancel={() => setIsEditing(false)}
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={isUpdatingPosition}
          onOpenChange={(value) => setIsUpdatingPosition(value)}
        >
          <DialogTrigger asChild>
            <Button variant="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 inline mr-1 fill-slate-600"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              Ubicación
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Actualizar ubicación</DialogTitle>
            </DialogHeader>
            <CarPositionForm
              onCancel={() => setIsUpdatingPosition(false)}
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </button>
  );
}
