import React from 'react';
import { Spin } from 'antd';
import './loading.scss'

const Loader = ({ isLoading }) => {
    return (
        <div id="loader" className="Loader" style={{
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Spin />
        </div>
    )
}

export default Loader

