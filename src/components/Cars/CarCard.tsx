const COLOR_MAP = {
  red: "bg-red-400 border-4   border-red-100",
  blue: "bg-cyan-500 border-4 border-cyan-100",
};

type Position = {
  longitude: number;
  lattitude: number;
};

export type CarInfo = {
  id: string;
  vendor: string;
  model: string;
  color: keyof typeof COLOR_MAP;
  position: Position;
};

export default function CarCard(props: CarInfo) {
  return (
    <button className="p-3 group hover:bg-slate-50 transition-colors block w-full shadow-md rounded-lg border border-b-0">
      <div className="grid grid-cols-[auto_1fr] items-center">
        <div
          data-color
          className={`${
            COLOR_MAP[props.color]
          } rounded-full aspect-square w-14 h-auto `}
        />
        <div className="text-right space-y-1">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 inline fill-slate-400  mr-2"
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
            <p
              data-matricula
              className="uppercase font-semibold text-xl inline"
            >
              {props.id}
            </p>
          </div>
          <p data-marca-modelo>
            {props.vendor} {props.model}
          </p>
        </div>
      </div>
      <div className="mt-5 text-slate-500 text-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 inline"
        >
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm">
          <span className="font-semibold">Coordenadas:</span>{" "}
          {props.position.lattitude}, {props.position.longitude}
        </span>
      </div>
    </button>
  );
}
