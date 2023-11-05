import React, { useCallback, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { CustomButton, LinearLoader, PageContainer } from "../../Common";

import { useCampaignActions } from "../../../features/campaign";
import { ShowAlert } from "../../../features/alert";
import { MdSave } from "react-icons/md";
import { TinyMceEditor } from "../../Editor";
import { useLoading } from "../../../hooks";

const useStyles = makeStyles({
  buttonContainer: {
    width: "100%",
    position: "sticky",
    backgroundColor: "var(--light)",
    padding: "1em",
    display: "flex",
    justifyContent: "end",
    flexWrap: "wrap",
    gap: "1em",
  },
});

interface IContentEditorProps {
  closeModal: () => void;
  template: string;
}

const ContentEditor: React.FC<IContentEditorProps> = ({
  closeModal,
  template,
}) => {
  const classes = useStyles();
  const editorRef = useRef<any>(null);
  const [loading, setLoading] = useLoading(true);

  const { updateContentTemplate } = useCampaignActions();

  const onSave = () => {
    if (!editorRef.current) return;

    const content = editorRef.current.getContent({ format: "html" });

    if (!content) {
      ShowAlert({
        message: "No content is provided",
        status: "error",
      });
      return;
    }

    updateContentTemplate(content);
    ShowAlert({
      message: "Content is updated",
      status: "success",
    });
    closeModal();
  };

  const onInitCallback = useCallback(() => setLoading(false), []);

  return (
    <PageContainer style={{ margin: "2rem auto", maxWidth: "1600px" }}>
      {loading && (
        <LinearLoader style={{ backgroundColor: "rgb(255,255,255)" }} />
      )}
      <div className="unreset">
        <TinyMceEditor
          ref={editorRef}
          initialValue={template}
          onInitCallback={onInitCallback}
        />
      </div>

      {!loading && (
        <div className={classes.buttonContainer}>
          <CustomButton startIcon={<MdSave />} onClick={onSave}>
            Save
          </CustomButton>
          <CustomButton icon="cancel" onClick={closeModal}>
            Cancel
          </CustomButton>
        </div>
      )}
    </PageContainer>
  );
};

export default ContentEditor;
