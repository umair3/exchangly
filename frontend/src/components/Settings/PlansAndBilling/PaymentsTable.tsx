import React, { useMemo } from "react";
import { Column, useTable } from "react-table";
import { useIsFetchingData, useTableStyles } from "../../../hooks";
import { IPaymentsAPI } from "../../../services/Api/Billing";
import { OpacityTransition } from "../../Common";
import { columns } from "./paymentsColumns";
import PaymentsSkeleton from "./PaymentsSkeleton";

interface IPaymentsListProps {
  paymentsList: IPaymentsAPI[];
}

const PaymentsList: React.FC<IPaymentsListProps> = ({ paymentsList }) => {
  const tableStyles = useTableStyles({ align: "center" });
  const isFetching = useIsFetchingData(["payments"]);

  const data = useMemo(() => paymentsList, [paymentsList]);
  const headers = useMemo(() => columns as Column<IPaymentsAPI>[], []);

  const tableInstance = useTable({ columns: headers, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <React.Fragment>
      <OpacityTransition className="max-h-[540px]">
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
            {isFetching && <PaymentsSkeleton />}

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
      </OpacityTransition>
    </React.Fragment>
  );
};

export default PaymentsList;
