"use client";

import { useEffect, useState, useRef } from 'react';
import styles from '@/style/touristtable.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const TouristTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [tourists, setTourists] = useState(null);
    const [totalPage, setTotalPage] = useState(1);

    const paginationInput = useRef(null);

    const fetchData = async () => {
        const response = await fetch(`https://biroperjalanan.datacakra.com/api/Tourist?page=${pageNumber}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${Cookies.get('token')}`
            },
        });

        if(response.ok){
            var responseData = await response.json();

            setTourists(responseData.data);

            setTotalPage(responseData.total_pages);
        }
    }

    const deleteTourist = async (touristId) => {
        const response = await fetch(`/api/Tourist/${touristId}`, {
            method: 'DEL',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': `Bearer ${Cookies.get('token')}`
               },
           });
   
           if(response.ok){
               
           }
    }

    const handleEnterDown = (event) => {
        if (event.key === 'Enter') {
            if (event.target.value < 1) {
                setPageNumber(1);
            } else if (event.target.value > totalPage) {
                setPageNumber(totalPage);
            } else {
                setPageNumber(event.target.value);
            }
        }
    };
    

    useEffect(() => {
        console.log('start');
        fetchData();
        paginationInput.current.value = '';
    }, [pageNumber]);

    return (
        <div className={styles.tableContainer}>
            <div className={styles.topContainer}>
                <div className={styles.title}><b>Tourist List</b></div>
                <button className={styles.addButton}>+ Add Tourist</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.columnHeader}>ID</th>
                        <th className={styles.columnHeader}>Name</th>
                        <th className={styles.columnHeader}>Location</th>
                    </tr>
                    </thead>
                    {tourists ? (
                        <tbody>
                            {tourists.map((tourist, index) => (
                                <tr key={tourist.id}>
                                    <td className={styles.column}>{tourist.id}</td>
                                    <td className={styles.column}>{tourist.tourist_email}</td>
                                    <td className={styles.column}>{tourist.tourist_location}</td>
                                    <td className={styles.column}><button className={styles.deleteButton} onClick={deleteTourist(tourist.id)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    ) : 
                        <tbody>
                            <tr>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                            </tr>
                            <tr>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                            </tr>
                            <tr>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                            </tr>
                            <tr>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                            </tr>
                            <tr>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                            </tr>
                            <tr>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                            </tr>
                            <tr>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                                <td className={`${styles.column} ${styles.columnLoading}`}></td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
            <div className={styles.paginationContainer}>
                    <button className={styles.paginationButton} onClick={()=>setPageNumber(pageNumber - 1)} disabled={pageNumber == 1}>Prev</button>
                    <input 
                        className={styles.paginationInput} 
                        type='number' 
                        placeholder={pageNumber}
                        ref={paginationInput}
                        onKeyDown={handleEnterDown}
                    />
                    <div className={styles.paginationFullpage}>of {totalPage}</div>
                    <button className={styles.paginationButton} onClick={()=>setPageNumber(pageNumber+1)} disabled={pageNumber == totalPage}>Next</button>
            </div>
        </div>
      );
}

export default TouristTable;