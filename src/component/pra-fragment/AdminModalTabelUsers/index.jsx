/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { Button, Card, CardBody, Stack } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { role } from "../../../data";
// pastikan path ini benar sesuai struktur project Anda

// const getInputStyle = (value) => {
//   if (value === "") return "nonActive";
//   if (/^[a-zA-Z\s]+$/.test(value)) return "success";
//   if (/\d/.test(value)) return "danger";
//   return "nonActive";
// };

const AdminModalTabelUsers = ({ users }) => {
  const [editUsersData, setEditUsersData] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [districtsValue, setDistrictsValue] = useState("");
  const [subsdistrictsValue, setSubsdistrictsValue] = useState("");
  const [workValue, setWorkValue] = useState("");
  const [educationValue, setEducationValue] = useState("");
  const [telephoneValue, setTeleponValue] = useState("");

  useEffect(() => {
    if (users) {
      setEditUsersData(users);
      setSelectedRole(users.role);
      setNameValue(users.name || "");
      setEmailValue(users.email || "");
      setGenderValue(users.gender || "");
      setDistrictsValue(users.district || "");
      setSubsdistrictsValue(users.subsdistrict || "");
      setWorkValue(users.work || "");
      setEducationValue(users.education || "");
      setTeleponValue(users.telephone || "");
    }
  }, [users]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") setSelectedRole(value);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleButtonClick = () => {
    const data = {
      role: selectedRole,
      name: nameValue,
      email: emailValue,
      gender: genderValue,
      district: districtsValue,
      subsdistrict: subsdistrictsValue,
      work: workValue,
      education: educationValue,
      telephone: telephoneValue,
    };
    setEditUsersData(data);
  };

  let { locale } = useLocale();
  const isDateUnavailable = (date) => isWeekend(date, locale);

  const roleStatus = useMemo(() => (selectedRole !== "" ? "success" : "nonActive"), [selectedRole]);
  const nameStatus = useMemo(() => (nameValue === "" ? "nonActive" : "success"), [nameValue]);
  const emailStatus = useMemo(() => (emailValue === "" ? "nonActive" : "success"), [emailValue]);
  const genderStatus = useMemo(() => (genderValue === "" ? "nonActive" : "success"), [genderValue]);
  const districtsStatus = useMemo(() => (districtsValue === "" ? "nonActive" : "success"), [districtsValue]);
  const subsdistrictsStatus = useMemo(() => (subsdistrictsValue === "" ? "nonActive" : "success"), [subsdistrictsValue]);
  const workStatus = useMemo(() => (workValue === "" ? "nonActive" : "success"), [workValue]);
  const educationStatus = useMemo(() => (educationValue === "" ? "nonActive" : "success"), [educationValue]);
  const telephoneStatus = useMemo(() => (telephoneValue === "" || telephoneValue.length < 10 ? "nonActive" : "success"), [telephoneValue]);

  const isButtonDisabled = useMemo(() => {
    return (
      roleStatus === "nonActive" ||
      nameStatus === "nonActive" ||
      emailStatus === "nonActive" ||
      genderStatus === "nonActive" ||
      districtsStatus === "nonActive" ||
      subsdistrictsStatus === "nonActive" ||
      workStatus === "nonActive" ||
      educationStatus === "nonActive" ||
      telephoneStatus === "nonActive"
    );
  }, [nameStatus, emailStatus, genderStatus, districtsStatus, subsdistrictsStatus, workStatus, educationStatus, telephoneStatus, roleStatus]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
      <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
        <Input
          label="Nama"
          variant="bordered"
          className="w-full"
          value={nameValue}
          onChange={handleInputChange(setNameValue)}
          color={nameStatus}
          isReadOnly
        />
        <Input
          label="Email"
          variant="bordered"
          className="w-full"
          isReadOnly
          value={emailValue}
          onChange={handleInputChange(setEmailValue)}
          color={emailStatus}
        />
        <Input
          label="Jenis Kelamin"
          variant="bordered"
          className="w-full"
          value={genderValue}
          onChange={handleInputChange(setGenderValue)}
          color={genderStatus}
          isRequired
        />
        <Input
          label="Asal Kecamatan"
          variant="bordered"
          className="w-full"
          value={districtsValue}
          onChange={handleInputChange(setDistrictsValue)}
          color={districtsStatus}
          isRequired
        />
        <Input
          label="Asal Desa"
          variant="bordered"
          className="w-full"
          value={subsdistrictsValue}
          onChange={handleInputChange(setSubsdistrictsValue)}
          color={subsdistrictsStatus}
          isRequired
        />
        <Input
          label="Pekerjaan"
          variant="bordered"
          className="w-full"
          value={workValue}
          onChange={handleInputChange(setWorkValue)}
          color={workStatus}
          isRequired
        />
        <Input
          label="Pendidikan Terakhir"
          variant="bordered"
          className="w-full"
          value={educationValue}
          onChange={handleInputChange(setEducationValue)}
          color={educationStatus}
          isRequired
        />
        <Input
          label="Telepon"
          variant="bordered"
          className="w-full"
          value={telephoneValue}
          onChange={handleInputChange(setTeleponValue)}
          color={telephoneStatus}
          isRequired
        />
        <Select
          label="Role"
          className="w-full"
          variant="bordered"
          selectedKeys={selectedRole ? [selectedRole] : []}
          onChange={handleSelectChange}
          isRequired
          name="role"
          color={roleStatus}
        >
          {role.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </Select>
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
    </div>
  );
};

export default AdminModalTabelUsers;
