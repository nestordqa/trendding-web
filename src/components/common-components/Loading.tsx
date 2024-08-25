import React from 'react';
import '../../styles/loading.css';

export const Loading = ({message}:any) => {
  return (
    <div className="loading-container">
        <div className="simple-spinner">
            <span></span>
        </div>
        <h1>{message}</h1>
    </div>
  );
};
