import React, { useState } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { paths } from "../../../../services/AppRoutes/paths";
import {
  CustomButton,
  CustomInput,
  CustomLabelWithCheckbox,
} from "../../../Common";

const CreateTeam = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div
        className="text-2xl text-secondary font-bold border-b border-secondary pb-2"
        style={{ textShadow: "0 0  1px var(--secondary)" }}
      >
        <h2>Create Team Member</h2>
      </div>

      <div className="flex flex-col gap-2 max-w-xl mt-6 md:bg-gray-100/70 md:p-8 rounded-md">
        <div className="max-w-md flex flex-col gap-1">
          <label htmlFor="first_name" className="font-bold cursor-pointer">
            First Name:
          </label>
          <CustomInput
            id="first_name"
            type="text"
            name="first_name"
            placeholder="first name"
          />
        </div>

        <div className="max-w-md flex flex-col gap-1">
          <label htmlFor="last_name" className="font-bold cursor-pointer">
            Last Name:
          </label>
          <CustomInput
            id="last_name"
            type="text"
            name="last_name"
            placeholder="last name"
          />
        </div>

        <div className="max-w-md flex flex-col gap-1">
          <label htmlFor="email" className="font-bold cursor-pointer">
            Email Address:
          </label>
          <CustomInput
            id="email"
            type="email"
            name="email"
            placeholder="email"
          />
        </div>
        <div className="max-w-md flex flex-col gap-1">
          <label htmlFor="password" className="font-bold cursor-pointer">
            Password:
          </label>
          <CustomInput
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-xs self-start text-gray-600 ml-1"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>

        <div>
          <CustomLabelWithCheckbox label="Active" labelPlacement="end" />
        </div>

        <div className="max-w-xs sm:max-w-lg mt-4 w-full flex flex-col gap-6   sm:gap-2 sm:flex-row sm:justify-end ">
          <CustomButton startIcon={<AiOutlineAppstoreAdd />}>
            Create Member
          </CustomButton>
          <CustomButton startIcon={<MdClose />} type="link" href={paths.teams}>
            Cancel
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
