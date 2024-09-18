import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Input } from "@nextui-org/react";
import axiosInstance from "../../../utils/axiosInstance";

const AdminModalTabelEditContent = ({ swiper, onUpdate = () => {} }) => {
    const [imageValue, setImageValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'

    useEffect(() => {
        if (swiper) {
            setImageValue(swiper.image || "");
            setContentValue(swiper.content || "");
            setTitleValue(swiper.title || "");
            setLinkValue(swiper.link || "");
        }
    }, [swiper]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleButtonClick = async () => {
        if (!window.confirm("Apakah Anda yakin ingin mengubah data ini?")) {
            return;
        }

        if (!swiper || !swiper._id) {
            console.error("Swiper id is missing.");
            setMessage("Gagal mengubah data. ID swiper tidak ditemukan.");
            setMessageType("error");
            return;
        }

        const updatedData = {
            link: linkValue,
            image: imageValue,
            content: contentValue,
            title: titleValue,
        };

        try {
            const response = await axiosInstance.put(`/swiper/${swiper._id}`, updatedData);

            console.log("Swiper updated successfully:", response.data);
            setMessage("Data berhasil diperbarui!");
            setMessageType("success");
            onUpdate(response.data); // Notify parent component
        } catch (error) {
            console.error("Error updating swiper:", error);
            setMessage("Gagal mengubah data. Silakan coba lagi.");
            setMessageType("error");
        }
    };

    const imageStatus = useMemo(() => (imageValue === "" ? "nonActive" : "success"), [imageValue]);
    const contentStatus = useMemo(() => (contentValue === "" ? "nonActive" : "success"), [contentValue]);
    const titleStatus = useMemo(() => (titleValue === "" ? "nonActive" : "success"), [titleValue]);
    const linkStatus = useMemo(() => (linkValue === "" ? "nonActive" : "success"), [linkValue]);

    const isButtonDisabled = useMemo(() => {
        return (
            imageStatus === "danger" ||
            contentStatus === "danger" ||
            titleStatus === "danger" ||
            linkStatus === "danger"||
            imageStatus === "nonActive" ||
            contentStatus === "nonActive" ||
            titleStatus === "nonActive" ||
            linkStatus === "nonActive"
        );
    }, [imageStatus, contentStatus, titleStatus, linkStatus]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
            <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
                <Input
                    label="Image URL"
                    variant="bordered"
                    className="w-full"
                    value={imageValue}
                    onChange={handleInputChange(setImageValue)}
                    color={imageStatus}
                    isRequired
                />
                <Input
                    label="Judul"
                    variant="bordered"
                    className="w-full"
                    value={titleValue}
                    onChange={handleInputChange(setTitleValue)}
                    color={titleStatus}
                    isRequired
                />
                <Input
                    label="Deskripsi"
                    variant="bordered"
                    className="w-full"
                    value={contentValue}
                    onChange={handleInputChange(setContentValue)}
                    color={contentStatus}
                    isRequired
                />
                <Input
                    label="Link"
                    variant="bordered"
                    className="w-full"
                    value={linkValue}
                    onChange={handleInputChange(setLinkValue)}
                    color={linkStatus}
                    isRequired
                />
            </div>

            <Button
                variant="ghost"
                colorScheme="bluePrimary"
                className="font-openSans text-[12px] text-nonActive border-2 hover:bg-bluePrimary hover:text-white"
                style={{ borderRadius: "20px", width: "120px" }}
                onClick={handleButtonClick}
                isDisabled={isButtonDisabled}
            >
                Perbaharui
            </Button>

            {message && (
                <div className={`text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default AdminModalTabelEditContent;
