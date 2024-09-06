import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Input } from "@nextui-org/react";

const AdminModalTabelEditContent = ({ swiper }) => {
    const [imageValue, setImageValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [linkValue, setLinkValue] = useState("");

    useEffect(() => {
        if (swiper) {
            setImageValue(swiper.image || ""); // Handle image as a URL string
            setContentValue(swiper.content || "");
            setTitleValue(swiper.title || "");
            setLinkValue(swiper.link || "");
        }
    }, [swiper]);

    const handleImageChange = (e) => {
        setImageValue(e.target.value);
    };

    const handleContentChange = (e) => {
        setContentValue(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    };

    const handleLinkChange = (e) => {
        setLinkValue(e.target.value);
    };

    const handleButtonClick = () => {
        const data = {
            link: linkValue,
            image: imageValue,
            content: contentValue,
            title: titleValue,
        };
        // Add logic to handle the data, such as sending it to a server
        console.log("Updated Data:", data);
    };

    // Statuses for fields
    const imageStatus = useMemo(() => {
        if (imageValue === "") return "nonActive";
        const urlRegex = /^https:\/\/.+$/;
        if (urlRegex.test(imageValue)) return "success";
        return "danger";
    }, [imageValue]);

    const contentStatus = useMemo(() => {
        if (contentValue === "") return "nonActive";
        return "success";
    }, [contentValue]);

    const titleStatus = useMemo(() => {
        if (titleValue === "") return "nonActive";
        return "success";
    }, [titleValue]);

    const linkStatus = useMemo(() => {
        if (linkValue === "") return "nonActive";
        return "success";
    }, [linkValue]);

    // Disable button if any field is nonActive or danger
    const isButtonDisabled = useMemo(() => {
        return (
            imageStatus === "nonActive" || imageStatus === "danger" ||
            contentStatus === "nonActive" || contentStatus === "danger" ||
            titleStatus === "nonActive" || titleStatus === "danger" ||
            linkStatus === "nonActive" || linkStatus === "danger"
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
                    onChange={handleImageChange}
                    color={imageStatus}
                    isRequired
                />
                <Input
                    label="Judul"
                    variant="bordered"
                    className="w-full"
                    value={titleValue}
                    onChange={handleTitleChange}
                    color={titleStatus}
                    isRequired
                />
                <Input
                    label="Deskripsi"
                    variant="bordered"
                    className="w-full"
                    value={contentValue}
                    onChange={handleContentChange}
                    color={contentStatus}
                    isRequired
                />
                <Input
                    label="Link"
                    variant="bordered"
                    className="w-full"
                    value={linkValue}
                    onChange={handleLinkChange}
                    color={linkStatus}
                    isRequired
                />
            </div>

            <Button 
                variant='ghost' 
                colorScheme='bluePrimary' 
                className="font-openSans text-[12px] text-nonActive border-2 hover:bg-bluePrimary hover:text-white" 
                style={{ borderRadius: "20px", width: '120px' }} 
                onClick={handleButtonClick}
                isDisabled={isButtonDisabled} // Disable button based on the status
            >
                Perbaharui
            </Button>
        </div>
    );
}

export default AdminModalTabelEditContent;
