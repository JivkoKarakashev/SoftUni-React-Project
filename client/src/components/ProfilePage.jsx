import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import ProfileItem from "./ProfileItem";

import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        // console.log(user);

        const options = {
            method: 'GET',
            headers: { ['X-Authorization']: user['accessToken'] },
            body: {}
        };

        fetch(`http://localhost:3030/data/cars?where=_ownerId%3D%22${user['_id']}%22`, { signal: abortController.signal }, options)
            .then(res => res.json())
            .then(result => {
                // result = [];
                // return console.log(result);
                setCars(result);
            })
            .catch(err => {
                console.log(err.message);
            });

        return () => abortController.abort();
    }, [user]);

    return (
        // <--Profile Page-->
        <section id="profile-section">
            <h1 className={styles["item"]}>User Profile</h1>
            <div className={`${styles["item"]} ${styles["padded"]}`}>
                <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                    <div className={styles["userInfo"]}>
                        <div className={styles["avatar"]}>
                            <img src="/static/images/profilePic.png" />
                        </div>
                        <h2>{user['email']}</h2>
                    </div>
                </main>
            </div>
            <div className={styles["board"]}>
                {/* <--If there are published ads--> */}
                {cars.length != 0 && cars.map((car) =>
                    <ProfileItem key={car['_id']}{...car} />
                )}
                {/* <--If there are no published ads--> */}
                {cars.length == 0 && <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                    <p>This user has no published Ad yet!</p>
                </main>}
            </div>
        </section>
    );
};

export default ProfilePage;