import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useGlobalData } from '../../ThemeContext';
import { FieldValues, useForm, Controller } from 'react-hook-form';
import { HiOutlineUpload, HiOutlineEye, HiOutlineCloudUpload  } from "react-icons/hi";
import arrow from '../../assets/images/dropdown-arrow.png';
import '../../styles/courses-dashboard.css';
import '../../styles/create-teacher.css';
import { Chip } from '../common-components/Chip';
import { getAllCategories } from '../../utils/common/react-query/categories';
import { successAlert } from '../../utils/common/alerts';
import { useNavigate } from 'react-router-dom';
import { SimpleTooltip } from '../common-components/Tooltip';
import { ImageObject } from '../../utils/types/commonTypes';
import { uploadImage } from '../../utils/common/common';
import { postImageTeacher } from '../../utils/common/react-query/filesQuering';
import { Loading } from '../common-components/Loading';

export const CreateTeacher = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const globalData = useGlobalData();
    const [style, setStyle] = useState('');
    const [image, setImage] = useState<ImageObject | any>({ preview: '', data: '' });
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset,
        control
    } = useForm();

    const handleFileChange = (e: any) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img);
    }

    const redirect = (): void => {
        navigate('/admin/dashboard/teachers');
    };

    const { data } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const data = await getAllCategories(globalData.jwt);
            return await data?.json();
        }
    });

    const getCategories = (): any => {
        return data?.map((item: any, idx: number) => (
            <option value={item.id} key={idx}>{item.name}</option>
        ));
    };

    //On submit create course form
    const onSubmit = async (data: FieldValues): Promise<void> => {
        setLoading(true);
        const url = process.env.REACT_APP_API_BASE_URL as string;
        try {
            let datos = data;
            datos.active = datos.status === 'true' ? true : false;
            datos.categoriesId = Number(datos.categoriesId);
            if (image && image.data) {
                const newImage = await uploadImage(image.data);
                if (newImage) {
                    const course = await fetch(`${url}teachers`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': globalData.jwt
                        },
                        body: JSON.stringify(datos)
                    });
                    const courseCreated = await course.json();
                    if (courseCreated && courseCreated.message) {
                        const image = await postImageTeacher(
                            globalData.jwt,
                            {
                                teachersId: courseCreated.new_admin.id,
                                url: newImage.location
                            }
                        );
                        if (image) {
                            successAlert(
                                redirect,
                                '¡Bien hecho!',
                                '¡El nuevo profesor ha sido creado exitósamente!',
                                style
                            );
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
        {
            loading ?
                <Loading message={'Creando el nuevo profesor...'} />
            :
            null
        }
        <div className="header-courses">
            <div className="first-container">
                <div className="courses-title">
                    Gestión de Profesores
                </div>
                <div className="courses-subtitle">
                    Inicio / Gestión de Profesores / Crear profesor
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
                                    Crear Profesor
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
                                Nombre del profesor
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
                                placeholder='Escriba aquí la descripción del profesor...'
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
                                        {getCategories()}
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
                </div>
                <div className={`aditional-container-${style}`}>
                    <div className={`custom-select-create-teacher-${style}`}>
                        <div className="header-status-select">
                            <div className='title-container-3'>
                                <h2 className='section-title'>
                                    Detalles
                                </h2>
                            </div>
                        </div>
                        <div className="select-status">
                            <label 
                                htmlFor="phone"
                                className='inputs-label'
                            >
                                Teléfono
                                <SimpleTooltip idTooltip={'phone'} text={'Máximo 12 caracteres. No se permite HTML ni emojis'}/>
                            </label>
                            <input
                                placeholder='Escriba el teléfono del profesor aquí...'
                                className={`input-global-${style}`}
                                {...register("phone", { required: true })} 
                            />
                            {errors.name && <span className='input-error'>El teléfono del profesor es requerido</span>}
                        </div>
                        <div className="select-status">
                            <label 
                                htmlFor="document"
                                className='inputs-label'
                            >
                                Documento
                                <SimpleTooltip idTooltip={'document'} text={'Máximo 12 caracteres. No se permite HTML ni emojis'}/>
                            </label>
                            <input
                                placeholder='Escriba el documento del profesor aquí...'
                                className={`input-global-${style}`}
                                {...register("document", { required: true })} 
                            />
                            {errors.name && <span className='input-error'>El documento del profesor es requerido</span>}
                        </div>
                        <div className="select-status">
                            <label 
                                htmlFor="email"
                                className='inputs-label'
                            >
                                Email
                                <SimpleTooltip idTooltip={'email'} text={'Máximo 12 caracteres. No se permite HTML ni emojis'}/>
                            </label>
                            <input
                                placeholder='Escriba el email del profesor aquí...'
                                className={`input-global-${style}`}
                                {...register("email", { required: true })} 
                            />
                            {errors.name && <span className='input-error'>El email del profesor es requerido</span>}
                        </div>
                        <div className="select-status">
                            <label 
                                htmlFor="especialidad"
                                className='inputs-label'
                            >
                                Especialidad
                                <SimpleTooltip idTooltip={'especialidad'} text={'Máximo 12 caracteres. No se permite HTML ni emojis'}/>
                            </label>
                            <input
                                placeholder='Escriba brevemente la especialidad'
                                className={`input-global-${style}`}
                                {...register("especialidad", { required: true })} 
                            />
                            {errors.name && <span className='input-error'>La especialidad es necesaria</span>}
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
