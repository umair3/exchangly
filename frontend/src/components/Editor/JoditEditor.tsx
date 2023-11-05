import React, { LegacyRef, useMemo, useRef, useState } from "react";
import Editor from "jodit-react";
import { Jodit } from "jodit";
import { IJodit } from "jodit/types";

interface IJoditEditorProps {
  onChange?: (value: string) => void;
  configOptions?: IJodit["options"];
  onBlur?: ((value: string) => void) | undefined;
  value: string;
}

const JoditEditor = React.forwardRef<Editor, IJoditEditorProps>(
  ({ onChange, configOptions, onBlur, value }, ref) => {
    const config = useMemo<IJodit["options"]>(
      () => ({
        ...Jodit.defaultOptions,
        allowResizeTags: ["img", "iframe", "table", "jodit"],
        minHeight: "400px",
        iframe: true,

        width: "100%",
        ...configOptions,
      }),
      [configOptions]
    );

    return (
      <Editor
        ref={ref}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        config={config}
      />
    );
  }
);

export default JoditEditor;
