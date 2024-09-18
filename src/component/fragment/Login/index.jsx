/* eslint-disable no-undef */
import React from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Card with responsive width */}
            <Card 
                className="mt-16 sm:mt-20 border border-gray-200 rounded-2xl"
                style={{ width: '90%', maxWidth: '400px' }} // Use relative width for responsiveness
            >
                <CardBody className="flex flex-col gap-4 justify-center p-4 items-center font-bold  font-inter">
                    {/* Text "Login melalui" centered and above Google login */}
                    <p className="text-xl font-inter text-center">
                        Login Layanan Konsultasi melalui
                    </p>
                    
                    {/* Google login link: Icon and "Akun Google" in one row */}
                    <a 
                        className="text-bluePrimary flex flex-row justify-center items-center gap-2 text-xl"
                        href="https://backend-pst.vercel.app/auth/google"
                    >
                        <FcGoogle  /> {/* Google icon */}
                        <span>Akun Google</span>
                    </a>
                </CardBody>
            </Card>
        </div>
    );
};

export default Login;
