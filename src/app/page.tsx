"use client";
import { useState } from 'react';

function add(numbers: string) {
    if (numbers === "") return 0;
    numbers = numbers.replace(/\\n/g, "\n");
    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
        const numArray = numbers.split("\n");
        delimiter = /;/;
        numbers = numArray[1];
    }

    const numberArray = numbers.split(delimiter).map(Number);
    const negativeNumbers = numberArray.filter((num: number) => num < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(
            `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
        );
    }

    return numberArray.reduce((sum: any, num: any) => sum + num, 0);
}

const InputField = () => {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const sum = add(inputValue);
            setResult(sum);
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setResult(null);
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
            {result !== null && <p className="text-lg font-semibold">Add: {result}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default InputField;
