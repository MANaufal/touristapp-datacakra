"use client"

import styles from '@/style/login.module.css';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Login(){
   const router = useRouter();

   const [LoginError, setLoginError] = useState(null);
   const [isLogin, setisLogin] = useState(true);

   const switchLogin = () => {
      setisLogin(!isLogin);
      setLoginError(false);
   }

   const onSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      const requestBody = new URLSearchParams(formData).toString();

      if(isLogin){
         await login(requestBody);
      } else {
         await register(requestBody);
      }
   }

   const login = async (requestBody) => {
      const response = await fetch('https://biroperjalanan.datacakra.com/api/authaccount/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: requestBody,
      });

      if(response.ok){
         setLoginError(false);
         const data = await response.json();
         
         Cookies.set('name', data.data.Name);
         Cookies.set('email', data.data.Email);
         Cookies.set('token', data.data.Token);

         console.log(Cookies.get('token'));
         router.push('/');
      } else if(response.status == 401){
         setLoginError("Your email or password is incorrect");
      }
   }

   const register = async (requestBody) => {
      const response = await fetch('https://biroperjalanan.datacakra.com/api/authaccount/register', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: requestBody,
      });

      if(response.ok){
         login(requestBody);
      }
   }

   useEffect(() => {
      const token = Cookies.get('token');
      if(token){
         router.push('/');
      }
   }, [])

   return(
      <div className={styles.container}>
         <div className={styles.loginContainer}>
            <div className={`${isLogin ? styles.cardContainerRegister : styles.cardContainer}`}>
               <div className={styles.cardTextContainer}>
                  <p><b>biro</b>Perjalanan</p>
               </div>
            </div>

            <form className={`${isLogin ? styles.formContainerRegister : styles.formContainer}`} onSubmit={onSubmit}>
               <input name='email' type="email" placeholder="Email" className={styles.formInput}/>
               <input name='name' placeholder="Username" className={isLogin ? styles.disappear : styles.formInput}/>
               <input name='password' placeholder="Password" className={styles.formInput} type='password'/>
               {LoginError && <p className={styles.incorrectInput}>{LoginError}</p>}
               <button className={`${styles.formButton} ${isLogin ? styles.buttonActive : ''}`}>{isLogin ? 'Login' : 'Register'}</button>
               <p className={styles.reminderText}>{isLogin ? `Don't have an account? ` : `Already have an account? `}<a onClick={switchLogin} className={styles.textSwitch}>{isLogin ? `register` : `login`}</a></p>
            </form>
         </div>
      </div>
   );
}
