import React, {ReactNode, useEffect, useState} from 'react';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiStar } from "react-icons/hi";

import { useGlobalData } from '../../ThemeContext';
import '../../styles/lesson-card.css';
import { warningAlert } from '../../utils/common/alerts';
import { Chip } from './Chip';
import { getImageLesson } from '../../utils/common/react-query/filesQuering';

export const LessonCard = ({lesson}: any) => {
    const globalData = useGlobalData();
    const [image, setImage] = useState<any>(null);
    const [style, setStyle] = useState('');
    const getYear = (): string => {
        return lesson.createdAt.slice(0, 4);
    }
    const deleteLessonCb = async () => {
        const url = process.env.REACT_APP_API_BASE_URL as string;
        await fetch(`${url}lections/${lesson.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': globalData.jwt,
                'Content-Type': 'application/json',
            }
        });
    };
    const deleteLesson = async () => {
        await warningAlert(
            deleteLessonCb,
            "¿Estás seguro de continuar?",
            "Si continuas, vas a cambiar este curso a un estado INACTIVO",
            "Estado del curso cambiado a inactivo!",
            style
        );
    };
    const getModalidad = (): ReactNode => {
        let name;
        if (lesson.modalidad === 'FILES') {
            name = 'Archivos';
        } else {
            name = 'Videos';
        }
        return <Chip 
            name={name} 
            type={'simple'}
        />;
    };
    const getLessonActive = (): ReactNode => {
        const name = lesson.active ? 'Activa' : 'Inactiva';
        const status = lesson.active ? 'active' : 'inactive';
        return <Chip
            type={status}
            name={name}
        />; 
    };
    const getCategoria = (): string => {
        if (lesson.categories?.length) return lesson.categoria[0].name;
        return 'Tradding';
    };
    const getFullDate = (): string => {
        const date = new Date(lesson.date);
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getUTCDate()).padStart(2, '0');
        const year = date.getUTCFullYear();
        
        return `${month}/${day}/${year}`;
    };
    useEffect(() => {
        getImageLesson(globalData.jwt, lesson.id)
            .then((data) => {
                return data?.json();
            })
            .then((datica) => {
                if (datica && datica.length) {
                    setImage(datica[0].url);
                }
            })
            .catch((e) => console.error(e));
            if (globalData !== undefined) {
                setStyle(globalData.theme);
            }
    // eslint-disable-next-line
    }, [globalData.theme]);
    // console.log(course);
  return (
    <div className={`card-course-container-${style}`}>
        <div className="card-header">
            <div className="course-code">
                <h2>Código: </h2><span>&#35;{lesson.id}</span>
            </div>
            <div className="course-created">
                <h2>Creada: </h2><span>{getYear()}</span>
            </div>
        </div>
        <div className="course-contain">
            <div className="course-image-container">
                {image && <img src={image} alt={lesson.name} className='course-image'/>}
            </div>
            <div className="course-info-container">
                <div className="header-info-container">
                    <div className="course-title">
                        <h1>{lesson.name}</h1>
                        <div className="buttons-course">
                            <div className="">
                                <HiOutlineEye
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        color: style === 'dark' ? '#FFFFFF' : '#322C35',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                            <div className="">
                                <HiOutlinePencil
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        color: style === 'dark' ? '#FFFFFF' : '#322C35',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                            <div className="">
                                <HiOutlineTrash
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        color: style === 'dark' ? '#FFFFFF' : '#322C35',
                                        cursor: 'pointer'
                                    }}
                                    onClick={deleteLesson}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`data-course-${style}`}>
                        <div className="data-course-info">
                            <h2>
                                Usuarios
                            </h2>
                            <p>
                                {lesson.users?.length}
                            </p>
                        </div>
                        <span></span>
                        <div className="data-course-info">
                            <h2>
                                Clasificación
                            </h2>
                            <p>
                                <HiStar
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        color: style === 'dark' ? '#FFFFFF' : '#322C35',
                                        cursor: 'pointer'
                                    }}
                                />
                                  4.5 / 5
                            </p>
                        </div>
                        <span></span>
                        <div className="data-course-info">
                            <h2>
                                Estado
                            </h2>
                            <p>
                                {getLessonActive()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="restful-info-container">
                    <div className="dourse-asociated-container">
                        <h2>Curso asociado:</h2>
                        <p>
                            {lesson.course?.name}
                        </p>
                    </div>
                    <div className="modalidad-container">
                        <h2>Modalidad</h2>
                        {getModalidad()}
                    </div>
                    <div className="descripcion-container">
                        <h2>Descripción</h2>
                        <p>
                            {lesson.description}
                        </p>
                    </div>
                    <div className="modalidad-container">
                        <h2>Fecha</h2>
                        <p>{getFullDate()}</p>
                    </div>
                    <div className="modalidad-container">
                        <h2>Categoria</h2>
                        <p>
                            {getCategoria()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
