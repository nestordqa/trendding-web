import React, {ReactNode, useEffect, useState} from 'react';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiStar } from "react-icons/hi";
import { useGlobalData } from '../../ThemeContext';
import '../../styles/teacher-cards.css';
import { warningAlert } from '../../utils/common/alerts';
import { Chip } from './Chip';
import { getImageTeacher } from '../../utils/common/react-query/filesQuering';
// import { TeacherType } from '../../utils/types/commonTypes';

export const TeacherCard = ({teacher}: any) => {
    const globalData = useGlobalData();
    const courses = teacher.course;
    const [style, setStyle] = useState('');
    const [image, setImage] = useState<any>(null);

    const deleteCategorieCb = async () => {
        const url = process.env.REACT_APP_API_BASE_URL as string;
        await fetch(`${url}teachers/${teacher.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': globalData.jwt,
                'Content-Type': 'application/json',
            }
        });
    };
    const deleteTeacher = async () => {
        await warningAlert(
            deleteCategorieCb,
            "¿Estás seguro de continuar?",
            "Si continuas, vas a eliminar PERMANENTEMENTE este profesor",
            "El profesor ha sido eliminado!",
            style
        );
    };

    const getTeacherActive = (): ReactNode => {
        const name = teacher.active ? 'Activo' : 'Inactivo';
        const status = teacher.active ? 'active' : 'inactive';
        return <Chip
            type={status}
            name={name}
        />; 
    };

    const getFullDate = (): string => {
        const date = new Date(teacher.createdAt);
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getUTCDate()).padStart(2, '0');
        const year = date.getUTCFullYear();
        
        return `${month}/${day}/${year}`;
    };

    useEffect(() => {
        getImageTeacher(globalData.jwt, teacher.id)
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
  return (
    <div className={`card-teacher-container-${style}`}>
        <div className="teacher1">
            <div>
                <h1>Código:</h1><h2>&#35;{teacher.id}</h2>
            </div>
            <div>
                <h1>Creada:</h1><h2>{getFullDate()}</h2>
            </div>
        </div>
        <div className="teacher2">
            <div className="teacher-photo">
                {image && <img src={image} alt={teacher.name} className='course-image'/>}
            </div>
            <div className="teacher-simple-info">
                <div className="teacher-name">
                    <h1>{teacher.name}</h1>
                </div>
                <div className="teacher-status">
                    <h2>
                        Estado
                    </h2>
                    <p>
                        {getTeacherActive()}
                    </p>
                </div>
                <div className="teacher-rating">
                    <h2>
                        Clasificación
                    </h2>
                    <div>
                        <HiStar
                            style={{
                                width: '16px',
                                height: '16px',
                                color: style === 'dark' ? '#FFFFFF' : '#322C35',
                                cursor: 'pointer'
                            }}
                        />
                        <span>4.5 / 5</span>
                    </div>
                </div>
            </div>
            <div className="teacher-buttons">
                <div className="">
                <HiOutlineEye
                    style={{
                        width: '22px',
                        height: '22px',
                        color: style === 'dark' ? '#FFFFFF' : '#322C35',
                        cursor: 'pointer'
                    }}
                />
                </div>
                <div className="">
                    <HiOutlinePencil
                        style={{
                            width: '22px',
                            height: '22px',
                            color: style === 'dark' ? '#FFFFFF' : '#322C35',
                            cursor: 'pointer'
                        }}
                    />
                </div>
                <div className="">
                    <HiOutlineTrash
                        style={{
                            width: '22px',
                            height: '22px',
                            color: style === 'dark' ? '#FFFFFF' : '#322C35',
                            cursor: 'pointer'
                        }}
                        onClick={deleteTeacher}
                    />
                </div>
            </div>
        </div>
        <div className="teacher3">
            <div className="teacher3-column">
                <div className="teacher-info-container">
                    <h3>Teléfono</h3>
                    <h4>{teacher.phone}</h4>
                </div>
                <div className="teacher-info-container">
                    <h3>Correo Electrónico</h3>
                    <h4>{teacher.email}</h4>
                </div>
                <div className="teacher-info-container">
                    <h3>Especialidad</h3>
                    <Chip type={'simple'} name={teacher.especialidad} />
                </div>
            </div>
            <div className="teacher3-column">
                <div className="teacher-info-container">
                    <h3>Documento</h3>
                    <h4>{teacher.document}</h4>
                </div>
                <div className="teacher-info-container">
                    <h3>Cursos asignados</h3>
                    {
                        courses && courses.length ?
                        courses.map((item: any, idx: number) => (<Chip type='simple' name={item.name} key={idx}/>))
                            :
                        <h4>{`${teacher.name} aún no tiene cursos asignados`}</h4>
                    }
                </div>
                <div className="teacher-info-container">
                    <h3>Cursos impartidos</h3>
                    <Chip type='simple' name={`${courses.length} cursos`}/>
                </div>
            </div>
        </div>
    </div>
  )
}
