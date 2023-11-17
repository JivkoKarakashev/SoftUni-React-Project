import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { AuthContext } from "../contexts/authContext";
import Errors from "./Errors";

import styles from "./LoginPage.module.css";

const formInitialState = {
    email: '',
    password: '',
};

const LoginPage = () => {
    const { onLogin } = useContext(AuthContext);

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

    const loginHandler = async (e) => {
        setshowErrorFields(formInitialState);
        setShowErrorBox(formInitialState);
        e.preventDefault();

        try {
            entireFormValidator();
            await onLogin(formValues);
        } catch (err) {
            if (err.status == 403) {
                const error = await err.json();
                // console.log(error);
                setShowErrorBox(state => ({
                    ...state,
                    'message': error['message']
                }));
            }
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
        // <--Login Page-->
        <section id="login-section" className="">
            <h1 className={styles["item"]}>Login</h1>
            <div className={styles["padded"]}>
                <main className={`${styles["item"]} ${styles["align-center"]}`}>
                    <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} method="post" action="/auth/login" onSubmit={loginHandler}>
                        {showErrorBox && Object.values(showErrorBox).some(v => v) && (
                            <div className={styles["error-box"]}>
                                {Object.entries(showErrorBox).map((err) =>
                                    <Errors key={err[0]} errMessage={err[1]} />
                                )}
                            </div>
                        )}
                        <div className={styles["aligned"]}>
                            <label><span>Email</span><input type="text" name="email" value={formValues.email} className={showErrorFields['email'] && styles["field-error"]} onChange={changeHandler} /></label>
                            <label><span>Password</span><input type="password" name="password" value={formValues.password} className={showErrorFields['password'] && styles["field-error"]} onChange={changeHandler} /></label>
                        </div>
                        <input className={`${styles["cta"]} ${styles["action"]}`} type="submit" value="Sign In" />
                    </form>
                </main>
                <footer>Don&apos;t have an account? <Link to="/auth/register">Sign up here</Link></footer>
            </div>
        </section>
    );
};

export default LoginPage;