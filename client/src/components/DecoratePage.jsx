import styles from "./DecoratePage.module.css";

const DecoratePage = () => {
    return (
        // <--Decorate Page-->
        <section id="decorate-section">
            <h1 className={styles["item"]}>car.make car.model</h1>
            <div className={`${styles["item"]} ${styles["padded"]}`}>
                <main className={`${styles["layout"]} ${styles["right"]} ${styles["large"]}`}>
                    <div className={styles["col"]}>
                        <img src="https://drive.google.com/uc?export=view&id=1TjXDW46Yc5rcDA9st254HsAiXveRATIW" className={styles["img-large"]} />
                    </div>
                    <div className={`${styles["content"]} ${styles["pad-med"]}`}>
                        <p>Equipment:</p>
                        <form action="details/:id/decorate" method="post">
                            <ul className={styles["catalog"]}>
                                <li><label><input type="checkbox" name="4WD" /> 4WD <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1SgRNEhXSwrsHQP0BlRMSVWPMp9nfmPU5" /> </label> </li>
                                <li><label><input type="checkbox" name="airbag" /> Airbag <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1V6-XGT7OL7ofzBLTwd1UB2oicOLjMBRS" /> </label> </li>
                                <li><label><input type="checkbox" name="air-conditioning" /> Air Conditioning <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1h8s-pLh5HzI4pyWLfnd_igMS5YW-qNxn" /> </label> </li>
                                <li><label><input type="checkbox" name="alloy-wheels" /> Alloy wheels <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1iBW2Id6WT25KAD2Ca1JGOjvZ6JYcyRKy" /> </label> </li>
                                <li><label><input type="checkbox" name="bluetooth" /> Bluetooth <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1ihfnGo0N3B6pVFunWiXoHdbrFRPrnKPK" /> </label> </li>
                                <li><label><input type="checkbox" name="cd" /> CD <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1SVvIDkPVLY-4L0Gil0UXD1Ep9pIyLRs9" /> </label> </li>
                                <li><label><input type="checkbox" name="cruise-control" /> Cruise control <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1ZRLoVsK8-DFTFxcZLezgu9o75BfTUYk-" /> </label> </li>
                                <li><label><input type="checkbox" name="keyless" /> Keyless <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=115slkICep3571B0szsTe5bilWe7lmIb_" /> </label> </li>
                                <li><label><input type="checkbox" name="led" /> LED <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=12g62gNcJ8UZrootQoPo9kyOtoTtWUuGE" /> </label> </li>
                                <li><label><input type="checkbox" name="navigation" /> Navigation <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1MzE_KkdOS7aUYw2bHzMszhAUpMItfFMN" /> </label> </li>
                                <li><label><input type="checkbox" name="parking-assist" /> Parking Assist <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1LlYS-eMriExsaeQKwbPMT0hZE4T_1jiU" /> </label> </li>
                                <li><label><input type="checkbox" name="rain-sensor" /> Rain Sensor <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1dyqTrqxHW-nCao9Ci0khsP26LJTejuCK" /> </label> </li>
                                <li><label><input type="checkbox" name="seat-heating" /> Seat heating <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1J-9XU2Hpr_fpMkeGu_NVptU4VgHW_oha" /> </label> </li>
                                <li><label><input type="checkbox" name="usb" /> USB <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1RCDX3E7aVSHQgUDQDswPweqsBnFeAwDH" /> </label> </li>
                            </ul>
                            <button className={`${styles["action"]} ${styles["cta"]}`}>Confirm Equipment</button>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default DecoratePage;