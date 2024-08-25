import React, {ReactNode, useEffect, useState} from 'react';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiStar } from "react-icons/hi";

import { useGlobalData } from '../../ThemeContext';
import '../../styles/course-card.css';
import { warningAlert } from '../../utils/common/alerts';
import { Chip } from './Chip';
import { useQuery } from '@tanstack/react-query';
import { getImageCourse } from '../../utils/common/react-query/filesQuering';

export const CourseCard = ({course}: any) => {
    const globalData = useGlobalData();
    const [style, setStyle] = useState('');
    const [image, setImage] = useState<any>(null);
    const getYear = (): string => {
        return course.createdAt.slice(0, 4);
    }
    const deleteCourseCb = async () => {
        const url = process.env.REACT_APP_API_BASE_URL as string;
        await fetch(`${url}courses/${course.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': globalData.jwt,
                'Content-Type': 'application/json',
            }
        });
    };
    const deleteCourse = async () => {
        await warningAlert(
            deleteCourseCb,
            "¿Estás seguro de continuar?",
            "Si continuas, vas a cambiar este curso a un estado INACTIVO",
            "Estado del curso cambiado a inactivo!",
            style
        );
    };
    const getModalidad = (): ReactNode => {
        let name;
        if (course.modalidad === 'FILES') {
            name = 'Archivos';
        } else {
            name = 'Videos';
        }
        return <Chip 
            name={name} 
            type={'simple'}
        />;
    };
    const getCourseActive = (): ReactNode => {
        const name = course.active ? 'Activa' : 'Inactiva';
        const status = course.active ? 'active' : 'inactive';
        return <Chip
            type={status}
            name={name}
        />; 
    };
    const getCategoria = (): string => {
        if (course.categories?.length) return course.categoria[0].name;
        return 'Tradding';
    };
    const getFullDate = (): string => {
        const date = new Date(course.date);
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getUTCDate()).padStart(2, '0');
        const year = date.getUTCFullYear();
        
        return `${month}/${day}/${year}`;
    };
    useEffect(() => {
        getImageCourse(globalData.jwt, course.id)
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
                <h2>Código: </h2><span>&#35;{course.id}</span>
            </div>
            <div className="course-created">
                <h2>Creada: </h2><span>{getYear()}</span>
            </div>
        </div>
        <div className="course-contain">
            <div className="course-image-container">
                {image && <img src={image} alt={course.name} className='course-image'/>}
            </div>
            <div className="course-info-container">
                <div className="header-info-container">
                    <div className="course-title">
                        <h1>{course.name}</h1>
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
                                    onClick={deleteCourse}
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
                                {course.users?.length}
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
                                {getCourseActive()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="restful-info-container">
                    <div className="modalidad-container">
                        <h2>Modalidad</h2>
                        {getModalidad()}
                    </div>
                    <div className="descripcion-container">
                        <h2>Descripción</h2>
                        <p>
                            {course.description}
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
