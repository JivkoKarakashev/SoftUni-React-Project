import styles from "./CatalogPage.module.css";
import { useEffect, useState } from "react";
import { getAll } from "../services/carServices";
import CatalogItem from "./CatalogItem";

const CatalogPage = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getAll()
            .then(result => {
                const carsEntries = Object.entries(Object.values(result)[0]);
                // console.log(carsEntries);
                setCars(carsEntries);
            });
    }, []);
    
    return (
        // <--Catalog Page-->
        <section id="catalog-section" className={styles["spaced"]}>
            <h1 className={styles["item"]}>Auto Occasion</h1>
            <ul className={`${styles["catalog"]} ${styles["cards"]}`}>
                {/* {console.log(cars)} */}
                {cars.map((car) => 
                    <CatalogItem key={car[1]['_id']}{...car[1]}/>
                )}                
            </ul>
            <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                <p>Nothing has been published yet. Be the first!</p>
                <div>
                    <a className={styles["action"]} href="/create">Publish Ad</a>
                </div>
            </main>
        </section>
    );
};

export default CatalogPage;