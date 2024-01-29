"use client"

import styles from '@/style/dropdown.module.css'
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Dropdown = () => {
    const router = useRouter();

    const logOut = () => {
        Cookies.remove('token');
        Cookies.remove('name');
        Cookies.remove('email');

        router.push('/login');
    }

    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdownItem}>
                <Image 
                    src='/log-out-1-svgrepo-com.png'
                    width={20}
                    height={20}
                    style={{ marginRight: '5px' }}
                />
                <span onClick={logOut}>Log out</span>
            </div>
        </div>
    );
}

export default Dropdown;