import React, { useState } from 'react';
import styles from '../styles/Login.module.scss'

const LoginForm = () => {
    // State để lưu trữ giá trị email và password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Hàm xử lý khi form được submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra các trường nhập liệu
        if (!email || !password) {
            setError('Vui lòng nhập email và mật khẩu.');
            return;
        }

        // Xử lý đăng nhập (thực hiện gọi API hoặc xử lý logic khác ở đây)


        // Reset lại error nếu form hợp lệ
        setError('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>Đăng nhập</h2>
                <form className={styles.form__container} onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email:</label>
                    <input
                        id="email"
                        type="email"
                        name='aemail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                    />
                    <label htmlFor='password'>Password:</label>
                    <input
                        id="password"
                        type="password"
                        name='passdsfa'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit" className={styles.submit}>Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
