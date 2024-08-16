import { useEffect, useState } from 'react';
import '../../styles/Login.css';
import '../../styles/index.css'
import darkLogo from '../../assets/images/logo-dark.png';
import gradient from '../../assets/images/login-background-gradient.png';
import pattern from '../../assets/images/login-background.png';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useGlobalData } from '../../ThemeContext';
import { getTokenData, isAdmin, setDataLocalStorage, validateSession } from '../../utils/common/common';
function AdminLogin() {

    const [style, setStyle] = useState('dark');
    const globalData = useGlobalData();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset,
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
    const onSubmit = async (data: FieldValues): Promise<void> => {
        try {
            const url = process.env.REACT_APP_API_BASE_URL as string;
            const login = await fetch(`${url}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const loginSuccess = await login.json();
            if (loginSuccess) {
                const tokenData = getTokenData(loginSuccess);
                if (!isAdmin(tokenData)) {
                    alert('el usuario no es un admin!');
                    return;
                } else {
                    globalData.setToken(loginSuccess);
                    globalData.setUsuario(tokenData);
                    if (data.remember) {
                        await setDataLocalStorage(globalData);
                    }
                    navigate('/admin/dashboard');
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            reset();
        }
    }
    
    useEffect(() => {
        if (validateSession()) {
            navigate('/admin/dashboard');
        }
        if (globalData !== undefined) {
            setStyle(globalData.theme);
        }
    // eslint-disable-next-line
    }, [globalData])

    return (
        <div className={`login-container-${style}`}>
            <img 
                src={darkLogo}
                alt='Trendding logo' 
            />
            <p className='login-header'>
                Inicia sesión con tu cuenta
            </p>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className='login-form'
            >
                {/* register your input into the hook by invoking the "register" function */}
                <div className='input-container'>
                    <label htmlFor="email">Email</label>
                    <input
                        className={`input-${style}`}
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
                        className={`input-${style}`}
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
            <div className='login-background-container-1'>
                <img 
                    src={gradient} 
                    alt="Trendding Gradient" 
                />
            </div>
            <div className='login-background-container-2'>
                <img 
                    src={pattern} 
                    alt="Trendding Pattern" 
                />
            </div>
        </div>
    );
    }

export default AdminLogin;
