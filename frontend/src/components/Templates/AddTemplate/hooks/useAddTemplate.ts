import JoditEditor from "jodit-react";
import { useCallback, useRef, useState } from "react";
import { ShowAlert } from "../../../../features/alert";
import { useCreateTemplate } from "../../../../services/Api/Templates/hooks";
import { InputElem } from "../../../Common/CustomInput";

export function useAddTemplate() {
  const titleRef = useRef<InputElem | null>(null);
  const descriptionRef = useRef<InputElem>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const { isLoading, createTemplate } = useCreateTemplate();

  const onChangeContent = useCallback((newContent) => {
    setEditorContent(newContent);
  }, []);

  const checkRequiredFields = (): Boolean => {
    if (!titleRef?.current?.value) {
      ShowAlert({
        message: "Title is required for template",
        status: "error",
      });
    }

    if (!editorContent) {
      ShowAlert({
        message: "Please add content for template",
        status: "error",
      });
    }

    return !titleRef?.current?.value || !editorContent ? false : true;
  };

  const onAdd = useCallback(() => {
    if (checkRequiredFields() && titleRef.current && descriptionRef.current) {
      createTemplate({
        subject: titleRef.current.value,
        description: descriptionRef.current?.value || null,
        body: editorContent,
      });
    }
  }, [editorContent]);

  return {
    titleRef,
    descriptionRef,
    editorContent,
    onChangeContent,
    onAdd,
    isLoading,
  };
}
