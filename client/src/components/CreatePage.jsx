import styles from "./CreatePage.module.css";
import { create } from "../services/carServices";
import { useState } from "react";
import Errors from "./Errors";

const formInitialState = {
    make: '',
    model: '',
    mileage: '',
    fuel: '',
    year: '',
    location: '',
    image: '',
    price: '',
    description: '',
};

const CreatePage = () => {

    const [formValues, setFormValues] = useState(formInitialState);
    const [formErrors, setformErrors] = useState(formInitialState);
    const [showErrorBox, setShowErrorBox] = useState(formInitialState);

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        formFieldsValidator(e);
    };

    const resetFormHandler = () => {
        setFormValues(formInitialState);
        // setErrors({});
    };

    const publishHandler = async (e) => {
        e.preventDefault();
        // console.log(formValues);
        try {
            entireFormValidator();
            await create(formValues);
            resetFormHandler();            
        } catch (err) {
            window.alert(err.message);
        }
    };

    function formFieldsValidator(e) {
        // console.log(e.target.name);
        const currField = e.target.name;
        const currFieldValue = e.target.value;
        if (currFieldValue == '') {
            setformErrors(state => ({
                ...state,
                [currField]: `${currField} is required!`
            }));
        } else {
            setformErrors(state => ({
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
            if (value == '') {
                errors[key] = `${key} is required!`;
            } else {
                errors[key] = '';
            }
        }
        setShowErrorBox(errors);
        throw Error('All fields are required!')
    }

    return (
        // <--Create Page-->
        <section id="create-section" className="">
            <h1 className={styles["item"]}>Publish Ad</h1>
            <main className={`${styles["item"]} ${styles["padded"]} ${styles["align-center"]}`}>
                <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} method="post" action="/create" onSubmit={publishHandler}>
                    {showErrorBox && Object.values(showErrorBox).some(v => v) && (
                        <div className={styles["error-box"]}>
                            {Object.entries(showErrorBox).map((err) =>
                                <Errors key={err[0]} errMessage={err[1]} />
                            )}
                        </div>
                    )}
                    <div className={`${styles["col"]} ${styles["aligned"]}`}>
                        <label><span>Make</span><input type="text" name="make" value={formValues.make} className={formErrors['make'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Model</span><input type="text" name="model" value={formValues.model} className={formErrors['model'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Mileage</span><input type="number" name="mileage" value={formValues.mileage} className={formErrors['mileage'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Fuel</span><input type="text" name="fuel" value={formValues.fuel} className={formErrors['fuel'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Year</span><input type="number" name="year" value={formValues.year} className={formErrors['year'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Location</span><input type="text" name="location" value={formValues.location} className={formErrors['location'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Image</span><input type="text" name="image" value={formValues.image} className={formErrors['image'] && styles["field-error"]} onChange={changeHandler} /></label>
                        <label><span>Price</span><input type="number" step="any" name="price" value={formValues.price} className={formErrors['price'] && styles["field-error"]} onChange={changeHandler} /></label>
                    </div>
                    <div className={`${styles["content"]} ${styles["pad-med"]} ${styles["align-center"]} ${styles["vertical"]}`}>
                        <label><span>Description</span><textarea name="description" value={formValues.description} className={formErrors['description'] && styles["field-error"]} onChange={changeHandler} ></textarea></label>
                        <div className={styles["align-center"]}>
                            <input className={styles["action"]} type="submit" value="Publish Item" />
                        </div>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default CreatePage;