import { useEffect, useState } from "react";
import CatalogItem from "./CatalogItem";
import { Link } from "react-router-dom";

import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        fetch('http://localhost:3030/jsonstore/cars', { signal: abortController.signal })
            .then(res => res.json())
            .then(result => {
                // result = [];
                // return console.log(result);
                const carsEntries = Object.values(result);
                // console.log(carsEntries);
                setCars(carsEntries);
            })
            .catch(err => {
                console.log(err.message);
            });

        return () => abortController.abort();
    }, []);

    return (
        // <--Catalog Page-->
        <section id="catalog-section" className={styles["spaced"]}>
            <h1 className={styles["item"]}>Auto Occasion</h1>
            <ul className={`${styles["catalog"]} ${styles["cards"]}`}>
                {/* {console.log(cars)} */}
                {cars.map((car) =>
                    <CatalogItem key={car['_id']}{...car} />
                )}
            </ul>
            {cars.length == 0 &&
                <>
                    <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                        <p><strong>Nothing has been published yet. Be the first!</strong></p>
                        <div>
                            <Link className={styles["action"]} to="/create">Publish Ad</Link>
                        </div>
                    </main>
                </>
            }
        </section>
    );
};

export default CatalogPage;