import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { gender, method, time } from "../../../data";
import convertToISODate from "../../../utils/convertToISODate";
import formatDate from "../../../utils/formatedDate";
import axios from 'axios';

// Input style helper
const getInputStyle = (value) => {
    if (value === "") return "nonActive";
    if (/^[a-zA-Z0-9\s;:.,-]+$/.test(value)) return "success";
    return "danger";
};

const KonsultanModalTabelReservasi = ({ reservasi }) => {
    // State hooks
    const [editReservasiData, setEditReservasiData] = useState({});
    const [selectedMethod, setSelectedMethod] = useState("");
    const [selectedReservasiDate, setSelectedReservasiDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [userValue, setUserValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [topicValue, setTopicValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [genderValue, setGenderValue] = useState("");
    const [currentStatus, setCurrentStatus] = useState("");
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const { onClose } = useDisclosure();
    const [rateValue, setRateValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Store initial values
    const initialData = useMemo(() => ({
        method: reservasi?.method || '',
        reservasiDate: reservasi?.reservasiDate || '',
        time: reservasi?.time || '',
        user: reservasi?.user || '',
        link: reservasi?.link || '',
        topic: reservasi?.topic || '',
        descriptionReservasi: reservasi?.descriptionReservasi || '',
        gender: reservasi?.gender || '',
    }), [reservasi]);

    const idKonsumen = reservasi ? reservasi.idKonsumen : "";

    useEffect(() => {
        const fetchConsumerDetails = async () => {
            if (!idKonsumen) return;
            setLoading(true);
            try {
                const response = await axios.get('https://backend-pst.vercel.app/users/konsumen');
                const konsumenUsers = response.data;
                const consumer = konsumenUsers.find(user => user._id.toString() === idKonsumen);

                if (consumer) {
                    setUserValue(consumer.name);
                    setGenderValue(consumer.gender);
                } else {
                    setError('User not found or not a Konsumen');
                }
            } catch {
                setError('Error fetching consumer data');
            }
            setLoading(false);
        };

        fetchConsumerDetails();
    }, [idKonsumen]);

    useEffect(() => {
        if (reservasi) {
            setEditReservasiData(reservasi);
            setSelectedMethod(reservasi.method);
            const formattedDate = formatDate(reservasi.reservasiDate) || '';
            const isoDate = convertToISODate(formattedDate);
            setSelectedReservasiDate(parseDate(isoDate));
            setSelectedTime(reservasi.time);
            setLinkValue(reservasi.link || "");
            setTopicValue(reservasi.topic || "");
            setDescriptionValue(reservasi.descriptionReservasi || "");
            setGenderValue(reservasi.genderKonsumen || "");
            setRateValue(reservasi.rating || 0);
            setCurrentStatus(reservasi.status || 'Menunggu Konfirmasi');
        }
    }, [reservasi]);

    const handleChange = (setter) => (e) => setter(e.target.value);

    // Check what fields have changed
    // const determineStatus = () => {
    //     // Check if only the link field has changed
    //     const linkChanged = linkValue !== initialData.link;
    //     const otherChanges =
    //         selectedMethod !== initialData.method ||
    //         selectedReservasiDate?.toString() !== initialData.reservasiDate?.toString() ||
    //         selectedTime !== initialData.time ||
    //         topicValue !== initialData.topic ||
    //         descriptionValue !== initialData.descriptionReservasi ||
    //         genderValue !== initialData.gender;
    
    //     // If only the link field has changed, set status to "Disetujui"
    //     if (linkChanged && !otherChanges) {
    //         return "Disetujui";
    //     }
    
    //     // If there are any other changes, set status to "Disetujui Konsultan"
    //     return "Disetujui Konsultan";
    // };
    
    const handleButtonClick = async () => {
        const sanitizedDescription = descriptionValue.replace(/'/g, "\\'");
        const formattedDate = selectedReservasiDate ? formatDate(selectedReservasiDate) : '';
        const isoDate = convertToISODate(formattedDate);
    
        try {
            // Fetch the current reservation data
            const response = await axios.get(`https://backend-pst.vercel.app/reservasi/${reservasi._id}`);
            if (response.status === 200) {
                const currentReservation = response.data;
    
                // Check if only the link field has changed
                const linkChanged = linkValue !== currentReservation.link;
                const otherChanges = 
                    selectedMethod !== currentReservation.method ||
                    selectedReservasiDate?.toString() !== currentReservation.reservasiDate?.toString() ||
                    selectedTime !== currentReservation.time ||
                    topicValue !== currentReservation.topic ||
                    descriptionValue !== currentReservation.descriptionReservasi ||
                    genderValue !== currentReservation.gender;
    
                // Determine the new status
                const newStatus = linkChanged && !otherChanges ? "Disetujui" : "Disetujui Konsultan";
    
                const data = {
                    method: selectedMethod,
                    topic: topicValue,
                    reservasiDate: isoDate,
                    time: selectedTime,
                    user: userValue,
                    link: linkValue,
                    descriptionReservasi: sanitizedDescription,
                    rating: rateValue,
                    status: newStatus, // Set the status based on the change
                    gender: genderValue
                };
    
                // Update the reservation
                try {
                    const updateResponse = await axios.put(`https://backend-pst.vercel.app/reservasi/${reservasi._id}`, data);
                    if (updateResponse.status === 200) {
                        setMessage('Reservasi berhasil diperbaharui');
                        setMessageType('success');
                        onClose(); // Close the modal after successful update
                    } else {
                        const errorDetails = await updateResponse.text();
                        throw new Error(`HTTP error! Status: ${updateResponse.status}, Details: ${errorDetails}`);
                    }
                } catch (error) {
                    setMessage('Reservasi gagal diperbaharui');
                    setMessageType('error');
                }
            } else {
                throw new Error('Error fetching current reservation data');
            }
        } catch (error) {
            setMessage('Error fetching current reservation data');
            setMessageType('error');
        }
    };
    
    
    
    // Locale and date validation
    const { locale } = useLocale();
    const isDateUnavailable = (date) => isWeekend(date, locale);

    // Status checks for form inputs
    const methodStatus = useMemo(() => selectedMethod ? "success" : "nonActive", [selectedMethod]);
    const topicStatus = useMemo(() => topicValue ? "success" : "nonActive", [topicValue]);
    const reservasiDateStatus = useMemo(() => {
        if (!selectedReservasiDate) return "nonActive";
        const currentDate = today(getLocalTimeZone());
        return isDateUnavailable(selectedReservasiDate) || selectedReservasiDate.compare(currentDate.add({ days: 2 })) < 0 ? "danger" : "success";
    }, [selectedReservasiDate, locale]);
    const timeStatus = useMemo(() => selectedTime ? "success" : "nonActive", [selectedTime]);
    const userStatus = useMemo(() => getInputStyle(userValue), [userValue]);
    const linkStatus = useMemo(() => linkValue ? "success" : "nonActive", [linkValue]);
    const descriptionStatus = useMemo(() => getInputStyle(descriptionValue), [descriptionValue]);
    const genderStatus = useMemo(() => genderValue ? "success" : "nonActive", [genderValue]);

    const isButtonDisabled = useMemo(() => (
        methodStatus === "nonActive" ||
        topicStatus === "nonActive" ||
        reservasiDateStatus === "nonActive" ||
        timeStatus === "nonActive" ||
        userStatus === "nonActive" ||
        genderStatus === "nonActive" ||
        linkStatus === "nonActive" ||
        methodStatus === "danger" ||
        topicStatus === "danger" ||
        reservasiDateStatus === "danger" ||
        timeStatus === "danger" ||
        userStatus === "danger" ||
        descriptionStatus === "danger" ||
        genderStatus === "danger" ||
        linkStatus === "danger"
    ), [methodStatus, topicStatus, reservasiDateStatus, timeStatus, userStatus, descriptionStatus, currentStatus, genderStatus, linkStatus]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
            <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
                <DatePicker
                    label="Tanggal Konsultasi"
                    variant="bordered"
                    value={selectedReservasiDate}
                    minValue={today(getLocalTimeZone())}
                    isRequired
                    className="w-full"
                    onChange={setSelectedReservasiDate}
                    isDateUnavailable={isDateUnavailable}
                    errorMessage="Minimal pada hari ini saat hari kerja"
                    color={reservasiDateStatus}
                />
                <Select
                    label="Waktu"
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[selectedTime]}
                    onChange={handleChange(setSelectedTime)}
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
                    selectedKeys={[selectedMethod]}
                    onChange={handleChange(setSelectedMethod)}
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
                    onChange={handleChange(setUserValue)}
                    color={userStatus}
                    isReadOnly
                />
                <Input
                    label="Topik"
                    variant="bordered"
                    className="w-full"
                    value={topicValue}
                    onChange={handleChange(setTopicValue)}
                    color={topicStatus}
                />
                <Input
                    label="Jenis Kelamin Konsumen"
                    variant="bordered"
                    className="w-full"
                    value={genderValue}
                    onChange={handleChange(setGenderValue)}
                    color={genderStatus}
                    isReadOnly
                />
                <Textarea
                    label="Deskripsi"
                    value={descriptionValue}
                    onChange={handleChange(setDescriptionValue)}
                    variant="bordered"
                    color={descriptionStatus}
                    className="w-full"
                    isReadOnly
                />
                <Input
                    label="Link"
                    variant="bordered"
                    className="w-full"
                    value={linkValue} // This should be set from the state
                    onChange={handleChange(setLinkValue)} // This should update the state
                    color={linkStatus}
                    isRequired
                />
            </div>
            <div className="flex flex-col gap-2 mx-[12%] justify-center items-center">
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
                {message && (
                    <div className={`text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KonsultanModalTabelReservasi;
