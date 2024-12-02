import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Cài axios nếu bạn muốn dùng
import styles from '../styles/AddAccount.module.scss'
import { useLocation } from 'react-router-dom';


const AddAccount = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const customerId = queryParams.get('customerId'); // Lấy giá trị từ tham số 'customerId'
    const [accountType, setAccountType] = useState('');
    const [formData, setFormData] = useState({
        customerId: customerId,
        accTypeId: '',
        sFlag: false, // Tài khoản tiết kiệm
        sbalance: '',
        sinterestRate: '',
        sdateOpened: '',

        cFlag: false, // Tài khoản vãng lai
        cbalance: '',
        cdateOpened: '',

        lFlag: false, // Tài khoản vay
        ldateTaken: '',
        linterestRate: '',
        lbalanceDue: ''
    });

    // Xử lý thay đổi loại tài khoản
    const handleAccountTypeChange = (e) => {
        setAccountType(e.target.value);
    };

    // Xử lý thay đổi dữ liệu trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    // Hàm xử lý gửi form (submit)
    const handleSubmit = async (e) => {
        e.preventDefault();  // Ngừng reload trang mặc định khi submit form

        const updatedFlags = {
            sFlag: accountType === "saving",
            lFlag: accountType === "loan",
            cFlag: accountType === "checking",
        };

        // Chuyển đổi dữ liệu thành đối tượng mà server yêu cầu
        const postData = {
            customerId: formData.customerId,
            accTypeId: formData.accTypeId,
            ...updatedFlags, // Thêm flags vào postData
            sbalance: formData.sbalance,
            sinterestRate: formData.sinterestRate,
            sdateOpened: formData.sdateOpened,
            cbalance: formData.cbalance,
            cdateOpened: formData.cdateOpened,
            ldateTaken: formData.ldateTaken,
            linterestRate: formData.linterestRate,
            lbalanceDue: formData.lbalanceDue,
        };
        

        // Xử lý gửi yêu cầu POST
        try {
            const response = await axios.post('http://localhost:8080/customer/account', postData);
            window.location.reload(); 
            // Xử lý thêm sau khi gửi thành công (cập nhật UI, thông báo, v.v.)
        } catch (error) {
            console.error('Đã xảy ra lỗi khi gửi dữ liệu:', error);
            // Xử lý lỗi (hiển thị thông báo lỗi, v.v.)
        }
    };

    const handlePostData = () => {
        alert("Thêm tài khoản thành công!");
        window.location.reload();
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>

                <form className={styles.form__container} onSubmit={handleSubmit}>
                    <div>
                        <label>Chọn loại tài khoản:</label>
                        <select value={accountType} className={styles.form__select} onChange={handleAccountTypeChange}>
                            <option value="">-- Chọn loại tài khoản --</option>
                            <option value="saving">Saving</option>
                            <option value="loan">Loan</option>
                            <option value="checking">Checking</option>
                        </select>
                    </div>

                    {accountType === 'saving' && (
                        <div>
                            <label>
                                Số dư tài khoản tiết kiệm (Balance):
                                <input
                                    type="number"
                                    name="sbalance"
                                    value={formData.sbalance}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Lãi suất tài khoản tiết kiệm (Interest Rate):
                                <input
                                    type="number"
                                    name="sinterestRate"
                                    value={formData.sinterestRate}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Ngày mở tài khoản tiết kiệm (Saving):
                                <input
                                    type="date"
                                    name="sdateOpened"
                                    value={formData.sdateOpened}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    )}

                    {accountType === 'loan' && (
                        <div>
                            <label>
                                Số dư vay còn lại (Balance Due):
                                <input
                                    type="number"
                                    name="lbalanceDue"
                                    value={formData.lbalanceDue}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Lãi suất vay (Interest Rate):
                                <input
                                    type="number"
                                    name="linterestRate"
                                    value={formData.linterestRate}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Ngày vay (Date Taken):
                                <input
                                    type="date"
                                    name="ldateTaken"
                                    value={formData.ldateTaken}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    )}

                    {accountType === 'checking' && (
                        <div>
                            <label>
                                Số dư tài khoản Checking (Balance):
                                <input
                                    type="number"
                                    name="cbalance"
                                    value={formData.cbalance}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Ngày mở tài khoản Checking (Date Open):
                                <input
                                    type="date"
                                    name="cdateOpened"
                                    value={formData.cdateOpened}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    )}

                    <button className={styles.submit} onClick={handlePostData} type="submit">Gửi</button>
                </form>
            </div>
        </div>
    );
};

export default AddAccount;
