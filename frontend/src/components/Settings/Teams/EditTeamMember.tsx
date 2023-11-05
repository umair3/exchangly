import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import {
  CustomButton,
  CustomInput,
  CustomLabelWithCheckbox,
  OpacityTransition,
} from "../../Common";
import { ITeamItemProps } from "./TeamItem";

interface IEditTeamMemberProps {
  closeModal?: () => void;
  team: ITeamItemProps;
}

const EditTeamMember = ({ closeModal, team }: IEditTeamMemberProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { active, email, first_name, last_name, password, id, roles } = team;
  const onEdit = () => {};

  return (
    <OpacityTransition className="flex px-4 flex-col gap-6 max-w-md ">
      <h4
        className="text-center text-primary font-bold mt-2 text-xl"
        style={{ textShadow: "0px 0px 1px var(--primary)" }}
      >
        Edit Team Member
      </h4>

      <div>
        <label htmlFor="first_name" className="text-gray-600 font-bold ml-1">
          First Name
        </label>
        <CustomInput
          name="first_name"
          type="text"
          className="!rounded-sm placeholder:font-bold  "
          defaultValue={first_name}
        />
      </div>

      <div>
        <label htmlFor="last_name" className="text-gray-600 font-bold ml-1">
          Last Name
        </label>
        <CustomInput
          name="last_name"
          type="text"
          className="!rounded-sm placeholder:font-bold  "
          defaultValue={last_name}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-gray-600 font-bold ml-1">
          Email Address
        </label>
        <CustomInput
          name="email"
          type="text"
          className="!rounded-sm placeholder:font-bold  "
          defaultValue={email}
        />
      </div>

      <div>
        <label htmlFor="password" className="text-gray-600 font-bold ml-1">
          Password
        </label>
        <CustomInput
          name="password"
          type={showPassword ? "text" : "password"}
          className="!rounded-sm placeholder:font-bold"
          defaultValue={password}
        />
        <button
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-xs text-gray-600 ml-1"
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </div>

      <div>
        <CustomLabelWithCheckbox label="Active" labelPlacement="end" />
      </div>

      <div className="mt-4 flex   items-center justify-end gap-3">
        <CustomButton startIcon={<AiFillEdit />} onClick={onEdit}>
          Edit
        </CustomButton>

        <CustomButton startIcon={<MdClose />} onClick={closeModal}>
          Cancel
        </CustomButton>
      </div>
    </OpacityTransition>
  );
};

export default EditTeamMember;
