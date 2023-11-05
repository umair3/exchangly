import { makeStyles } from "@mui/styles";
import React from "react";

import { SingleIntegration } from ".";
import { useIsFetchingData } from "../../hooks";
import { ISingleIntegrationAPI } from "../../services/Api/Integrations";
import IntegrationItemSkeleton from "./IntegrationItemSkeleton";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    fontWeight: "normal",
    gap: "1.4em",

    "& h3": {
      color: "var(--primary)",
    },
  },
  list: {
    width: "100%",
    display: "grid",

    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "1.2em",
  },
  noIntegrationsMessage: {
    padding: "1em",
    backgroundColor: "var(--primary)",
    color: "var(--light)",
    borderRadius: "0.5em",
    fontWeight: "bold",
    display: "flex",
    gap: "1em",
    flexDirection: "column",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
});

interface IIntegrationsListProps {
  integrations: ISingleIntegrationAPI[];
}

const IntegrationsList: React.FC<IIntegrationsListProps> = ({
  integrations,
}) => {
  const classes = useStyles();

  const isFetching = useIsFetchingData(["integrationList"]);

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.heading}>List of added Integrations</h3>
      <div className={classes.list}>
        {isFetching && (
          <>
            <IntegrationItemSkeleton />
            <IntegrationItemSkeleton />
            <IntegrationItemSkeleton />
            <IntegrationItemSkeleton />
            <IntegrationItemSkeleton />
          </>
        )}

        {!isFetching && !integrations.length ? (
          <div className={classes.noIntegrationsMessage}>
            <p>Total Results found : 0</p>
            <p>
              If you want to create a new one? Click on Add New Integrations
              Button above.
            </p>
          </div>
        ) : (
          React.Children.toArray(
            integrations.map(({ key, ...rest }) => (
              <div>
                <SingleIntegration keyProp={key} {...rest} />
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default IntegrationsList;
