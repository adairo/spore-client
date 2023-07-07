import z from "zod";


export const CAR_COLORS = ["blue", "red"] as const;
export type CarColor = typeof CAR_COLORS[number]
export const CAR_COLOR_MAP: Record<CarColor, string> = {
  red: "bg-red-400 border-4 border-red-100",
  blue: "bg-cyan-500 border-4 border-cyan-100",
};

const REQUIRED_MESSAGE = "Este campo es requerido";
export const newCarSchema = z.object({
  plate: z.string().nonempty(REQUIRED_MESSAGE),
  vendor: z.string().nonempty(REQUIRED_MESSAGE),
  model: z.string().nonempty(REQUIRED_MESSAGE),
  color: z.enum(CAR_COLORS),
});

type CarPosition = { lattitude: number; longitude: number };
export type NewCarData = z.infer<typeof newCarSchema>;
export type CarData = NewCarData & { id: number, position: CarPosition };
