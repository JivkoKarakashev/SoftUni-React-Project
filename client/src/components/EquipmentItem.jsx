/* eslint-disable react/prop-types */
import styles from "./DetailsPage.module.css";

const EquipmentItem = ({
    name,
    image
}) => {
    return (
        <li>{name}<img className={styles["facility-icon"]} src={image} /></li>
    );
};

export default EquipmentItem;