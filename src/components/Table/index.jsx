import React, { useState } from "react";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import { useNavigate } from "react-router-dom";

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const navigate = useNavigate();

  const handleNavigate = (index) => {
    navigate(`/details`, { state: slice[index] });
  }

  return (
    <>
      <table className={styles.table + ' mx-auto'}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Nombre cajero</th>
            <th className={styles.tableHeader}>Nombre garzón</th>
            <th className={styles.tableHeader}>Fecha</th>
            <th className={styles.tableHeader}>Total</th>
            <th className={styles.tableHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el, ind) => (
              <tr className={styles.tableRowItems} key={el['id']}>
                    <td className={styles.tableCell}>{el['cashier']}</td>
                    <td className={styles.tableCell}>{el['waiter']}</td>
                    <td className={styles.tableCell}>{el['date_closed']}</td>
                    <td className={styles.tableCell}>{'$' + el['total']}</td>
                    <td className={styles.tableCell}><button className={'bg-sky-800 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded'} onClick={() => handleNavigate(ind)}>Ver</button></td>
              </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page}/>
    </>
  );
};

export default Table;