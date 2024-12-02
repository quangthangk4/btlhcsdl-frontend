import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import avatar from '../../img/avatar.svg';
import styles from './ListAccount.module.scss';
import { Link } from 'react-router-dom';

import { format } from 'date-fns';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';


function ListAccount(props) {
    const { customer, open, handleOpen } = props
    const [APIData, setAPIData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/customer/${customer.cid}/account`);
                setAPIData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, [customer.cid]);

    const handleClose = () => {
        handleOpen(false);
        setLoading(true);
    };

    return (
        <div stlye={{}}>
            <Dialog
                style={styles.dialog}
                sx={{
                    '& .MuiDialog-paper': { // Chọn phần tử bên trong
                        maxWidth: '1300px',
                        width: '1000px',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                    '& .MuiDialog-paper::-webkit-scrollbar': {
                        width: '5px',
                    },
                    '& .MuiDialog-paper::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Màu thanh cuộn
                        borderRadius: '10px',
                    },
                }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <h2 style={{ marginTop: '24px' , marginLeft: '24px' }}>Thông tin Khách hàng: </h2>
                <div className={styles.customer__info}>
                    <Avatar
                        alt="Remy Sharp"
                        src={avatar}
                        sx={{ width: 150, height: 150 }}
                    />
                    <div style={{ flex: '1', borderLeft: "1px solid #ccc" }}>
                        <div className={`row ${styles.dflex}`}>
                            <div className='col l-6'>
                                <p className={styles.infor__paragraph}><strong>Name: </strong> {customer.cfirstName} {customer.clastName}</p>
                                <p className={styles.infor__paragraph}><strong>Id: </strong> {customer.cid}</p>
                                <p className={styles.infor__paragraph}><strong>Email: </strong>{customer.cemail}</p>
                            </div>
                            <div className='col l-6'>
                                <p className={styles.infor__paragraph}><strong>Home Address: </strong> {customer.chomeAddress}</p>
                                <p className={styles.infor__paragraph}><strong>Office Address: </strong> {customer.cofficeAddress}</p>
                                <p className={styles.infor__paragraph}><strong>Number Of Accounts: </strong> {APIData.length}</p>
                            </div>
                        </div>
                        <p className={styles.cphone}><strong>Phone numbers: </strong>
                            {customer.cphoneNumberEntitty.map((phone, index) => (
                                <span key={index}>
                                    {index === 0 ? phone.cphoneNumber : ` & ${phone.cphoneNumber}`}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
                <div className={styles.padding1224}>
                    <h1>Doanh sách Account của khách hàng:</h1>
                    {loading ?
                        <div style={{ textAlign: 'center' }}>
                            <Spinner sx={{ mx: 'auto'}} className={styles.loading__spinner} animation="border" variant="primary" />
                        </div>
                        :
                        <>
                            <table border="2" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
                                            <td>{format(new Date(account.date), 'dd/MM/yyyy')}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </>
                    }
                </div>
                <DialogActions style={{margin: '20px 20px 20px 0'}}>
                    <Button onClick={handleClose} variant="outlined" style={{fontSize: '1.5rem' }}>Close</Button>
                    <Link to={`/addaccount?customerId=${customer.cid}`}>
                        <Button onClick={handleClose} variant="outlined" autoFocus style={{fontSize: '1.5rem' }}>Add Account</Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ListAccount;