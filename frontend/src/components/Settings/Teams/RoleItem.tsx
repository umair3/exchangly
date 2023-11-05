import { BiEdit } from "react-icons/bi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { CustomTooltip } from "../../Common";

interface IRoleItemProps {
  name: string;
  permissions: string;
  id: number;
}

const RoleItem = ({ name, permissions, id }: IRoleItemProps) => {
  return (
    <div className="rounded bg-white p-4 w-full flex flex-col gap-2 mb-1">
      <div className="flex flex-col gap-3  items-center md:flex-row text-base font-bold  ">
        <div className="md:w-1/2  text-gray-500 flex-none ">Name</div>
        <div className="md:w-1/2 md:text-right  ">{name}</div>
      </div>

      <div className="flex flex-col gap-3 md:gap-0 items-center md:flex-row text-base font-bold  ">
        <div className="md:w-1/2 text-gray-500 flex-none">Permissions</div>
        <div className="md:w-1/2 md:text-right">{permissions}</div>
      </div>

      <div className="mt-2 flex  gap-3 flex-row md:justify-end text-md font-bold bg-gray-200/50 max-w-fit ml-auto p-2 ">
        <CustomTooltip
          arrow
          title={
            <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              Edit name :{name}
            </h3>
          }
        >
          <BiEdit className="text-2xl opacity-70 transition hover:text-primary cursor-pointer" />
        </CustomTooltip>

        <CustomTooltip
          arrow
          title={
            <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              Delete name :{name}
            </h3>
          }
        >
          <RiDeleteBin3Line className="text-2xl opacity-70 transition hover:text-primary cursor-pointer" />
        </CustomTooltip>
      </div>
    </div>
  );
};

export default RoleItem;
