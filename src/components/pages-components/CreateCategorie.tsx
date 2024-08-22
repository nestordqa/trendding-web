import React, { useEffect, useState } from 'react'
import { useGlobalData } from '../../ThemeContext';
import { FieldValues, useForm } from 'react-hook-form';
import '../../styles/courses-dashboard.css';
import '../../styles/create-categorie.css';
import { successAlert } from '../../utils/common/alerts';
import { useNavigate } from 'react-router-dom';
import { SimpleTooltip } from '../common-components/Tooltip';

export const CreateCategorie = () => {
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
        navigate('/admin/dashboard/courses-categories');
    };

    //On submit create course form
    const onSubmit = async (data: FieldValues): Promise<void> => {
        try {
            const url = process.env.REACT_APP_API_BASE_URL as string;
            const course = await fetch(`${url}categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': globalData.jwt
                },
                body: JSON.stringify(data)
            });
            const courseCreated = await course.json();
            if (courseCreated && courseCreated.message) {
                successAlert(
                    redirect,
                    '¡Bien hecho!',
                    '¡La nueva categoría exitósamente!',
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
    }, [globalData]);

  return (
    <div className='create-courses-container'>
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
              <div className={`general-info-container-${style}`}>
                  <div className='title-container-2'>
                      <h2 className='section-title'>
                          Información general
                      </h2>
                  </div>
                  <div className="inputs-container-course">
                      <div className="first-input-container-categorie">
                          <label 
                              htmlFor="name"
                              className='inputs-label'
                          >
                              Nombre de la categoría
                              <SimpleTooltip idTooltip={'name'} text={'Máximo 10 caracteres. No se permite HTML ni emojis'}/>
                          </label>
                          <input
                              placeholder='Escriba el nombre de la categoría aquí...'
                              className={`input-global-${style}`}
                              {...register("name", { required: true })} 
                          />
                          {errors.name && <span className='input-error'>Debes ingresar el nombre de la categoria para poder crearla</span>}
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
