/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import axios from 'axios';
import { DatePicker, Input } from "@nextui-org/react";
import { today, isWeekend, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

const KonsultanModalNotifikasi = ({ reservasi }) => {
    const [detailReservasiData, setDetailReservasiData] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    const [userValue, setUserValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (reservasi) {
            setDetailReservasiData(reservasi);
            setSelectedDate(reservasi.date);
            console.log("Reservasi data: ", reservasi);
            console.log("Selected date: ", reservasi.date);
        }
    }, [reservasi]);

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

    let { locale } = useLocale();

    let isDateUnavailable = (date) => isWeekend(date, locale);

    // Validation and status logic
    const metodeStatus = useMemo(() => detailReservasiData.method ? "success" : "nonActive", [detailReservasiData.method]);
    const topicStatus = useMemo(() => detailReservasiData.topic ? "success" : "nonActive", [detailReservasiData.topic]);
    const userStatus = useMemo(() => userValue ? "success" : "nonActive", [userValue]);
    const dateStatus = useMemo(() => selectedDate ? "success" : "nonActive", [selectedDate]);
    const timeStatus = useMemo(() => detailReservasiData.time ? "success" : "nonActive", [detailReservasiData.time]);
    const queueStatus = useMemo(() => detailReservasiData.queue ? "success" : "nonActive", [detailReservasiData.queue]);
    const linkStatus = useMemo(() => detailReservasiData.link ? "success" : "nonActive", [detailReservasiData.link]);

    // Ensure selectedDate is in ISO format for parseDate
    const formattedDate = selectedDate ? new Date(selectedDate).toISOString() : undefined;

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
                <DatePicker
                    label="Tanggal Konsultasi"
                    variant="bordered"
                    value={formattedDate ? parseDate(formattedDate) : undefined}
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
                    color={metodeStatus}
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
                    label="Topic"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={detailReservasiData.topic || ""}
                    color={topicStatus}
                />
                {/* <Input
                    type="number"
                    label="Nomor Queuean"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={detailReservasiData.queue || 0}
                    color={queueStatus}
                /> */}
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
}

export default KonsultanModalNotifikasi;
