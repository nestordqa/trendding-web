import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getCourses } from '../../utils/common/react-query/courses';
import bell from '../../assets/images/bell.png';
import searchIcon from '../../assets/images/search-icon.png';
import { useGlobalData } from '../../ThemeContext';
import '../../styles/teachers-dashboard.css';
import { simpleWarningAlert } from '../../utils/common/alerts';
import { useNavigate } from 'react-router-dom';
import { getTeachers } from '../../utils/common/react-query/teachers';
import { TeacherCard } from '../common-components/TeacherCard';
import { Loading } from '../common-components/Loading';

export const TeachersManagement = () => {
    const globalData = useGlobalData();
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [evaluateString, setEvaluateString] = useState('');
    const [style, setStyle] = useState('');
    const { data, isLoading } = useQuery({
        queryKey: ['teachers'],
        queryFn: async () => {
            const data = await getTeachers(globalData.jwt);
            return await data?.json();
        }
    });

    const { data: courses, isLoading: loading } = useQuery({
      queryKey: ['courses'],
      queryFn: async () => {
          const data = await getCourses(globalData.jwt);
          return await data?.json();
      }
  });

    const redirect = (): void => {
        navigate('/admin/dashboard/teachers/create');
    };
    useEffect(() => {
            if (globalData !== undefined) {
                setStyle(globalData.theme);
            }
            if (data && data.length && !isLoading) {
                setTeachers(data);
            }
    // eslint-disable-next-line
    }, [data, isLoading, globalData]);

    const handlerSearch = (e: any) => {
        e.preventDefault();
        setEvaluateString(e.target.value);
        if (!e.target.value.length) {
            setTeachers(data);
            return;
        }
    };

    const onSelect = () => {
      console.log('Pasando por el select');
    };

    const onSearch = () => {
        const filtered = teachers.filter((item: any) => item.name.toLowerCase().includes(evaluateString.toLowerCase()));
        if (!filtered.length) {
            simpleWarningAlert(
                'Ups...',
                'No existen profesores bajo esta búsqueda...',
                style
            );
            setTeachers(data);
            return;
        }
        if (evaluateString.length && filtered.length) {
            setTeachers(filtered);
            return;
        }
    };

  return (
    <div className='courses-container'>
        {
          isLoading ?
            <Loading message={'Cargando sección de profesores'}/>
          :
          null
        }
        <div className="header-courses">
            <div className="first-container">
                <div className="courses-title">
                    Gestión de Profesores
                </div>
                <div className="courses-subtitle">
                    Inicio / Gestión de Profesores
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
            <div className="courses-options-teachers">
                <div className="options-container-teachers">
                    <div className={`custom-select-dashboard-teachers-${style}`}>
                        <h3>Seleccionar curso para ver lecciones</h3>
                        <select
                          onChange={onSelect}
                        >
                          {courses && !loading && courses.length && courses.map((item: any, idx: number) => <option key={idx} value={item.id}>{item.name}</option>)}
                        </select>
                        {/* <img src={arrow} alt="Dropdown arrow" className='dropdown-arrow'/> */}
                    </div>
                </div>
                <div className="new-course-container">
                    <button className='new-course-button' onClick={redirect}>
                        Crear profesor
                    </button>
                </div>
            </div>
            <div className="teachers-list-container">

                {
                    teachers && teachers?.length && !isLoading ?
                        teachers?.map((item, idx) => (
                            <TeacherCard key={idx} teacher={item}/>
                        ))
                    :
                        <div>No hay profesores</div>
                }
            </div>
        </div>
    </div>
  )
}
