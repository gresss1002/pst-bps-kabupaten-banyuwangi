import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { method, time } from "../../../data";
import { Rate } from "antd";

// Updated input validation function
const getInputStyle = (value) => {
    if (value === "") return "nonActive";
    if (/^[a-zA-Z\s]+$/.test(value)) return "success";
    if (/\d/.test(value)) return "danger";
    return "nonActive";
};

const KonsultanModalTabelReservasi = ({ reservasi }) => {
    const [editReservasiData, setEditReservasiData] = useState({});
    const [selectedMethod, setSelectedMethod] = useState("");
    const [selectedReservasiDate, setSelectedReservasiDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [userValue, setUserValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [topicValue, setTopicValue] = useState([]);
    const [descriptionValue, setDescriptionValue] = useState(""); // State for Textarea

    useEffect(() => {
        if (reservasi) {
            setEditReservasiData(reservasi);
            setSelectedMethod(reservasi.method);
            setSelectedReservasiDate(parseDate(reservasi.reservasiDate));
            setSelectedTime(reservasi.time);
            setUserValue(reservasi.konsumen || "");
            setLinkValue(reservasi.link || "");
            setTopicValue(reservasi.topic || []);
            setDescriptionValue(reservasi.description || ""); // Initialize Textarea value
        }
    }, [reservasi]);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (name === "method") setSelectedMethod(value);
        if (name === "time") setSelectedTime(value);
    };

    const handleUserChange = (e) => {
        setUserValue(e.target.value);
    };

    const handleLinkChange = (e) => {
        setLinkValue(e.target.value);
    };

    const handleTopicChange = (e) => {
        setTopicValue(e.target.value);
    };

    const handleButtonClick = () => {
        const data = {
            method: selectedMethod,
            topic: topicValue,
            reservasiDate: selectedReservasiDate,
            time: selectedTime,
            user: userValue,
            link: linkValue,
            description: descriptionValue, // Include the description in the data
        };
        setEditReservasiData(data);
    };

    let { locale } = useLocale();
    const isDateUnavailable = (date) => isWeekend(date, locale);

    // Determine styles
    const methodStatus = useMemo(() => selectedMethod !== "" ? "success" : "nonActive", [selectedMethod]);
    const topicStatus = useMemo(() => topicValue === "" ? "nonActive" : "success", [topicValue]);
    const reservasiDateStatus = useMemo(() => {
        if (!selectedReservasiDate) return "nonActive";
        const currentDate = today(getLocalTimeZone());
        if (isDateUnavailable(selectedReservasiDate)) {
            console.log("reservasiDateStatus: danger");
            return "danger";
        }
        const status = selectedReservasiDate.compare(currentDate.add({ days: 2 })) < 0 ? "danger" : "success";
        console.log("reservasiDateStatus:", status);
        return status;
    }, [selectedReservasiDate, locale]);
    const timeStatus = useMemo(() => selectedTime !== "" ? "success" : "nonActive", [selectedTime]);
    const userStatus = useMemo(() => getInputStyle(userValue), [userValue]);
    const linkStatus = useMemo(() => (linkValue === "" ? "nonActive" : "success"), [linkValue]);
    const descriptionStatus = useMemo(() => getInputStyle(descriptionValue), [descriptionValue]); // Add status for Textarea

    const isButtonDisabled = useMemo(() => {
        return (
            methodStatus === "nonActive" || methodStatus === "danger" ||
            topicStatus === "nonActive" || topicStatus === "danger" ||
            reservasiDateStatus === "nonActive" || reservasiDateStatus === "danger" ||
            timeStatus === "nonActive" || timeStatus === "danger" ||
            userStatus === "nonActive" || userStatus === "danger" ||
            linkStatus === "nonActive" || linkStatus === "danger" ||
            descriptionStatus === "danger" // Include Textarea status check
        );
    }, [methodStatus, topicStatus, reservasiDateStatus, timeStatus, userStatus, linkStatus, descriptionStatus]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
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
                    onChange={handleSelectChange}
                    isRequired
                    name="time"
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
                    onChange={handleSelectChange}
                    isRequired
                    name="method"
                    color={methodStatus}
                >
                    {method.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                            {m.label}
                        </SelectItem>
                    ))}
                </Select>
                <Input
                    label="Konsumen"
                    variant="bordered"
                    className="w-full"
                    value={userValue}
                    onChange={handleUserChange}
                    color={userStatus}
                    isReadOnly
                />
                <Input
                    label="Topik"
                    variant="bordered"
                    className="w-full"
                    isReadOnly
                    value={topicValue}
                    onChange={handleTopicChange}
                    color={topicStatus}
                />
                <Input
                    label="Link"
                    variant="bordered"
                    className="w-full"
                    value={linkValue}
                    onChange={handleLinkChange}
                    color={linkStatus}
                    isRequired
                />
            </div>
            <Textarea
                label="Deskripsi Topik"
                variant="bordered"
                // placeholder="Masukkan deskripsi dari topik lebih lanjut"
                disableAnimation
                classNames={{
                    base: "w-full",
                    input: `resize-y h-[3px]`,
                }}
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
                color={descriptionStatus} // Apply the validation status
            />
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

export default KonsultanModalTabelReservasi;
