/* eslint-disable no-undef */
import React, { useState, useMemo } from "react";
import { Button, Card, CardBody, Stack } from "@chakra-ui/react";
import { Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const emailStatus = useMemo(() => {
        if (email === "") return "nonActive";
        if (/^[A-Za-z0-9._%+-]+@(gmail\.com|bps\.go\.id)$/i.test(email)) return "success";
        return "danger";
    }, [email]);

    const passwordStatus = useMemo(() => {
        if (password === "") return "nonActive";
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) return "success";
        return "danger";
    }, [password]);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card style={{ marginTop: '63px', border: "1px solid #f0f0f0", borderRadius: "20px", width: "30%", }} >
                <CardBody className="flex flex-col gap-4 mx-2 my-4">
                    <h1 className="flex font-inter text-xl font-bold justify-center items-center text-bluePrimary">
                        Login Layanan Konsultasi
                    </h1>
                    <div className="flex flex-col items-center mt-4">
                        <p className="flex flex-row justify-center items-center text-xl gap-2">Login melalui <a className="text-bluePrimary font-bold font-inter flex flex-row justify-center items-center gap-1 text-xl" href="https://backend-pst.vercel.app/auth/google
"><FcGoogle />Akun Google</a></p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default Login;
