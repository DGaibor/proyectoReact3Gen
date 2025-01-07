import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/Password";
import { Button } from "primereact/Button";
import {useRef, useState} from "react";
import './UserForm.css'
import {UserService} from "../../services/user/user.js";
import {useNavigate} from "react-router-dom";



export const UserForm = () => {
   const firstName = useRef();
   const lastName = useRef();
   const email = useRef();
   const password = useRef();
   const navigation = useNavigate();
   
   
   const submit = async (e) => {
       e.preventDefault();

       const user = {
           firstName: firstName.current?.value,
           lastName: lastName.current?.value,
           email: email.current?.value,
           password: password.current?.value,
       }
       const userService = new UserService();
       const result =  await userService.createUser(user);
       alert(result.message);
       navigation('/login')
   }
   
    
    return <>
        
        <form onSubmit={(e) => submit(e)}>
            <div className="card flex justify-content-center">
                <FloatLabel className={'field-label'}>
                    <InputText ref={firstName} id="first-name" />
                    <label htmlFor="first-name">First Name</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <InputText ref={lastName} id="last-name" />
                    <label htmlFor="last-name">last Name</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <InputText ref={email} type={'email'} id="email" />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <Password inputRef={password} toggleMask />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
            </div>
            <Button type={'submit'} className={'field-label'} label="Submit" />
        </form>
    </>
}
