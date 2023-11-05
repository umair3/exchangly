import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { CustomButton, CustomInput, OpacityTransition } from "../../Common";

interface IAddNewRoleProps {
  closeModal?: () => void;
}

const AddNewRole = ({ closeModal }: IAddNewRoleProps) => {
  const onEdit = () => {};

  return (
    <OpacityTransition className="flex px-4 flex-col gap-6 max-w-md ">
      <h4
        className="text-center text-primary font-bold mt-2 text-xl"
        style={{ textShadow: "0px 0px 1px var(--primary)" }}
      >
        Add New Role
      </h4>
      <div>
        <label htmlFor="email" className="text-gray-600 font-bold ml-1">
          Name
        </label>
        <CustomInput
          name="email"
          type="text"
          className="!rounded-sm placeholder:font-bold  "
        />
      </div>
      <div className="mt-4 flex   items-center justify-end gap-3">
        <CustomButton startIcon={<AiFillEdit />} onClick={onEdit}>
          Save
        </CustomButton>

        <CustomButton startIcon={<MdClose />} onClick={closeModal}>
          Cancel
        </CustomButton>
      </div>
    </OpacityTransition>
  );
};

export default AddNewRole;
