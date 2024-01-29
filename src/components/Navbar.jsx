'use client';

import styles from "@/style/navbar.module.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [name, setName] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if(!name){
            if(Cookies.get('token')){
                setName(Cookies.get('name'));
            } else {
                router.push('/login');
            }
        }
    }, [name]);

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.title}>
                <b>biro</b>Perjalanan
            </div>
            <div className={styles.username} onClick={() => setToggleDropdown(!toggleDropdown)}>
                {name}
                <Image 
                    src="/down-arrow-svgrepo-com.png"
                    width={12}
                    height={12}
                    style={{ marginInline: "6px" }}
                />
            </div>
            {toggleDropdown ? 
                <Dropdown />
                : null }
        </div>
    );
}

export default Navbar;