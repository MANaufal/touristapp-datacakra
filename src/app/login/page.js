"use client"

import styles from '@/style/login.module.css';
import { useState, FormEvent } from 'react';

export default function Login(){
   const [LoginError, setLoginError] = useState(false);
   const [isLogin, setisLogin] = useState(false);

   function switchLogin(){
      setisLogin(!isLogin);
      console.log(isLogin);
   }

   async function onSubmit(event){
      event.preventDefault();

      const formData = new FormData(event.target);

      console.log(formData.get('email'), formData.get('password'));

      const requestBody = new URLSearchParams(formData).toString();
      
      var apiUrl;

      if(isLogin){
         await login(requestBody)
      }
   }

   async function login(requestBody){
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
         const token = data.data.Token;
         console.log(token);
      } else {
         setLoginError(true);
      }
   }

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
               {LoginError && <p className={styles.incorrectInput}>Your email or password is incorrect</p>}
               <button className={`${styles.formButton} ${isLogin ? styles.buttonActive : ''}`}>{isLogin ? 'Login' : 'Register'}</button>
               <p className={styles.reminderText}>{isLogin ? `Don't have an account? ` : `Already have an account? `}<a onClick={switchLogin} className={styles.textSwitch}>{isLogin ? `register` : `login`}</a></p>
            </form>
         </div>
      </div>
   );
}
