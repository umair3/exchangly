import { makeStyles } from "@mui/styles";
import React, { useRef } from "react";
import { FaCopy } from "react-icons/fa";

import CustomTooltip from "./CustomTooltip";

const useStyles = makeStyles({
  wrapper: {
    padding: "0.5em 1em",
    width: "100%",
    backgroundColor: "var(--primary)",
    borderRadius: "1em",
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    background: "transparent",
    outline: "none",
    border: "none",
    width: "100%",
    color: "var(--light)",
    fontSize: "1rem",
    paddingInline: "0.2em",
  },
  button: {
    fontWeight: "bold",
    filter: "brightness(200%)",
    color: "var(--secondary)",
    position: "relative",
    cursor: "pointer",

    "&:hover": {
      filter: "brightness(150%)",
    },
  },
});

interface IClipboardInputProps {
  value: string;
}

const ClipboardInput: React.FC<IClipboardInputProps> = ({ value }) => {
  const classes = useStyles();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onCopyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(inputRef.current.value);
    }
  };

  return (
    <div className={classes.wrapper}>
      <input
        className={classes.input}
        type="text"
        name="clipboard"
        id="clipboardText"
        value={value}
        readOnly
        ref={inputRef}
      />

      <CustomTooltip arrow title="Copy to Clipboard">
        <div>
          <FaCopy
            className={classes.button}
            fontSize="1rem"
            onClick={onCopyToClipboard}
          />
        </div>
      </CustomTooltip>
    </div>
  );
};

export default ClipboardInput;
