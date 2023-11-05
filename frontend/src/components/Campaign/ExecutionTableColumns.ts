import dayjs from "dayjs";
import { Column } from "react-table";
import { ICampaignExecutionsListAPI } from "../../services/Api/Campaign";
import { changeStatusToReadableString } from "../../utils";

const format = "DD/MM/YYYY";

export const columns: Array<Column<ICampaignExecutionsListAPI>> = [
  {
    Header: "No",
    accessor: "id",
  },
  {
    Header: "Campaign",
    accessor: (row) => row.campaign.title,
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      return changeStatusToReadableString(value);
    },
  },
  {
    Header: "Created",
    accessor: "created",
    Cell: ({ value }) => dayjs(value).format(format),
  },
];
