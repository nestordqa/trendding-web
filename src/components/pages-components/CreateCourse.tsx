import React, { useEffect, useState } from 'react'
import { HiOutlineUpload, HiOutlineCloudUpload } from "react-icons/hi";
import { useQuery } from '@tanstack/react-query'
import { useGlobalData } from '../../ThemeContext';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { HiOutlineEye } from "react-icons/hi";
import arrow from '../../assets/images/dropdown-arrow.png';
import '../../styles/courses-dashboard.css';
import '../../styles/create-course-dashboard.css';
import { Chip } from '../common-components/Chip';
import { getAllCategories } from '../../utils/common/react-query/categories';
import { simpleWarningAlert, successAlert } from '../../utils/common/alerts';
import { useNavigate } from 'react-router-dom';
import { SimpleTooltip } from '../common-components/Tooltip';
import { ImageObject } from '../../utils/types/commonTypes';
import { uploadImage } from '../../utils/common/common';
import { Loading } from '../common-components/Loading';
import { postImageCourse, postVideoCourse } from '../../utils/common/react-query/filesQuering';
import { getTeachers } from '../../utils/common/react-query/teachers';
import { Tooltip } from 'react-tooltip';

export const CreateCourse = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<ImageObject | any>({ preview: '', data: '' });
    const [video, setVideo] = useState<ImageObject | any>({ preview: '', data: '' });
    const globalData = useGlobalData();
    const [style, setStyle] = useState('');
    const { 
        register, 
        handleSubmit,
        control, 
        formState: { errors },
        reset,
    } = useForm();

    const handleFileChange = (e: any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img);
    }

    const handleVideoChange = (e: any) => {
        const video = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setVideo(video);
    }

    const redirect = (): void => {
        navigate('/admin/dashboard/courses');
    };

    const { data } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const data = await getAllCategories(globalData.jwt);
            return await data?.json();
        }
    });

    const { data: teachers } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const data = await getTeachers(globalData.jwt);
            return await data?.json();
        }
    });

    // const getCategories = (): any => {
    //     return data.map((item: any, idx: number) => (
    //         <option value={item.id} key={idx}>{item.name}</option>
    //     ));
    // };

    //On submit create course form
    const onSubmit = async (data: FieldValues): Promise<void> => {
        setLoading(true);
        try {
            // if (!image || image.data !instanceof File) return;
            const url = process.env.REACT_APP_API_BASE_URL as string;
            let datos = data;
            datos.categoriesId = Number(datos.categoriesId);
            datos.hours = Number(datos.hours);
            datos.students = Number(datos.students);
            datos.lectionsNumber = Number(datos.lectionsNumber);
            datos.active = datos.status === 'true' ? true : false;
            datos.test = datos.test === 'true' ? true : false;
            datos.certificado = datos.certificado === 'true' ? true : false;

            if (image && image.data && video && video.data) {
                const newImage = await uploadImage(image.data);
                const newVideo = await uploadImage(video.data);
                if (newImage && newVideo) { 
                    const course = await fetch(`${url}courses`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': globalData.jwt
                        },
                        body: JSON.stringify(datos)
                    });
                    const courseCreated = await course.json();
                    if (courseCreated && courseCreated.message) {
                        const image = await postImageCourse(
                            globalData.jwt,
                            {
                                url: newImage.location,
                                coursesId: courseCreated.new_admin.id
                            }
                        );
                        const video = await postVideoCourse(
                            globalData.jwt,
                            {
                                url: newVideo.location,
                                coursesId: courseCreated.new_admin.id
                            }
                        );
                        if (image && video) {
                            successAlert(
                                redirect,
                                '¡Bien hecho!',
                                '¡El nuevo curso ha sido creado exitósamente!',
                                style
                            );
                        }
                    }
                } else {
                    simpleWarningAlert(
                        'Ups, ocurrió un error...',
                        'Hubo un error al subir tu archivo JPG o MP4',
                        style
                    );
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
        {loading ?
            <Loading message={'Creando el curso...'}/>
            :
            null
        }
        <div className="header-courses">
            <div className="first-container">
                <div className="courses-title">
                    Gestión de Cursos
                </div>
                <div className="courses-subtitle">
                    Inicio / Crear Curso
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
                                    Crear Curso
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
                                Nombre del curso
                                <SimpleTooltip idTooltip={'name'} text={'Máximo 10 caracteres. No se permite HTML ni emojis'}/>
                            </label>
                            <input
                                placeholder='Escriba el nombre de la lección aquí...'
                                className={`input-global-${style}`}
                                {...register("name", { required: true })} 
                            />
                            {errors.name && <span className='input-error'>El nombre del curso es necesario para poder crearlo</span>}

                            <label 
                                htmlFor="description"
                                className='inputs-label'
                            >
                                Descripción
                                <SimpleTooltip idTooltip={'description'} text={'No se permite HTML ni emojis'}/>
                            </label>
                            <textarea
                                placeholder='Escriba aquí la descripción del curso...'
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
                                    {errors.date && <span className='input-error'>La fecha del curso es necesario para poder crearlo</span>}
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
                                    {errors.name && <span className='input-error'>La hora del curso es necesario para poder crearlo</span>}
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
                                        <SimpleTooltip idTooltip={'categorie'} text={'Aquí puedes escoger la categoría, las mismas puedes crearlas en el apartado de gestión de categorías.'}/>
                                    </span>
                                    <select 
                                        {...register("categoriesId", { 
                                            required: true,
                                        })} 
                                    >
                                        {
                                            data && data.length && data.map((item: any, idx: number) => (
                                                <option value={item.id} key={idx}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.categorie && <span className='input-error'>La categoría es necesaria para poder crearlo</span>}
                                </div>
                                <div className="little-input-container">
                                    {/* <label 
                                        htmlFor="name"
                                        className='inputs-label'
                                    >
                                        Nombre de la lección
                                    </label>
                                    <input
                                        placeholder='Escriba el nombre de la lección aquí...'
                                        className={`input-global-${style}`}
                                        {...register("name", { required: true })} 
                                    />
                                    {errors.name && <span className='input-error'>El nombre del curso es necesario para poder crearlo</span>} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`general-info-${style}`}>
                    <div className='title-container-2'>
                        <h2 className='section-title'>
                            Media
                        </h2>
                    </div>
                    <span
                        style={{
                            display: 'flex',
                            columnGap: '0.5em',
                            height: "2.5em",
                            fontSize: "16px",
                            fontWeight: "600"
                            // backgroundColor: "#FFF"
                        }}
                    >
                        Portada del curso
                        <SimpleTooltip idTooltip={'portada-curso'} text={'Aquí puedes adjuntar un archivo JPG, JPEG o PNG para usarlo como portada del curso.'}/>
                    </span>
                    <div className={`input-image-container-${style}`}>
                        {!image.preview && 
                            <div className="disclaimer-image-container">
                                <HiOutlineCloudUpload 
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    color: '#898989',
                                    cursor: 'pointer'
                                }}
                                />
                                <h3>
                                    Arrastre o suelte aquí tus archivos
                                </h3>
                            </div>                                
                            }
                        {image.preview && 
                            <img 
                                src={image.preview} 
                                className='image-preview'
                                alt='Uploading'
                            />}
                        <Controller
                            name='file'
                            control={control}
                            render={({field}:any) => (
                                <div className='"file-upload"'>
                                    <input 
                                        {...field}
                                        type='file'
                                        className='input-image'
                                        onChange={(e: any) => {
                                            field.onChange(e);
                                            handleFileChange(e);
                                        }}
                                    />
                                    <HiOutlineUpload
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            color: '#898989',
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            marginLeft: '20px',
                                            marginTop: '18px'
                                        }}
                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        Sube tu imagen aquí
                                    </label>
                                </div>
                            )}
                        />
                    </div>
                    <br />
                    <span
                        style={{
                            display: 'flex',
                            columnGap: '0.5em',
                            height: "2.5em",
                            fontSize: "16px",
                            fontWeight: "600"
                            // backgroundColor: "#FFF"
                        }}
                    >
                        Video del curso
                        <SimpleTooltip idTooltip={'video-curso'} text={'Aquí puedes adjuntar un archivo MP4 que haga referencia al curso en general.'}/>
                    </span>
                    <div className={`input-image-container-${style}`}>
                        {!video.preview && 
                            <div className="disclaimer-image-container">
                                <HiOutlineCloudUpload 
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    color: '#898989',
                                    cursor: 'pointer'
                                }}
                                />
                                <h3>
                                    Arrastre o suelte aquí tus archivos
                                </h3>
                            </div>                                
                            }
                        {video.preview && 
                            <video src={video.preview} autoPlay={false} controls className='video-preview'></video>
                        }
                        <Controller
                            name='video'
                            control={control}
                            render={({field}:any) => (
                                <div className='"file-upload"'>
                                    <input 
                                        {...field}
                                        type='file'
                                        className='input-image'
                                        onChange={(e: any) => {
                                            field.onChange(e);
                                            handleVideoChange(e);
                                        }}
                                    />
                                    <HiOutlineUpload
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            color: '#898989',
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            marginLeft: '20px',
                                            marginTop: '18px'
                                        }}
                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        Sube tu video aquí
                                    </label>
                                </div>
                            )}
                        />
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
                            <span>Nomber del profesor <SimpleTooltip text={'Aquí puedes escoger el profesor que dictará el curso'} idTooltip={'select-teacher'}/> </span>
                            <select 
                                {...register("teacherId", { 
                                    required: true,
                                })} 
                            >
                                {/* <option value=>Estado</option> */}
                                {
                                    teachers && teachers.length ?
                                    teachers?.map((item: any, idx: number) => (
                                        <option value={item.id} key={idx}>{item.name}</option>
                                    ))
                                    :
                                    null
                                }
                            </select>
                            <img src={arrow} alt="Dropdown arrow" className='dropdown-arrow-select'/>
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
                            <span>Cantidad máxima de estudiantes</span>
                            <select 
                                {...register("students", { 
                                    required: true,
                                })} 
                            >
                                {/* <option value=>Estado</option> */}
                                <option value={'10'}>10 estudiantes</option>
                                <option value={'50'}>50 estudiantes</option>
                                <option value={'100'}>100 estudiantes</option>
                                <option value={'200'}>200 estudiantes</option>
                                <option value={'400'}>400 estudiantes</option>
                                <option value={'600'}>600 estudiantes</option>
                                <option value={'800'}>800 estudiantes</option>
                            </select>
                            <img src={arrow} alt="Dropdown arrow" className='dropdown-arrow-select'/>
                        </div>
                        <div className="select-status">
                            <span>Cantidad de Lecciones</span>
                            <select 
                                {...register("lectionsNumber", { 
                                    required: true,
                                })} 
                            >
                                {/* <option value=>Estado</option> */}
                                <option value={'2'}>2 lecciones</option>
                                <option value={'3'}>3 lecciones</option>
                                <option value={'4'}>4 lecciones</option>
                                <option value={'5'}>5 lecciones</option>
                                <option value={'6'}>6 lecciones</option>
                                <option value={'7'}>7 lecciones</option>
                                <option value={'8'}>8 lecciones</option>
                                <option value={'9'}>9 lecciones</option>
                                <option value={'10'}>10 lecciones</option>
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
                        <div className="select-status">
                            <span
                                style={{
                                    display: 'flex',
                                    columnGap: '0.5em'
                                }}
                            >
                                Certificado
                                <SimpleTooltip idTooltip={'certificado'} text={'Si escoges un SI, se abrirá un apartado para que subas los archivos del exámen'}/>
                            </span>
                            <select 
                                {...register("certificado", { 
                                    required: true,
                                })} 
                            >
                                {/* <option value=>Estado</option> */}
                                <option value={'true'}>Si</option>
                                <option value={'false'}>No</option>
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
                                Modalidad
                                {/* <SimpleTooltip idTooltip={'certificado'} text={''}/> */}
                            </span>
                            <select 
                                {...register("modalidad", { 
                                    required: true,
                                })} 
                            >
                                {/* <option value=>Estado</option> */}
                                <option value={'FILES'}>Archivos</option>
                                <option value={'VIDEOS'}>Videos</option>
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
