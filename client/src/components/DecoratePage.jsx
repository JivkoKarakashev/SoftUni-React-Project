import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

import styles from "./DecoratePage.module.css";
import tooltipStyles from "./Tooltip.module.css";

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

    const navigateFunc = useNavigate();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [car, setCar] = useState({});
    const [equipment, setEquipment] = useState(checkBoxesInitialState);
    const [equipmentDesc, setEquipmentDesc] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        const options = {
            method: 'GET',
            headers: {['X-Authorization']: user['accessToken']},
            body: {}
        };

        const requests = [
            fetch(`http://localhost:3030/data/cars/${id}`, { signal: abortController.signal }, options),
            fetch('http://localhost:3030/data/equipment', { signal: abortController.signal }, options),
        ];

        Promise.all(requests)
            .then(async ([car, equipment]) => {
                if (car.status == 404 || equipment.status == 404) {
                    throw new Error;
                }
                const c = await car.json();
                const e = await equipment.json();
                return [c, e];
            })
            .then(result => {
                // console.log(equipment);
                // console.log(result);

                const [car, equipment] = result;
                const descripObj = {};
                equipment.forEach((e) => descripObj[e['nameId']] = e['description']);
                // console.log(descripObj);
                setEquipmentDesc(descripObj);
                const equipmentIds = car['equipmentId'] || [];
                // console.log(equipment, equipmentIds);
                const availableEquipment = Object.values(equipment);
                const selected = availableEquipment.filter(e => equipmentIds.includes(e['_id']));
                // return console.log(selected);

                const selectedEquipmnet = {};
                selected.forEach(e => selectedEquipmnet[e['nameId']] = true);
                // console.log(selectedEquipmnet);
                setCar(car);
                setEquipment(state => ({
                    ...state,
                    ...selectedEquipmnet
                }));
            })
            .catch(() => navigateFunc('/404'));

            return () => abortController.abort();
    }, [id, navigateFunc, user]);

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
    // console.log(equipmentDesc);

    const confirmEquipment = async (e) => {
        e.preventDefault();

        const options = {
            method: 'PUT',
            headers: {'X-Authorization': user['accessToken'], 'Content-Type': 'application/json' },
            body: null
        };

        try {
            const selected = Object.entries(equipment).filter(e => e[1] == true).map(e => e[0]);
            const response = await fetch('http://localhost:3030/data/equipment');
            const available = Object.values(await response.json()).filter(e => selected.some(eId => eId == e['nameId']));
            const selectedIds = available.map(e => e['_id']);
            // console.log(selected);
            // console.log(available);
            // console.log(selectedIds);
            car['equipmentId'] = [...selectedIds];
            setCar(car);
            options.body = JSON.stringify(car);
            // console.log(options.body);
            await fetch(`http://localhost:3030/data/cars/${id}`, options);
            navigateFunc(`/details/${id}`);
        } catch (err) {
            console.log(err.message);
        }
    };
    // console.log(car);

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
                        <form action={`details/${id}/decorate`} method="post" onSubmit={confirmEquipment}>
                            <ul className={styles["catalog"]}>
                                <li className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="4WD" checked={equipment['4WD']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/XYsy7r2w/4x4.png" /> 4WD <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['4WD']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="airbag" checked={equipment['airbag']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/28FZMch9/airbag.png" /> Airbag <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['airbag']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="air-conditioning" checked={equipment['air-conditioning']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/8zp6SRbp/aircon.png" /> Air Conditioning <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['air-conditioning']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="alloy-wheels" checked={equipment['alloy-wheels']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/5tjQHfGD/alloy-wheel.png" /> Alloy wheels <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['alloy-wheels']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="bluetooth" checked={equipment['bluetooth']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/hGwzTHRv/bluetooth.png" /> Bluetooth <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['bluetooth']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="cd" checked={equipment['cd']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/Wzcdfg3P/cd.png" /> CD <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['cd']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="cruise-control" checked={equipment['cruise-control']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/qR3tLjpL/cruise-control.png" /> Cruise control <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['cruise-control']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="keyless" checked={equipment['keyless']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/7h15vhGJ/keyless.png" /> Keyless <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['keyless']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="led" checked={equipment['led']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/tCy133w3/led-light.png" /> LED <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['led']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="navigation" checked={equipment['navigation']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/yYPDvJCw/navigation.png" /> Navigation <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['navigation']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="parking-assist" checked={equipment['parking-assist']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/RZZN8MMq/parking-assist.png" /> Parking Assist <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['parking-assist']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="rain-sensor" checked={equipment['rain-sensor']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/x1pcVWC5/rain-sensor.png" /> Rain Sensor <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['rain-sensor']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="seat-heating" checked={equipment['seat-heating']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/MGhHvV1j/seat-heat.png" /> Seat heating <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['seat-heating']}</li></label> </li>
                                <li  className={tooltipStyles["custom-tooltip"]}><label><input type="checkbox" name="usb" checked={equipment['usb']} onChange={checkBoxSwitcher} /><img className={styles["facility-icon"]} src="https://i.postimg.cc/jjWCxZnb/usb-drive.png" /> USB <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{equipmentDesc['usb']}</li></label> </li>
                            </ul>
                            <button className={styles["action"]}>Confirm Equipment</button>
                            <Link className={styles["action"]} to={`/details/${id}`}>Back to Details</Link>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default DecoratePage;