import { makeStyles } from "@mui/styles";
import React, { useCallback, useMemo, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin3Line } from "react-icons/ri";
import { Column, useTable } from "react-table";
import { useTableStyles, useToggle } from "../../../hooks";
import { CustomModal, CustomTooltip } from "../../Common";
import DeleteRole from "./DeleteRole";
import EditRole from "./EditRole";
import { columns } from "./RolesColumns";

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

interface IRole {
  name: string;
  permissions: string;
  id: number;
}

interface IRolesList {
  list: IRole[];
}

const RolesList = ({ list }: IRolesList) => {
  const classes = useStyles();
  const [showEditModal, setEditModal] = useToggle(false);
  const [showDeleteModal, setDeleteModal] = useToggle(false);

  const [roleSelected, setRoleSelected] = useState<IRole | null>(null);

  const changeRoleData = useCallback((params: IRole | null = null) => {
    setRoleSelected(params);
  }, []);

  const onEdit = (params: IRole | null = null) => {
    setEditModal();
    changeRoleData(params);
  };
  const onDelete = (params: IRole | null = null) => {
    setDeleteModal();
    changeRoleData(params);
  };

  const tableStyles = useTableStyles();

  const data = useMemo(() => list, [list]);
  const headers = useMemo(() => columns as Column<IRole>[], []);
  const tableInstance = useTable({ columns: headers, data }, (hooks) =>
    hooks.visibleColumns.push((tableColumns) => [
      ...tableColumns,
      {
        Header: "Actions",
        accessor: "name",
        Cell: (props) => {
          const { name, id, permissions } = props.row.original;
          return (
            <div style={{ display: "flex", gap: "0.4em", overflow: "auto" }}>
              <CustomTooltip
                arrow
                title={
                  <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Edit {name}
                  </h3>
                }
              >
                <div>
                  <BiEdit
                    fontSize="1.5rem"
                    className={classes.icon}
                    onClick={() => onEdit({ name, id, permissions })}
                  />
                </div>
              </CustomTooltip>

              <CustomTooltip
                arrow
                title={
                  <h3 style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Delete role :{name}
                  </h3>
                }
              >
                <div>
                  <RiDeleteBin3Line
                    fontSize="1.5rem"
                    className={classes.icon}
                    onClick={() => onDelete({ name, id, permissions })}
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
          </tbody>
        </table>
      </div>

      {roleSelected && (
        <CustomModal
          open={showDeleteModal}
          handleClose={onDelete}
          className={classes.modal}
          closeIcon
        >
          <DeleteRole
            closeModal={onDelete}
            name={roleSelected.name}
            id={roleSelected.id}
          />
        </CustomModal>
      )}

      {roleSelected && (
        <CustomModal
          open={showEditModal}
          handleClose={onEdit}
          className={classes.modal}
          style={{ width: "min(480px,98%)" }}
          closeIcon
        >
          <EditRole
            closeModal={onEdit}
            name={roleSelected.name}
            id={roleSelected.id}
          />
        </CustomModal>
      )}
    </React.Fragment>
  );
};
export default RolesList;
