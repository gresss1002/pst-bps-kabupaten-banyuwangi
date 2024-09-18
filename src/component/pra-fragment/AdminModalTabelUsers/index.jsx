import React, { useState, useMemo, useEffect } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import axiosInstance from "../../../utils/axiosInstance";
import { role } from "../../../data";

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
  const [moreDetails, setMoreDetails] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    if (users) {
      setEditUsersData(users);
      setSelectedRole(users.role || "");
      setNameValue(users.name || "");
      setEmailValue(users.email || "");
      setGenderValue(users.gender || "");
      setDistrictsValue(users.district || "");
      setSubsdistrictsValue(users.subsdistrict || "");
      setWorkValue(users.work || "");
      setEducationValue(users.education || "");
      setTeleponValue(users.telephone || "");
      fetchMoreDetails(users._id);
    }
  }, [users]);

  const fetchMoreDetails = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/details`);
      setMoreDetails(response.data);
    } catch (error) {
      console.error('Error fetching additional user details:', error);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedRole(value);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!window.confirm("Apakah Anda yakin ingin mengubah role user ini?")) {
      return;
    }

    const updatedUserData = {
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

    try {
      const response = await axiosInstance.patch(`/users/${users._id}`, updatedUserData);
      console.log("User updated successfully:", response.data);
      setEditUsersData(response.data);
      setMessage("Pengubahan role user berhasil!");
      setMessageType("success");
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Gagal mengubah role user. Silakan coba lagi.");
      setMessageType("error");
    }
  };

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
      roleStatus === "danger" ||
      nameStatus === "danger" ||
      emailStatus === "danger" ||
      genderStatus === "danger" ||
      districtsStatus === "danger" ||
      subsdistrictsStatus === "danger" ||
      workStatus === "danger" ||
      educationStatus === "danger" ||
      telephoneStatus === "danger"
    );
  }, [roleStatus, nameStatus, emailStatus, genderStatus, districtsStatus, subsdistrictsStatus, workStatus, educationStatus, telephoneStatus]);

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
          isReadOnly
        />
        <Input
          label="Asal Kecamatan"
          variant="bordered"
          className="w-full"
          value={districtsValue}
          onChange={handleInputChange(setDistrictsValue)}
          color={districtsStatus}
          isRequired
          isReadOnly
        />
        <Input
          label="Asal Desa"
          variant="bordered"
          className="w-full"
          value={subsdistrictsValue}
          onChange={handleInputChange(setSubsdistrictsValue)}
          color={subsdistrictsStatus}
          isRequired
          isReadOnly
        />
        <Input
          label="Pekerjaan"
          variant="bordered"
          className="w-full"
          value={workValue}
          onChange={handleInputChange(setWorkValue)}
          color={workStatus}
          isRequired
          isReadOnly
        />
        <Input
          label="Pendidikan Terakhir"
          variant="bordered"
          className="w-full"
          value={educationValue}
          onChange={handleInputChange(setEducationValue)}
          color={educationStatus}
          isRequired
          isReadOnly
        />
        <Input
          label="Telepon"
          variant="bordered"
          className="w-full"
          value={telephoneValue}
          onChange={handleInputChange(setTeleponValue)}
          color={telephoneStatus}
          isRequired
          isReadOnly
        />
        <Select
          label="Role"
          className="w-full"
          variant="bordered"
          selectedKeys={[selectedRole]}
          value={selectedRole}
          onChange={(e) => handleSelectChange(e.target.value)}
          isRequired
          color={roleStatus}
        >
          {role.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.value}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Display additional user details */}
      {Object.keys(moreDetails).length > 0 && (
        <div className="w-full mx-[12%] mt-4 p-4 border border-gray-300 rounded-md">
          <h3 className="font-bold text-lg">Additional Details</h3>
          <p><strong>Address:</strong> {moreDetails.address || "N/A"}</p>
          <p><strong>Joined:</strong> {moreDetails.joinedDate || "N/A"}</p>
          {/* Add more fields as needed */}
        </div>
      )}

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

export default AdminModalTabelUsers;
