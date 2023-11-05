import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { useIsFetchingData, useTableStyles } from "../../hooks";
import { ICampaignExecutionsListAPI } from "../../services/Api/Campaign";
import { paths } from "../../services/AppRoutes/paths";
import { CustomButton, OpacityTransition } from "../Common";
import ExecutionItemSkeleton from "./ExecutionItemSkeleton";
import { columns } from "./ExecutionTableColumns";

interface IExecutionViewTableProps {
  list: ICampaignExecutionsListAPI[];
}

const ExecutionViewTable: React.FC<IExecutionViewTableProps> = ({ list }) => {
  const navigate = useNavigate();
  const data = useMemo(() => list, [list]);
  const headers = useMemo(() => columns, []);
  const isFetching = useIsFetchingData(["campaignExecutions"]);

  const tableStyles = useTableStyles({ align: "center" });
  const tableInstance = useTable({ columns: headers, data }, (hooks) =>
    hooks.visibleColumns.push((tableColumns) => [
      ...tableColumns,
      {
        Header: "Action",
        accessor: "id",
        Cell: (props) => {
          const { id } = props.row.original;
          return (
            <CustomButton
              onClick={() =>
                navigate(
                  paths.campaignExecutionLogs.replace(
                    ":executionId",
                    String(id)
                  )
                )
              }
            >
              View Logs
            </CustomButton>
          );
        },
      },
    ])
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <OpacityTransition>
      <div style={{ overflow: "auto", width: "100%" }}>
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
            {isFetching && <ExecutionItemSkeleton />}

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
    </OpacityTransition>
  );
};

export default ExecutionViewTable;
