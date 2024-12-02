import React, { useEffect, useState } from 'react';
import axios from 'axios';
import data from '../db/branch.json';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/Report.module.scss';
import Avatar from '@mui/material/Avatar';
import bank from '../img/bank.jpg'
import employeeData from '../db/employee.json'
import { format } from 'date-fns';

import Test from './test';


function Report(props) {
    const [APIData, setAPIData] = useState(data);          // Lưu dữ liệu API gốc
    const [branch, setBranch] = useState({})
    const [loading, setLoading] = useState(false);
    const [employee, setEmployee] = useState(employeeData);

    console.log(employee);
    // useEffect để gọi API khi component được mount
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         // Kiểm tra nếu dữ liệu đã tồn tại trong sessionStorage
    //         const storedData = sessionStorage.getItem('customerData');
    //         if (storedData) {
    //             // Nếu có dữ liệu trong sessionStorage, dùng dữ liệu đó
    //             setAPIData(JSON.parse(storedData));
    //             setFilteredResults(JSON.parse(storedData)); // Hiển thị tất cả dữ liệu ban đầu
    //             setLoading(false);
    //         } else {
    //             // Nếu chưa có dữ liệu trong sessionStorage, gọi API để lấy dữ liệu
    //             try {
    //                 const response = await axios.get(`http://localhost:8080/customer`);
    //                 setAPIData(response.data);
    //                 setFilteredResults(response.data); // Hiển thị tất cả dữ liệu ban đầu
    //                 // Lưu dữ liệu vào sessionStorage để sử dụng sau này
    //                 sessionStorage.setItem('customerData', JSON.stringify(response.data));
    //                 setLoading(false);
    //             } catch (error) {
    //                 console.error("Lỗi khi gọi API:", error);
    //                 setLoading(false);
    //             }
    //         }
    //     };
    //     fetchData();
    // }, []);

    // Hàm xử lý tìm kiếm

    const handleListAccout = (branch) => {
        setBranch(branch);
    }

    return (
        <div className='grid' style={{ padding: '0 40px' }}>
            <div className="row">
                <div className={`col l-3 ${styles.container}`}>

                    <h2>Branch (Chi Nhánh)</h2>
                    {loading ?
                        <div>
                            <Spinner animation="border" variant="primary" />
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

                        <h2>Thông tin chi nhánh: </h2>
                        <div className={styles.branch__info}>
                            <Avatar
                                alt="ngân hàng"
                                src={bank}
                                sx={{ width: 150, height: 150 }}
                            />
                            <div style={{ flex: '1' }}  >
                                <div className={`row ${styles.dflex}`}>
                                    <div className='col l-6'>
                                        <p className={styles.infor__paragraph}><strong>Name: </strong> {branch.bname}</p>
                                        <p className={styles.infor__paragraph}><strong>Email: </strong> {branch.bemail}</p>
                                        <p className={styles.infor__paragraph}><strong>Fax numbers: </strong> chưa có dữ liệu, thuộc tính đa trịchưa có dữ liệu, thuộc tính đa trị </p>
                                    </div>
                                    <div className='col l-6'>
                                        <p className={styles.infor__paragraph}><strong>Phone numbers: </strong> chưa có dữ liệu, thuộc tính đa trị </p>
                                        <p className={styles.infor__paragraph}><strong>Address: </strong>{branch.bstreet} {branch.bdistrict} {branch.bcity} {branch.bregion}</p>
                                        <p className={styles.infor__paragraph}><strong>No: </strong> {branch.bno}</p>
                                    </div>
                                    <p className={styles.infor__paragraph}><strong>Total number of employees: </strong> chưa có dữ liệu </p>
                                </div>
                            </div>
                        </div>
                        <h2 style={{ marginTop: '20px' }}>Doanh sách Nhân Viên của Chi Nhánh:</h2>
                        <div>
                            {loading ?
                                <div style={{ textAlign: 'center' }}>
                                    <Spinner sx={{ mx: 'auto' }} animation="border" variant="primary" />
                                </div>
                                :
                                <>
                                    <Test />
                                    {/* <table border="2" style={{ width: '90%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr>
                                                <th>Account Number</th>
                                                <th>Account Type</th>
                                                <th>Balance</th>
                                                <th>Interest Rate</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {APIData.map((account) => (
                                                <tr key={account.accountNumber}>
                                                    <td>{account.accountNumber}</td>
                                                    <td>{account.accountTypeName}</td>
                                                    <td>{account.balance}</td>
                                                    <td>{account.interestRate}</td>
                                                    <td>{format(new Date(account.date), 'dd/MM/yyyy HH:mm')}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table> */}
                                </>
                            }
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;