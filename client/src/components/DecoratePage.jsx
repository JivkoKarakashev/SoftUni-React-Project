import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOne } from "../services/carServices";
import { getByCarId } from "../services/equipmentServices";

import styles from "./DecoratePage.module.css";

const checkBoxesInitialState = {
    '4WD': false,
    'airbag': false,
    'air-conditioning': false,
    'alloy-wheels': false,
    'bluetooth': false,
    'cd': false,
    'cruise-control': false,
    'keyless': false,
    'led': false,
    'navigation': false,
    'parking-assist': false,
    'rain-sensor': false,
    'seat-heating': false,
    'usb': false,
};

const DecoratePage = () => {

    const { id } = useParams();
    const [car, setCar] = useState({});
    const [equipment, setEquipment] = useState(checkBoxesInitialState);
    const navigateFunc = useNavigate();

    useEffect(() => {
        getOne(id)
            .then(result => {
                // console.log(result);
                setCar(result);
            })
            .catch(() => navigateFunc('/404'));
    }, [id, navigateFunc]);

    useEffect(() => {
        getByCarId(id)
            .then(result => {
                // console.log(equipment);
                // console.log(result);
                const selectedEquipmnet = {};
                result.forEach(e => selectedEquipmnet[e['nameId']] = true);
                // console.log(selectedEquipmnet);
                setEquipment(state => ({
                    ...state,
                    ...selectedEquipmnet
                }));
            })
            .catch(() => navigateFunc('/404'));
    }, [id, navigateFunc])

    function checkBoxSwitcher(e) {
        // console.log(e.target);
        // console.log(e.target.name);
        // console.log(e.target.checked);
        const chechBox = e.target.name;
        const chechBoxState = e.target.checked;

        setEquipment(state => ({
            ...state,
            [chechBox]: chechBoxState
        }));

    }

    // console.log(equipment);

    return (
        // <--Decorate Page-->
        <section id="decorate-section">
            <h1 className={styles["item"]}>Decorate {car.make} {car.model}</h1>
            <div className={`${styles["item"]} ${styles["padded"]}`}>
                <main className={`${styles["layout"]} ${styles["right"]} ${styles["large"]}`}>
                    <div className={styles["col"]}>
                        <img src={car.image} className={styles["img-large"]} />
                    </div>
                    <div className={`${styles["content"]} ${styles["pad-med"]}`}>
                        <p>Equipment:</p>
                        <form action="details/:id/decorate" method="post">
                            <ul className={styles["catalog"]}>
                                <li><label><input type="checkbox" name="4WD" checked={equipment['4WD']} onChange={checkBoxSwitcher} /> 4WD <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1SgRNEhXSwrsHQP0BlRMSVWPMp9nfmPU5" /> </label> </li>
                                <li><label><input type="checkbox" name="airbag" checked={equipment['airbag']} onChange={checkBoxSwitcher} /> Airbag <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1V6-XGT7OL7ofzBLTwd1UB2oicOLjMBRS" /> </label> </li>
                                <li><label><input type="checkbox" name="air-conditioning" checked={equipment['air-conditioning']} onChange={checkBoxSwitcher} /> Air Conditioning <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1h8s-pLh5HzI4pyWLfnd_igMS5YW-qNxn" /> </label> </li>
                                <li><label><input type="checkbox" name="alloy-wheels" checked={equipment['alloy-wheels']} onChange={checkBoxSwitcher} /> Alloy wheels <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1iBW2Id6WT25KAD2Ca1JGOjvZ6JYcyRKy" /> </label> </li>
                                <li><label><input type="checkbox" name="bluetooth" checked={equipment['bluetooth']} onChange={checkBoxSwitcher} /> Bluetooth <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1ihfnGo0N3B6pVFunWiXoHdbrFRPrnKPK" /> </label> </li>
                                <li><label><input type="checkbox" name="cd" checked={equipment['cd']} onChange={checkBoxSwitcher} /> CD <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1SVvIDkPVLY-4L0Gil0UXD1Ep9pIyLRs9" /> </label> </li>
                                <li><label><input type="checkbox" name="cruise-control" checked={equipment['cruise-control']} onChange={checkBoxSwitcher} /> Cruise control <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1ZRLoVsK8-DFTFxcZLezgu9o75BfTUYk-" /> </label> </li>
                                <li><label><input type="checkbox" name="keyless" checked={equipment['keyless']} onChange={checkBoxSwitcher} /> Keyless <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=115slkICep3571B0szsTe5bilWe7lmIb_" /> </label> </li>
                                <li><label><input type="checkbox" name="led" checked={equipment['led']} onChange={checkBoxSwitcher} /> LED <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=12g62gNcJ8UZrootQoPo9kyOtoTtWUuGE" /> </label> </li>
                                <li><label><input type="checkbox" name="navigation" checked={equipment['navigation']} onChange={checkBoxSwitcher} /> Navigation <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1MzE_KkdOS7aUYw2bHzMszhAUpMItfFMN" /> </label> </li>
                                <li><label><input type="checkbox" name="parking-assist" checked={equipment['parking-assist']} onChange={checkBoxSwitcher} /> Parking Assist <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1LlYS-eMriExsaeQKwbPMT0hZE4T_1jiU" /> </label> </li>
                                <li><label><input type="checkbox" name="rain-sensor" checked={equipment['rain-sensor']} onChange={checkBoxSwitcher} /> Rain Sensor <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1dyqTrqxHW-nCao9Ci0khsP26LJTejuCK" /> </label> </li>
                                <li><label><input type="checkbox" name="seat-heating" checked={equipment['seat-heating']} onChange={checkBoxSwitcher} /> Seat heating <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1J-9XU2Hpr_fpMkeGu_NVptU4VgHW_oha" /> </label> </li>
                                <li><label><input type="checkbox" name="usb" checked={equipment['usb']} onChange={checkBoxSwitcher} /> USB <img className={styles["facility-icon"]} src="https://drive.google.com/uc?export=view&id=1RCDX3E7aVSHQgUDQDswPweqsBnFeAwDH" /> </label> </li>
                            </ul>
                            <button className={`${styles["action"]}`}>Confirm Equipment</button>
                            <Link className={`${styles["action"]}`} to={`/details/${id}`}>Back to Details</Link>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default DecoratePage;