import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import axiosInstance from "../../../utils/axiosInstance";
import { role } from "../../../data";

const AdminModalTabelAdmin = ({ users }) => {
  const [editUsersData, setEditUsersData] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  // const [districtsValue, setDistrictsValue] = useState("");
  // const [subsdistrictsValue, setSubsdistrictsValue] = useState("");
  // const [workValue, setWorkValue] = useState("");
  // const [educationValue, setEducationValue] = useState("");
  const [telephonesValue, setTelephonesValue] = useState("");
  // const [positionValue, setPositionValue] = useState("");
  // const [fieldValue, setFieldValue] = useState("");
  // const [availableValue, setAvailableValue] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    if (users) {
      setEditUsersData(users);
      setSelectedRole(users.role || "");
      setNameValue(users.name || "");
      setEmailValue(users.email || "");
      setGenderValue(users.gender || "");
      // setDistrictsValue(users.district || "");
      // setSubsdistrictsValue(users.subsdistrict || "");
      // setWorkValue(users.work || "");
      // setEducationValue(users.education || "");
      setTelephonesValue(users.telephone || "");
      // setPositionValue(users.position || "");
      // setFieldValue(users.field || "");
      // setAvailableValue(users.available || "");
    }
  }, [users]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "role") setSelectedRole(value);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!window.confirm("Apakah Anda yakin ingin mengubah data konsultan ini?")) {
      return;
    }

    const updatedUserData = {
      role: selectedRole,
      name: nameValue,
      email: emailValue,
      gender: genderValue,
      // district: districtsValue,
      // subsdistrict: subsdistrictsValue,
      // work: workValue,
      // education: educationValue,
      telephone: telephonesValue,
      // position: positionValue,
      // field: fieldValue,
      // available: availableValue,
    };

    try {
      const response = await axiosInstance.patch(`/users/${users._id}`, updatedUserData);
      console.log("User updated successfully:", response.data);
      setEditUsersData(response.data);
      setMessage("Pengubahan data konsultan berhasil!");
      setMessageType("success");
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Gagal mengubah data konsultan. Silakan coba lagi.");
      setMessageType("error");
    }
  };

  const roleStatus = useMemo(() => (selectedRole !== "" ? "success" : "nonActive"), [selectedRole]);
  const nameStatus = useMemo(() => (nameValue === "" ? "nonActive" : "success"), [nameValue]);
  const emailStatus = useMemo(() => (emailValue === "" ? "nonActive" : "success"), [emailValue]);
  const genderStatus = useMemo(() => (genderValue === "" ? "nonActive" : "success"), [genderValue]);
  // const districtsStatus = useMemo(() => (districtsValue === "" ? "nonActive" : "success"), [districtsValue]);
  // const subsdistrictsStatus = useMemo(() => (subsdistrictsValue === "" ? "nonActive" : "success"), [subsdistrictsValue]);
  // const workStatus = useMemo(() => (workValue === "" ? "nonActive" : "success"), [workValue]);
  // const educationStatus = useMemo(() => (educationValue === "" ? "nonActive" : "success"), [educationValue]);
  const telephonesStatus = useMemo(() => (telephonesValue === "" || telephonesValue.length < 10 ? "nonActive" : "success"), [telephonesValue]);
  // const positionStatus = useMemo(() => (positionValue === "" ? "nonActive" : "success"), [positionValue]);
  // const fieldStatus = useMemo(() => (fieldValue === "" ? "nonActive" : "success"), [fieldValue]);
  // const availableStatus = useMemo(() => (availableValue === "" ? "nonActive" : "success"), [availableValue]);

  const isButtonDisabled = useMemo(() => {
    return (
      roleStatus === "danger" ||
      nameStatus === "danger" ||
      emailStatus === "danger" ||
      genderStatus === "danger" ||
      telephonesStatus === "danger" 
      // positionStatus === "danger" ||
      // fieldStatus === "danger" ||
      // availableStatus === "danger"
    );
  }, [roleStatus,nameStatus,emailStatus,genderStatus,telephonesStatus]);

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
          label="Telepon"
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


      {/* Notification Message */}
      {message && (
        <div className={`text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default AdminModalTabelAdmin;
