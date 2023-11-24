import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Errors from "./Errors";
import { AuthContext } from "../contexts/AuthContext";

import styles from "./EditPage.module.css";

const EditPage = () => {
    const navigateFunc = useNavigate();
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    // const [car, setCar] = useState([]);

    const [formValues, setFormValues] = useState({});
    const [showErrorFields, setshowErrorFields] = useState({});
    const [showErrorBox, setShowErrorBox] = useState({});

    useEffect(() => {
        const abortController = new AbortController();

        const options = {
            method: 'GET',
            headers: { ['X-Authorization']: user['accessToken'] },
            body: {}
        };

        fetch(`http://localhost:3030/data/cars/${id}`, { signal: abortController.signal }, options)
            .then(res => res.json())
            .then(result => {
                // result = {};
                // return console.log(result);
                setFormValues(result);
            })
            .catch(err => {
                console.log(err.message);
            });

        return () => abortController.abort();
    }, [id, user]);
    // console.log(car);
    // console.log(showErrorFields);
    // return console.log(showErrorBox);

    const changeHandler = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        formFieldsValidator(e);
    };

    const updateHandler = async (e) => {
        e.preventDefault();

        const options = {
            method: 'PUT',
            headers: { 'X-Authorization': user['accessToken'], 'Content-Type': 'application/json' },
            body: {}
        };

        // return console.log(formValues);
        try {
            entireFormValidator();
            const { make, model, mileage, fuel, year, location, image, price, description, equipmentId } = formValues;
            options.body = JSON.stringify({ make, model, mileage, fuel, year, location, image, price, description, equipmentId });
            // console.log(options.body);
            const response = await fetch(`http://localhost:3030/data/cars/${id}`, options);
            const updatedCar = await response.json();
            // console.log(updatedCar);
            navigateFunc(`/details/${updatedCar['_id']}`);
        } catch (err) {
            console.log(err.message);
        }
    };

    function formFieldsValidator(e) {
        // console.log(e.target.name);
        const currField = e.target.name;
        const currFieldValue = e.target.value;
        if (currFieldValue == '') {
            setshowErrorFields(state => ({
                ...state,
                [currField]: `${currField} is required!`
            }));
        } else {
            setshowErrorFields(state => ({
                ...state,
                [currField]: ''
            }));
        }
    }

    function entireFormValidator() {
        // console.log(e.target.name);
        // console.log(formValues);
        const errors = {};
        for (const [key, value] of Object.entries(formValues)) {
            // console.log(key, value);
            if (value === '') {
                errors[key] = `${key} is required!`;
            } else {
                errors[key] = '';
            }
        }

        setshowErrorFields(state => ({
            ...state,
            ...errors
        }));

        setShowErrorBox(state => ({
            ...state,
            ...errors
        }));
        if (Object.values(errors).some(v => v)) {
            throw Error('All fields are required!');
        }
    }

    return (
        // <--Edit Page-->
        <section id="create-section">
            <h1 className={styles["item"]}>Edit Ad</h1>
            <main className={`${styles["item"]} ${styles["padded"]} ${styles["align-center"]}`}>
                <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} method="post" action="details/:id/edit" onSubmit={updateHandler}>
                    {showErrorBox && Object.values(showErrorBox).some(v => v) && (
                        <div className={styles["error-box"]}>
                            {Object.entries(showErrorBox).map((err) =>
                                <Errors key={err[0]} errMessage={err[1]} />
                            )}
                        </div>
                    )}
                    <div className={`${styles["col"]} ${styles["aligned"]}`}>
                        <label><span>Make</span><input type="text" name="make" value={formValues.make} className={showErrorFields['make'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Model</span><input type="text" name="model" value={formValues.model} className={showErrorFields['model'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Mileage</span><input type="number" name="mileage" value={formValues.mileage} className={showErrorFields['mileage'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Fuel</span><input type="text" name="fuel" value={formValues.fuel} className={showErrorFields['fuel'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Year</span><input type="number" name="year" value={formValues.year} className={showErrorFields['year'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Location</span><input type="text" name="location" value={formValues.location} className={showErrorFields['location'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Image</span><input type="text" name="image" value={formValues.image} className={showErrorFields['image'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Price</span><input type="number" step="any" name="price" value={formValues.price} className={showErrorFields['price'] && styles["field-error"]} onChange={changeHandler} /></label>
                    </div>
                    <div className={`${styles["content"]} ${styles["pad-med"]} ${styles["align-center"]} ${styles["vertical"]}`}>
                        <label><span>Description</span><textarea name="description" value={formValues.description} className={showErrorFields['description'] && styles["field-error"]} onChange={changeHandler} ></textarea></label>
                        <div className={styles["align-center"]}>
                            <input className={styles["action"]} type="submit" value="Update Item" />
                        </div>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default EditPage;