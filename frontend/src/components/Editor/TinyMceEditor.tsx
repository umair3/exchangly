import { Editor } from "@tinymce/tinymce-react";

import React from "react";

interface ITinyMceEditor {
  initialValue: string;
  onInitCallback?: () => void;
}

const TINYMCE_KEY: string = process.env.REACT_APP_TINYMCE as string;

const TinyMceEditor = React.forwardRef<any | null, ITinyMceEditor>(
  ({ initialValue, onInitCallback }, ref) => {
    return (
      <Editor
        initialValue={initialValue}
        apiKey={TINYMCE_KEY}
        init={{
          placeholder: "Add your content here...",
          height: "80vh",
          plugins: [
            "advlist autolink lists link image codesample",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount template",
          ],
          paste_as_text: true,
          toolbar:
            "undo redo | formatselect | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive",
        }}
        onInit={(event, editor) => {
          if (ref && typeof ref !== "function") {
            ref.current = editor;
          }
          onInitCallback && onInitCallback();
        }}
      />
    );
  }
);

export default React.memo(TinyMceEditor);
