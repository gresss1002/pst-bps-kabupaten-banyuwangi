import React, { useState, useEffect, useMemo } from "react";
import { Input, DatePicker } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import axios from "axios";
import convertToISODate from "../../../utils/convertToISODate";
import formatDate from "../../../utils/formatedDate";

const AdminModalNotifikasi = ({ reservasi }) => {
    const [detailReservasiData, setDetailReservasiData] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [userValue, setUserValue] = useState("");
    const [genderValue, setGenderValue] = useState("");
    const [konsultanValue, setKonsultanValue] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { locale } = useLocale();

    // Fetch consumer details
    useEffect(() => {
        if (!reservasi?.idKonsumen) return;
        
        const fetchConsumerDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://backend-pst.vercel.app/users/konsumen');
                const konsumenUsers = response.data;
                const consumer = konsumenUsers.find(user => user._id.toString() === reservasi.idKonsumen);
                if (consumer) {
                    setUserValue(consumer.name);
                    setGenderValue(consumer.gender);
                } else {
                    setError('User not found or not a Konsumen');
                }
            } catch (err) {
                setError('Error fetching consumer data');
                console.error('Error fetching consumer data:', err);
            }
            setLoading(false);
        };

        fetchConsumerDetails();
    }, [reservasi?.idKonsumen]);

    // Fetch konsultan details
    useEffect(() => {
        if (!reservasi?.idKonsultan) return;
        
        const fetchConsultantDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://backend-pst.vercel.app/users/konsultan'); // Correct endpoint for consultants
                const konsultanUsers = response.data;
                const consultant = konsultanUsers.find(user => user._id.toString() === reservasi.idKonsultan);
                if (consultant) {
                    setKonsultanValue(consultant.name);
                } else {
                    setError('User not found or not a Konsultan');
                }
            } catch (err) {
                setError('Error fetching consultant data');
                console.error('Error fetching consultant data:', err);
            }
            setLoading(false);
        };

        fetchConsultantDetails();
    }, [reservasi?.idKonsultan]);

    useEffect(() => {
        if (reservasi) {
            setDetailReservasiData(reservasi);
            setSelectedDate(reservasi.date ? parseDate(reservasi.date) : null);
        }
    }, [reservasi]);

    // Validation and status logic
    const methodStatus = useMemo(() => (detailReservasiData.method ? "success" : "nonActive"), [detailReservasiData.method]);
    const topicStatus = useMemo(() => (detailReservasiData.topic ? "success" : "nonActive"), [detailReservasiData.topic]);
    const userStatus = useMemo(() => (userValue ? "success" : "nonActive"), [userValue]);
    const konsultanStatus = useMemo(() => (konsultanValue ? "success" : "nonActive"), [konsultanValue]);
    const dateStatus = useMemo(() => (selectedDate ? "success" : "nonActive"), [selectedDate]);
    const timeStatus = useMemo(() => (detailReservasiData.time ? "success" : "nonActive"), [detailReservasiData.time]);
    const queueStatus = useMemo(() => (detailReservasiData.queue ? "success" : "nonActive"), [detailReservasiData.queue]);
    const linkStatus = useMemo(() => (detailReservasiData.link ? "success" : "nonActive"), [detailReservasiData.link]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
                <DatePicker
                    label="Tanggal Konsultasi"
                    variant="bordered"
                    value={selectedDate ? parseDate(convertToISODate(formatDate(selectedDate))) : undefined}
                    minValue={today(getLocalTimeZone())}
                    isReadOnly
                    errorMessage="Minimal 2 hari kerja dari hari ini"
                    className="w-full"
                    color={dateStatus}
                />
                <Input
                    type="time"
                    label="Jam Konsultasi"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={detailReservasiData.time || ""}
                    color={timeStatus}
                />
                <Input
                    label="Metode"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={detailReservasiData.method || ""}
                    color={methodStatus}
                />
                <Input
                    label="Konsumen"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={userValue || ""}
                    color={userStatus}
                />
                <Input
                    label="Konsultan"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={konsultanValue || ""}
                    color={konsultanStatus}
                />
                <Input
                    label="Topic"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={detailReservasiData.topic || ""}
                    color={topicStatus}
                />
                <Input
                    type="number"
                    label="Nomor Antrian"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={detailReservasiData.queue || 0}
                    color={queueStatus}
                />
                <Input
                    label="Link"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={detailReservasiData.link || ""}
                    color={linkStatus}
                />
            </div>
        </div>
    );
};

export default AdminModalNotifikasi;
