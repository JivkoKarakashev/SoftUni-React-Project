import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
    return (
        // <--Register Page-->
        <section id="register-section" className="">
            <h1 className={styles["item"]}>Register</h1>
            <div className={styles["padded"]}>
                <main className={`${styles["item"]} ${styles["align-center"]}`}>
                    <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} method="post" action="/auth/register">
                        <div className={styles["aligned"]}>
                            <label><span>Username</span><input type="text" name="username" defaultValue="" /></label>
                            <label><span>Password</span><input type="password" name="password" defaultValue="" /></label>
                            <label><span>Repeat</span><input type="password" name="repass" defaultValue="" /></label>
                        </div>
                        <input className={`${styles["cta"]} ${styles["action"]}`} type="submit" value="Sign Up" />
                    </form>
                </main>
                <footer>Already have an account? <a href="/auth/login">Sign in here</a></footer>
            </div>
        </section>
    );
};

export default RegisterPage;