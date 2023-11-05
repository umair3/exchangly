import React from "react";
import { MdModeEdit } from "react-icons/md";
import { useNavigation } from "../../../hooks";
import { CustomButton, CustomInput, LinearLoader } from "../../Common";
import { JoditEditor } from "../../Editor";
import { useEditTemplate } from "./hooks";

interface IEditTemplateProps {
  title: string;
  description: string | null;
  template: string;
  id: number;
}

const EditTemplate: React.FC<IEditTemplateProps> = ({
  title,
  description,
  template,
  id,
}) => {
  const { goBack } = useNavigation();

  const {
    titleRef,
    descriptionRef,
    editorContent,
    onUpdate,
    onChangeContent,
    isLoading,
  } = useEditTemplate(template);

  const updateTemplate = () => {
    onUpdate(id);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-3">
        <h2
          className="font-bold text-2xl text-secondary border-b border-secondary py-3"
          style={{ textShadow: "0 0  1px var(--secondary)" }}
        >
          Edit Template
        </h2>

        <p className="text-base font-bold opacity-70 my-2">Update fields:</p>

        <div className="flex flex-col gap-4  rounded-lg md:shadow-gray-50 md:shadow-sm md:bg-gray-100/10 py-2 md:py-4 ">
          <div className="max-w-lg">
            <label className="text-base font-bold " htmlFor="title">
              Title:
            </label>
            <CustomInput
              className="bg-gray-50"
              name="title"
              id="title"
              type="text"
              ref={titleRef}
              defaultValue={title}
            />
          </div>

          <div className="max-w-lg">
            <label className="text-base font-bold " htmlFor="description">
              Description:
            </label>
            <CustomInput
              className="bg-gray-50"
              name="description"
              id="description"
              type="text"
              ref={descriptionRef}
              defaultValue={description ?? ""}
            />
          </div>

          <div>
            <label className="text-base font-bold " htmlFor="content">
              Content:
            </label>
            <div className="mt-2 w-full ">
              <JoditEditor value={editorContent} onChange={onChangeContent} />
            </div>
          </div>
          {!isLoading ? (
            <div className="flex py-2 px-2 items-center  gap-2 mt-4">
              <CustomButton
                icon="random"
                startIcon={<MdModeEdit />}
                onClick={updateTemplate}
              >
                Update
              </CustomButton>
              <CustomButton icon="cancel" onClick={goBack}>
                Cancel
              </CustomButton>
            </div>
          ) : (
            <LinearLoader />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;
