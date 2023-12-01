import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { AuthProvider } from "./contexts/authContext";
import { OwnerProvider } from "./contexts/OwnerContext";

import styles from "./App.module.css";

function App() {

    return (
        <AuthProvider>
            <div id="page-content" className={styles["page-content"]}>
                <Header />
                <OwnerProvider>
                    <Main />
                </OwnerProvider>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App
