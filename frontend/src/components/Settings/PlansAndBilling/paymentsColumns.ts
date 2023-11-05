import dayjs from "dayjs";
import { Column } from "react-table";
import { IPaymentsAPI } from "../../../services/Api/Billing";

const format = "DD/MM/YYYY";

export const columns: Array<Column> = [
  {
    Header: "No",
    accessor: "id",
  },
  {
    Header: "Order",
    accessor: "order",
    Cell: ({ value }) => {
      return value ? value : "-";
    },
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ row, value }) => {
      const original = row.original as IPaymentsAPI;
      if (original.currency === "USD") {
        return `$${parseFloat(value)}`;
      }

      return `${original.currency}${parseFloat(value)}`;
    },
  },

  {
    Header: "Discount",
    accessor: "discount",
    Cell: ({ row, value }) => {
      const original = row.original as IPaymentsAPI;

      if (original.currency === "USD") {
        return `$${parseFloat(value)}`;
      }

      return `${original.currency}${parseFloat(value)}`;
    },
  },
  { Header: "Status", accessor: "status" },

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
