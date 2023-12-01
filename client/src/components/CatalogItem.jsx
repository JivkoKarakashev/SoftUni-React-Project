/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./CatalogPage.module.css";

import { OwnerContext } from "../contexts/OwnerContext";

const CatalogItem = ({
    _id,
    _ownerId,
    make,
    model,
    fuel,
    year,
    image,
    price,
}) => {
    const { onDetailsClick } = useContext(OwnerContext);

    const detailsClickHandler = () => {
        onDetailsClick(_ownerId);
    };

    return (
        <li className={styles["item"]}>
            <header className={styles["pad-med"]}>
                <h2>{make} {model}</h2>
            </header>

            <main className={styles["align-center"]}>
                <img className={styles["img-thumb"]} src={image} />
            </main>

            <footer className={`${styles["align-center"]} ${styles["pad-med"]}`}>
                <p>Fuel: <strong>{fuel}</strong></p>
                <p>Year: <strong>{year}</strong></p>
                <p>Price: <strong>{price}$</strong></p>
                <Link className={styles["action"]} to={`/details/${_id}`} onClick={detailsClickHandler}>See details</Link>
            </footer>
        </li>
    );
};

export default CatalogItem;