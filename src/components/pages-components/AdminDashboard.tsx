import React from 'react'
import { useGlobalData } from '../../ThemeContext'

export const AdminDashboard = () => {
    const globalData = useGlobalData();
    console.log(globalData);
  return (
    <div>AdminDashboard</div>
  )
}
