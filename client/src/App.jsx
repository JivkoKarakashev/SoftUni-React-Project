import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/authContext";

import styles from "./App.module.css";

function App() {
    const navigateFunc = useNavigate();
    const [user, setUser] = useState({});

    const onLogin = async (formData) => {
        // console.log(formData);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {}
        };
        options.body = JSON.stringify(formData);
        // console.log(options.body);
        const response = await fetch('http://localhost:3030/users/login', options);
        if (response.status == 403) {
            throw response;
        }
        const userData = await response.json();
        setUser(userData);
        navigateFunc('/');
    };
    const onRegister = async (formData) => {
        //  console.log(formData);
         const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {}
        };
        options.body = JSON.stringify(formData);
        // console.log(options.body);
        const response = await fetch('http://localhost:3030/users/register', options);
        if (response.status == 409) {
            throw response;
        }
        const userData = await response.json();
        setUser(userData);
        navigateFunc('/');
    };
    console.log(user);

    const authContext = {
        onLogin,
        onRegister,
        user,
        hasUser: !!user['accessToken']
    };

    return (
        <AuthContext.Provider value={authContext}>
            <div id="page-content" className={styles["page-content"]}>
                <Header />
                <Main />
                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App
