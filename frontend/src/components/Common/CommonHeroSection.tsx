import { makeStyles } from "@mui/styles";
import React from "react";
import { IconType } from "react-icons";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    gap: "2vmin",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  head: {
    width: "min(700px,100%)",
    display: "flex",
    flexDirection: "column",

    gap: "0.5em",
    lineHeight: 1.1,
  },

  h1: {
    fontWeight: "lighter",

    textShadow: "0px 0px 1px var(--primary)",
  },
  buttonContainer: {
    marginTop: "0.7em",
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    gap: "1em",
  },

  "@media screen and (max-width:1030px)": {
    container: {
      padding: "3em 2em",
    },
    wrapper: {
      flexDirection: "column",
    },
    head: {
      textAlign: "center",
    },
    buttonContainer: {
      justifyContent: "center",
    },
  },
});

interface ICommonHeroSectionProps {
  Icon: IconType;
  mainHeader: string;
  description: string;
  children?: (props: ReturnType<typeof useStyles>) => JSX.Element;
}

const CommonHeroSection: React.FC<ICommonHeroSectionProps> = ({
  Icon,
  mainHeader,
  description,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className="bg-black/80 relative text-white py-16 px-3 md:px-16 border-b border-primary/80">
      <div className="absolute bg-gradient-to-tr  from-primary to-secondary opacity-10  flex justify-center items-center inset-0 w-full h-full">
        <Icon fontSize={"20rem"} className="opacity-50  text-gray-100 z-10" />
      </div>
      <div className={classes.wrapper}>
        <div className="hidden sm:block">
          <Icon fontSize={"10rem"} className="text-gray-100" />
        </div>
        <div className={classes.head}>
          <h1 className={`${classes.h1} text-3xl sm:text-4xl`}>{mainHeader}</h1>
          <p className="text-base sm:text-md">{description}</p>
          {children && children(classes)}
        </div>
      </div>
    </div>
  );
};

export default CommonHeroSection;
