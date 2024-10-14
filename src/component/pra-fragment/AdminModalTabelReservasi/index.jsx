import React, { useState, useMemo, useEffect } from "react";
import { DatePicker, Input, Select, SelectItem, Textarea, useDisclosure } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { Rate } from "antd";
import axios from "axios";
import formatDate from "../../../utils/formatedDate";
import convertToISODate from "../../../utils/convertToISODate";
import "./styles.css";
import { method, time } from "../../../data";
import { Button } from "@chakra-ui/react";


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
    const [konsultanUsers, setKonsultanUsers] = useState([]);
    const [konsumenValue, setKonsumenValue] = useState("");
    const [linkValue, setLinkValue] = useState("");
    const [topicValue, setTopicValue] = useState([]);
    const [descriptionValue, setDescriptionValue] = useState("");
    const [rateValue, setRateValue] = useState(0);
    const [currentStatus, setCurrentStatus] = useState("");
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const { onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [genderValue, setGenderValue] = useState("");
    const [userValue, setUserValue] = useState("");
    const [isRatingDisabled, setIsRatingDisabled] = useState(false);
    const isReadOnly = currentStatus !== "Menunggu Konfirmasi";

    const idKonsumen = reservasi ? reservasi.idKonsumen : "";

    // Fetch consumer details
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

    // Fetch konsultan users
    useEffect(() => {
        const fetchKonsultanUsers = async () => {
            try {
                const response = await axios.get('https://backend-pst.vercel.app/users/konsultan');
                const allKonsultanUsers = response.data;

                // Filter consultants based on selected topics
                const filteredKonsultanUsers = allKonsultanUsers.filter(konsultan => {
                    if (!topicValue.length) return true; // If no topics are selected, show all consultants
                    return topicValue.every(topic => konsultan.topics.includes(topic));
                });

                setKonsultanUsers(filteredKonsultanUsers);
            } catch (error) {
                setError('Error fetching konsultan data');
            }
        };

        fetchKonsultanUsers();
    }, [topicValue]); // Run the effect whenever selected topics change


    // Update selectedKonsultan name based on reservasi and konsultanUsers
    useEffect(() => {
        if (reservasi && konsultanUsers.length > 0) {
            const selectedKonsultanUser = konsultanUsers.find(k => k._id === reservasi.idKonsultan);
            if (selectedKonsultanUser) {
                setSelectedKonsultan(selectedKonsultanUser._id); // Use ID here
            } else {
                console.error("Selected Konsultan not found in the konsultanUsers list.");
            }
        }
    }, [reservasi, konsultanUsers]);


    // Fetch and set rating value and status
    useEffect(() => {
        const fetchRatingId = async () => {
            try {
                const response = await axios.get(`https://backend-pst.vercel.app/rating?idReservasi=${reservasi._id}`);
                const ratings = response.data;
                if (Array.isArray(ratings) && ratings.length > 0) {
                    const rating = ratings.find(r => r.idReservasi === reservasi._id);
                    if (rating) {
                        setRateValue(rating.score);
                        setIsRatingDisabled(reservasi.status !== "Menunggu Konfirmasi" && rating.score > 0);
                    } else {
                        setRateValue(0);
                        setIsRatingDisabled(reservasi.status !== "Menunggu Konfirmasi");
                    }
                } else {
                    setRateValue(0);
                    setIsRatingDisabled(reservasi.status !== "Menunggu Konfirmasi");
                }
            } catch (error) {
                console.error('Error fetching rating ID:', error);
                setMessage('Gagal mendapatkan ID rating');
                setMessageType('error');
            }
        };

        fetchRatingId();
    }, [reservasi]);

    // Initialize form values
    useEffect(() => {
        if (reservasi) {
            setEditReservasiData(reservasi);
            setSelectedMethod(reservasi.method);
            const formattedDate = formatDate(reservasi.reservasiDate) || '';
            const isoDate = convertToISODate(formattedDate);
            setSelectedReservasiDate(parseDate(isoDate));
            setSelectedTime(reservasi.time);
            setLinkValue(reservasi.link || "");
            setTopicValue(reservasi.topic || []);
            setDescriptionValue(reservasi.descriptionReservasi || "");
            setGenderValue(reservasi.genderKonsumen || "");
            setCurrentStatus(reservasi.status || "");
            setSelectedKonsultan(reservasi.nameKonsultan || "");
        }
    }, [reservasi]);

    const handleChange = (setter) => (e) => setter(e.target.value);
    const handleSelectChange = (value, key) => {
        if (key === "time") setSelectedTime(value);
        if (key === "method") setSelectedMethod(value);
        if (key === "konsultan") setSelectedKonsultan(value);
    };

    const handleButtonClick = async () => {
        const formattedDate = selectedReservasiDate ? formatDate(selectedReservasiDate) : '';
        const isoDate = convertToISODate(formattedDate);

        const data = {
            method: selectedMethod,
            topic: topicValue,
            reservasiDate: isoDate,
            time: selectedTime,
            user: userValue,
            link: linkValue,
            descriptionReservasi: descriptionValue,
            status: currentStatus,
            gender: genderValue,
            konsultan: selectedKonsultan
        };

        try {
            const response = await axios.get(`https://backend-pst.vercel.app/reservasi/${reservasi._id}`);
            if (response.status === 200) {
                const currentReservation = response.data;
                const linkChanged = linkValue !== currentReservation.link;
                const otherChanges =
                    selectedMethod !== currentReservation.method ||
                    selectedReservasiDate?.toString() !== currentReservation.reservasiDate?.toString() ||
                    selectedTime !== currentReservation.time ||
                    topicValue !== currentReservation.topic ||
                    descriptionValue !== currentReservation.descriptionReservasi ||
                    genderValue !== currentReservation.gender;
                selectedKonsultan !== currentReservation.konsultan;

                const newStatus = linkChanged && !otherChanges ? "Disetujui" : "Disetujui Admin";

                try {
                    const updateResponse = await axios.put(`https://backend-pst.vercel.app/reservasi/${reservasi._id}`, { ...data, status: newStatus });
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

    const { locale } = useLocale();
    const isDateUnavailable = (date) => isWeekend(date, locale);

    const methodStatus = useMemo(() => selectedMethod ? "success" : "nonActive", [selectedMethod]);
    const topicStatus = useMemo(() => topicValue.length ? "success" : "nonActive", [topicValue]);
    const konsultanStatus = useMemo(() => selectedKonsultan ? "success" : "nonActive", [selectedKonsultan]);
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

    const isButtonDisabled = useMemo(() => {

        const allReadOnly = isRatingDisabled;

        return (
            allReadOnly ||
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
        );

    }, [methodStatus, topicStatus, reservasiDateStatus, timeStatus, userStatus, descriptionStatus, genderStatus, linkStatus, isRatingDisabled]);

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
                    onChange={(date) => setSelectedReservasiDate(date)}
                    isDateUnavailable={isDateUnavailable}
                    errorMessage="Minimal 2 hari kerja dari hari ini"
                    color={reservasiDateStatus}
                />
                <Select
                    label="Waktu"
                    className="w-full"
                    variant="bordered"
                    selectedKeys={[selectedTime]}
                    onChange={(value) => handleSelectChange(value, "time")}
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
                    onChange={(value) => handleSelectChange(value, "method")}
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
                    selectedKeys={[selectedKonsultan]}
                    value={selectedKonsultan} // Gunakan ID konsultan sebagai nilai
                    onChange={(value) => handleSelectChange(value, "konsultan")}
                    color={konsultanStatus}
                >
                    {konsultanUsers.map((user) => (
                        <SelectItem key={user._id} value={user._id}>
                            {user.name}
                        </SelectItem>
                    ))}
                </Select>


                <Input
                    label="Jenis Kelamin Konsumen"
                    variant="bordered"
                    className="w-full"
                    value={genderValue}
                    onChange={handleChange(setGenderValue)}
                    color={genderStatus}
                    isReadOnly
                />
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
                    isReadOnly
                    value={topicValue.join(", ")}
                    onChange={handleChange(setTopicValue)}
                    color={topicStatus}
                />
                <Input
                    label="Link"
                    variant="bordered"
                    className="w-full"
                    value={linkValue}
                    onChange={handleChange(setLinkValue)}
                    color={linkStatus}
                    isRequired
                />
                <Rate
                    allowHalf
                    value={rateValue}
                    onChange={setRateValue}
                    className="flex justify-center items-center w-full"
                    disabled
                />
            </div>
            <Textarea
                label="Deskripsi Topik"
                variant="bordered"
                disableAnimation
                disableAutosize
                classNames={{
                    base: "max-h-[80px]",
                }}
                value={descriptionValue}
                onChange={handleChange(setDescriptionValue)}
                color={descriptionStatus}
                isReadOnly
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
            {message && (
                <div className={`text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default AdminModalTabelReservasi;
