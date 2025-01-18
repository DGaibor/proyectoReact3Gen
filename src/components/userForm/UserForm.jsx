import {InputText, FloatLabel, Password, Button} from "../../services/prime/primeComponents.js";
import {useEffect, useRef, useState} from "react";
import './UserForm.css'
import {UserService} from "../../services/user/user.js";
import {useNavigate} from "react-router-dom";
import {LocalStorageService} from "../../services/localStorage/localStorage.js";



export const UserForm = (props) => {
    const id = props?.id;
    
    let typeForm='create'
    if(id){
        typeForm = 'update'
    }
    
   const firstName = useRef();
   const lastName = useRef();
   const email = useRef();
   const password = useRef();
   const navigation = useNavigate();
   const [user, setUser] = useState({
       firstName:'',
       lastName:'',
       email:'',
       password:'',
   });
   const userService = new UserService();
   const localStorageService = new LocalStorageService();
   
   const getUser=async () => {
           const resultUser = await userService.getUser(id);
           console.log(resultUser);
           setUser(resultUser.data)
   }


    useEffect( () => {
        if (typeForm === 'update') {
            getUser();
        }
    }, []);
   
   
   const submit = async (e) => {
       e.preventDefault();

       const user = {
           firstName: firstName.current?.value,
           lastName: lastName.current?.value,
           email: email.current?.value,
           password: password.current?.value,
       }
       if (typeForm === 'create') {
           const result =  await userService.createUser(user);
           alert(result.message);
           navigation('/login')
       }
       
       if (typeForm === 'update') {
           const result =  await userService.updateUser(user, id);
           localStorageService.updateLoggedUser(result.data)
           alert(result.message);
           navigation('/')
       }
   }
   
    
    return <>
        <form onSubmit={(e) => submit(e)}>
            <div className="card flex justify-content-center">
                <FloatLabel className={'field-label'}>
                    <InputText ref={firstName} id="first-name" defaultValue={user.firstName} />
                    <label htmlFor="first-name">First Name</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <InputText ref={lastName} id="last-name"   defaultValue={user.lastName}/>
                    <label htmlFor="last-name">last Name</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <InputText ref={email} type={'email'} id="email"  defaultValue={user.email} />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <Password inputRef={password} toggleMask  defaultValue={user.password} />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
            </div>
            <Button type={'submit'} className={'field-label'} label={typeForm==='create'? 'Create User' : 'Edit User'} />
        </form>
    </>
}
