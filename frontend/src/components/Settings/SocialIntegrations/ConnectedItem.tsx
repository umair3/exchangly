interface IConnectItemProps {
  name: string;
  onDisconnect?: () => void;
  types: string[];
}

const ConnectedItem = ({ name, onDisconnect, types }: IConnectItemProps) => {
  return (
    <div className="max-w-5xl  flex p-2 sm:p-4 rounded-md bg-gray-100 flex-col gap-1">
      <div className="flex flex-col items-center md:flex-row gap-2 md:justify-between ">
        <h3 className="text-xl font-semibold ">{name}</h3>
        <button className="text-base capitalize bg-white hover:bg-gray-100 font-semibold transition border rounded-md py-2 px-4 text-slate-600">
          Disconnect
        </button>
      </div>
      <div className="text-lg font-bold  text-gray-500">
        {types.join(" | ")}
      </div>
      <div className="flex flex-col gap-2 mt-4"></div>
    </div>
  );
};

export default ConnectedItem;
