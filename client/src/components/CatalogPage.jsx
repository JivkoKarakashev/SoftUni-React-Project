import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CatalogItem from "./CatalogItem";

import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        const requests = [
            fetch('http://localhost:3030/data/cars', { signal: abortController.signal }),
            fetch('http://localhost:3030/data/bought', { signal: abortController.signal })
        ];

        Promise.all(requests)
            .then(async ([cars, purchased]) => {
                const c = await cars.json();
                const p = await purchased.json();
                return [c, p];
            })
            .then(result => {
                // result = [];
                const [cars, purchased] = result;
                // console.log(cars);
                let purchasedIds = [];
                // console.log(purchased);
                if (purchased.length != 0) {
                    purchasedIds = purchased.map(car => car['productId']);                    
                }
                const notPurchased = cars.filter(car => !purchasedIds.includes(car['_id']));
                // return console.log(notPurchased);
                setCars(notPurchased);
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