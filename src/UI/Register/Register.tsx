import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from './Registration.module.css';
import {registrationTC} from "../../BLL/register/registerReducer";
import {IAppStore} from "../../BLL/store/store";
import {Navigate} from "react-router-dom";

//Add my branch
interface IRegisterProps {
}

const Register: React.FC<IRegisterProps> = ({}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [emailError, serEmailError] = useState<null | string>(null)
    const dispatch = useDispatch()
    const isRegistration = useSelector<IAppStore, boolean>(state => state.register.isRegistration)


    const registration = () => {
        if (password === repeatPassword){
            dispatch(registrationTC({email, password}))
        }
    }

    const blurHandler = () => {
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!re.test(String(email).toLowerCase())) {
            serEmailError('не верный формат email')
        } else {
            serEmailError(null)
        }
    }

    if (isRegistration){
        return <Navigate to={'/login'} />
    }

    return <div className={styles.container}>

        <div>
            <input type="text"
                   placeholder={'e-mail'}
                   value={email}
                   name={'email'}
                   onChange={(e)=>{setEmail(e.target.value)}}
                   onBlur={blurHandler}
            />

        </div>
        {emailError !== null && <span>{emailError}</span>}
        <div><input type="password"
                    placeholder={'pass'}
                    value={password}
                    name={'password'}
                    onChange={(e)=>{setPassword(e.target.value)}}
        /></div>

        <div><input type="password"
                    placeholder={'repeat pass'}
                    value={repeatPassword}
                    name={'repeatPassword'}
                    onChange={(e)=>{setRepeatPassword(e.target.value)}}
        /></div>

        <button onClick={registration}
                name={'Register'}>
            submit

        </button>


    </div>;
};

export default Register;
