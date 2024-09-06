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

const AdminModalTabelKonsultan = ({ users }) => {
  const [editUsersData, setEditUsersData] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [districtsValue, setDistrictsValue] = useState("");
  const [subsdistrictsValue, setSubsdistrictsValue] = useState("");
  const [workValue, setWorkValue] = useState("");
  const [educationValue, setEducationValue] = useState("");
  const [telephonesValue, setTelephonesValue] = useState("");
  const [positionValue, setPositionValue] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [availableValue, setAvailableValue] = useState("");

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
      setTelephonesValue(users.telephone || "");
      setPositionValue(users.position || "");
      setFieldValue(users.field || "");
      setAvailableValue(users.available || "");
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
      telephone: telephonesValue,
      position: positionValue,
      field: fieldValue,
      available: availableValue,
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
  const telephonesStatus = useMemo(() => (telephonesValue === "" || telephonesValue.length < 10 ? "nonActive" : "success"), [telephonesValue]);
  const positionStatus = useMemo(() => (positionValue === "" ? "nonActive" : "success"), [positionValue]);
  const fieldStatus = useMemo(() => (fieldValue === "" ? "nonActive" : "success"), [fieldValue]);
  const availableStatus = useMemo(() => (availableValue === "" ? "nonActive" : "success"), [availableValue]);

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
      telephonesStatus === "nonActive" ||
      positionStatus === "nonActive" ||
      fieldStatus === "nonActive" ||
      availableStatus === "nonActive"
    );
  }, [nameStatus, emailStatus, genderStatus, districtsStatus, subsdistrictsStatus, workStatus, educationStatus, telephonesStatus, roleStatus, positionStatus, fieldStatus, availableStatus]);

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
          label="Jabatan"
          variant="bordered"
          className="w-full"
          value={positionValue}
          onChange={handleInputChange(setPositionValue)}
          color={positionStatus}
          isRequired
        />
        <Input
          label="Bidang"
          variant="bordered"
          className="w-full"
          value={fieldValue}
          onChange={handleInputChange(setFieldValue)}
          color={fieldStatus}
          isRequired
        />
        <Input
          label="Ketersediaan Hari"
          variant="bordered"
          className="w-full"
          value={availableValue}
          onChange={handleInputChange(setAvailableValue)}
          color={availableStatus}
          isRequired
        />
        {/* <Input
          label="Pendidikan Terakhir"
          variant="bordered"
          className="w-full"
          value={educationValue}
          onChange={handleInputChange(setEducationValue)}
          color={educationStatus}
          isRequired
        /> */}
        <Input
          label="Telephones"
          variant="bordered"
          className="w-full"
          value={telephonesValue}
          onChange={handleInputChange(setTelephonesValue)}
          color={telephonesStatus}
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

export default AdminModalTabelKonsultan;
