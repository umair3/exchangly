import { HiShieldCheck } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { Column } from "react-table";
import { IEmailIdentityAPI } from "../../../services/Api/EmailIdentity";

export const columns: Array<Column<IEmailIdentityAPI>> = [
  {
    Header: "Identity",
    accessor: "email",
  },

  {
    Header: "Name",
    accessor: "first_name",
    Cell: ({ row }) => {
      const { first_name, last_name } = row.original;
      if (first_name && last_name) {
        return `${first_name} ${last_name}`;
      } else if (first_name && !last_name) {
        return first_name;
      } else if (!first_name && last_name) {
        return last_name;
      } else return "-";
    },
  },

  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }) => {
      if (!value) {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",

              color: "var(--secondary)",
              textShadow: "none",
              gap: "0.2em",
              fontWeight: "bold",

              fontSize: "1rem",
            }}
          >
            <MdOutlineCancel fontSize={"1.2rem"} />

            <h4>Unverified</h4>
          </div>
        );
      }
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "var(--primary)",
            fontWeight: "bold",
            gap: "0.2em",
            textShadow: "none",
            fontSize: "1rem",
          }}
        >
          <HiShieldCheck fontSize={"1.2rem"} />
          <h4>Verified</h4>
        </div>
      );
    },
  },
  {
    Header: "Default",
    accessor: "default",
    Cell: ({ value }) => {
      return (
        <div
          style={{
            textAlign: "center",

            color: "var(--primary)",
            fontWeight: "bold",

            textShadow: "none",
            fontSize: "1rem",
          }}
        >
          {value ? (
            <HiShieldCheck fontSize={"1.2rem"} />
          ) : (
            <MdOutlineCancel fontSize={"1.2rem"} />
          )}
        </div>
      );
    },
  },
];
