import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import React, { useMemo } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeTab } from "../../features/campaign";

import { ILabelValue } from "../Common/CustomSelect";
import ListView from "./ListView";
import ExecutionView from "./ExecutionView";
import { useCampaignExecutionFilterOptions } from "../../services/Api/Campaign/hooks";

const useStyles = makeStyles({
  indicator: {
    background: "var(--secondary)!important",
  },
  tab: {
    color: "var(--secondary)!important",
  },
});

export enum ViewEnum {
  LIST_VIEW = "LIST_VIEW",
  EXECUTION_VIEW = "EXECUTION_VIEW",
}

interface IViewProps {}

const View: React.FC<IViewProps> = (props) => {
  const classes = useStyles();

  const { tab } = useAppSelector((state) => state.campaign.main);
  const dispatch = useAppDispatch();

  const handleChange = (_: React.SyntheticEvent, newValue: ViewEnum) => {
    dispatch(changeTab(newValue));
  };

  const { list: optionsList } = useCampaignExecutionFilterOptions();

  const optionsWithLabels = useMemo<ILabelValue[]>(
    () =>
      optionsList.map(({ id, title }) => ({ label: title, value: String(id) })),
    [optionsList]
  );

  const tabStyle: React.CSSProperties = {
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 900,
  };

  return (
    <React.Fragment>
      <TabContext value={tab}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="List Campaign View"
            classes={{ indicator: classes.indicator }}
          >
            <Tab
              disableFocusRipple
              disableRipple
              label={<div style={tabStyle}>List View</div>}
              value={ViewEnum.LIST_VIEW}
              classes={{ root: classes.tab }}
            />

            <Tab
              disableFocusRipple
              disableRipple
              label={<div style={tabStyle}>Execution View</div>}
              value={ViewEnum.EXECUTION_VIEW}
              classes={{ root: classes.tab }}
            />
          </TabList>
        </Box>
        <TabPanel value={ViewEnum.LIST_VIEW}>
          <ListView />
        </TabPanel>
        <TabPanel
          value={ViewEnum.EXECUTION_VIEW}
          style={{ paddingInline: "0" }}
        >
          <ExecutionView options={optionsWithLabels} />
        </TabPanel>
      </TabContext>
    </React.Fragment>
  );
};

export default View;
