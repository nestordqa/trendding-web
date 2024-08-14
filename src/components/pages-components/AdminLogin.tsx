import React from 'react';
import '../../styles/Login.css';
import '../../styles/index.css'
import darkLogo from '../../assets/images/logo-dark.png';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Login } from '../../utils/types/loginTypes';
import { Link } from 'react-router-dom';

function AdminLogin() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch
    } = useForm();

    //On submit login form
    const onSubmit = (data: FieldValues) => {
        console.log(data);
        return data;
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
                        className='input-dark'
                        {...register("password", { required: true })} 
                    />
                    {errors.password && <span className='input-error'>La contraseña es requerida para iniciar sesión</span>}
                </div>
                {/* errors will return when field validation fails  */}

                <div className="input-container-terms">
                    <label>
                        <input
                            type="checkbox"
                            {...register('remember')}
                        />
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
