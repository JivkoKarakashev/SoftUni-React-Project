import { useState } from "react";

import CatalogItem from "./CatalogItem";

import styles from "./SearchPage.module.css";

const formInitialState = {
    make: '',
    model: '',
    from: '',
    to: '',
};

const SearchPage = () => {

    const [formValues, setFormValues] = useState(formInitialState);
    const [cars, setCars] = useState([]);

    const changeHandler = (e) => {
        if (e.target.name == 'from') {
            if (e.target.value > formValues.to) {
                setFormValues(state => ({
                    ...state,
                    to: e.target.value
                }));                
            }
        } else if (e.target.name == 'to') {
            if (e.target.value < formValues.from && e.target.value != '') {
                setFormValues(state => ({
                    ...state,
                    from: e.target.value
                }));                
            }
        }
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const searchHandler = async (e) => {
        e.preventDefault();
        const make = formValues.make.trim();
        const model = formValues.model.trim();
        const from = formValues.from.trim() || 1900;
        const to = formValues.to.trim() || 2023;
        // console.log(make);
        // console.log(model);
        // console.log(from);
        // return console.log(to);        
        try {
            const response = await fetch(`http://localhost:3030/data/cars?where=year>%3D${from} AND year<%3D${to} AND make%20LIKE%20%22${make}%22 AND model%20LIKE%20%22${model}%22`);
            const result = await response.json();
            // console.log(result);
            setCars(result);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        // <--Search Page-->
        <>
            <section id="search-section" className="">
                <h1 className={styles["item"]}>Search Form</h1>
                <div className={styles["padded"]}>
                    <main className={`${styles["item"]} ${styles["align-center"]}`}>
                        <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} action="/search" method="get" onSubmit={searchHandler}>
                            <div className={styles["aligned"]}>
                                <label><span>Make</span><input type="text" name="make" placeholder="Make..." value={formValues.make} onChange={changeHandler} /></label>
                                <label><span>Model</span><input type="text" name="model" placeholder="Model..." value={formValues.model} onChange={changeHandler} /></label>
                                <label><span>Year</span><input type="number" name="from" min={1900} max={2023} placeholder="from..." value={formValues.from} onChange={changeHandler} /></label>
                                <label><span>Year</span><input type="number" name="to" min={1900} max={2023} placeholder="to..." value={formValues.to} onChange={changeHandler} /></label>
                                <input className={`${styles["cta"]} ${styles["action"]}`} type="submit" value="Search" />
                            </div>
                        </form>
                    </main>
                </div>
            </section>
            <section id="catalog-section" className={styles["spaced"]}>
                <h1 className={styles["item"]}>Search Results</h1>
                <ul className={`${styles["catalog"]} ${styles["cards"]}`}>
                    {/* {console.log(cars)} */}
                    {cars.map((car) =>
                        <CatalogItem key={car['_id']}{...car} />
                    )}
                </ul>
                {cars.length == 0 &&
                    <main className={`${styles["item"]} ${styles["align-center"]}`}>
                        <p><strong>No Results!</strong></p>
                    </main>
                }
            </section>
        </>
    );
};

export default SearchPage;