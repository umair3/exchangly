import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { useNavigation } from "../../hooks";
import { paths } from "../../services/AppRoutes/paths";

interface IApplicationErrorProps {}

const ApplicationError: React.FC<IApplicationErrorProps> = (props) => {
  const { goToPath, goBack } = useNavigation();

  const reload = (timer: number = 300) => {
    setTimeout(() => {
      window.location.reload();
    }, timer);
  };

  const goToPreviousPage = () => {
    goBack();

    reload();
  };

  const goToHome = () => {
    goToPath(paths.dashboard);
    reload();
  };

  return (
    <div className="h-screen w-screen p-2 md:p-0 flex items-center justify-center bg-gray-100 ">
      <div className="max-w-2xl mx-auto bg-gray-50  rounded-xl p-5 sm:p-16 shadow-gray-400 shadow-xl overflow-hidden ">
        <h1 className="text-3xl tracking-tight font-extrabold text-primary   sm:text-5xl md:text-6xl w-fit ">
          Oops,something's went wrong!
        </h1>
        <p className="my-4 text-gray-500 font-bold border-b-2  pb-2">
          Not to worry, why don't you try one of these helpful links:
        </p>
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-2 justify-end ">
          <button
            onClick={goToPreviousPage}
            className="bg-primary flex items-center gap-2 text-gray-100 py-2 px-3 rounded-xl hover:bg-primary/80"
          >
            <span>
              <BiArrowBack />
            </span>
            <span>Go to Previous Page</span>
          </button>
          <button
            onClick={goToHome}
            className="bg-primary flex items-center gap-2 text-gray-100 py-2 px-3 rounded-xl hover:bg-primary/80"
          >
            <span>
              <AiFillHome />
            </span>
            <span> Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationError;
