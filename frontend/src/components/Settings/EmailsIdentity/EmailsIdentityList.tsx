import { makeStyles } from "@mui/styles";
import React, { useCallback, useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { RiDeleteBin3Line, RiMailSendLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

import {
  DeleteIdentity,
  EditIdentity,
  ResendConfirmationEmailIdentity,
  EmailIdentitiesSkeleton,
} from ".";
import { useIsFetchingData, useTableStyles, useToggle } from "../../../hooks";
import { IEmailIdentityAPI } from "../../../services/Api/EmailIdentity";
import { paths } from "../../../services/AppRoutes/paths";
import { CustomButton, CustomModal, CustomTooltip } from "../../Common";
import { columns } from "./columns";

const useStyles = makeStyles({
  totalIdenties: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingBlock: "1em",
    paddingRight: "0.5em",
    alignItems: "center",
    color: "var(--primary)",
    gap: "1.5em",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  icon: {
    cursor: "pointer",
    fontWeight: "bold",
    color: "var(--primary)",
    opacity: 0.6,
    "&:hover": {
      color: "var(--secondary)",
      opacity: 1,
    },
  },
  modal: {
    padding: " 2em",
    minWidth: "min(450px,98%)",

    overflow: "auto",
  },
  list: {
    marginTop: "0.5em",
    height: "auto",
    maxHeight: "500px",
    overflowY: "auto",
  },
});

interface IEmailsIdentityListProps {
  identities: IEmailIdentityAPI[];
}

interface ISelectIdentity {
  id: number;
  email: string;
  status: boolean;
  first_name: string;
  last_name: string;
  default: boolean;
}

const EmailsIdentityList: React.FC<IEmailsIdentityListProps> = ({
  identities,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const isFetching = useIsFetchingData(["emailIdentities"]);
  const [showEditModal, setEditModal] = useToggle(false);
  const [showDeleteModal, setDeleteModal] = useToggle(false);

  const [showConfirmationModal, setConfirmationModal] = useToggle(false);
  const [selectedIdentity, setSelectedIdentity] =
    useState<ISelectIdentity | null>(null);

  const tableStyles = useTableStyles();

  const data = useMemo(() => identities, [identities]);
  const headers = useMemo(() => columns, []);

  const changeIdentityData = useCallback(
    (params: ISelectIdentity | null = null) => {
      setSelectedIdentity(params);
    },
    []
  );

  const onEdit = (params: ISelectIdentity | null = null) => {
    setEditModal();
    changeIdentityData(params);
  };

  const onDelete = (params: ISelectIdentity | null = null) => {
    setDeleteModal();
    changeIdentityData(params);
  };

  const onResendConfirmation = (params: ISelectIdentity | null = null) => {
    setConfirmationModal();
    changeIdentityData(params);
  };

  const tableInstance = useTable({ columns: headers, data }, (hooks) =>
    hooks.visibleColumns.push((tableColumns) => [
      ...tableColumns,
      {
        Header: "Actions",
        accessor: "id",
        Cell: (props) => {
          const {
            email,
            status,
            id,
            first_name,
            last_name,
            default: defaultSelected,
          } = props.row.original;
          return (
            <div style={{ display: "flex", gap: "0.4em", overflow: "auto" }}>
              <CustomTooltip
                arrow
                title={
                  <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Edit {email}
                  </h3>
                }
              >
                <div>
                  <BiEdit
                    fontSize="1.5rem"
                    className={classes.icon}
                    onClick={() =>
                      onEdit({
                        email,
                        status,
                        id,
                        first_name,
                        last_name,
                        default: defaultSelected,
                      })
                    }
                  />
                </div>
              </CustomTooltip>

              <CustomTooltip
                arrow
                title={
                  <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Delete email :{email}
                  </h3>
                }
              >
                <div>
                  <RiDeleteBin3Line
                    fontSize="1.5rem"
                    className={classes.icon}
                    onClick={() =>
                      onDelete({
                        email,
                        status,
                        id,
                        first_name,
                        last_name,
                        default: defaultSelected,
                      })
                    }
                  />
                </div>
              </CustomTooltip>

              {!props.row.original.status && (
                <CustomTooltip
                  arrow
                  title={
                    <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                      Resend Confirmation Email to {email}
                    </h3>
                  }
                >
                  <div>
                    <RiMailSendLine
                      fontSize="1.5rem"
                      className={classes.icon}
                      onClick={() =>
                        onResendConfirmation({
                          email,
                          status,
                          id,
                          first_name,
                          last_name,
                          default: defaultSelected,
                        })
                      }
                    />
                  </div>
                </CustomTooltip>
              )}
            </div>
          );
        },
      },
    ])
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <div className={classes.totalIdenties}>
        <h3>
          Total Identities
          <span>({identities.length > 0 ? identities.length : "-"})</span>
        </h3>
        <CustomButton
          startIcon={<MdEmail />}
          onClick={() => navigate(paths.createEmailIdentity)}
        >
          Create Identity
        </CustomButton>
      </div>
      <div className={classes.list}>
        <table className={tableStyles.table} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className={tableStyles.tableHeadRow}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={tableStyles.tableHeader}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {isFetching && <EmailIdentitiesSkeleton />}

            {!isFetching && (
              <>
                {rows.length === 0 ? (
                  <tr className={tableStyles.tableBodyRow}>
                    <td
                      colSpan={12}
                      className={tableStyles.tableData}
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "var(--secondary)",
                      }}
                    >
                      No data available in table
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className={tableStyles.tableBodyRow}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={tableStyles.tableData}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      {selectedIdentity && (
        <CustomModal
          open={showEditModal}
          handleClose={onEdit}
          className={classes.modal}
          closeIcon
        >
          <EditIdentity
            email={selectedIdentity?.email}
            id={selectedIdentity.id}
            defaultValue={selectedIdentity?.default}
            first_name={selectedIdentity?.first_name}
            last_name={selectedIdentity?.last_name}
            status={selectedIdentity.status}
            closeModal={onEdit}
          />
        </CustomModal>
      )}

      {selectedIdentity && (
        <CustomModal
          open={showDeleteModal}
          handleClose={onDelete}
          className={`${classes.modal} !max-w-lg`}
          closeIcon
        >
          <DeleteIdentity
            closeModal={onDelete}
            email={selectedIdentity?.email}
            id={selectedIdentity.id}
          />
        </CustomModal>
      )}
      {selectedIdentity && (
        <CustomModal
          open={showConfirmationModal}
          handleClose={onResendConfirmation}
          className={classes.modal}
          closeIcon
        >
          <ResendConfirmationEmailIdentity
            closeModal={onResendConfirmation}
            email={selectedIdentity?.email}
            id={selectedIdentity.id}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default EmailsIdentityList;
