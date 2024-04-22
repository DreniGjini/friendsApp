import React, { InputHTMLAttributes } from 'react';
import Styles from './input.module.css';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  errors?: Record<string, any>;
  image?: boolean;
  register?: any;
}

const Input: React.FC<Input> = ({ errors, image, register, ...props }) => {
  if (!image) {
    return (
      <div className="mb-4 w-full">
        <input
          {...register}
          className={`${Styles.input} rounded-full bg-gray-400 px-4 h-10 text-white w-full`}
          {...props}
        />
        <p className="text-[#ff5a5a] text-sm mt-1 ml-3">
          {errors && <span>{errors.message}</span>}
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <label className="rounded-full bg-gray-400 px-4 h-10 text-white inline-flex items-center justify-center cursor-pointer">
          Upload Image
          <input
            {...register}
            className="hidden"
            type="file"
            accept="image/*"
            {...props}
          />
        </label>
        {errors && (
          <div>
            {Object.keys(errors).map((key) => (
              <span key={key}>{errors[key].message}</span>
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default Input;
