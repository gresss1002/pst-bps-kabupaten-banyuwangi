/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { DatePicker, Input } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import axios from 'axios';
import formatDate from "../../../utils/formatedDate";
import convertToISODate from "../../../utils/convertToISODate";

const UserModalNotifikasi = ({ reservasi }) => {
    const [detailReservasiData, setDetailReservasiData] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [konsultanValue, setKonsultanValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    let { locale } = useLocale();

    useEffect(() => {
        if (reservasi) {
            setDetailReservasiData(reservasi);

            console.log("Reservasi data: ", reservasi);
            console.log("Selected date: ", reservasi.reservasiDate);
        }
    }, [reservasi]);

    useEffect(() => {
        if (!reservasi?.idKonsultan) return;
        
        const fetchConsultantDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://backend-pst.vercel.app/users/konsultan');
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

    // Validation and status logic
    const methodStatus = useMemo(() => detailReservasiData.method ? "success" : "nonActive", [detailReservasiData.method]);
    const topicStatus = useMemo(() => detailReservasiData.topic && detailReservasiData.topic.length > 0 ? "success" : "nonActive", [detailReservasiData.topic]);
    const konsultanStatus = useMemo(() => konsultanValue ? "success" : "nonActive", [konsultanValue]);
    const dateStatus = useMemo(() => selectedDate ? "success" : "nonActive", [selectedDate]);
    const timeStatus = useMemo(() => detailReservasiData.time ? "success" : "nonActive", [detailReservasiData.time]);
    const queueStatus = useMemo(() => detailReservasiData.queue ? "success" : "nonActive", [detailReservasiData.queue]);
    const linkStatus = useMemo(() => detailReservasiData.link ? "success" : "nonActive", [detailReservasiData.link]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
            <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
                <DatePicker
                    label="Tanggal Konsultasi"
                    variant="bordered"
                    value={selectedDate}
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
                    label="Konsultan"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={konsultanValue || ""}
                    color={konsultanStatus}
                />
                <Input
                    label="Topik"
                    variant="bordered"
                    isReadOnly
                    className="w-full"
                    value={detailReservasiData.topic ? detailReservasiData.topic.join(', ') : ""}
                    color={topicStatus}
                />
                {/* <Input
                    type="number"
                    label="Nomor Antrian"
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
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}

export default UserModalNotifikasi;
