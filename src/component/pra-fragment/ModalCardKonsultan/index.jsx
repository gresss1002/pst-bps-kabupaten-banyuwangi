import React, { useState, useMemo, useEffect } from "react";
import { Button, Stack, useDisclosure } from "@chakra-ui/react";
import { DatePicker, Select, Input, SelectItem, Textarea } from "@nextui-org/react";
import { today, isWeekend, getLocalTimeZone } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { method, time } from "../../../data";
import formatDate from "../../../utils/formatedDate";
import convertToISODate from "../../../utils/convertToISODate";

const getInputStyle = (value) => {
    if (value === "") return "nonActive";
    if (/^[a-zA-Z0-9\s;:.,-]+$/.test(value)) return "success"; // Allow letters, numbers, and spaces
    return "danger"; // Changed from "nonActive" to "danger" if not valid
};


const ModalCardKonsultan = ({ konsultan, idKonsultan, idKonsumen }) => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [selectedKonsultan, setSelectedKonsultan] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // New state for message type
    const { onClose } = useDisclosure(); // For closing the modal

    useEffect(() => {
        if (konsultan) {
            setSelectedKonsultan(konsultan.name);
            if (konsultan.field && konsultan.field.length > 0) {
                setSelectedTopic([]); // Defaults to empty array if no selection made
            }
        }
    }, [konsultan]);

    const handleSelectChange = (value, name) => {
        console.log("Selected value:", value, "for name:", name);
        if (name === "method") setSelectedMethod(value);
        if (name === "topic") setSelectedTopic(value);
        if (name === "time") setSelectedTime(value);
    };


    const handleButtonClick = async () => {
        const formattedDate = selectedDate ? formatDate(selectedDate) : '';
        const isoDate = convertToISODate(formattedDate);
    
        const data = {
            method: selectedMethod,
            topic: selectedTopic,
            idKonsultan: idKonsultan, 
            idKonsumen: idKonsumen,
            reservasiDate: isoDate,
            time: selectedTime,
            descriptionReservasi: descriptionValue, // Deskripsi dikirim di sini
        };
    
        console.log("Add reservasiData:", data); // Pastikan deskripsi ada di sini
    
        try {
            const response = await fetch('https://backend-pst.vercel.app/reservasi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
            }
    
            const result = await response.json();
            console.log('Reservation added successfully:', result);
            setMessage('Reservasi pengajuan berhasil ditambahkan');
            setMessageType('success'); // Set message type to success
            onClose();
            
        } catch (error) {
            console.error('Error adding reservation:', error);
            setMessage('Reservasi pengajuan gagal dibuat');
            setMessageType('error'); // Set message type to error
        }
    };
    
    
    
    let { locale } = useLocale();

    const isDateUnavailable = (date) => isWeekend(date, locale);

    const methodStatus = useMemo(() => selectedMethod === "" ? "nonActive" : "success", [selectedMethod]);
    const topicStatus = useMemo(() => selectedTopic.length === 0 ? "nonActive" : "success", [selectedTopic]);
    const konsultanStatus = useMemo(() => selectedKonsultan === "" ? "nonActive" : "success", [selectedKonsultan]);
    const dateStatus = useMemo(() => selectedDate === null ? "nonActive" : "success", [selectedDate]);
    const timeStatus = useMemo(() => selectedTime === "" ? "nonActive" : "success", [selectedTime]);
    const descriptionStatus = useMemo(() => getInputStyle(descriptionValue), [descriptionValue]);

    const isButtonDisabled = useMemo(() => {
        return (
            methodStatus === "nonActive" || methodStatus === "danger" ||
            topicStatus === "nonActive" || topicStatus === "danger" ||
            dateStatus === "nonActive" || dateStatus === "danger" ||
            timeStatus === "nonActive" || timeStatus === "danger" ||
            konsultanStatus === "nonActive" || konsultanStatus === "danger" ||
            descriptionStatus === "danger" // Include description status
        );
    }, [methodStatus, topicStatus, dateStatus, timeStatus, konsultanStatus, descriptionStatus]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
            <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
                <DatePicker
                    label="Tanggal Konsultasi"
                    variant="bordered"
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minValue={today(getLocalTimeZone())}
                    errorMessage="Minimal pada hari ini saat hari kerja"
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
                    onChange={(e) => handleSelectChange(e.target.value, "time")}
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
                    onChange={(e) => handleSelectChange(e.target.value, "method")}
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
                    onChange={(e) => handleSelectChange(e.target.value, "topic")}
                    name="topic"
                    isRequired
                    color={topicStatus}
                >
                    {konsultan.field && konsultan.field.map((t, index) => (
                        <SelectItem key={t} value={index}>
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
                    disableAnimation
                    classNames={{
                        base: "w-full",
                        input: "resize-y h-[60px]",
                    }}
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    color={descriptionStatus}
                />
            </div>
            <div className="flex flex-col gap-2 mx-[12%] justify-center items-center">
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
            {message && (
                <div className={`text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    <p>{message}</p>
                </div>
            )}
            </div>
            
        </div>
    );
}

export default ModalCardKonsultan;
