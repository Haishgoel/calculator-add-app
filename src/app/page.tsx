"use client";
import { useState } from 'react';

const InputField = () => {

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-400">
         <h1 className="text-3xl font-bold mb-8">Add Calculator</h1>
         <form onSubmit={handleSubmit} className="flex space-x-5 mb-3">
                <input
                    type="text"
                    id="inputField"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter numbers"
                    className="rounded-md p-2"
                />
                <button type="submit" className="rounded-md p-2 bg-blue-500 text-white">Calculate</button>
            </form>
        </div>
    );
};

export default InputField;
