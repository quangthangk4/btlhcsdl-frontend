import React, { useEffect, useState } from 'react';
import styles from '../styles/Report.module.scss'
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import bank from '../img/bank.jpg'
import { format } from 'date-fns';

// Component hiển thị thông tin nhân viên và khách hàng
const EmployeeDetails = ({ branch }) => {

    const [APIData, setAPIData] = useState({});          // Lưu dữ liệu API gốc
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/customer/service-report/${branch.bname}`);
                setAPIData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [branch.bname]);

    return (
        <>
            <h2>Thông tin chi nhánh: </h2>
            <div className={styles.branch__info}>
                <Avatar
                    alt="ngân hàng"
                    src={bank}
                    sx={{ width: 150, height: 150 }}
                />
                <div style={{ flex: '1', borderLeft: '1px solid #ccc', marginLeft: '20px' }}  >
                    <div className={`row ${styles.dflex}`}>
                        <div className='col l-6'>
                            <p className={styles.infor__paragraph}><strong>Name: </strong> {branch.bname}</p>
                            <p className={styles.infor__paragraph}><strong>Email: </strong> {branch.bemail}</p>
                            <p className={styles.infor__paragraph}><strong>Fax numbers: </strong>
                                {(branch.bfaxNumbers || []).map((item, index) => (
                                    <span key={index}>{item}</span>
                                ))}
                            </p>
                        </div>
                        <div className='col l-6'>
                            <p className={styles.infor__paragraph}><strong>Phone numbers: </strong>
                                {(branch.bphoneNumbers || []).map((item, index) => (
                                    <span key={index}>{item}</span>
                                ))}
                            </p>
                            <p className={styles.infor__paragraph}><strong>Address: </strong>{branch.bstreet} {branch.bdistrict} {branch.bcity} {branch.bregion}</p>
                            <p className={styles.infor__paragraph}><strong>No: </strong> {branch.bno}</p>
                        </div>
                        <p style={{ textAlign: 'center' }} className={styles.infor__paragraph}><strong>Total number of employees: </strong> {APIData.length} </p>
                    </div>
                </div>
            </div>
            <h2 style={{ marginTop: '20px' }}>Doanh sách Nhân Viên của Chi Nhánh:</h2>
            {loading ?
                (
                    <div style={{ textAlign: 'center' }} >
                        <Spinner sx={{ mx: 'auto' }} className={styles.loading__spinner} animation="border" variant="primary" />
                    </div >)
                :
                (
                    <div className='row' style={{ borderBottom: '1px solid #ccc' }}>
                        {APIData.map((employee) => (
                            <div key={employee.employeeId} style={{ padding: '10px' }} className='col l-6'>
                                <div className={styles.container} style={{ padding: '20px' }}>
                                    <h2 style={{ color: '#2c3e50' }}>{employee.firstName} {employee.lastName}</h2>
                                    <p><strong>ID:</strong> {employee.employeeId}</p>
                                    <p><strong>Email:</strong> {employee.email}</p>
                                    <p><strong>Số điện thoại:</strong>
                                        {employee.phoneNumber.map((phone, index) => (
                                            <span key={index}>
                                                {index === 0 ? phone : ` & ${phone}`}
                                            </span>
                                        ))}
                                    </p>
                                    <p><strong>Địa chỉ:</strong> {employee.street}, {employee.district}, {employee.city}</p>
                                    <p><strong>Ngày sinh:</strong> {format(new Date(employee.dateOfBirth), 'dd/MM/yyyy')}</p>

                                    <h3 style={{ marginTop: '15px' }}>Khách Hàng Liên Quan:</h3>
                                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                                        {employee.customers.map((customer) => (
                                            <li key={customer.customerId} style={{ marginBottom: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '8px' }}>
                                                <p><strong>Tên:</strong> {customer.firstName} {customer.lastName}</p>
                                                <p><strong>ID:</strong> {customer.customerId}</p>
                                                <p><strong>Email:</strong> {customer.email}</p>
                                                <p><strong>Địa chỉ nhà:</strong> {customer.homeAddress}</p>
                                                <p><strong>Địa chỉ văn phòng:</strong> {customer.officeAddress}</p>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </>
    );
};

export default EmployeeDetails;
