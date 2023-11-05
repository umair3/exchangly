import { useCallback, useRef, useState } from "react";
import { ShowAlert } from "../../../../features/alert";
import { useUpdateTemplate } from "../../../../services/Api/Templates/hooks";

import { InputElem } from "../../../Common/CustomInput";

export function useEditTemplate(template: string) {
  const titleRef = useRef<InputElem | null>(null);
  const descriptionRef = useRef<InputElem>(null);
  const [editorContent, setEditorContent] = useState<string>(template);
  const { isLoading, updateTemplate } = useUpdateTemplate();

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

  const onUpdate = useCallback(
    (id: number) => {
      if (
        checkRequiredFields() &&
        titleRef.current &&
        descriptionRef.current &&
        id
      ) {
        updateTemplate({
          subject: titleRef.current.value,
          description: descriptionRef.current?.value || null,
          body: editorContent,
          id,
        });
      }
    },
    [editorContent]
  );

  return {
    titleRef,
    descriptionRef,
    editorContent,
    onChangeContent,
    onUpdate,
    isLoading,
  };
}
