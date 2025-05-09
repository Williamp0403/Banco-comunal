import React from 'react';
import { NumericFormat } from 'react-number-format';

export function Input ({ type, name, placeholder, register, errors }) {
  return (
    <div className="w-full space-y-1">
      <input 
        className={`${ errors ? 'border-red-500 placeholder:text-red-500 focus:border-2' : 'border-zinc-400  hover:border-zinc-600 focus:border-2 ' } w-full border rounded-md  focus:outline-none p-3`}
        type={type} 
        name={name} 
        placeholder={placeholder}
        {...register(name, { valueAsNumber: type === 'number' })} 
      />
      { errors && <p className="text-red-500 font-medium text-xs mt-0">{ errors.message }</p> }
    </div>
  )
}

export function InputMonto({ value, onChange, ...props }) {
  return (
    <NumericFormat
      {...props}
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      onValueChange={(values) => {
        onChange(values.floatValue);
      }}
      className="w-full border rounded-md p-3 focus:outline-none"
    />
  );
}

export function Textarea ({ name, placeholder, register, errors }) {
  return (
    <div className="w-full space-y-1">
      <textarea 
        className={`${ errors ? 'border-red-500 placeholder:text-red-500 focus:border-2' : 'border-zinc-400  hover:border-zinc-600 focus:border-2 ' } w-full h-24 resize-none border rounded-md  focus:outline-none p-3`}
        name={name} 
        placeholder={placeholder} 
        {...register(name)}
      />
      { errors && <p className="text-red-500 font-medium text-xs mt-0">{ errors.message }</p> }
    </div>
  )
}

