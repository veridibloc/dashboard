import React, { InputHTMLAttributes, useState } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  length: number;
}


export function SingleCharInput({ onChange, length, ...props }: Props) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value.toUpperCase();
      setValues(newValues);

      // Auto-focus to the next input
      if (value && index < length - 1) {
        (
          document.getElementById(`char-${index + 1}`) as HTMLInputElement
        ).focus();
      }
      if (!value && index > 0) {
        (
          document.getElementById(`char-${index - 1}`) as HTMLInputElement
        ).focus();
      }
      onChange(newValues.join(''))
    }
  };

  return (
    <div className="flex space-x-2">
      {values.map((char, index) => (
        <input
          key={index}
          id={`char-${index}`}
          type="text"
          maxLength={1}
          value={char}
          onChange={(e) => handleChange(index, e.target.value)}
          className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-black/90"
          {...props}
        />
      ))}
    </div>
  );
}

