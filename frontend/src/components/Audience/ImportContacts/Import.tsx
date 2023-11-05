import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import * as yup from "yup";

import { useAppSelector } from "../../../app/hooks";
import { ShowAlert } from "../../../features/alert";
import { useAudienceActions } from "../../../features/audience";

import {
  CustomButton,
  CustomInput,
  CustomTooltip,
  OpacityTransition,
} from "../../Common";
import { InputElem } from "../../Common/CustomInput";

const useStyles = makeStyles({
  importContainer: {
    width: "100%",
    padding: "16px",
  },
  headerText: {
    fontWeight: 600,
    fontSize: "1.6rem",
    color: "var(--dark)",
  },
  helperText: {
    fontSize: "1rem",
    margin: "10px 0",
    lineHeight: "30px",
    "& span": {
      marginLeft: "5px",
      textDecoration: "underline",
      color: "var(--primary)",
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
  email: {
    fontSize: "1rem",
  },
  textAreaContainer: {
    marginTop: "30px",
  },
  textAreaText: {
    fontSize: "1rem",
    lineHeight: "30px",
  },
  input: {
    width: "60%",
  },

  buttonContainer: {
    marginTop: "20px",
  },

  "@media screen and (max-width:600px)": {
    input: {
      width: "100%",
    },
  },
});

const schema = yup.object().shape({
  email: yup.string().email("Invalid email"),
});

interface IImportProps {
  switchToSection?: () => void;
}

const Import: React.FC<IImportProps> = ({ switchToSection }) => {
  const classes = useStyles();
  const list = useAppSelector((state) =>
    state.audience.importAudience.import.copyPaste.join("\n")
  );

  const { setImport } = useAudienceActions();
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setInput(list);
  }, [list]);

  const onChangeHandler = (event: React.ChangeEvent<InputElem>) => {
    setInput(event.target.value);
  };

  const onContinue = () => {
    const emailsList = input.split("\n");

    if (emailsList[0]) {
      Promise.all(emailsList.map((email) => validateEmail(email)))
        .then(() => {
          setImport({ copyPaste: emailsList, type: "Copy and Paste" });

          switchToSection && switchToSection();
        })
        .catch((_error) =>
          ShowAlert({
            message:
              'Emails are invalid or format is incorrect \n(Please look into "Learn how" to import properly)',
            status: "error",
          })
        );
    } else {
      ShowAlert({ message: "Email contacts are required", status: "error" });
    }
  };

  const validateEmail = (email: string) => schema.validate({ email });

  return (
    <OpacityTransition className={classes.importContainer}>
      <h4 className={classes.headerText}>Copy and Paste your contacts</h4>
      <div className={classes.helperText}>
        Not sure how to format your file ?
        <CustomTooltip
          title={
            <div style={{ padding: "5px" }}>
              Add emails separated by new line e.g
              <br /> <span className={classes.email}>sample@gmail.com</span>
              <br />
              <span className={classes.email}>sample@hotmail.com</span>
            </div>
          }
          arrow
        >
          <span>Learn how</span>
        </CustomTooltip>
      </div>

      <div className={classes.textAreaContainer}>
        <div className={classes.textAreaText}>
          Paste your contact information into this field.
        </div>
        <div className={classes.input}>
          <CustomInput
            type="textarea"
            rows={5}
            placeholder="email@gmail.com&#10;email@yahoo.com&#10;email@outlook.com&#10;email@hotmail.com"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <CustomButton
          endIcon={<BsArrowRightShort fontSize="1rem" />}
          onClick={onContinue}
        >
          Continue to organize
        </CustomButton>
      </div>
    </OpacityTransition>
  );
};

export default Import;
