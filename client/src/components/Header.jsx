import { Link } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
    return (
        <header>
            <Link to="/" className={styles["title-logo"]}>
                <img src="/static/images/logo.jpg" />
                <span>Used Cars Market</span>
            </Link>
            
            <span>Welcome, username</span>

            {/* <!--Navigation--> */}
            <nav className={`${styles["main-nav"]} ${styles["nav-mid"]}`}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    {/* <!--Only users--> */}
                    <li><Link to="/create">Publish</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/auth/logout">Logout</Link></li>
                    {/* <!--Only guest--> */}
                    <li><Link to="/auth/login">Login</Link></li>
                    <li><Link to="/auth/register">Register</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;