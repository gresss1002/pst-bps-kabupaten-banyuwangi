import React, { useState, useMemo, useEffect } from "react";
import { Button, Card, CardBody, Stack } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { method, time, user } from "../../../data";
import { Rate } from "antd";
import "./styles.css";

const getInputStyle = (value) => {
    if (value === "") return "nonActive";
    if (/^[a-zA-Z0-9\s;:.,-]+$/.test(value)) return "success";
    return "danger";
};

const AdminModalTabelReservasi = ({ reservasi }) => {
    const [editReservasiData, setEditReservasiData] = useState({});
    const [selectedMethod, setSelectedMethod] = useState("");
    const [selectedReservasiDate, setSelectedReservasiDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedKonsultan, setSelectedKonsultan] = useState("");
    const [konsumenValue, setKonsumenValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [topicValue, setTopicValue] = useState([]);
    const [descriptionValue, setDescriptionValue] = useState(""); // Added state for description
    const [rateValue, setRateValue] = useState(0); // Added state for rating

    useEffect(() => {
        if (reservasi) {
            setEditReservasiData(reservasi);
            setSelectedMethod(reservasi.method);
            setSelectedReservasiDate(parseDate(reservasi.reservasiDate));
            setSelectedKonsultan(reservasi.konsultan);
            setSelectedTime(reservasi.time);
            setKonsumenValue(reservasi.konsumen || "");
            setLinkValue(reservasi.link || "");
            setTopicValue(reservasi.topic || []);
            setDescriptionValue(reservasi.descriptionReservasi || ""); // Initialize description value
            setRateValue(reservasi.rating || 0); // Initialize rating value
        }
    }, [reservasi]);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (name === "method") setSelectedMethod(value);
        if (name === "konsultan") setSelectedKonsultan(value);
        if (name === "time") setSelectedTime(value);
    };

    const handleKonsumenChange = (e) => {
        setKonsumenValue(e.target.value);
    };

    const handleLinkChange = (e) => {
        setLinkValue(e.target.value);
    };

    const handleTopicChange = (e) => {
        setTopicValue(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value);
    };

    const handleButtonClick = () => {
        const data = {
            method: selectedMethod,
            topic: topicValue,
            reservasiDate: selectedReservasiDate,
            time: selectedTime,
            konsultan: selectedKonsultan,
            konsumen: konsumenValue,
            link: linkValue,
            descriptionReservasi: descriptionValue, // Include description in data
            rating: rateValue // Include rating in data
        };
        setEditReservasiData(data);
    };

    let { locale } = useLocale();
    const isDateUnavailable = (date) => isWeekend(date, locale);

    // Determine styles
    const methodStatus = useMemo(() => selectedMethod !== "" ? "success" : "nonActive", [selectedMethod]);
    const reservasiDateStatus = useMemo(() => {
        if (!selectedReservasiDate) return "nonActive";
        const currentDate = today(getLocalTimeZone());
        if (isDateUnavailable(selectedReservasiDate)) {
            return "danger";
        }
        const status = selectedReservasiDate.compare(currentDate.add({ days: 2 })) < 0 ? "danger" : "success";
        return status;
    }, [selectedReservasiDate, locale]);
    const timeStatus = useMemo(() => selectedTime !== "" ? "success" : "nonActive", [selectedTime]);
    const konsultanStatus = useMemo(() => selectedKonsultan !== "" ? "success" : "nonActive", [selectedKonsultan]);
    const konsumenStatus = useMemo(() => getInputStyle(konsumenValue), [konsumenValue]);
    const linkStatus = useMemo(() => (linkValue === "" ? "nonActive" : "success"), [linkValue]);
    const topicStatus = useMemo(() => topicValue.length > 0 ? "success" : "nonActive", [topicValue]);
    const descriptionStatus = useMemo(() => getInputStyle(descriptionValue), [descriptionValue]);

    const isButtonDisabled = useMemo(() => {
        return (
            methodStatus === "nonActive" || methodStatus === "danger" ||
            topicStatus === "nonActive" || topicStatus === "danger" ||
            reservasiDateStatus === "nonActive" || reservasiDateStatus === "danger" ||
            timeStatus === "nonActive" || timeStatus === "danger" ||
            konsumenStatus === "nonActive" || konsumenStatus === "danger" ||
            konsultanStatus === "nonActive" || konsultanStatus === "danger" ||
            linkStatus === "nonActive" || linkStatus === "danger" ||
            descriptionStatus === "danger" // Include description status
        );
    }, [methodStatus, topicStatus, reservasiDateStatus, timeStatus, konsumenStatus, konsultanStatus, linkStatus, descriptionStatus]);

    // Filter konsultanUsers based on the topicValue
    const filteredKonsultanUsers = useMemo(() => {
        if (topicValue.length === 0) return user.filter(u => u.role === "Konsultan");
        return user.filter(u =>
            u.role === "Konsultan" &&
            u.field.some(field => topicValue.includes(field))
        );
    }, [topicValue]);

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
                <Select
                    label="Konsultan"
                    className="w-full"
                    variant="bordered"
                    selectedKeys={selectedKonsultan ? [selectedKonsultan] : []}
                    onChange={handleSelectChange}
                    isRequired
                    name="konsultan"
                    color={konsultanStatus}
                >
                    {filteredKonsultanUsers.map((k) => (
                        <SelectItem key={k.name} value={k.name}>
                            {k.name}
                        </SelectItem>
                    ))}
                </Select>
                <Input
                    label="Konsumen"
                    variant="bordered"
                    className="w-full"
                    value={konsumenValue}
                    onChange={handleKonsumenChange}
                    color={konsumenStatus}
                    isReadOnly
                />
                <Input
                    label="Topik"
                    variant="bordered"
                    className="w-full"
                    isReadOnly
                    value={topicValue.join(", ")}
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
                <Rate
                    allowHalf
                    value={rateValue}
                    onChange={setRateValue}
                    className="flex justify-center items-center w-full"
                />
            </div>
            <Textarea
                label="Deskripsi Topik"
                variant="bordered"
                //  placeholder="Masukkan deskripsi dari topik lebih lanjut"
                disableAnimation
                classNames={{
                    base: "w-full",
                    input: `resize-y h-[3px]`,
                }}
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
                color={descriptionStatus}
            />
            <Button
                variant='ghost'
                colorScheme='bluePrimary'
                className="font-openSans text-[12px] text-nonActive border-2 hover:bg-bluePrimary hover:text-white"
                style={{ borderRadius: "20px", width: '120px' }}
                onClick={handleButtonClick}
                isDisabled={isButtonDisabled}
            >
                Perbaharui
            </Button>
        </div>
    );
};

export default AdminModalTabelReservasi;
