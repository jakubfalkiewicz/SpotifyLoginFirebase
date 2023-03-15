import React from 'react'
import { WarningIcon } from '@/assets';

interface InputInterface {
    text: string;
    value: string;
    placeholder: string;
    type: string;
    valid: boolean | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ text, value, placeholder, type, valid, onChange }: InputInterface) {
    return (
        <div className='register_component_input_container'>
            <div className='register_component_input_label'>{text}</div>
            <input className='register_component_input_field' required value={value} type={type} onChange={onChange} placeholder={placeholder} />
            <div className={`register_component_input_error ${valid ? 'valid' : 'invalid'}`}><img src={WarningIcon} alt="warning-icon"></img>Invalid</div>
        </div>
    )
}

export default Input