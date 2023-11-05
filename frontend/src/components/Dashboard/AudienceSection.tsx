import { makeStyles } from "@mui/styles";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAudienceStats } from "../../services/Api/Audience/hooks";
import { SimpleLoader } from "../Common";
import { paths } from "../../services/AppRoutes/paths";
import { ISingleTagProps } from "./SingleTag";
import TagsWithAudience from "./TagsWithAudience";

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2em",
  },
  addAudience: {
    display: "flex",
    alignItems: "center",
    gap: "1em",
    justifyContent: "space-between",
    paddingBottom: "1.2em",
    borderBottom: "1px solid var(--light20)",
  },
  typography: {
    fontSize: "1rem",
    opacity: "0.8",
    fontWeight: "bold",
  },
  addContacts: {
    background: "transparent",
    outline: "none",
    border: "none",
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "var(--secondary)",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(120%)",
      textDecoration: "underline",
    },
  },
  totalAudienceCount: {
    fontSize: "3rem",
    fontWeight: "normal",
  },
  audienceBreakDown: {
    display: "flex",
    gap: "0.6em",
    flexDirection: "column",
  },
  breakdown: {
    fontSize: "0.9rem",
    opacity: 0.9,
    fontWeight: "bold",
  },
});

export interface IAudienceSectionProps {}

const AudienceSection: React.FC<IAudienceSectionProps> = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { data, isLoading } = useAudienceStats();

  const { data: audienceStats } = data || {};

  const tags = useMemo<ISingleTagProps[]>(() => {
    if (audienceStats) {
      return Object.entries(audienceStats.tag_wise_count).map((entry) => ({
        name: entry[0],
        count: entry[1],
      }));
    }
    return [];
  }, [data]);

  const onAddContacts = () => navigate(paths.importAudienceContacts);
  return (
    <div className={classes.section}>
      <div className={classes.addAudience}>
        <h4 className={classes.typography}>Total Audience</h4>
        <button className={classes.addContacts} onClick={onAddContacts}>
          Add contacts
        </button>
      </div>

      {isLoading ? (
        <SimpleLoader />
      ) : (
        <>
          <div className={classes.totalAudienceCount}>
            {audienceStats?.total_audience}
          </div>
          {tags.length ? (
            <div className={classes.audienceBreakDown}>
              <h4 className={classes.breakdown}>Total audience breakdown</h4>
            </div>
          ) : null}
          <div>
            <TagsWithAudience tags={tags} />
          </div>
        </>
      )}
    </div>
  );
};

export default AudienceSection;
