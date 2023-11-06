import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
    return (
        // <--Profile Page-->
        <section id="profile-section">
            <h1 className={styles["item"]}>User Profile</h1>
            <div className={`${styles["item"]} ${styles["padded"]}`}>
                <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                    <div className={styles["userInfo"]}>
                        <div className={styles["avatar"]}>
                            <img src="/static/images/profilePic.png" />
                        </div>
                        <h2>peter@abv.bg</h2>
                    </div>
                </main>
            </div>
            <div className={styles["board"]}>
                {/* <--If there are event--> */}
                <div className={`${styles["item"]} ${styles["padded"]}`}>
                    <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                        <div className={styles["event-info"]}>
                            <img src="https://drive.google.com/uc?export=view&id=1TjXDW46Yc5rcDA9st254HsAiXveRATIW" />
                            <h2>make - model</h2>
                            <h6>year</h6>
                            <div className={styles["align-right"]}>
                                <a href="/details/:id" className={styles["action"]}>Details</a>
                            </div>
                        </div>
                    </main>
                </div>

                <div className={`${styles["item"]} ${styles["padded"]}`}>
                    <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                        <div className={styles["event-info"]}>
                            <img src="https://drive.google.com/uc?export=view&id=1V6o8GWLwiDs5h6SlsWjqTBLpZv61l-6t" />
                            <h2>make - model</h2>
                            <h6>year</h6>
                            <div className={styles["align-right"]}>
                                <a href="/details/:id" className={styles["action"]}>Details</a>
                            </div>
                        </div>
                    </main>
                </div>

                <div className={`${styles["item"]} ${styles["padded"]}`}>
                    <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                        <div className={styles["event-info"]}>
                            <img src="https://drive.google.com/uc?export=view&id=1Qz4V1qpizN7hmNUx_gxxzZacnbB7gchw" />
                            <h2>make - model</h2>
                            <h6>year</h6>
                            <div className={styles["align-right"]}>
                                <a href="/details/:id" className={styles["action"]}>Details</a>
                            </div>
                        </div>
                    </main>
                </div>

                {/* <--If there are no event--> */}
                <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                    <p>This user has no published Ad yet!</p>
                </main>
            </div>
        </section>
    );
};

export default ProfilePage;