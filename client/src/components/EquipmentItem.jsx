/* eslint-disable react/prop-types */
import styles from "./DetailsPage.module.css";
import tooltipStyles from "./Tooltip.module.css";

const EquipmentItem = ({
    name,
    description,
    image
}) => {

    return (
        <li className={tooltipStyles["custom-tooltip"]}>
            <img className={`${styles["facility-icon"]}`} src={image} />
            <span> {name}</span>
            <ul>
                <li className={`${tooltipStyles["custom-tooltip-text"]}`}>{description}</li>
            </ul>
        </li>
    );
};

export default EquipmentItem;