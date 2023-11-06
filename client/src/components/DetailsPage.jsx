import styles from "./DetailsPage.module.css";

const DetailsPage = () => {
    return (
        // <--Details Page-->
        <section id="details-section">
            <h1 className={styles["item"]}>make model</h1>
            <div className={`${styles["item"]} ${styles["padded"]}`}>
                <main className={`${styles["layout"]} ${styles["right"]} ${styles["large"]}`}>
                    <div className={styles["col"]}>
                        <img src="https://drive.google.com/uc?export=view&id=1V6o8GWLwiDs5h6SlsWjqTBLpZv61l-6t" className={styles["img-large"]} />
                    </div>
                    <div className={`${styles['content']} ${styles['pad-med']}`}>
                        <p>Mileage: <strong>mileage</strong></p>
                        <p>description</p>
                        <div className={styles["align-center"]}>
                            <div>Price: <strong>price$</strong></div>
                            <div>Fuel: <strong>fuel</strong></div>
                            <div>Year: <strong>year</strong></div>
                            <div>Location: <strong>location</strong></div>
                            <ul className={styles["catalog"]}>
                                <li>4WD<img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1SgRNEhXSwrsHQP0BlRMSVWPMp9nfmPU5" /></li>
                                <li>Airbag<img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1V6-XGT7OL7ofzBLTwd1UB2oicOLjMBRS" /></li>
                                <li>Air Conditioning<img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1h8s-pLh5HzI4pyWLfnd_igMS5YW-qNxn" /></li>
                                <li>Alloy wheels<img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1iBW2Id6WT25KAD2Ca1JGOjvZ6JYcyRKy" /></li>
                                <li>Bluetooth<img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1ihfnGo0N3B6pVFunWiXoHdbrFRPrnKPK" /></li>
                            </ul>
                            <a className={styles["action"]} href="/details/:id/decorate">Decorate</a>
                            <a className={styles["action"]} href="/details/:id/edit">Edit</a>
                            <a className={styles["action"]} href="/details/:id/delete">Delete</a>
                            <a className={styles["action"]} href="/details/:id/buy">Buy</a>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default DetailsPage;