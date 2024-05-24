import { useCallback, useState } from "react";
import "../app/globals.css";
import Input from "@/components/Input";
import axios from "axios";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('Login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'Login' ? 'Register' : 'Login')
    }, [variant])

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/',
            });
            // router.push('/')
        } catch (error) {
            console.log("auth.tsx :: login : Error :", error);
        }
    }, [email, password, router]);


    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            // login();    //Here you can logged in use by default , if you want. make sure to add login in dependency.
            toggleVariant();
        } catch (error) {
            console.log("auth.tsx :: register : Error :", error);
        }
    }, [email, name, password]);



    return (
        <>
            <div className="relative h-full w-full bg-[url('/images/hero.jpg')] 
            bg-no-repeat bg-center bg-fixed bg-cover">
                <div className="bg-black w-full h-full lg:bg-opacity-50">
                    <nav className="px-12 py-5">
                        <img src="/images/logo.png" alt="Logo" className="h-12" />
                    </nav>
                    <div className="flex justify-center">
                        <div className="bg-black bg-opacity-70
                        px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                            <h2 className="text-white text-4xl mb-8 font-semibold">
                                {variant === 'Login' ? 'Login' : 'Register'}
                            </h2>
                            <div className="flex flex-col gap-4">
                                {variant === 'Register' &&
                                    (<Input
                                        label="Username"
                                        id="name"
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                    />)}

                                <Input
                                    label="Email"
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e: any) => setEmail(e.target.value)}
                                />
                                <Input
                                    label="Password"
                                    id="password"
                                    value={password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                />
                                <button className="
                                bg-red-600
                                py-3
                                text-white
                                rounded-md
                                w-full
                                mt-10
                                hover:bg-red-900
                                transition
                                "
                                    onChange={(e: any) => setVariant(e.target.value)}
                                    onClick={variant === 'Login' ? login : register}
                                >
                                    {variant === 'Login' ? 'Sign In' : 'Sign Up'}
                                </button>

                                <div className="
                                flex
                                flex-row 
                                items-center 
                                gap-4
                                mt-8 
                                justify-center                               
                                ">
                                    <div
                                        onClick={() => signIn('google', { callbackUrl: '/' })}
                                        className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    curson-pointer
                                    hover:opacity-80
                                    transition
                                    " >
                                        <FcGoogle size={30} />
                                    </div>

                                    <div
                                        onClick={() => signIn('github', { callbackUrl: '/' })}
                                        className="
                                    w-10
                                    h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    curson-pointer
                                    hover:opacity-80
                                    transition
                                    " >
                                        <FaGithub size={30} />
                                    </div>
                                </div>

                                {variant === 'Login' ?
                                    <p className=" text-neutral-500 mt-12 ">
                                        First time using Netflix
                                        <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer ">
                                            Create an account
                                        </span>
                                    </p>
                                    :
                                    <p className=" text-neutral-500 mt-12 ">
                                        Already having an account?
                                        <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer ">
                                            Sign In
                                        </span>
                                    </p>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;
