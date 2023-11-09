import { useEffect, useState } from "react";
import { getAll } from "../services/carServices";
import CatalogItem from "./CatalogItem";
import { Link } from "react-router-dom";

import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getAll()
            .then(result => {
                const carsEntries = Object.values(result);
                // console.log(carsEntries);
                setCars(carsEntries);
            });
    }, []);

    const detailsClickHandler = (carId) => {
        //TO DO...
        console.log(carId);
    };
    
    return (
        // <--Catalog Page-->
        <section id="catalog-section" className={styles["spaced"]}>
            <h1 className={styles["item"]}>Auto Occasion</h1>
            <ul className={`${styles["catalog"]} ${styles["cards"]}`}>
                {/* {console.log(cars)} */}
                {cars.map((car) => 
                    <CatalogItem key={car['_id']}{...car} onDetailsClick={detailsClickHandler}/>
                )}                
            </ul>
            <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                <p>Nothing has been published yet. Be the first!</p>
                <div>
                    <Link className={styles["action"]} to="/create">Publish Ad</Link>
                </div>
            </main>
        </section>
    );
};

export default CatalogPage;