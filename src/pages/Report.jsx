import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/Report.module.scss';
import Avatar from '@mui/material/Avatar';
import bank from '../img/bank.jpg'
import { format } from 'date-fns';

import Test from './test';


function Report(props) {
    const [APIData, setAPIData] = useState([]);          // Lưu dữ liệu API gốc
    const [branch, setBranch] = useState({});
    const [loading, setLoading] = useState(true);

    // useEffect để gọi API khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Kiểm tra nếu dữ liệu đã tồn tại trong sessionStorage
            // sessionStorage.removeItem('branchData');
            const storedData = sessionStorage.getItem('branchData');
            if (storedData) {
                // Nếu có dữ liệu trong sessionStorage, dùng dữ liệu đó
                setAPIData(JSON.parse(storedData));
                setLoading(false);
            } else {
                // Nếu chưa có dữ liệu trong sessionStorage, gọi API để lấy dữ liệu
                try {
                    const response = await axios.get(`http://localhost:8080/customer/branch`);
                    setAPIData(response.data);
                    // Lưu dữ liệu vào sessionStorage để sử dụng sau này
                    sessionStorage.setItem('branchData', JSON.stringify(response.data));
                    setLoading(false);
                } catch (error) {
                    console.error("Lỗi khi gọi API:", error);
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, []);

    const handleListAccout = (branch) => {
        setBranch(branch);
    }

    return (
        <div className='grid' style={{ padding: '40px 40px' }}>
            <div className="row">
                <div className={`col l-3 ${styles.container}`}>

                    <h2>Branch (Chi Nhánh)</h2>
                    {loading ?
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Spinner animation="border" className={styles.loading__spinner} variant="primary" />
                        </div>
                        :
                        <>
                            <div>
                                <table border="2" style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th>Branch Name</th>
                                            <th>Branch City</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {APIData.map((branch, index) => (
                                            <tr onClick={() => handleListAccout(branch)} key={index}>
                                                <td>{branch.bname}</td>
                                                <td>{branch.bcity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    }

                </div>
                <div className="col l-9">
                    <div className={styles.container}>
                        <Test branch={branch} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;