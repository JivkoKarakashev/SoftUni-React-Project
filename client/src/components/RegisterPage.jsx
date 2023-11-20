import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { AuthContext } from "../contexts/authContext";
import Errors from "./Errors";

import styles from "./RegisterPage.module.css";

const formInitialState = {
    email: '',
    username: '',
    password: '',
    repass: '',
};

const RegisterPage = () => {
    const { onRegister } = useContext(AuthContext);

    const [formValues, setFormValues] = useState(formInitialState);
    const [showErrorFields, setshowErrorFields] = useState(formInitialState);
    const [showErrorBox, setShowErrorBox] = useState(formInitialState);

    const changeHandler = (e) => {
        setFormValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
        formFieldsValidator(e);
    };

    const registerHandler = async (e) => {
        setshowErrorFields(formInitialState);
        setShowErrorBox(formInitialState);
        e.preventDefault();

        try {
            entireFormValidator();
            await onRegister(formValues);
        } catch (err) {
            let error = err;
            if (err.status == 409) {
                error = await err.json();
                // console.log(error);
            }
            setShowErrorBox(state => ({
                ...state,
                'message': error['message']
            }));
            return;
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
        // <--Register Page-->
        <section id="register-section" className="">
            <h1 className={styles["item"]}>Register</h1>
            <div className={styles["padded"]}>
                <main className={`${styles["item"]} ${styles["align-center"]}`}>
                    <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} method="post" action="/auth/register" onSubmit={registerHandler}>
                        {showErrorBox && Object.values(showErrorBox).some(v => v) && (
                            <div className={styles["error-box"]}>
                                {Object.entries(showErrorBox).map((err) =>
                                    <Errors key={err[0]} errMessage={err[1]} />
                                )}
                            </div>
                        )}
                        <div className={styles["aligned"]}>
                            <label><span>Email</span><input type="text" name="email" value={formValues.email} className={showErrorFields['email'] && styles["field-error"]} onChange={changeHandler} /></label>
                            <label><span>Username</span><input type="text" name="username" value={formValues.username} className={showErrorFields['username'] && styles["field-error"]} onChange={changeHandler} /></label>
                            <label><span>Password</span><input type="password" name="password" value={formValues.password} className={showErrorFields['password'] && styles["field-error"]} onChange={changeHandler} /></label>
                            <label><span>Repeat</span><input type="password" name="repass" value={formValues.repass} className={showErrorFields['repass'] && styles["field-error"]} onChange={changeHandler} /></label>
                        </div>
                        <input className={`${styles["cta"]} ${styles["action"]}`} type="submit" value="Sign Up" />
                    </form>
                </main>
                <footer>Already have an account? <Link to="/auth/login">Sign in here</Link></footer>
            </div>
        </section>
    );
};

export default RegisterPage;