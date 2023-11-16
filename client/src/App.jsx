import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { useState } from "react";
import { AuthContext } from "./contexts/authContext";

import styles from "./App.module.css";

function App() {
    const [user, setUser] = useState({});

    const onLogin = async (e) => {
        e.preventDefault();
        // console.log(userData);
    };

    return (
        <AuthContext.Provider value={{onLogin}}>
            <div id="page-content" className={styles["page-content"]}>
                <Header />
                <Main />
                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App
