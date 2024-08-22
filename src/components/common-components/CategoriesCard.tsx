import React, {useEffect, useState} from 'react';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useGlobalData } from '../../ThemeContext';
import '../../styles/card-categorie.css';
import { warningAlert } from '../../utils/common/alerts';

export const CategorieCard = ({categorie, onSelect}: any) => {
    const globalData = useGlobalData();
    const [style, setStyle] = useState('');
    const [selected, setSelected] = useState(false);
    const handleSelect = (e: any) => {
        e.preventDefault(); // Prevent default behavior
        const newSelected = !selected; // Toggle selected state
        setSelected(newSelected); // Update state
        onSelect({
            selected: newSelected,
            ...categorie
        });
    };

    const deleteCategorieCb = async () => {
        const url = process.env.REACT_APP_API_BASE_URL as string;
        await fetch(`${url}categories/${categorie.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': globalData.jwt,
                'Content-Type': 'application/json',
            }
        });
    };
    const deleteCategorie = async () => {
        await warningAlert(
            deleteCategorieCb,
            "¿Estás seguro de continuar?",
            "Si continuas, vas a eliminar PERMANENTEMENTE ésta categoría",
            "Estado del curso cambiado a inactivo!",
            style
        );
    };

    const getFullDate = (): string => {
        const date = new Date(categorie.createdAt);
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getUTCDate()).padStart(2, '0');
        const year = date.getUTCFullYear();
        
        return `${month}/${day}/${year}`;
    };

    useEffect(() => {
            if (globalData !== undefined) {
                setStyle(globalData.theme);
            }
    // eslint-disable-next-line
    }, []);
  return (
    <div className={`card-categorie-container`}>
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
        <div className="categorie-name">{categorie.name}</div>
        <div className="categorie-date">{getFullDate()}</div>
        <div className="buttons-categories">
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
                    onClick={deleteCategorie}
                />
            </div>
        </div>
    </div>
  )
}
