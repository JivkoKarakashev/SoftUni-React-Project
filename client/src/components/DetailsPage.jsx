import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import EquipmentItem from "./EquipmentItem";

import styles from "./DetailsPage.module.css";

const DetailsPage = () => {

    const { id } = useParams();
    const [car, setCar] = useState({});
    const [equipment, setEquipment] = useState([]);
    const navigateFunc = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();

        const options = {
            method: 'GET',
            headers: {},
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
                // console.log(result);
                const [car, equipment] = result;
                const equipmentIds = car['equipmentId'] || [];
                // console.log(equipment, equipmentIds);
                const availableEquipment = Object.values(equipment);
                const selected = availableEquipment.filter(e => equipmentIds.includes(e['_id']));
                // return console.log(selected);
                setCar(car);
                setEquipment(() => ([
                    ...selected
                ]));
            })
            // .catch((error) => console.log(error));
            .catch(() => navigateFunc('/404'));

        return () => abortController.abort();
    }, [id, navigateFunc]);

    return (
        // <--Details Page-->
        <section id="details-section">
            <h1 className={styles["item"]}>{car.make} {car.model}</h1>
            <div className={`${styles["item"]} ${styles["padded"]}`}>
                <main className={`${styles["layout"]} ${styles["right"]} ${styles["large"]}`}>
                    <div className={styles["col"]}>
                        <img src={car.image} className={styles["img-large"]} />
                    </div>
                    <div className={`${styles['content']} ${styles['pad-med']}`}>
                        <p>Mileage: <strong>{car.mileage}</strong></p>
                        <p>description</p>
                        <div className={styles["align-center"]}>
                            <div>Price: <strong>{car.price}$</strong></div>
                            <div>Fuel: <strong>{car.fuel}</strong></div>
                            <div>Year: <strong>{car.year}</strong></div>
                            <div>Location: <strong>location</strong></div>
                            <ul className={styles["catalog"]}>
                                {equipment.map((e) =>
                                    <EquipmentItem key={e['_id']}{...e} />
                                )}
                            </ul>
                            <Link className={styles["action"]} to={`/details/${id}/decorate`}>Decorate</Link>
                            <Link className={styles["action"]} to={`/details/${id}/edit`}>Edit</Link>
                            <Link className={styles["action"]} to={`/details/${id}/delete`}>Delete</Link>
                            <Link className={styles["action"]} to={`/details/${id}/buy`}>Buy</Link>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default DetailsPage;