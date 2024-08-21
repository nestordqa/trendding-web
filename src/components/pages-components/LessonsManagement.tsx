import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import bell from '../../assets/images/bell.png';
import arrow from '../../assets/images/dropdown-arrow.png';
import filterButton from '../../assets/images/filter-button.png';
import filterButtonLight from '../../assets/images/filter-button-light.png';
import searchIcon from '../../assets/images/search-icon.png';
import { useGlobalData } from '../../ThemeContext';
import '../../styles/courses-dashboard.css';
import { simpleWarningAlert } from '../../utils/common/alerts';
import { useNavigate } from 'react-router-dom';
import { getLessons } from '../../utils/common/react-query/lessons';
import { LessonCard } from '../common-components/LessonCard';

export const LessonsManagement = () => {
    const globalData = useGlobalData();
    const navigate = useNavigate();
    const [lessons, setLessons] = useState([]);
    const [evaluateString, setEvaluateString] = useState('');
    const [style, setStyle] = useState('');
    const { data, isLoading } = useQuery({
        queryKey: ['lessons'],
        queryFn: async () => {
            const data = await getLessons(globalData.jwt);
            return data;
        }
    });
    const redirect = (): void => {
        navigate('/admin/dashboard/lessons/create');
    };
    useEffect(() => {
            if (globalData !== undefined) {
                setStyle(globalData.theme);
            }
            if (data && data.length && !isLoading) {
                setLessons(data as any);
            }
    // eslint-disable-next-line
    }, [data, isLoading, globalData]);

    const handlerSearch = (e: any) => {
        e.preventDefault();
        setEvaluateString(e.target.value);
        if (!e.target.value.length) {
            setLessons(data as any);
            return;
        }
    };

    const onSearch = () => {
        const filtered = lessons.filter((item: any) => item.name.toLowerCase().includes(evaluateString.toLowerCase()));
        if (!filtered.length) {
            simpleWarningAlert(
                'Ups...',
                'No existen lecciones bajo esta búsqueda...',
                style
            );
            setLessons(data as any);
            return;
        }
        if (evaluateString.length && filtered.length) {
            setLessons(filtered);
            return;
        }
    };

    if (isLoading) {
        return <div>Loading</div>
    }
  return (
    <div className='courses-container'>
        <div className="header-courses">
            <div className="first-container">
                <div className="courses-title">
                    Gestión de Lecciones
                </div>
                <div className="courses-subtitle">
                    Inicio / Gestión de Lecciones
                </div>
            </div>
            <div className="second-container">
                <input
                    className={`input-search-${style}`}
                    onChange={handlerSearch}
                />
                <img src={searchIcon} alt="Search Icon" onClick={onSearch}/>
            </div>
            <div className="third-container">
                <div className={`bell-${style}`}>
                    <img src={bell} alt="Notifications bell" />
                </div>
            </div>
        </div>

        <div className="courses-here">
            <div className="courses-options">
                <div className="options-container">
                    <div className={`custom-select-dashboard-${style}`}>
                        <select>
                            <option>Todos las lecciones</option>
                            <option>Últimos 10 días</option>
                            <option>Últimos 20 días</option>
                            <option>Últimos 30 días</option>
                        </select>
                        <img src={arrow} alt="Dropdown arrow" className='dropdown-arrow'/>
                    </div>
                    <div className={`custom-select-filter-${style}`}>
                        <select>
                            <option>Aplicar filtros</option>
                            <option>Alfabéticamente</option>
                            <option>Ordenar por categorías</option>
                            <option>Restablecer filtros</option>
                        </select>
                        <img src={style === 'dark' ? filterButton : filterButtonLight} alt="Dropdowarrown " className='filter-button'/>
                    </div>
                </div>
                <div className="new-course-container">
                    <button className='new-course-button' onClick={redirect}>
                        Crear nueva lección
                    </button>
                </div>
            </div>
            <div className="courses-list-container">
                {
                    lessons && lessons?.length && !isLoading ?
                        lessons?.map((item, idx) => (
                            <LessonCard key={idx} lesson={item}/>
                        ))
                    :
                        <div>No hay Lecciones</div>
                }
            </div>
        </div>
    </div>
  )
}
