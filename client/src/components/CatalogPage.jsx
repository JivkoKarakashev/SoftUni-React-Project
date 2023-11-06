import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
    return (
        // <--Catalog Page-->
        <section id="catalog-section" className={styles["spaced"]}>
            <h1 className={styles["item"]}>Auto Occasion</h1>
            <ul className={`${styles["catalog"]} ${styles["cards"]}`}>
                <li className={styles["item"]}>
                    <header className={styles["pad-med"]}>
                        <h2>make model</h2>
                    </header>

                    <main className={styles["align-center"]}>
                        <img className={styles["img-thumb"]} src="https://drive.google.com/uc?export=view&id=1V6o8GWLwiDs5h6SlsWjqTBLpZv61l-6t" />
                    </main>

                    <footer className={`${styles["align-center"]} ${styles["pad-med"]}`}>
                        <p>Fuel: <strong>fuel</strong></p>
                        <p>Year: <strong>year</strong></p>
                        <p>Price: <strong>price$</strong></p>
                        <a className={styles["action"]} href="/details/:id">See details</a>
                    </footer>
                </li>

                <li className={styles["item"]}>
                    <header className={styles["pad-med"]}>
                        <h2>make model</h2>
                    </header>

                    <main className={styles["align-center"]}>
                        <img className={styles["img-thumb"]} src="https://drive.google.com/uc?export=view&id=1TjXDW46Yc5rcDA9st254HsAiXveRATIW" />
                    </main>

                    <footer className={`${styles["align-center"]} ${styles["pad-med"]}`}>
                        <p>Fuel: <strong>fuel</strong></p>
                        <p>Year: <strong>year</strong></p>
                        <p>Price: <strong>price$</strong></p>
                        <a className={styles["action"]} href="/details/:id">See details</a>
                    </footer>
                </li>

                <li className={styles["item"]}>
                    <header className={styles["pad-med"]}>
                        <h2>make model</h2>
                    </header>

                    <main className={styles["align-center"]}>
                        <img className={styles["img-thumb"]} src="https://drive.google.com/uc?export=view&id=1Qz4V1qpizN7hmNUx_gxxzZacnbB7gchw" />
                    </main>

                    <footer className={`${styles["align-center"]} ${styles["pad-med"]}`}>
                        <p>Fuel: <strong>fuel</strong></p>
                        <p>Year: <strong>year</strong></p>
                        <p>Price: <strong>price$</strong></p>
                        <a className={styles["action"]} href="/details/:id">See details</a>
                    </footer>
                </li>
            </ul>
            <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                <p>Nothing has been published yet. Be the first!</p>
                <div>
                    <a className={styles["action"]} href="/create">Publish Ad</a>
                </div>
            </main>
        </section>
    );
};

export default CatalogPage;