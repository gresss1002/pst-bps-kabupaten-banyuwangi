import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { user, method, time } from "../../../data";
import { Card, Rate } from "antd";

// Update the input style function to validate description field
const getInputStyle = (value) => {
  if (value === "") return "nonActive";
  if (/^[a-zA-Z0-9\s;:.,-]+$/.test(value)) return "success";  // Allow letters, numbers, and spaces
  return "danger"; // Changed from "nonActive" to "danger" if not valid
};

const UserModalTabelReservasi = ({ reservasi }) => {
  const [editReservasiData, setEditReservasiData] = useState({});
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [selectedReservasiDate, setSelectedReservasiDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedKonsultan, setSelectedKonsultan] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [rateValue, setRateValue] = useState(0); // State for the rating value

  useEffect(() => {
    if (reservasi) {
      setEditReservasiData(reservasi);
      setSelectedMethod(reservasi.method);
      setSelectedTopic(reservasi.topic || []);
      setSelectedKonsultan(reservasi.konsultan);
      setSelectedReservasiDate(parseDate(reservasi.reservasiDate));
      setSelectedTime(reservasi.time);
      setLinkValue(reservasi.link || "");
      setDescriptionValue(reservasi.descriptionReservasi || "");
      setRateValue(reservasi.rating || 0); // Initialize the rate value if available
    }
  }, [reservasi]);

  const handleSelectChange = (name, value) => {
    switch (name) {
      case "method":
        setSelectedMethod(value);
        break;
      case "topic":
        setSelectedTopic(Array.isArray(value) ? value : [value]);
        break;
      case "konsultan":
        handleKonsultanChange(value);
        break;
      case "reservasiDate":
        setSelectedReservasiDate(parseDate(value));
        break;
      case "time":
        setSelectedTime(value);
        break;
      default:
        break;
    }
  };

  const handleKonsultanChange = (selectedKonsultanName) => {
    setSelectedKonsultan(selectedKonsultanName);
    const konsultan = user.find((u) => u.name === selectedKonsultanName && u.role === "Konsultan");
    setSelectedTopic(konsultan ? konsultan.field : []); // Reset topics according to the field of the consultant
  };

  const handleButtonClick = () => {
    const sanitizedDescription = descriptionValue.replace(/'/g, "\\'"); // Basic escaping to prevent SQL injection
    const data = {
      method: selectedMethod,
      topic: selectedTopic,
      reservasiDate: selectedReservasiDate,
      time: selectedTime,
      konsultan: selectedKonsultan,
      link: linkValue,
      descriptionReservasi: sanitizedDescription,
      rating: rateValue, // Include the rating in the data to be saved
    };
    setEditReservasiData(data);
  };

  let { locale } = useLocale();
  const isDateUnavailable = (date) => isWeekend(date, locale);

  const metodeStatus = useMemo(() => {
    const status = selectedMethod ? "success" : "nonActive";
    return status;
  }, [selectedMethod]);

  const topikStatus = useMemo(() => {
    const status = selectedTopic.length > 0 ? "success" : "nonActive";
    return status;
  }, [selectedTopic]);

  const reservasiDateStatus = useMemo(() => {
    if (!selectedReservasiDate) return "nonActive";
    const currentDate = today(getLocalTimeZone());
    if (isDateUnavailable(selectedReservasiDate)) {
      return "danger";
    }
    const status = selectedReservasiDate.compare(currentDate.add({ days: 2 })) < 0 ? "danger" : "success";
    return status;
  }, [selectedReservasiDate, locale]);

  const timeStatus = useMemo(() => {
    const status = selectedTime ? "success" : "nonActive";
    return status;
  }, [selectedTime]);

  const konsultanStatus = useMemo(() => {
    const status = selectedKonsultan ? "success" : "nonActive";
    return status;
  }, [selectedKonsultan]);

  const linkStatus = useMemo(() => {
    const status = linkValue ? "success" : "nonActive";
    return status;
  }, [linkValue]);

  const descriptionStatus = useMemo(() => {
    const status = getInputStyle(descriptionValue); // Use updated getInputStyle for description validation
    return status;
  }, [descriptionValue]);

  const isButtonDisabled = useMemo(() => {
    const disabled = (
      metodeStatus === "nonActive" ||
      topikStatus === "nonActive" ||
      reservasiDateStatus === "nonActive" ||
      timeStatus === "nonActive" ||
      konsultanStatus === "nonActive" ||
      metodeStatus === "danger" ||
      topikStatus === "danger" ||
      reservasiDateStatus === "danger" ||
      timeStatus === "danger" ||
      konsultanStatus === "danger" ||
      descriptionStatus === "danger" // Check for description status
    );
    return disabled;
  }, [metodeStatus, topikStatus, reservasiDateStatus, timeStatus, konsultanStatus, descriptionStatus]);

  const konsultanUsers = user.filter((u) => u.role === "Konsultan");

  const availableTopics = useMemo(() => {
    const konsultan = konsultanUsers.find((k) => k.name === selectedKonsultan);
    return konsultan ? konsultan.field : [];
  }, [selectedKonsultan, konsultanUsers]);

  return (
    <div
      className="flex flex-col gap-4 justify-center items-center w-full"
      style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}
    >
      <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
        <DatePicker
          label="Tanggal Konsultasi"
          variant="bordered"
          value={selectedReservasiDate}
          minValue={today(getLocalTimeZone()).add({ days: 2 })}
          isRequired
          className="w-full"
          onChange={(date) => setSelectedReservasiDate(date)}
          isDateUnavailable={isDateUnavailable}
          errorMessage="Minimal 2 hari kerja dari hari ini"
          color={reservasiDateStatus}
        />
        <Select
          label="Waktu"
          className="w-full"
          variant="bordered"
          selectedKeys={selectedTime ? [selectedTime] : []}
          onChange={(e) => handleSelectChange('time', e.target.value)}
          isRequired
          color={timeStatus}
        >
          {time.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Metode"
          className="w-full"
          variant="bordered"
          selectedKeys={selectedMethod ? [selectedMethod] : []}
          onChange={(e) => handleSelectChange('method', e.target.value)}
          isRequired
          color={metodeStatus}
        >
          {method.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Konsultan"
          className="w-full"
          variant="bordered"
          selectedKeys={selectedKonsultan ? [selectedKonsultan] : []}
          onChange={(e) => handleSelectChange('konsultan', e.target.value)}
          isRequired
          color={konsultanStatus}
        >
          {konsultanUsers.map((k) => (
            <SelectItem key={k.name} value={k.name}>
              {k.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Topik"
          className="w-full"
          variant="bordered"
          selectedKeys={selectedTopic}
          onChange={(e) => handleSelectChange('topic', e.target.value)}
          isRequired
          selectionMode="multiple"
          color={topikStatus}
        >
          {availableTopics.map((field) => (
            <SelectItem key={field} value={field}>
              {field}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Link"
          variant="bordered"
          isReadOnly
          className="w-full"
          value={editReservasiData.link || ""}
          color={linkStatus}
        />
        <Textarea
        label="Deskripsi Topik"
        variant="bordered"
        disableAnimation
        classNames={{
          base: "w-full",
          input: `resize-y h-[3px]`,
        }}
        value={descriptionValue}
        onChange={(e) => setDescriptionValue(e.target.value)}
        color={descriptionStatus}
      />
        {/* <Card className="flex flex-col gap-2 font-openSans text-[14px] h-[102px] border-2 " borderRadius="xl"> */}
          <span>
            Seberapa puas Anda dengan kosnultasi yang telah dijalani?
          </span>
        <Rate
            allowHalf
            value={rateValue}
            onChange={setRateValue}
            className="w-full flex justify-center items-center "
          />
        {/* </Card> */}
          
          

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

export default UserModalTabelReservasi;
