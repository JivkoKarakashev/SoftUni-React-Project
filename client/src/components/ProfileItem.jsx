/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import styles from "./ProfilePage.module.css";

const ProfileItem = ({
    _id,
    make,
    model,
    year,
    location,
    image,
}) => {

    return (
        <div className={`${styles["item"]} ${styles["padded"]}`}>
            <main className={`${styles["item"]} ${styles["pad-large"]} ${styles["align-center"]}`}>
                <div className={styles["event-info"]}>
                    <img src={image} />
                    <h2>{make} - {model}</h2>
                    <h6>{location}</h6>
                    <h6>{year}</h6>
                    <div className={styles["align-right"]}>
                        <Link to={`/details/${_id}`} className={styles["action"]}>Details</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileItem;