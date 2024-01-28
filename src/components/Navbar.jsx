import styles from "@/style/navbar.module.css";

const Navbar = () => {

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.title}>
                <b>biro</b>Perjalanan
            </div>
            <div className={styles.username}>
                Username
            </div>
        </div>
    );
}

export default Navbar;