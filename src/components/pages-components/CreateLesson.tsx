import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useGlobalData } from '../../ThemeContext';
import { FieldValues, useForm } from 'react-hook-form';
import { HiOutlineEye } from "react-icons/hi";
import arrow from '../../assets/images/dropdown-arrow.png';
import '../../styles/courses-dashboard.css';
import '../../styles/create-lesson-dashboard.css';
import { Chip } from '../common-components/Chip';
import { getAllCategories } from '../../utils/common/react-query/categories';
import { successAlert } from '../../utils/common/alerts';
import { useNavigate } from 'react-router-dom';
import { SimpleTooltip } from '../common-components/Tooltip';
import { getCourses } from '../../utils/common/react-query/courses';

export const CreateLesson = () => {
    const navigate = useNavigate();
    const globalData = useGlobalData();
    const [style, setStyle] = useState('');
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset,
    } = useForm();

    const redirect = (): void => {
        navigate('/admin/dashboard/lessons');
    };

    const { data } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const data = await getAllCategories(globalData.jwt);
            return await data?.json();
        }
    });

    const { data: courses } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const data = await getCourses(globalData.jwt);
            return await data?.json();
        }
    });

    const getCategories = (): any => {
        return data.map((item: any, idx: number) => (
            <option value={item.id} key={idx}>{item.name}</option>
        ));
    };

    const getCoursesList = (): any => {
        return courses.map((item: any, idx: number) => (
            <option value={item.id} key={idx}>{item.name}</option>
        ));
    };

    //On submit create course form
    const onSubmit = async (data: FieldValues): Promise<void> => {
        try {
            let datos = data;
            datos.categoriesId = Number(datos.categoriesId);
            datos.courseId = Number(datos.courseId);
            datos.hours = Number(datos.hours);
            datos.active = datos.status === 'true' ? true : false;
            datos.test = datos.test === 'true' ? true : false;

            const url = process.env.REACT_APP_API_BASE_URL as string;
            const lesson = await fetch(`${url}lections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': globalData.jwt
                },
                body: JSON.stringify(datos)
            });
            const courseCreated = await lesson.json();
            if (courseCreated && courseCreated.message) {
                successAlert(
                    redirect,
                    '¡Bien hecho!',
                    '¡La lección ha sido creada exitósamente!',
                    style
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            // reset();
        }
    }

    useEffect(() => {
            if (globalData !== undefined) {
                setStyle(globalData.theme);
            }
    // eslint-disable-next-line
    }, [globalData, data]);

  return (
    <div className='create-courses-container'>
        <div className="header-courses">
            <div className="first-container">
                <div className="courses-title">
                    Gestión de Lecciones
                </div>
                <div className="courses-subtitle">
                    Inicio / Gestión de Lecciones / Crear Lección
                </div>
            </div>
            <div className="second-container">
                {/* <input
                    className={`input-search-${style}`}
                    onChange={handlerSearch}
                />
                <img src={searchIcon} alt="Search Icon" onClick={onSearch}/> */}
            </div>
            <div className="third-container">
                {/* <div className={`bell-${style}`}>
                    <img src={bell} alt="Notifications bell" />
                </div> */}
            </div>
        </div>

        <div className="courses-form-container">
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={`status-container-${style}`}>
                    <div className={`custom-select-${style}`}>
                        <div className="header-status-select">
                            <div className='title-container'>
                                <h2 className='section-title'>
                                    Crear Lección
                                </h2>
                                <Chip
                                    type={'simple'}
                                    name={'Draft'}
                                />
                            </div>
                            <div className="button-container">
                                <button className='create-course-button'>
                                    Vista previa
                                </button>
                                <HiOutlineEye className='eye-icon' />
                            </div>
                        </div>
                        <div className="select-status">
                            <span>Estado</span>
                            <select 
                                {...register("status", { 
                                    required: true,
                                })} 
                            >
                                {/* <option value=>Estado</option> */}
                                <option value={'true'}>Activo</option>
                                <option value={'false'}>Inactivo</option>
                            </select>
                            <img src={arrow} alt="Dropdown arrow" className='dropdown-arrow-select'/>
                        </div>
                    </div>
                </div>
                <div className={`general-info-${style}`}>
                    <div className='title-container-2'>
                        <h2 className='section-title'>
                            Información general
                        </h2>
                    </div>
                    <div className="inputs-container-course">
                        <div className="first-input-container">
                            <label 
                                htmlFor="name"
                                className='inputs-label'
                            >
                                Nombre de la lección
                                <SimpleTooltip idTooltip={'name'} text={'Máximo 10 caracteres. No se permite HTML ni emojis'}/>
                            </label>
                            <input
                                placeholder='Escriba el nombre de la lección aquí...'
                                className={`input-global-${style}`}
                                {...register("name", { required: true })} 
                            />
                            {errors.name && <span className='input-error'>El nombre de la lección es necesario para poder crearlo</span>}

                            <label 
                                htmlFor="description"
                                className='inputs-label'
                            >
                                Descripción
                                <SimpleTooltip idTooltip={'description'} text={'No se permite HTML ni emojis'}/>
                            </label>
                            <textarea
                                placeholder='Escriba aquí la descripción de la lección...'
                                className={`input-global-textarea-${style}`}
                                {...register("description", { required: true })} 
                            />
                            {errors.description && <span className='input-error'>La descripción es necesaria para poder crearlo</span>}
                        </div>
                        <div className="second-input-container">
                            <div className='second-input-container-container'>
                                <div className="little-input-container">
                                    <label 
                                        htmlFor="name"
                                        className='inputs-label'
                                    >
                                        Fecha
                                        <SimpleTooltip idTooltip={'date'} text={'Debes escoger una fecha posterior al día de hoy'}/>
                                    </label>
                                    <input
                                        type='date'
                                        className={`input-global-${style}`}
                                        {...register("date", { required: true })} 
                                    />
                                    {errors.date && <span className='input-error'>La fecha de la lección es necesaria para poder crearlo</span>}
                                </div>
                                <div className="little-input-container">
                                    <label 
                                        className='inputs-label'
                                    >
                                        Hora
                                        <SimpleTooltip idTooltip={'hour'} text={'Aqui puedes escoger la hora del curso, selecciona cuidadósamente si es PM o AM'}/>
                                    </label>
                                    <input
                                        type='time'
                                        className={`input-global-${style}`}
                                        {...register("hour", { required: true })} 
                                    />
                                    {errors.name && <span className='input-error'>La hora de la lección es necesaria para poder crearlo</span>}
                                </div>
                            </div>
                            <div className='second-input-container-container'>
                                <div className={`little-input-container custom-select-${style}`}>
                                    <span
                                        style={{
                                            display: 'flex',
                                            columnGap: '0.5em'
                                        }}
                                    >
                                        Categoria
                                        <SimpleTooltip idTooltip={'categorieId'} text={'Aquí puedes escoger la categoría con la que estará relacionada la lección'}/>
                                    </span>
                                    <select 
                                        {...register("categoriesId", { 
                                            required: true,
                                        })} 
                                    >
                                        {getCategories()}
                                    </select>
                                    {errors.categorie && <span className='input-error'>La categoría es necesaria para poder crearlo</span>}
                                </div>
                                <div className={`little-input-container custom-select-${style}`}>
                                    <span
                                        style={{
                                            display: 'flex',
                                            columnGap: '0.5em'
                                        }}
                                    >
                                        Curso
                                        <SimpleTooltip idTooltip={'courseId'} text={'Aquí puedes escoger el curso con el que estará relacionada la lección'}/>
                                    </span>
                                    <select 
                                        {...register("courseId", { 
                                            required: true,
                                        })} 
                                    >
                                        {getCoursesList()}
                                    </select>
                                    {errors.categorie && <span className='input-error'>El curso es necesario para poder crearla</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`aditional-container-${style}`}>
                    <div className={`custom-select-${style}`}>
                        <div className="header-status-select">
                            <div className='title-container-3'>
                                <h2 className='section-title'>
                                    Detalles del curso
                                </h2>
                            </div>
                        </div>
                        <div className="select-status">
                            <span>Cantidad de horas del curso</span>
                            <select 
                                {...register("hours", { 
                                    required: true,
                                })} 
                            >
                                {/* <option value=>Estado</option> */}
                                <option value={'1'}>1 hora</option>
                                <option value={'5'}>5 horas</option>
                                <option value={'10'}>10 horas</option>
                                <option value={'20'}>20 horas</option>
                                <option value={'40'}>40 horas</option>
                                <option value={'60'}>60 horas</option>
                                <option value={'80'}>80 horas</option>
                            </select>
                            <img src={arrow} alt="Dropdown arrow" className='dropdown-arrow-select'/>
                        </div>
                        <div className="select-status">
                            <span
                                style={{
                                    display: 'flex',
                                    columnGap: '0.5em'
                                }}
                            >
                                Examen
                                <SimpleTooltip idTooltip={'test'} text={'Si escoges un SI, se abrirá un apartado para que subas los archivos del exámen'}/>
                            </span>
                            <select 
                                {...register("test", { 
                                    required: true,
                                })} 
                            >
                                {/* <option value=>Estado</option> */}
                                <option value={'true'}>Si</option>
                                <option value={'false'}>No</option>
                            </select>
                            <img src={arrow} alt="Dropdown arrow" className='dropdown-arrow-select'/>
                        </div>
                    </div>
                </div>
                <div className="botones-container">
                    <input
                        className='submit-button-cancel-new-course'
                        value={'Cancelar'}
                        onClick={() => reset()}
                    />
                    <input
                        className='submit-button-new-course' 
                        type="submit"
                        value={'Guardar'}
                    />
                </div>
            </form>
        </div>
    </div>
  )
}
