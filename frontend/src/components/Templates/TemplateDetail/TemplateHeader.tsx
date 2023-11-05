import React from "react";
import { CgTemplate } from "react-icons/cg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BiTime } from "react-icons/bi";

import { useNavigation, useToggle } from "../../../hooks";
import { useCampaignActions } from "../../../features/campaign";
import { paths } from "../../../services/AppRoutes/paths";
import { MdDelete, MdSettings } from "react-icons/md";
import { CustomModal } from "../../Common";
import DeleteUserEmailTemplate from "./DeleteUserEmailTemplate";

dayjs.extend(relativeTime);

interface ITemplateHeaderProps {
  thumbnail?: string | null;
  description: string | null;
  created: string;
  updated: string;
  subject: string;
  body: string;
  id: number;
  user_defined: boolean;
}

const TemplateHeader: React.FC<ITemplateHeaderProps> = ({
  thumbnail,
  subject,
  description,
  created,
  updated,
  body,
  id,
  user_defined,
}) => {
  const { goToPath } = useNavigation();
  const { updateContentTemplate } = useCampaignActions();
  const [deleteModal, setDeleteModal] = useToggle(false);

  const useTemplate = () => {
    if (body) {
      updateContentTemplate(body);
      goToPath(paths.createCampaign);
    }
  };

  const onEdit = () => {
    goToPath(paths.editTemplate.replace(":id", String(id)));
  };

  return (
    <div className="relative  border-b-4 border-primary/80">
      {thumbnail ? (
        <img
          className="absolute -z-10  inset-0  object-cover w-full h-full"
          src={thumbnail}
          alt={subject}
        />
      ) : (
        <div className="absolute -z-10  inset-0  object-cover w-full h-full flex items-center justify-center">
          <CgTemplate
            fontSize="6rem"
            className=" bg-secondary text-white rounded"
          />
        </div>
      )}
      <div className="py-20 md:py-32 flex gap-6 flex-col px-6 md:px-28 justify-center bg-black/80    text-white mx-auto md:mr-0 md:ml-0">
        <h2 className="text-3xl md:text-4xl">{subject}</h2>
        <div className="max-w-lg">
          {description && <p className="mb-4">{description}</p>}
          {created && (
            <p className="flex text-gray-200 font-bold  items-center gap-2">
              <BiTime /> Created {dayjs(created).fromNow()}
            </p>
          )}
          {updated && (
            <p className="flex text-gray-200 font-bold  items-center gap-2">
              <BiTime /> Updated {dayjs(updated).fromNow()}
            </p>
          )}
        </div>
      </div>

      <div className="absolute  flex gap-2 justify-end w-full bottom-4 right-4 ">
        <button
          onClick={useTemplate}
          className="flex gap-2 items-center bg-secondary/80 transition text-white px-4 py-2 rounded-full hover:bg-secondary"
        >
          <CgTemplate />
          Use Template
        </button>
        {user_defined ? (
          <div className="max-w-md divide-x divide-white flex gap-1 px-4 py-2 rounded-full bg-secondary/80">
            <MdSettings
              onClick={onEdit}
              fontSize={"1.8rem"}
              className="text-white  cursor-pointer hover:text-gray-200 transition-all"
            />

            <MdDelete
              onClick={setDeleteModal}
              fontSize={"1.8rem"}
              className="text-white cursor-pointer hover:text-gray-200 transition-all"
            />
          </div>
        ) : null}
      </div>
      <CustomModal
        open={deleteModal}
        handleClose={setDeleteModal}
        className="!p-8 !w-full !max-w-[550px]"
        closeIcon
      >
        <DeleteUserEmailTemplate
          closeModal={setDeleteModal}
          id={id}
          title={subject}
        />
      </CustomModal>
    </div>
  );
};

export default TemplateHeader;
