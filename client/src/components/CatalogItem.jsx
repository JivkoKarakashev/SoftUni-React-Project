/* eslint-disable react/prop-types */
import styles from "./CatalogPage.module.css";

const CatalogItem = ({
    _id,
    make,
    model,
    fuel,
    year,
    image,
    price,
    onDetailsClick
}) => {
    const onDetailsClickHandler = () => {
        onDetailsClick(_id);
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
                <a className={styles["action"]} href="#" onClick={onDetailsClickHandler}>See details</a>
            </footer>
        </li>
    );
};

export default CatalogItem;