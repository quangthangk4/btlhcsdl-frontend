import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Header.module.scss';

function Header({ isLoggedIn }) {

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        alert("đăng xuất thành công!");
    };

    return (
        <div
            style={{
                padding: '0 40px',
                background: 'linear-gradient(to bottom right, hsla(203, 92%, 75.5%, 0.25), rebeccapurple,hsla(27.6, 87.1%, 66.7%, 0.25))', // Thêm dấu phẩy giữa các màu
                position: 'fixed',
                zIndex: '99',
                top: '0',
                width: '100vw'
            }}
        >
            <div className={styles.header}>
                <div>
                    <NavLink to="/" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Home</NavLink>
                    <NavLink to="/account" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Customer</NavLink>
                    <NavLink to="/report" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Report</NavLink>
                </div>

                {!isLoggedIn ?
                    <NavLink to="/login" className={styles.login}>
                        <button className="btn-grad">Login</button>
                    </NavLink>
                    : <a href="/" onClick={handleLogout} className={styles.login}>
                        <button className="btn-grad">Logout</button>
                    </a>
                }
            </div>
        </div>
    );
}

export default Header;