"use client";

import React, { InputHTMLAttributes, useLayoutEffect, useRef, useState } from 'react';
import {nanoid} from "nanoid"



function valueToChars(value: string, length:number): string[] {
  let chars = Array(length).fill('') as string[];
  for(let i=0; i<Math.min(value.length, length); i++){
    chars[i] = value[i];
  }
  return chars;
}

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"|"value"> {
  onChange: (value: string) => void;
  value: string;
  length: number;
}

export function SingleCharInput({ onChange, value, length, ...props }: Props) {
  const idPrefixRef = useRef<string>(`single-char-${nanoid(6)}`);
  const [values, setValues] = useState<string[]>(Array(length).fill(''));

  useLayoutEffect(() => {
    setValues(valueToChars(value, length))
  }, [value,length]);

  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]?$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value.toUpperCase();
      setValues(newValues);

      // Auto-focus to the next input
      if (value && index < length - 1) {
        (
          document.getElementById(`${idPrefixRef.current}-${index + 1}`) as HTMLInputElement
        ).focus();
      }
      if (!value && index > 0) {
        (
          document.getElementById(`${idPrefixRef.current}-${index - 1}`) as HTMLInputElement
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
          id={`${idPrefixRef.current}-${index}`}
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

