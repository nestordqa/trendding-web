import React from 'react'
import { Tooltip } from 'react-tooltip';
import { HiInformationCircle } from "react-icons/hi";
import { TooltipType } from '../../utils/types/commonTypes';

export const SimpleTooltip = ({text, idTooltip}: TooltipType) => {
  return (
    <>
        <span 
            id={idTooltip}
            data-tooltip-place="right"
        >
            <HiInformationCircle
                style={{
                    width: '16px',
                    height: '16px'
                }}
            />
        </span>
        <Tooltip 
            anchorSelect={`#${idTooltip}`}
            clickable
            style={{
                backgroundColor: '#FFFFFF',
                color: '#373139'

            }}
        >
            {text}
        </Tooltip>
    </>
  )
}
