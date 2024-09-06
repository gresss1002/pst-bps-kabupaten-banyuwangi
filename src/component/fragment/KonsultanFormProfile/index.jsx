import React, { useState, useMemo, useEffect } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import {  gender, position, field, available} from "../../../data";
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const KonsultanFormProfile = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
            
                Upload <br/>  Foto Anda
        </button>
    );
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [genders, setGender] = useState('');
    // const [provinsi, setProvinsi] = useState('');
    // const [kabupaten, setKabupaten] = useState('');
    // const [kabupatenFiltered, setKabupatenFiltered] = useState([]);
    const [positions, setPosition] = useState('');
    const [fields, setField] = useState('');
    const [availables, setAvailable] = useState('');
    const [date, setDate] = useState(null);
    const [telepon, setTelepon] = useState('');
    // const [kabupatenTouched, setKabupatenTouched] = useState(false);
    const [image, setImage] = useState(null); // State untuk menyimpan file gambar
    const [imageStatus, setImageStatus] = useState('nonActive'); // Status upload gambar

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

    // const provinsiStatus = useMemo(() => {
    //     if (provinsi === "") return "nonActive";
    //     if (provinsi !== "") return "success";
    //     return "danger";
    // }, [provinsi]);

    // const isKabupatenValid = useMemo(() => provinsiStatus === "success" && kabupaten !== '', [provinsiStatus, kabupaten]);

    // const kabupatenStatus = useMemo(() => {
    //     if (!kabupatenTouched) return "nonActive"; // Field kabupaten belum disentuh, status nonActive
    //     if (provinsiStatus === 'nonActive' || provinsiStatus === 'danger') return "danger"; // Provinsi nonActive atau danger
    //     if (provinsiStatus === 'success') {
    //         if (kabupaten !== "" && isKabupatenValid) return "success"; // Kabupaten tidak kosong dan valid
    //         if (kabupaten === "") return "nonActive"; // Kabupaten kosong
    //     }
    //     return "danger"; // Default to danger if no other condition matches
    // }, [kabupaten, provinsiStatus, kabupatenTouched, isKabupatenValid]);

    const positionStatus = useMemo(() => {
        if (positions === "") return "nonActive";
        if (positions !== "") return "success";
        return "danger";
    }, [positions]);

    const fieldStatus = useMemo(() => {
        if (fields === "") return "nonActive";
        if (fields !== "") return "success";
        return "danger";
    }, [fields]);

    const availableStatus = useMemo(() => {
        if (availables === "") return "nonActive";
        if (availables !== "") return "success";
        return "danger";
    }, [availables]);

    const dateStatus = useMemo(() => {
        if (date === null) return "nonActive";
        if (date !== null ) return "success";
        return "danger";
    }, [date]);

    const teleponStatus = useMemo(() => {
        if (telepon === "") return "nonActive";
        if (/^08\d{10}$/.test(telepon)) return "success";
        return "danger";
    }, [telepon]);

    // useEffect(() => {
    //     const selectedProvinsi = prov.find(p => p.provinsi === provinsi);
    //     if (selectedProvinsi) {
    //         setKabupatenFiltered(selectedProvinsi.kabupaten);
    //     } else {
    //         setKabupatenFiltered([]);
    //     }
    // }, [provinsi]);


    // const handleProvinsiChange = (value) => {
    //     setProvinsi(value);
    //     setKabupaten(""); // Reset kabupaten when provinsi changes
    // };

    // const handleKabupatenClick = () => {
    //     setKabupatenTouched(true); // Track interaction with Kabupaten dropdown
    // };

    const isButtonDisabled = useMemo(() => {
        return (
            nameStatus === "nonActive" || nameStatus === "danger" ||
            emailStatus === "nonActive" || emailStatus === "danger" ||
            genderStatus === "nonActive" || genderStatus === "danger" ||
            dateStatus === "nonActive" || dateStatus === "danger" ||
            teleponStatus === "nonActive" || teleponStatus === "danger" ||
            positionStatus === "nonActive" || positionStatus === "danger" ||
            fieldStatus === "nonActive" || fieldStatus === "danger" ||
            availableStatus === "nonActive" || availableStatus === "danger" 
        );
    }, [nameStatus, emailStatus, genderStatus, dateStatus, teleponStatus, positionStatus, fieldStatus, availableStatus]);


    return (
        <div className="flex  min-h-screen my-4 mx-2">
            <div className="w-full">
                <Stack>
                    <div className="flex flex-col gap-3 justify-center items-center">
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-circle"
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
                            color={dateStatus}
                            onChange={(date) => setDate(date)}
                            showMonthAndYearPickers
                            isRequired
                            className="w-full"
                        />

                        {/* <Select
                            label="Asal Provinsi"
                            className="w-full"
                            variant="bordered"
                            isInvalid={provinsiStatus === "danger"}
                            color={provinsiStatus}
                            errorMessage={provinsiStatus === "danger" ? "Pilih provinsi" : ""}
                            onChange={(e) => handleProvinsiChange(e.target.value)}
                            isRequired
                        >
                            {prov.map((item) => (
                                <SelectItem key={item.provinsi} value={item.provinsi}>
                                    {item.provinsi}
                                </SelectItem>
                            ))}
                        </Select> */}

                        {/* <Select
                            label="Asal Kabupaten/Kota"
                            className="w-full"
                            variant="bordered"
                            isInvalid={kabupatenStatus === "danger"}
                            color={kabupatenStatus}
                            errorMessage={
                                kabupatenStatus === "danger"
                                    ? "Pilih asal provinsi terlebih dahulu"
                                    : ""
                            }
                            onClick={handleKabupatenClick}
                            onChange={(e) => setKabupaten(e.target.value)}
                            isRequired
                        >
                            {kabupatenFiltered.map((k) => (
                                <SelectItem key={k.value} value={k.value}>
                                    {k.label}
                                </SelectItem>
                            ))}
                        </Select> */}

                        <Select
                            label="Jabatan"
                            className="w-full"
                            variant="bordered"
                            isInvalid={positionStatus === "danger"}
                            color={positionStatus}
                            errorMessage={positionStatus === "danger" ? "Pilih pekerjaan" : ""}
                            onChange={(e) => setPosition(e.target.value)}
                            isRequired
                        >
                            {position.map((a) => (
                                <SelectItem key={a.value} value={a.value}>
                                    {a.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Bidang"
                            className="w-full"
                            variant="bordered"
                            selectionMode="multiple"
                            isInvalid={fieldStatus === "danger"}
                            color={fieldStatus}
                            errorMessage={fieldStatus === "danger" ? "Pilih pendidikan" : ""}
                            onChange={(e) => setField(e.target.value)}
                            isRequired
                        >
                            {field.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                    {p.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Select
                            label="Ketersediaan Hari"
                            className="w-full"
                            variant="bordered"
                            selectionMode="multiple"
                            isInvalid={availableStatus === "danger"}
                            color={availableStatus}
                            errorMessage={availableStatus === "danger" ? "Pilih pendidikan" : ""}
                            onChange={(e) => setAvailable(e.target.value)}
                            isRequired
                        >
                            {available.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                    {p.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Input
                            value={telepon}
                            type="text"
                            label="Nomor Telepon"
                            variant="bordered"
                            isInvalid={teleponStatus === "danger"}
                            color={teleponStatus}
                            errorMessage={teleponStatus === "danger" ? "Masukkan nomor telepon yang valid (08XXXXXXXXXX)" : ""}
                            onChange={(e) => setTelepon(e.target.value)}
                            className="w-full"
                            isRequired
                        />


                    </div>
                </Stack>
                <div className="flex flex-col justify-center items-center h-[60px] text-[14px] gap-1 mt-2">
                    <Button variant='ghost' colorScheme='bluePrimary' className="text-nonActive border-2 hover:bg-bluePrimary hover:text-white gap-2" style={{ borderRadius: "20px", width: '110px' }} isDisabled={isButtonDisabled}>
                        Perbaharui
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default KonsultanFormProfile;
