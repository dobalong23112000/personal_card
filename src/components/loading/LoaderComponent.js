import React from 'react';
import { Spin } from 'antd';
import './loading.scss'

const LoaderComponent = ({ isLoading }) => {
    return (
        <div id="loader" className="Loader_Component" style={{
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Spin />
        </div>
    )
}

export default LoaderComponent

