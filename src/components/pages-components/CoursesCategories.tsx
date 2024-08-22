import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import bell from '../../assets/images/bell.png';
import { HiOutlinePlusSm } from "react-icons/hi";
import searchIcon from '../../assets/images/search-icon.png';
import { useGlobalData } from '../../ThemeContext';
import '../../styles/categories-dashboard.css';
import { simpleWarningAlert } from '../../utils/common/alerts';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../../utils/common/react-query/categories';
import { CategorieCard } from '../common-components/CategoriesCard';

export const CoursesCategories = () => {
    const globalData = useGlobalData();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const [arrSelected, setArrSelected] = useState<any[]>([]);
    const [categories, setCategories] = useState([]);
    const [evaluateString, setEvaluateString] = useState('');
    const [style, setStyle] = useState('');
    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const data = await getAllCategories(globalData.jwt);
            return await data?.json();
        }
    });
    const handleSelect = (e: any) => {
      e.preventDefault(); // Prevent default behavior
      const newSelected = !selected; // Toggle selected state
      setSelected(newSelected); // Update state
      if (!newSelected) {
        setArrSelected([]);
        return;
      }
      setArrSelected([...categories]);
      simpleWarningAlert('!Excelente!', 'Has seleccionado todas las categorías', style);
  };
    const redirect = (): void => {
        navigate('/admin/dashboard/courses-categories/create');
    };
    useEffect(() => {
            if (globalData !== undefined) {
                setStyle(globalData.theme);
            }
            if (data && data?.length && !isLoading) {
                setCategories(data as any);
            }
    // eslint-disable-next-line
    }, [data, isLoading, globalData]);

    const handlerSearch = (e: any) => {
        e.preventDefault();
        setEvaluateString(e.target.value);
        if (!e.target.value.length) {
            setCategories(data as any);
            return;
        }
    };

    const removeDuplicates = (arr: any) => {
      return arr.filter((item: any, index: number) => arr.indexOf(item) === index);
    };

    const onSelect = (categorie: any) => {
      if (categorie.selected) {
        const newArr = [...arrSelected, categorie];
        const arr = removeDuplicates(newArr);
        setArrSelected([...arr]);
      } else {
        const newArr = arrSelected.filter((item) => item.id !== categorie.id);
        const arr = removeDuplicates(newArr);
        setArrSelected([...arr]);
      }
    };

    const onSearch = () => {
        const filtered = categories.filter((item: any) => item.name.toLowerCase().includes(evaluateString.toLowerCase()));
        if (!filtered.length) {
            simpleWarningAlert(
                'Ups...',
                'No existen lecciones bajo esta búsqueda...',
                style
            );
            setCategories(data as any);
            return;
        }
        if (evaluateString.length && filtered.length) {
            setCategories(filtered);
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
                <div className="new-course-container">
                    <button className='new-course-button' onClick={redirect}>
                      <HiOutlinePlusSm 
                        style={{
                          fontWeight: '900',
                          width: '1.5em',
                          height: '1.5em'
                        }}
                      />
                        Agregar categorias
                    </button>
                </div>
            </div>
            <div className="courses-list-container">
              <div className={`headear-categories-container-${style}`}>
                <div className="categorie-checkbox" onClick={handleSelect}>
                  <label className="custom-checkbox">
                      <input
                          type="checkbox"
                          checked={selected}
                          onChange={()=>{}}
                      />
                      <span className="checkmark"></span>
                  </label>
                </div>
                <div className="categorie-name">Categoría</div>
                <div className="categorie-date">Fecha</div>
                <div className="buttons-categories">Acción</div>
              </div>
                {
                    categories && categories?.length && !isLoading ?
                        categories?.map((item, idx) => (
                            <CategorieCard key={idx} categorie={item} onSelect={onSelect}/>
                        ))
                    :
                        <div>No hay categorias</div>
                }
            </div>
        </div>
    </div>
  )
}
