import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Cashier name</th>
            <th className={styles.tableHeader}>Waiter name</th>
            <th className={styles.tableHeader}>Date</th>
            <th className={styles.tableHeader}>Total</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el['id']}>
              <td className={styles.tableCell}>{el['cashier']}</td>
              <td className={styles.tableCell}>{el['waiter']}</td>
              <td className={styles.tableCell}>{el['date_closed']}</td>
              <td className={styles.tableCell}>{el['total']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;