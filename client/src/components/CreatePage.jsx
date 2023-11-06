import styles from "./CreatePage.module.css";
import { create } from "../services/carServices";

const CreatePage = () => {

    const createHandler = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        await create(data);
    };

    return (
        // <--Create Page-->
        <section id="create-section" className="">
            <h1 className={styles["item"]}>Publish Ad</h1>
            <main className={`${styles["item"]} ${styles["padded"]} ${styles["align-center"]}`}>
                <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} method="post" action="/create" onSubmit={createHandler}>
                    <div className={`${styles["col"]} ${styles["aligned"]}`}>
                        <label><span>Make</span><input type="text" name="make" defaultValue="" /></label>
                        <label><span>Model</span><input type="text" name="model" defaultValue="" /></label>
                        <label><span>Mileage</span><input type="number" name="mileage" defaultValue="" /></label>
                        <label><span>Fuel</span><input type="text" name="fuel" defaultValue="" /></label>
                        <label><span>Year</span><input type="number" name="year" defaultValue="" /></label>
                        <label><span>Location</span><input type="text" name="location" defaultValue="" /></label>
                        <label><span>Image</span><input type="text" name="image" defaultValue="" /></label>
                        <label><span>Price</span><input type="number" step="any" name="price" defaultValue="" /></label>
                    </div>
                    <div className={`${styles["content"]} ${styles["pad-med"]} ${styles["align-center"]} ${styles["vertical"]}`}>
                        <label><span>Description</span><textarea name="description"></textarea></label>
                        <div className={styles["align-center"]}>
                            <input className={styles["action"]} type="submit" value="Publish Item" />
                        </div>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default CreatePage;