import React, { useState, useMemo } from "react";
import { Button } from "@chakra-ui/react";
import { Input } from "@nextui-org/react";
import axiosInstance from "../../../utils/axiosInstance";
import { PlusOutlined } from '@ant-design/icons';
import { Image, message, notification, Upload } from 'antd';
import axios from "axios";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AdminCreateContent = ({ onUpdate = () => {} }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [imageValue, setImageValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [messages, setMessages] = useState('');
    const [messagesType, setMessagesType] = useState(''); // 'success' or 'error'

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleCustomRequest = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://backend-pst.vercel.app/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data && response.data.url) {
                setImageValue(response.data.url);
                notification.success('Upload successful!');
                onSuccess(response.data);
            } else {
                notification.error('Upload failed!');
                onError('No URL in response');
            }
        } catch (error) {
            notification.error('Error uploading file');
            onError(error);
        }
    };

    const uploadButton = (
        <button
            style={{ border: 0, background: 'none' }}
            type="button"
            className="flex flex-col gap-2 justify-center items-center font-openSans text-[12px]"
        >
            <PlusOutlined />
            Upload <br /> Foto Anda
        </button>
    );

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleButtonClick = async () => {
        if (!window.confirm("Apakah Anda yakin ingin menambah data ini?")) {
            return;
        }

        const data = {
            link: linkValue,
            image: imageValue,
            content: contentValue,
            title: titleValue,
        };

        try {
            const response = await axiosInstance.post(`https://backend-pst.vercel.app/swiper`, data);
            console.log("Swiper created successfully:", response.data);
            setMessages("Data berhasil ditambahkan!");
            setMessagesType("success");
            onUpdate(response.data); // Notify parent component
        } catch (error) {
            console.error("Error creating swiper:", error);
            setMessages("Gagal menambah data. Silakan coba lagi.");
            setMessagesType("error");
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
            linkStatus === "danger" ||
            imageStatus === "nonActive" ||
            contentStatus === "nonActive" ||
            titleStatus === "nonActive" ||
            linkStatus === "nonActive"
        );
    }, [imageStatus, contentStatus, titleStatus, linkStatus]);

    return (
        <div className="flex min-h-screen my-4 mx-2">
            <div className="w-full">
                <div className="flex flex-col gap-3 justify-start items-start"> {/* Change items-center to items-start */}
                    <Upload
                        customRequest={handleCustomRequest}
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                    <Input
                        label="Judul"
                        variant="bordered"
                        className="w-full" // Ensure full width
                        value={titleValue}
                        onChange={handleInputChange(setTitleValue)}
                        color={titleStatus}
                        isRequired
                    />
                    <Input
                        label="Deskripsi"
                        variant="bordered"
                        className="w-full" // Ensure full width
                        value={contentValue}
                        onChange={handleInputChange(setContentValue)}
                        color={contentStatus}
                        isRequired
                    />
                    <Input
                        label="Link"
                        variant="bordered"
                        className="w-full" // Ensure full width
                        value={linkValue}
                        onChange={handleInputChange(setLinkValue)}
                        color={linkStatus}
                        isRequired
                    />
                </div>

                <div className="flex flex-col justify-center items-center h-[60px] text-[14px] gap-1 mt-2">
                    <Button
                        variant="ghost"
                        colorScheme="bluePrimary"
                        className="font-openSans text-[12px] text-nonActive border-2 hover:bg-bluePrimary hover:text-white"
                        style={{ borderRadius: "20px", width: "120px" }}
                        onClick={handleButtonClick}
                        isDisabled={isButtonDisabled}
                    >
                        Buat
                    </Button>

                    {messages && (
                        <div className={`text-center ${messagesType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            <p>{messages}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminCreateContent;
