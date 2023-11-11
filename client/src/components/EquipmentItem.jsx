/* eslint-disable react/prop-types */
import styles from "./DetailsPage.module.css";

const EquipmentItem = ({
    name,
    image
}) => {
    return (
        <li><img className={styles["facility-icon"]} src={image} /> {name}</li>
    );
};

export default EquipmentItem;