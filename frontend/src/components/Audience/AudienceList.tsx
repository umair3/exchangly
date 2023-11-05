import { makeStyles } from "@mui/styles";
import React, { useCallback, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import {
  useIsFetchingData,
  useNavigation,
  useTableStyles,
  useToggle,
} from "../../hooks";
import { IAudienceListAPI } from "../../services/Api/Audience";
import { columns } from "./audienceListTableColumns";
import AudienceItemSkeleton from "./AudienceItemSkeleton";
import { useUserJourneyActions } from "../../features/userJourney";
import { paths } from "../../services/AppRoutes/paths";
import { CustomModal, CustomTooltip } from "../Common";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdTimeline } from "react-icons/md";

import DeleteAudience from "./DeleteAudience";
import EditAudience from "./EditAudience";

const useStyles = makeStyles({
  list: {
    marginTop: "30px",
    height: "auto",
    maxHeight: "550px",
    overflowY: "auto",
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
    width: "min(550px,98%)",

    overflow: "auto",
  },
});

interface IAudienceListProps {
  audienceList: IAudienceListAPI[];
}

export interface ISelectAudience {
  id: number;
  email: string;
  status?: string;
}

const AudienceList: React.FC<IAudienceListProps> = ({ audienceList }) => {
  const classes = useStyles();
  const [showEditModal, setEditModal] = useToggle(false);
  const [showDeleteModal, setDeleteModal] = useToggle(false);

  const [selectedAudience, setSelectedAudience] =
    useState<ISelectAudience | null>(null);

  const isFetching = useIsFetchingData(["audienceList"]);
  const data = useMemo(() => audienceList, [audienceList]);
  const headers = useMemo(() => columns as Column<IAudienceListAPI>[], []);
  const { setSearchEmail } = useUserJourneyActions();
  const { goToPath } = useNavigation();

  const viewTimeline = (email: string) => {
    setSearchEmail(email);
    goToPath(paths.userJourney);
  };

  const changeAudienceSelectData = useCallback(
    (params: ISelectAudience | null = null) => {
      setSelectedAudience(params);
    },
    []
  );

  const onEdit = (params: ISelectAudience | null = null) => {
    setEditModal();
    changeAudienceSelectData(params);
  };
  const onDelete = (params: ISelectAudience | null = null) => {
    setDeleteModal();
    changeAudienceSelectData(params);
  };

  const tableStyles = useTableStyles({ align: "left" });
  const tableInstance = useTable({ columns: headers, data }, (hooks) =>
    hooks.visibleColumns.push((tableColumns) => [
      ...tableColumns,
      {
        Header: "Actions",
        accessor: "email",
        Cell: (props) => {
          const { email, id, status } = props.row.original;
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
                    onClick={() => onEdit({ email, id, status })}
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
                    onClick={() => onDelete({ email, id })}
                  />
                </div>
              </CustomTooltip>

              <CustomTooltip
                arrow
                title={
                  <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    View timeline for {email}
                  </h3>
                }
              >
                <div>
                  <MdTimeline
                    onClick={() => viewTimeline(email)}
                    fontSize="1.5rem"
                    className={classes.icon}
                  />
                </div>
              </CustomTooltip>
            </div>
          );
        },
      },
    ])
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <React.Fragment>
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
            {isFetching && <AudienceItemSkeleton />}

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
      {selectedAudience && (
        <CustomModal
          open={showDeleteModal}
          handleClose={onDelete}
          className={classes.modal}
          closeIcon
        >
          <DeleteAudience
            closeModal={onDelete}
            email={selectedAudience?.email}
            id={selectedAudience.id}
          />
        </CustomModal>
      )}

      {selectedAudience && (
        <CustomModal
          open={showEditModal}
          handleClose={onEdit}
          className={classes.modal}
          style={{ width: "min(480px,98%)" }}
          closeIcon
        >
          <EditAudience closeModal={onEdit} contact={selectedAudience} />
        </CustomModal>
      )}
    </React.Fragment>
  );
};

export default AudienceList;
