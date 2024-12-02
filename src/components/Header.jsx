import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Header.module.scss';

function Header() {
    return (
        <div style={{ padding: '0 40px', background: '#0388B4', position: 'fixed', zIndex: '99', top: '0', width: '100vw' }}>
            <div className={styles.header}>
                <div>
                    <NavLink to="/" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Home</NavLink>
                    <NavLink to="/account" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Account</NavLink>
                    <NavLink to="/report" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Report</NavLink>
                </div>
                <NavLink to="/login" className={styles.login}>Login</NavLink>
            </div>

        </div>
    );
}

export default Header;