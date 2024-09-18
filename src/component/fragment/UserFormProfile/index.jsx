import React, { useState, useMemo, useEffect } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { PlusOutlined } from '@ant-design/icons';
import { Image, message, Upload } from 'antd';
import { district, education, gender, work, subsdistrict } from "../../../data";
import formatDate from "../../../utils/formatedDate";
import axiosInstance from "../../../utils/axiosInstance";
import convertToISODate from "../../../utils/convertToISODate";
import axios from "axios";

// Fungsi untuk mendapatkan Base64 dari file
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });



const UserFormProfile = () => {

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
    const [districts, setDistricts] = useState('');
    const [subsdistricts, setSubsdistricts] = useState('');
    const [subsdistrictsFiltered, setSubsdistrictsFiltered] = useState([]);
    const [works, setWork] = useState('');
    const [educations, setPendidikan] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [telephone, setTelephone] = useState('');
    const [subsdistrictsTouched, setSubsdistrictsTouched] = useState(false);
    const [photoLink, setPhotoLink] = useState('');


    useEffect(() => {
        if (userData !== null) {
            setName(userData?.name || '');
            setEmail(userData?.email || '');
            setGender(userData?.gender || '');
            setDistricts(userData?.district || '');
            setSubsdistricts(userData?.subsdistrict || '');
            if (userData.district !== "") {
                setSubsdistrictsTouched(true);
            }
            setWork(userData?.work || '');
            setPendidikan(userData?.education || '');
            setBirthDate(userData?.birthDate ? parseDate(convertToISODate(formatDate(userData.birthDate))) : null);
            setTelephone(userData?.telephone || '');
            setPhotoLink(userData?.photoLink || '');
        }
    }, [userData]);

    // Fungsi untuk menangani preview gambar
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
                message.success('Upload successful!');
                onSuccess(response.data);
            } else {
                message.error('Upload failed!');
                onError('No URL in response');
            }
        } catch (error) {
            message.error('Error uploading file');
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

    // Status validasi untuk berbagai field
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

    const districtsStatus = useMemo(() => {
        if (districts === "") return "nonActive";
        if (districts !== "") return "success";
        return "danger";
    }, [districts]);

    const isSubsdistrictsValid = useMemo(() => districtsStatus === "success" && subsdistricts !== '', [districtsStatus, subsdistricts]);

    const subsdistrictsStatus = useMemo(() => {
        if (!subsdistrictsTouched) return "nonActive";
        if (districtsStatus === 'nonActive' || districtsStatus === 'danger') return "danger";
        if (districtsStatus === 'success') {
            if (subsdistricts !== "" && isSubsdistrictsValid) return "success";
            if (subsdistricts === "") return "nonActive";
        }
        return "danger";
    }, [subsdistricts, districtsStatus, subsdistrictsTouched, isSubsdistrictsValid]);

    const workStatus = useMemo(() => {
        if (works === "") return "nonActive";
        if (works !== "") return "success";
        return "danger";
    }, [works]);

    const educationStatus = useMemo(() => {
        if (educations === "") return "nonActive";
        if (educations !== "") return "success";
        return "danger";
    }, [educations]);

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

    useEffect(() => {
        // Filter subdistricts based on selected district
        const selectedDistrict = district.find(d => d.value === districts);
        if (selectedDistrict) {
            const filtered = subsdistrict.filter(sub => sub.districtId === selectedDistrict.districtId);
            setSubsdistrictsFiltered(filtered);
        } else {
            setSubsdistrictsFiltered([]);
        }
        setSubsdistricts("");
    }, [districts]);


    const handleDistrictsChange = (value) => {
        setDistricts(value);
    };

    const handleSubsdistrictsClick = () => {
        setSubsdistrictsTouched(true); // Track interaction with Subsdistricts dropdown
    };

    const handlePerbaruiButtonClick = () => {
        const updatedUserData = {
            name: name,
            email: email,
            gender: genders,
            district: districts,
            subsdistrict: subsdistricts,
            work: works,
            education: educations,
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
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    const isButtonDisabled = useMemo(() => {
        return (
            // nameStatus === "nonActive" || nameStatus === "danger" ||
            // emailStatus === "nonActive" || emailStatus === "danger" ||
            genderStatus === "nonActive" || genderStatus === "danger" ||
            birthDateStatus === "nonActive" || birthDateStatus === "danger" ||
            telephoneStatus === "nonActive" || telephoneStatus === "danger" ||
            districtsStatus === "nonActive" || districtsStatus === "danger" ||
            subsdistrictsStatus === "nonActive" || subsdistrictsStatus === "danger" ||
            workStatus === "nonActive" || workStatus === "danger" ||
            educationStatus === "nonActive" || educationStatus === "danger"
        );
    }, [genderStatus, birthDateStatus, telephoneStatus, districtsStatus, subsdistrictsStatus, workStatus, educationStatus]);


    useEffect(() => {
        console.log('Districts:', districts);
        console.log('Subsdistricts:', subsdistricts);
        console.log('Subsdistricts Filtered:', subsdistrictsFiltered);

        const selectedDistrict = district.find(d => d.value === districts);
        if (selectedDistrict) {
            const filtered = subsdistrict.filter(sub => sub.districtId === selectedDistrict.districtId);
            setSubsdistrictsFiltered(filtered);
        } else {
            setSubsdistrictsFiltered([]);
        }
        // Optionally reset subsdistricts if needed
        // setSubsdistricts("");
    }, [districts]);

    return (
        <div className="flex min-h-screen my-4 mx-2">
            <div className="w-full">
                <Stack>
                    <div className="flex flex-col gap-3 justify-center items-center">
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
                        {/* Display the photoLink URL */}
                        {photoLink && <p>Photo URL: {photoLink}</p>}

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
                            selectedKeys={[genders]}
                            errorMessage={genderStatus === "danger" ? "Pilih Jenis Kelamin" : ""}
                            onChange={(e) => setGender(e.target.value)}
                            isRequired
                        >
                            {gender.map((a) => (
                                <SelectItem key={a.value} value={a.value}>
                                    {a.label}
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

                        <Select
                            label="Asal Kecamatan"
                            className="w-full"
                            variant="bordered"
                            isInvalid={districtsStatus === "danger"}
                            color={districtsStatus}
                            selectedKeys={[districts]}
                            errorMessage={districtsStatus === "danger" ? "Pilih Kabupaten/Kota" : ""}
                            onChange={(e) => handleDistrictsChange(e.target.value)}
                            isRequired
                        >
                            {district.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                    {p.value}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Asal Desa"
                            className="w-full"
                            variant="bordered"
                            selectedKeys={[subsdistricts]}
                            isInvalid={subsdistrictsStatus === "danger"}
                            color={subsdistrictsStatus}
                            errorMessage={subsdistrictsStatus === "danger" ? "Pilih Kecamatan telebih dahulu" : ""}
                            // onChange={(value) => setSubsdistricts(value)}
                            onChange={(e) => setSubsdistricts(e.target.value)}
                            onClick={handleSubsdistrictsClick}
                            // value={subsdistricts}
                            isRequired
                        >
                            {subsdistrictsFiltered.map((sd) => (
                                <SelectItem key={sd.value} value={sd.value}>
                                    {sd.value}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Pekerjaan"
                            className="w-full"
                            variant="bordered"
                            isInvalid={workStatus === "danger"}
                            color={workStatus}
                            selectedKeys={[works]}
                            errorMessage={workStatus === "danger" ? "Pilih Pekerjaan" : ""}
                            onChange={(e) => setWork(e.target.value)}
                            isRequired
                        >
                            {work.map((w) => (
                                <SelectItem key={w.value} value={w.value}>
                                    {w.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Pendidikan Terakhir"
                            className="w-full"
                            variant="bordered"
                            isInvalid={educationStatus === "danger"}
                            color={educationStatus}
                            selectedKeys={[educations]}
                            errorMessage={educationStatus === "danger" ? "Pilih Pendidikan Terakhir" : ""}
                            onChange={(e) => setPendidikan(e.target.value)}
                            isRequired
                        >
                            {education.map((e) => (
                                <SelectItem key={e.value} value={e.value}>
                                    {e.label}
                                </SelectItem>
                            ))}
                        </Select>
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


                        <div className="flex flex-col justify-center items-center h-[60px] text-[14px] gap-1 mt-2">
                            <Button variant='ghost' colorScheme='bluePrimary' className="text-nonActive border-2 hover:bg-bluePrimary hover:text-white gap-2" style={{ borderRadius: "20px", width: '110px' }} isDisabled={isButtonDisabled} onClick={handlePerbaruiButtonClick}>
                                Perbaharui
                            </Button>
                        </div>
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default UserFormProfile;
