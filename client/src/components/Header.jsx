import styles from './Header.module.css';

const Header = () => {
    return (
        <header>
            <a href="/" className={styles["title-logo"]}>
                <img src="/static/images/logo.jpg" />
                <span>Used Cars Market</span>
            </a>
            
            <span>Welcome, username</span>

            {/* <!--Navigation--> */}
            <nav className={`${styles["main-nav"]} ${styles["nav-mid"]}`}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/catalog">Catalog</a></li>
                    {/* <!--Only users--> */}
                    <li><a href="/create">Publish</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="auth/logout">Logout</a></li>
                    {/* <!--Only guest--> */}
                    <li><a href="/auth/login">Login</a></li>
                    <li><a href="/auth/register">Register</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;