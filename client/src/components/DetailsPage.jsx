import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import EquipmentItem from "./EquipmentItem";
import { AuthContext } from "../contexts/authContext";
import { OwnerContext } from "../contexts/OwnerContext";

import styles from "./DetailsPage.module.css";

const carDetailsInitialState = {
    'isOwner': false,
    'canBuy': false
};

const DetailsPage = () => {

    const navigateFunc = useNavigate();
    const { user, hasUser } = useContext(AuthContext);
    const { isOwner } = useContext(OwnerContext);
    const { id } = useParams();
    const [car, setCar] = useState({});
    const [equipment, setEquipment] = useState([]);
    const [sold, setSold] = useState(0);
    const [carDetails, setCarDetails] = useState(carDetailsInitialState);

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
            fetch(`http://localhost:3030/data/bought?where=productId%3D%22${id}%22&distinct=_ownerId&count`, { signal: abortController.signal }, options)
        ];

        Promise.all(requests)
            .then(async ([car, equipment, bought]) => {
                if (car.status == 404 || equipment.status == 404) {
                    throw new Error;
                }
                const c = await car.json();
                const e = await equipment.json();
                const b = await bought.json();
                return [c, e, b];
            })
            .then(result => {
                // console.log(result);
                const [car, equipment, bought] = result;
                const equipmentIds = car['equipmentId'] || [];
                // console.log(equipment, equipmentIds, bought);
                const availableEquipment = Object.values(equipment);
                const selected = availableEquipment.filter(e => equipmentIds.includes(e['_id']));
                // return console.log(selected);
                setCar(car);
                setEquipment(() => ([
                    ...selected
                ]));
                setSold(bought);
                if (hasUser) {
                    const details = {};
                    const carOwnerId = car['_ownerId'];
                    details['isOwner'] = user['_id'] == carOwnerId;
                    details['canBuy'] = details.isOwner == false && bought == 0;
                    // console.log(details);
                    setCarDetails((state) => ({
                        ...state,
                        ...details
                    }));
                }
            })
            // .catch((error) => console.log(error));
            .catch(() => navigateFunc('/404'));

        return () => abortController.abort();
    }, [id, navigateFunc, user, hasUser]);
    // console.log(carDetails);
    // console.log(sold);

    const buyHandler = async (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: { 'X-Authorization': user['accessToken'], 'Content-Type': 'application/json' },
            body: null
        };

        try {
            options.body = JSON.stringify({ productId: id });
            // console.log(options.body);
            await fetch('http://localhost:3030/data/bought', options);
            setSold(state => Number(state) + 1);
            setCarDetails((state) => ({
                ...state,
                canBuy: false
            }))
        } catch (err) {
            console.log(err.message);
        }
    };

    const deleteHandler = async (e) => {
        e.preventDefault();
        if (!isOwner) {
            console.log(isOwner);
            return navigateFunc('/auth/login');
        }
        const choice = confirm(`Are you sure want to delete fact ${car['make']} ${car['model']}`);
        if (choice) {
            console.log('DELETED!');
            // await fetch(`http://localhost:3030/data/cars/${id}`);
            // navigateFunc('/catalog');
        }
    }

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
                        <p>description {car.description}</p>
                        <div className={styles["align-center"]}>
                            <div>Price: <strong>{car.price}$</strong></div>
                            <div>Fuel: <strong>{car.fuel}</strong></div>
                            <div>Year: <strong>{car.year}</strong></div>
                            <div>Location: <strong>{car.location}</strong></div>
                            <ul className={styles["catalog"]}>
                                {equipment.map((e) =>
                                    <EquipmentItem key={e['_id']}{...e} />
                                )}
                            </ul>
                            {carDetails['isOwner'] && !sold && (<Link className={styles["action"]} to={`/details/${id}/decorate`}>Decorate</Link>)}
                            {carDetails['isOwner'] && !sold && (<Link className={styles["action"]} to={`/details/${id}/edit`}>Edit</Link>)}
                            {carDetails['isOwner'] && !sold && (<Link className={styles["action"]} to={`/details/${id}/delete`} onClick={deleteHandler}>Delete</Link>)}
                            {!carDetails['isOwner'] && carDetails['canBuy'] && (<Link className={styles["action"]} to={`/details/${id}/buy`} onClick={buyHandler}>Buy</Link>)}
                            {hasUser && sold != 0 && (<div><strong>The Car was Sold!</strong></div>)}
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
};

export default DetailsPage;