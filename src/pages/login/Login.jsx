import {FloatLabel} from "primereact/floatlabel";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {UserService} from "../../services/user/user.js";
import { LocalStorageService } from "../../services/localStorage/localStorage.js";

export const Login = () => {
    const email = useRef();
    const password = useRef();
    const navigation = useNavigate();
    
    const submit = async (e) => {
        e.preventDefault();

        const userService = new UserService();
        const result = await userService.login(email.current.value, password.current.value);
        const localStorageService = new LocalStorageService();
        localStorageService.addLoggedUser(result.data);
        alert(result.message);
        navigation('/')
    }
    return <>

        <form onSubmit={(e) => submit(e)}>
            <div className="card flex justify-content-center">
                <FloatLabel className={'field-label'}>
                    <InputText ref={email} type={'email'} id="email"/>
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <FloatLabel className={'field-label'}>
                    <Password inputRef={password} feedback={false} tabIndex={1} />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
            </div>
            <Button type={'submit'} className={'field-label'} label="Login"/>
        </form>
    </>
}
