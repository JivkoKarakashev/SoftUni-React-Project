import styles from "./EditPage.module.css";

const EditPage = () => {
    return (
        // <--Edit Page-->
        <section id="create-section">
            <h1 className={styles["item"]}>Edit Ad</h1>
            <main className={`${styles["item"]} ${styles["padded"]} ${styles["align-center"]}`}>
                <form className={`${styles["layout"]} ${styles["left"]} ${styles["large"]}`} method="post" action="details/:id/edit">
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
                            <input className={styles["action"]} type="submit" value="Update Item" />
                        </div>
                    </div>
                </form>
            </main>
        </section>
    );
};

export default EditPage;