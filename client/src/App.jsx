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
        const { repass, ...regData } = formData;
        if (repass !== regData['password'] ) {
            throw new Error('Passwords don\'t match!');
        }
        // console.log(regData);
        options.body = JSON.stringify(regData);
        // console.log(options.body);
        const response = await fetch('http://localhost:3030/users/register', options);
        if (response.status == 409) {
            throw response;
        }
        const userData = await response.json();
        // console.log(userData);
        const { _id, accessToken, email, username } = userData;
        setUser({ _id, accessToken, email, username });
        navigateFunc('/');
    };
    const onLogout = async () => {
        const options = {
            method: 'GET',
            headers: {['X-Authorization']: user['accessToken']},
        };
        await fetch('http://localhost:3030/users/logout', options);
        setUser({});
        navigateFunc('auth/login');
    };
    // console.log(user);

    const authContext = {
        onLogin,
        onRegister,
        onLogout,
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
