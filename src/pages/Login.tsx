import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Asset imports
import Logo from "../assets/Logo.png";
import AuthArt from "../assets/AuthArt.png";

// Hooks and utils
import post from "@/utils/post";

export default function Login() {

    // Email form value handling
    const [username, setUsername] = useState("");
    const [showUsernamePlaceholder, setShowUsernamePlaceholder] = useState(true);

    // Password form value handling
    const [password, setPassword] = useState(""); 
    const [showPasswordPlaceholder, setShowPasswordPlaceholder] = useState(true);

    // Error message state
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // Remember me checkbox state
    const [rememberMe, setRememberMe] = useState(false);

    // Navigation hook
    const navigate = useNavigate();
    
    async function login() {    
        // Attempt login
        post(loginResultHandler, "/auth/login", { 
            email: username,
            password: password
        });
    };

    async function loginResultHandler(data: any) {
        console.log(data);
        // Login successful
        if(data.ok) {
            if(rememberMe)
                localStorage.setItem("token", data.rows[0]);
            else
                sessionStorage.setItem("token", data.rows[0]);

            navigate("/");
        }
        
        // Login failed
        else {
            if(data.code === 401) 
                setErrorMessage("Incorrect username or password. Please try again.");
            else if(data.code === 404)
                setErrorMessage("An account does not exist with that username."); // Please <a href='/register' style='text-decoration:underline;'>register</a> for an account.");
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="h-full px-6 py-24 bg-slate-100">
            <div className="flex flex-col h-full items-center justify-center lg:justify-between">

                {/* Logo */}
                <div className="flex flex-col">
                    <div className="flex flex-row justify-center items-center">
                        <img
                            src={Logo}
                            alt=""
                            className="w-[4rem] h-[4rem] mr-4 mt-1"
                        />
                        <h3 className="text-5xl text-cyan-500 font-mono font-bold">OmniStudy</h3>
                    </div>
                </div>

                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    {/* Page art */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src={AuthArt}
                            className="w-full"
                            alt="Register art"
                        />
                    </div>

                    {/* Page form */}
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <h1 className="text-left mb-5 text-2xl font-bold text-stone-500">Sign in to your account</h1>

                        {/* Error message */}
                        {showErrorMessage ? <div className="mb-3">
                            <span className="text-red-500 text-sm"
                                dangerouslySetInnerHTML ={{ __html: errorMessage }} 
                            ></span>
                        </div> : null}

                        <form onSubmit={(e) => e.preventDefault()}>
                            {/* Email input */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-2 border-stone-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-stone-400 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput3"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={(e) => {
                                        setShowUsernamePlaceholder(username === "")
                                    }}
                                    required
                                />
                                {username === "" || showUsernamePlaceholder ? <label
                                    htmlFor="exampleFormControlInput3"
                                    className="pointer-events-none bg-slate-100 border-t-2 border-stone-300 px-2 absolute text-slate-500 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:border-slate-100 peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-stone-400 dark:peer-focus:text-primary"
                                >
                                    Username
                                </label> : null}
                            </div>
                            {/* Password input */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="password"
                                    className="peer block min-h-[auto] w-full rounded border-2 border-stone-300 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-stone-400 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput33"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={(e) => {
                                        setShowPasswordPlaceholder(password === "")
                                    }}
                                />
                                {password === "" || showPasswordPlaceholder ? <label
                                    htmlFor="exampleFormControlInput33"
                                    className="pointer-events-none bg-slate-100 border-t-2 border-stone-300 px-2 absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:border-slate-100 peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-stone-400 dark:peer-focus:text-primary"
                                >
                                    Password
                                </label> : null}
                            </div>

                            <div className="mb-5 flex items-center justify-between">
                                {/* Remember me checkbox */}
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <input
                                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-stone-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-cyan-600 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_5px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-stone-400 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        value=""
                                        id="exampleCheck3"
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer text-stone-500 text-left"
                                        htmlFor="exampleCheck3">
                                        Remember me
                                    </label>
                                </div>
                                {/* Forgot password link */}
                                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                    <a
                                      className="inline-block pl-[0.15rem] hover:cursor-pointer text-cyan-600 text-left"
                                      href={"/reset-password"}
                                    >
                                        Forgot password
                                    </a>
                                </div>
                            </div>

                            {/* Login button */}
                            <button
                                type="submit"
                                className="!bg-cyan-500 hover:bg-cyan-600 inline-block w-full rounded px-7 pb-2.5 pt-3 text-sm font-medium shadow-md uppercase leading-normal text-white transition duration-150 ease-in-out"
                                onClick={login}
                            >
                                Sign in
                            </button>

                            {/* Register link */}
                            <div className="my-2 text-left">
                                <span className="text-stone-500">
                                    Don't have an account? <a className="text-cyan-600" href={"/register"}>Register here</a>.
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

