import React, { useState, useMemo } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { gender, material } from "../../../data";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const UserPengaduan = () => {
    const [genders, setGender] = useState('');
    const [materials, setMaterial] = useState('');
    const [telepon, setTelepon] = useState('');
    const [complaint, setComplaint] = useState('');

    const genderStatus = useMemo(() => {
        if (genders === "") return "nonActive";
        if (genders !== "") return "success";
        return "danger";
    }, [genders]);

    const materialStatus = useMemo(() => {
        if (materials === "") return "nonActive";
        if (materials !== "") return "success";
        return "danger";
    }, [materials]);

    const complaintStatus = useMemo(() => {
        if (complaint === "") return "nonActive";
        if (complaint !== "") return "success";
        return "danger";
    }, [complaint]);

    const teleponStatus = useMemo(() => {
        if (telepon === "") return "nonActive";
        if (/^08\d{10}$/.test(telepon)) return "success";
        return "danger";
    }, [telepon]);

    const isButtonDisabled = useMemo(() => {
        return (
            genderStatus === "nonActive" || genderStatus === "danger" ||
            teleponStatus === "nonActive" || teleponStatus === "danger" ||
            materialStatus === "nonActive" || materialStatus === "danger" ||
            complaintStatus === "nonActive" || complaintStatus === "danger"
        );
    }, [genderStatus, teleponStatus, materialStatus, complaintStatus]);


    return (
        <div className="flex min-h-screen my-4 mx-2">
            <div className="w-full">
                <Stack>
                    <div className="flex flex-col gap-3 justify-center items-center">
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

                        <Select
                            label="Material Keluhan/Saran"
                            className="w-full"
                            variant="bordered"
                            // selectionMode="multiple"
                            isInvalid={materialStatus === "danger"}
                            color={materialStatus}
                            errorMessage={materialStatus === "danger" ? "Pilih pendidikan" : ""}
                            onChange={(e) => setMaterial(e.target.value)}
                            isRequired
                        >
                            {material.map((p) => (
                                <SelectItem key={p.value} value={p.value}>
                                    {p.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            value={complaint}
                            type="text"
                            label="Saran/Keluhan"
                            variant="bordered"
                            isInvalid={complaintStatus === "danger"}
                            color={complaintStatus}
                            errorMessage={complaintStatus === "danger" ? "Masukkan nomor complaint yang valid (08XXXXXXXXXX)" : ""}
                            onChange={(e) => setComplaint(e.target.value)}
                            className="w-full"
                            isRequired
                        />
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

export default UserPengaduan;
