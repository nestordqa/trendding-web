import React, { useState } from 'react';
import '../../styles/Login.css';
import '../../styles/index.css'
import darkLogo from '../../assets/images/logo-dark.png';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function AdminLogin() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset,
        watch
    } = useForm();

    const [inputPasswordType, setInputPasswordType] = useState('password');

    const eyeStyle = {
        color: '#7f7e7f'
    };

    const [eyes, setEyes] = useState(false);

    const handleEyes = (): void => {
        if (inputPasswordType === 'password') {
            setInputPasswordType('text');
        }
        if (inputPasswordType === 'text') {
            setInputPasswordType('password');
        }
        setEyes(!eyes);
    };

    //On submit login form
    const onSubmit = (data: FieldValues): void => {
        console.log(data);
        reset();
    }
    console.log(watch('holi', errors));
    
    return (
        <div className='login-container-dark'>
            <img 
                src={darkLogo}
                alt='Trendding logo' 
            />
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='login-form'
            >
                {/* register your input into the hook by invoking the "register" function */}
                <div className='input-container'>
                    <label htmlFor="email">Email</label>
                    <input
                        className='input-dark'
                        placeholder='email@tuemail.com'
                        {...register("email", { 
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })} 
                    />
                    {errors?.email?.type === 'required' && <span className='input-error'>El email es requerido para iniciar sesión</span>}
                    {errors?.email?.type === 'pattern' && <span className='input-error'>Has ingresado un email inválido</span>}
                </div>

                {/* include validation with required or other standard HTML validation rules */}
                <div className="input-container">
                    <label htmlFor="email">Contraseña</label>
                    <input
                        placeholder='Contraseña'
                        className='input-dark'
                        type={inputPasswordType}
                        {...register("password", { required: true })} 
                    />
                    {errors.password && <span className='input-error'>La contraseña es requerida para iniciar sesión</span>}
                    <div 
                        onClick={()=> handleEyes()}
                        className='eye-container'
                    >
                        {!eyes && <AiFillEye style={eyeStyle}/>}
                        {eyes && <AiFillEyeInvisible style={eyeStyle}/>}                
                    </div>
                </div>
                {/* errors will return when field validation fails  */}

                <div className="input-container-terms">
                    <label className="custom-checkbox">
                        <input
                            type="checkbox"
                            {...register('remember')}
                        />
                        <span className="checkmark"></span>
                        Recuérdame
                    </label>
                    <Link to={"/forget"} className='sample-link'>¿Olvidaste tu contraseña?</Link>
                </div>

                <input
                    className='submit-button' 
                    type="submit"
                    value={'Inicia sesión'}
                />
            </form>
        </div>
    );
    }

export default AdminLogin;
