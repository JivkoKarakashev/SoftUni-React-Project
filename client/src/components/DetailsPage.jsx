import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import EquipmentItem from "./EquipmentItem";
import { getCarById } from "../services/carServices";
import { getAllEquipment } from "../services/equipmentServices";

import styles from "./DetailsPage.module.css";

const DetailsPage = () => {

    const { id } = useParams();
    const [car, setCar] = useState({});
    const [equipment, setEquipment] = useState([]);
    const navigateFunc = useNavigate();

    useEffect(() => {
        const requests = [
            getCarById(id),
            getAllEquipment(),
        ];

        Promise.all(requests)
            .then(result => {
                // console.log(result);
                const [car, equipment] = result;
                const equipmentIds = car['equipmentId'];
                // console.log(equipment, equipmentIds);
                const availableEquipment = Object.values(equipment);
                const selected = availableEquipment.filter(e => equipmentIds.includes(e['_id']));
                // return console.log(selected);
                setCar(car);
                setEquipment(() => ([
                    ...selected
                ]));
            })
            .catch(() => navigateFunc('/404'));
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