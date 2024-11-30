import React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Header.module.scss';

function Header() {
    return (
        <div style={{ padding: '0 40px', background: '#0388B4', position: 'fixed', top: '0',width: '100vw' }}>
            <div className={styles.header}>
                <div>
                    <NavLink to="/" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Home</NavLink>
                    <NavLink to="/search" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Search</NavLink>
                    <NavLink to="/addaccount" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>Add Account</NavLink>
                    <NavLink to="/listaccount" className={({ isActive }) => clsx(styles.navlink, { [styles.active]: isActive })}>List Account</NavLink>
                </div>
                <NavLink to="/login" className={styles.login}>Login</NavLink>
            </div>

        </div>
    );
}

export default Header;