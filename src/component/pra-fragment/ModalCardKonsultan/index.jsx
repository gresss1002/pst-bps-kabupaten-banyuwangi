import { Button, Card, CardBody, Stack } from "@chakra-ui/react";
import { DatePicker, Select, Input, SelectItem, Textarea } from "@nextui-org/react";
import { today, isWeekend, getLocalTimeZone } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { useState, useMemo, useEffect } from "react";
import { method, time } from "../../../data";

const ModalCardKonsultan = ({ konsultan }) => {
    const [addReservasiData, setAddReservasiData] = useState({});
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [selectedKonsultan, setSelectedKonsultan] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');

    useEffect(() => {
        if (konsultan) {
            setSelectedKonsultan(konsultan.name);
            if (konsultan.field && konsultan.field.length > 0) {
                setSelectedTopic(''); // Defaults to empty string if no selection made
            }
        }
    }, [konsultan]);

    useEffect(() => {
        console.log("Add reservasi data after update: ", addReservasiData);
    }, [addReservasiData]);

    const handleSelectChange = (value, name) => {
        if (name === "method") setSelectedMethod(value);
        if (name === "topic") setSelectedTopic(value);
        if (name === "date") setSelectedDate(new Date(value));
        if (name === "time") setSelectedTime(value);
    };

    const handleButtonClick = () => {
        const data = {
            method: selectedMethod,
            topic: selectedTopic,
            konsultan: selectedKonsultan,
            reservasiDate: selectedDate,
            time: selectedTime,
            description: descriptionValue,
        };
        setAddReservasiData(data);
    };

    let { locale } = useLocale();

    const isDateUnavailable = (date) => isWeekend(date, locale);

    const methodStatus = useMemo(() => {
        return selectedMethod === "" ? "nonActive" : "success";
    }, [selectedMethod]);

    const topicStatus = useMemo(() => {
        return selectedTopic === "" ? "nonActive" : "success";
    }, [selectedTopic]);

    const konsultanStatus = useMemo(() => {
        return selectedKonsultan === "" ? "nonActive" : "success";
    }, [selectedKonsultan]);

    const dateStatus = useMemo(() => {
        return selectedDate === null ? "nonActive" : "success";
    }, [selectedDate]);

    const timeStatus = useMemo(() => {
        return selectedTime === "" ? "nonActive" : "success";
    }, [selectedTime]);

    const descriptionStatus = useMemo(() => {
        return descriptionValue === "" ? "nonActive" : "success";
    }, [descriptionValue]);

    const isButtonDisabled = useMemo(() => {
        return (
            methodStatus === "nonActive" || methodStatus === "danger" ||
            topicStatus === "nonActive" || topicStatus === "danger" ||
            dateStatus === "nonActive" || dateStatus === "danger" ||
            timeStatus === "nonActive" || timeStatus === "danger" ||
            // konsumenStatus === "nonActive" || konsumenStatus === "danger" ||
            konsultanStatus === "nonActive" || konsultanStatus === "danger" ||
            // linkStatus === "nonActive" || linkStatus === "danger" ||
            descriptionStatus === "danger" // Include description status
        );
    }, [methodStatus, topicStatus, timeStatus, konsultanStatus, descriptionStatus]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
            <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
                <DatePicker
                    label="Tanggal Konsultasi"
                    variant="bordered"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minValue={today(getLocalTimeZone()).add({ days: 2 })}
                    errorMessage="Minimal 2 hari kerja dari hari ini"
                    isRequired
                    className="w-full"
                    isDateUnavailable={isDateUnavailable}
                    color={dateStatus}
                />
                <Select
                    label="Waktu"
                    className="w-full"
                    variant="bordered"
                    value={selectedTime}
                    onChange={(value) => handleSelectChange(value, "time")}
                    name="time"
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
                    value={selectedMethod}
                    onChange={(value) => handleSelectChange(value, "method")}
                    name="method"
                    isRequired
                    color={methodStatus}
                >
                    {method.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                            {m.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Topik"
                    className="w-full"
                    variant="bordered"
                    value={selectedTopic}
                    selectionMode="multiple"
                    onChange={(value) => handleSelectChange(value, "topic")}
                    name="topic"
                    isRequired
                    color={topicStatus}
                >
                    {konsultan.field && konsultan.field.map((t, index) => (
                        <SelectItem key={index} value={t}>
                            {t}
                        </SelectItem>
                    ))}
                </Select>
                
                <Input
                    label="Konsultan"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={selectedKonsultan}
                    color={konsultanStatus}
                />
                <Textarea
                    label="Deskripsi Topik"
                    variant="bordered"
                    // placeholder="Masukkan deskripsi dari topik lebih lanjut"
                    disableAnimation
                    classNames={{
                        base: "w-full",
                        input: "resize-y h-[10px]",
                    }}
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    color={descriptionStatus}
                />
            </div>
            <Button
                variant='ghost'
                colorScheme='bluePrimary'
                className="font-openSans text-[12px] text-nonActive border-2 hover:bg-bluePrimary hover:text-white"
                style={{ borderRadius: "20px", width: '100px' }}
                onClick={handleButtonClick}
                isDisabled={isButtonDisabled}
            >
                Ajukan
            </Button>
        </div>
    );
}

export default ModalCardKonsultan;
