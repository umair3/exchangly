import { useNavigation } from "../../../hooks";
import { paths } from "../../../services/AppRoutes/paths";
import { CustomButton } from "../../Common";
import TeamsList from "./TeamsList";

const Teams = () => {
  const { goToPath } = useNavigation();

  const onAddNewMember = () => {
    goToPath(paths.createTeamMember);
  };

  return (
    <div className="my-4 md:my-6 bg-gray-50 py-4 px-3 md:px-6 md:p-6 md:rounded-md  ">
      <div className="md:grid md:grid-cols-4 md:gap-6">
        <div className="bg-secondary/80 shadow md:shadow-none text-white p-2 text-center md:text-left rounded-md  md:rounded-none md:p-0  md:bg-transparent md:col-span-1 ">
          <h3 className="md:text-xl font-bold leading-6 md:text-gray-900 ">
            Team Members
          </h3>
          <p className=" text-sm md:text-md font-bold md:text-gray-500">
            Manage your team members
          </p>
        </div>
        <div className=" md:mt-0 md:col-span-3 ">
          <div className=" w-full flex flex-col gap-4 md:p-4 rounded-md">
            <div className="w-full flex justify-end items-center mt-8 md:mt-0 mb-2">
              <button
                onClick={onAddNewMember}
                className="text-base capitalize bg-white hover:bg-gray-100 font-semibold transition border rounded-md py-2 px-4 text-slate-600"
              >
                Add new member
              </button>
            </div>
            <div className="mt-2">
              <TeamsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
