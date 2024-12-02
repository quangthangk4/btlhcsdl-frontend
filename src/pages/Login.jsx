import React, { useState } from 'react';
import styles from '../styles/Login.module.scss'
import axios from 'axios';

const LoginForm = () => {
    // State để lưu trữ giá trị email và password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Hàm xử lý khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra các trường nhập liệu
        if (!username || !password) {
            setError('Vui lòng nhập username và mật khẩu.');
            return;
        }

        setLoading(true); // Bắt đầu loading
        setError(''); // Xóa thông báo lỗi trước đó (nếu có)

        try {
            // Gửi yêu cầu đến API sử dụng axios
            const response = await axios.post(`http://localhost:8080/login`, { username, password });
            if (response.data === 'login success') {
                // Lưu thông tin đăng nhập vào localStorage
                localStorage.setItem('isLoggedIn', 'true');
                // Thông báo cho người dùng đăng nhập thành công
                alert("Đăng nhập thành công!");
                // Chuyển hướng đến trang account
                window.location.href = '/account';
            } else {
                // Xử lý trường hợp login failed (nếu server gửi message khác ngoài 'login success')
                setError('Sai tài khoản hoặc mật khẩu, vui lòng thử lại.');
            }

        } catch (err) {
            // Xử lý lỗi từ server hoặc lỗi kết nối
            setError(err.response?.data?.message || 'Sai Tài Khoản hoặc Mật Khẩu, vui lòng thử lại.');
        } finally {
            setLoading(false); // Kết thúc loading
        };
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>Đăng nhập</h2>
                <form className={styles.form__container} onSubmit={handleSubmit}>
                    <label htmlFor='username'>username:</label>
                    <input
                        id="username"
                        type="text"
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập username"
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        id="password"
                        type="password"
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit" className={styles.submit} disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
