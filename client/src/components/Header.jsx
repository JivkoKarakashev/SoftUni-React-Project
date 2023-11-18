import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../contexts/authContext';

import styles from './Header.module.css';

const Header = () => {
    const { user, hasUser } = useContext(AuthContext);
    // console.log(user);
    // console.log(hasUser);
    return (
        <header>
            <Link to="/" className={styles["title-logo"]}>
                <img src="/static/images/logo.jpg" />
                <span>Used Cars Market</span>
            </Link>

            <span>Welcome, {hasUser ? user.username : 'Guest'}</span>

            {/* <!--Navigation--> */}
            <nav className={`${styles["main-nav"]} ${styles["nav-mid"]}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    {/* <!--Only users--> */}
                    {hasUser && (
                        <>
                            <li><Link to="/create">Publish</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/auth/logout">Logout</Link></li>
                        </>
                    )}
                    {/* <!--Only guest--> */}
                    {!hasUser && (
                        <>
                            <li><Link to="/auth/login">Login</Link></li>
                            <li><Link to="/auth/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;