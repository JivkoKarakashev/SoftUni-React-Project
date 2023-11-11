import styles from "./Page404.module.css";

const Page404 = () => {
    return (
        <>
            <h1>404 Not Found</h1>
            <h2 className={styles["text-center"]}>The page you&apos;re looking for does not exist.</h2>
            <img className={styles["img-center"]} src="/static/images/404.jpg" />
        </>
    );
};

export default Page404;