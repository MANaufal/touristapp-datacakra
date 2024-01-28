"use client";

import { useState } from 'react';
import styles from '@/style/touristtable.module.css';
import { useRouter } from 'next/router';

const TouristTable = () => {
    const [pageNumber, setPageNumber] = useState(1);

    return (
        <div className={styles.tableContainer}>
            <div className={styles.topContainer}>
                <div className={styles.title}><b>Tourist List</b></div>
                <button className={styles.addButton}>+ Add Tourist</button>
            </div>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.columnHeader}>ID</th>
                    <th className={styles.columnHeader}>Name</th>
                    <th className={styles.columnHeader}>Location</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={styles.column}>1</td>
                    <td className={styles.column}>John Doe</td>
                    <td className={styles.column}>25</td>
                </tr>
                <tr>
                    <td className={styles.column}>2</td>
                    <td className={styles.column}>Jane Doe</td>
                    <td className={styles.column}>30</td>
                </tr>
                </tbody>
            </table>
            <div className={styles.paginationContainer}>
                <button className={styles.paginationButton}>Prev</button>
                <input 
                    className={styles.paginationInput} 
                    type='number' 
                    value={pageNumber}
                    onChange={(e) => setPageNumber(e.target.value)}    
                />
                <div className={styles.paginationFullpage}>of 1337</div>
                <button className={styles.paginationButton}>Next</button>
            </div>
        </div>
      );
}

export default TouristTable;