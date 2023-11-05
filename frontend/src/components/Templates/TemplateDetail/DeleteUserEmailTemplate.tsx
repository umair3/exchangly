import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { useDeleteTemplate } from "../../../services/Api/Templates/hooks";
import { CustomButton, SimpleLoader } from "../../Common";

interface IDeleteUserEmailTemplateProps {
  id: number;
  title: string;
  closeModal: () => void;
}

const DeleteUserEmailTemplate: React.FC<IDeleteUserEmailTemplateProps> = ({
  id,
  title,
  closeModal,
}) => {
  const { deleteTemplate, isLoading } = useDeleteTemplate();

  const onConfirm = () => {
    deleteTemplate(id);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SimpleLoader />
      ) : (
        <div className="flex flex-col gap-6">
          <h4
            className="text-primary font-bold text-xl w-11/12"
            style={{ textShadow: "0px 0px 1px var(--primary)" }}
          >
            Are you sure you want to delete this template?
            {title && <span className="block">({title})</span>}
          </h4>

          <div className="flex gap-4 flex-wrap w-full px-5">
            <CustomButton startIcon={<GiConfirmed />} onClick={onConfirm}>
              Confirm
            </CustomButton>
            <CustomButton startIcon={<MdClose />} onClick={closeModal}>
              Cancel
            </CustomButton>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DeleteUserEmailTemplate;
