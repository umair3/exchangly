import dayjs from "dayjs";
import { Column } from "react-table";

const format = "DD/MM/YYYY";

export const columns: Array<Column> = [
  {
    Header: "No",
    accessor: "id",
  },
  {
    Header: "Emails",
    accessor: "email",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Created",
    accessor: "created",
    Cell: ({ value }) => dayjs(value).format(format),
  },
  {
    Header: "Updated",
    accessor: "updated",
    Cell: ({ value }) => dayjs(value).format(format),
  },
];
