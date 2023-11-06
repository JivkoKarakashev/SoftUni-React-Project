import styles from "./LoginPage.module.css";

const LoginPage = () => {
    return (
        // <--Login Page-->
        <section id="login-section" className="">
            <h1 className={styles["item"]}>Login</h1>
            <div className={styles["padded"]}>
                <main className={`${styles["item"]} ${styles["align-center"]}`}>
                    <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} method="post" action="/auth/login">
                        <div className={styles["aligned"]}>
                            <label><span>Username</span><input type="text" name="username" defaultValue="" /></label>
                            <label><span>Password</span><input type="password" name="password" defaultValue="" /></label>
                        </div>
                        <input className={`${styles["cta"]} ${styles["action"]}`} type="submit" value="Sign In" />
                    </form>
                </main>
                <footer>Don&apos;t have an account? <a href="/auth/register">Sign up here</a></footer>
            </div>
        </section>
    );
};

export default LoginPage;