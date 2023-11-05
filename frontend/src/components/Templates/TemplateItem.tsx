import { CgTemplate } from "react-icons/cg";
import { useTemplateActions } from "../../features/template";
import { useNavigation } from "../../hooks";

import { IEmailTemplateAPI } from "../../services/Api/Templates";
import { paths } from "../../services/AppRoutes/paths";
import { OpacityTransition } from "../Common";

export interface ITemplateItem {
  id: number;
  subject: string;
  body: string;
  description: null | string;
  thumbnail?: null | string;

  created: string;
  updated: string;
  user_defined: boolean;
}
interface ITemplateItemProps extends ITemplateItem {}

const TemplateItem: React.FC<ITemplateItemProps> = ({
  thumbnail,
  subject,
  description,
  id,
  body,
  created,
  updated,
  user_defined,
}) => {
  const { updateTemplateDetail } = useTemplateActions();
  const { goToPath } = useNavigation();

  const viewDetails = () => {
    updateTemplateDetail({
      id,
      subject,
      body,
      description,
      thumbnail,
      created,
      updated,
      user_defined,
    });
    goToPath(paths.templateDetail.replace(":id", String(id)));
  };

  return (
    <OpacityTransition>
      <div className="relative  group w-full flex flex-col gap-3  border rounded  shadow-lg shadow-gray-200 cursor-pointer">
        {thumbnail ? (
          <img
            className="h-96 object-cover rounded "
            src={thumbnail}
            alt={subject}
          />
        ) : (
          <div className="h-96 bg-gray-200/30 flex items-center justify-center rounded">
            <CgTemplate
              fontSize="6rem"
              className=" bg-slate-100 text-secondary rounded"
            />
          </div>
        )}
        <div className="absolute transition-opacity group-hover:opacity-0  inset-0 flex items-end  justify-center">
          <h2 className="w-full text-md bg-gray-900/30 text-white capitalize font-bold p-4 text-center">
            {subject}
          </h2>
        </div>

        <div className="absolute transition-opacity  rounded  opacity-0 group-hover:opacity-100  text-gray-50 bg-gray-700/90 z-40 inset-0 w-full h-full flex flex-col gap-4 items-center justify-center">
          <div className="p-4 md:p-0 md:max-w-[15rem] mx-auto">
            <h3 className="w-full text-md md:text-lg   capitalize font-bold  ">
              {subject}
            </h3>
            <p className="text-sm mt-4">{description}</p>
          </div>
          <div className="absolute bottom-3 w-full flex items-center justify-center ">
            <button
              onClick={viewDetails}
              className=" max-w-md text-sm bg-gray-200  p-2 text-gray-800 font-bold rounded hover:bg-gray-300 capitalize"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </OpacityTransition>
  );
};

export default TemplateItem;
