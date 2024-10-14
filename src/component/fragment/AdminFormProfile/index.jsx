import React, { useState, useMemo, useEffect } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { PlusOutlined } from '@ant-design/icons';
import { Image,  notification, Upload } from 'antd';
import { gender } from "../../../data";
import axiosInstance from "../../../utils/axiosInstance";
import formatDate from "../../../utils/formatedDate";
import convertToISODate from "../../../utils/convertToISODate";
import axios from "axios";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AdminFormProfile = () => {

    const [userData, setUserData] = useState(null);
    const userLocal = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get(`/users/google/${userLocal.googleId}`);
            const userData = response.data.user;
            console.log('User data:', response.data.user);
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [genders, setGender] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [telephone, setTelephone] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [messages, setMessages] = useState('');
    const [messagesType, setMessagesType] = useState('');

    useEffect(() => {
        if (userData !== null) {
            setName(userData?.name || '');
            setEmail(userData?.email || '');
            setGender(userData?.gender || '');
            setBirthDate(userData?.birthDate ? parseDate(convertToISODate(userData.birthDate)) : null);
            setTelephone(userData?.telephone || '');
            setPhotoLink(userData?.photoLink || '');
            setFileList(userData?.photoLink ? [{
                uid: userData?._id,
                name: userData?.name,
                status: 'done',
                url: userData?.photoLink,
            },] : []);
        }
    }, [userData]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    // Fungsi untuk menangani perubahan file upload
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    // Custom request untuk upload gambar dan simpan URL ke photoLink
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
                // Simpan URL gambar di photoLink
                setPhotoLink(response.data.url);
                notification.success({message:'Upload successful!'});
                onSuccess(response.data);
            } else {
                notification.error({message:'Upload failed!'});
                onError('No URL in response');
            }
        } catch (error) {
            notification.error({message:'Error uploading file'});
            onError(error);
        }
    };
    

    // Tombol upload gambar
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
            className="flex flex-col gap-2 justify-center items-center font-openSans text-[12px]"
        >
            <PlusOutlined />
            Upload <br /> Foto Anda
        </button>
    );


    // Status Validasi
    const nameStatus = useMemo(() => {
        if (name === "") return "nonActive";
        if (/^[A-Za-z\s]+$/.test(name)) return "success";
        return "danger";
    }, [name]);

    const emailStatus = useMemo(() => {
        if (email === "") return "nonActive";
        if (/^[A-Za-z0-9._%+-]+@(gmail\.com|bps\.go\.id)$/i.test(email)) return "success";
        return "danger";
    }, [email]);

    const genderStatus = useMemo(() => {
        if (genders === "") return "nonActive";
        if (genders !== "") return "success";
        return "danger";
    }, [genders]);

    const birthDateStatus = useMemo(() => {
        if (birthDate === null) return "nonActive";
        if (birthDate !== null) return "success";
        return "danger";
    }, [birthDate]);

    const telephoneStatus = useMemo(() => {
        if (telephone === "") return "nonActive";
        if (/^08\d{10}$/.test(telephone)) return "success";
        return "danger";
    }, [telephone]);

    const handlePerbaruiButtonClick = () => {
        const updatedUserData = {
            name: name,
            email: email,
            gender: genders,
            birthDate: formatDate(birthDate),
            telephone: telephone,
            photoLink: photoLink
        };

        console.log("Updated User Data:", updatedUserData);

        updateUserData(updatedUserData);
    }

    const updateUserData = async (updatedUserData) => {
        try {
            const response = await axiosInstance.patch(`/users/${userData._id}`, updatedUserData);
            console.log("User data updated successfully:", response.data);
            setMessages('Profile berhasil diperbaharui');
            setMessagesType('success');
        } catch (error) {
            console.error("Error updating user data:", error);
            setMessages('Profile gagal diperbarui. Silakan coba lagi.');
            setMessagesType('error');
        }
    }

    const isButtonDisabled = useMemo(() => {
        return (
            nameStatus === "nonActive" || nameStatus === "danger" ||
            emailStatus === "nonActive" || emailStatus === "danger" ||
            genderStatus === "nonActive" || genderStatus === "danger" ||
            birthDateStatus === "nonActive" || birthDateStatus === "danger" ||
            telephoneStatus === "nonActive" || telephoneStatus === "danger"
        );
    }, [nameStatus, emailStatus, genderStatus, birthDateStatus, telephoneStatus]);

    return (
        <div className="flex min-h-screen my-4 mx-2">
            <div className="w-full">
                <Stack>
                    <div className="flex flex-col gap-3 justify-center items-center ">
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
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}

                        <Input
                            value={name}
                            type="text"
                            label="Nama"
                            variant="bordered"
                            isInvalid={nameStatus === "danger"}
                            color={nameStatus}
                            errorMessage={nameStatus === "danger" ? "Nama hanya boleh mengandung huruf" : ""}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full"
                            isRequired
                            isReadOnly
                        />

                        <Input
                            value={email}
                            type="email"
                            label="Email"
                            variant="bordered"
                            isInvalid={emailStatus === "danger"}
                            color={emailStatus}
                            errorMessage={emailStatus === "danger" ? "Masukkan alamat email yang valid yaitu namaEmail@gmail.com atau namaEmail@bps.go.id" : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                            isRequired
                            isReadOnly
                        />

                        <Select
                            label="Jenis Kelamin"
                            className="w-full"
                            variant="bordered"
                            isInvalid={genderStatus === "danger"}
                            color={genderStatus}
                            errorMessage={genderStatus === "danger" ? "Pilih Jenis Kelamin" : ""}
                            onChange={(e) => setGender(e.target.value)}
                            isRequired
                            selectedKeys={[genders]}
                        >
                            {gender.map((jk) => (
                                <SelectItem key={jk.value} value={jk.value}>
                                    {jk.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <DatePicker
                            label="Tanggal Lahir"
                            variant="bordered"
                            maxValue={today(getLocalTimeZone()).subtract({ years: 10 })}
                            className="w-full"
                            isInvalid={birthDateStatus === "danger"}
                            color={birthDateStatus}
                            errorMessage={birthDateStatus === "danger" ? "Masukkan tanggal lahir yang valid" : ""}
                            value={birthDate}
                            onChange={setBirthDate}
                            showMonthAndYearPickers
                        />


                        <Input
                            value={telephone}
                            type="tel"
                            label="Nomor Telepon"
                            variant="bordered"
                            isInvalid={telephoneStatus === "danger"}
                            color={telephoneStatus}
                            errorMessage={telephoneStatus === "danger" ? "Nomor Telepon harus berupa 08xxxxxxxxxx" : ""}
                            onChange={(e) => setTelephone(e.target.value)}
                            className="w-full"
                            isRequired
                        />


                    </div>
                </Stack>
                <div className="flex flex-col justify-center items-center h-[60px] text-[14px] gap-1 mt-2">
                    <Button variant='ghost' colorScheme='bluePrimary' className="text-nonActive border-2 hover:bg-bluePrimary hover:text-white gap-2" style={{ borderRadius: "20px", width: '110px' }} isDisabled={isButtonDisabled} onClick={handlePerbaruiButtonClick}>
                        Perbaharui
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

export default AdminFormProfile;
