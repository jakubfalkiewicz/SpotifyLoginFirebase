import React from 'react'

interface InputInterface {
    text: string;
    value: string;
}

function Input({ text, value }: InputInterface) {
    return (
        <div className='register_component_input_container'>
            <div className='register_component_input_label'>{text}</div>
            <input className='register_component_input_field' value={value} />
        </div>
    )
}

export default Input