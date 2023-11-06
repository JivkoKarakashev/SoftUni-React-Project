import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import styles from "./App.module.css";

function App() {
    return (
        <div id="page-content" className={styles["page-content"]}>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App
