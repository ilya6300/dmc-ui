import React from 'react';
import './button.css';
export const Button_v2 = ({
    label,
    ...props
}) => {
    return (
        <button type="button" className="btn_v2" {...props}>
            {label}
        </button>
    )
}