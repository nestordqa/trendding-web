import React from 'react'
import { ChipType } from '../../utils/types/commonTypes';

export const Chip = (props: ChipType) => {
    let colorObj = {
        color: '',
        bgColor: ''
    };
    switch (props.type) {
        case 'inactive':
            colorObj.color =  '#FF0000';
            colorObj.bgColor = '#ffbfbf'; 
            break;
        case 'simple':
            colorObj.color =  '#59525C';
            colorObj.bgColor = '#E9E7E9'; 
            break;
    
        default:
            colorObj.color =  '#14532D';
            colorObj.bgColor = '#B0F8C6'; 
            break;
    }
    return (
        <div
            style={{
                backgroundColor: colorObj.bgColor,
                color: colorObj.color,
                paddingTop: '2px',
                paddingRight: '8px',
                paddingBottom: '2px',
                paddingLeft: '8px',
                border: 'none',
                borderRadius: '8px',
                width: 'fit-content',
                height: '22px'
            }}
        >
            {props.name}
        </div>
    )
}
