import { register } from '../../../Auth/Register';
import React, { useState } from 'react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_again, setPasswordAgain] = useState('');
    const [error, errorState] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();


    }

        return (
            <>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 mt-5 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col mt-10">
                        <i style={iconStyle} className="fa-solid fa-apple-whole fa-rotate-by fa-4xl mb-1"></i>
                        <h2 className="mt-5 mb-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Registrace
                        </h2>
                    </div>

                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Emailová adresa
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Heslo
                                    </label>

                                </div>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium leading-6 text-gray-900">
                                        Heslo znovu
                                    </label>

                                </div>
                                <div className="mt-1">
                                    <input
                                        id="password-again"
                                        name="password-again"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e)=>setPasswordAgain(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            {error}
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Registrovat
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
}

const iconStyle = {
    transform: "rotate(20deg)",
    fontSize: "3.5rem"
}
