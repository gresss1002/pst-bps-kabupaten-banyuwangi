/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardBody, Stack } from "@chakra-ui/react";
import { DatePicker, Input } from "@nextui-org/react";
import { today, isWeekend, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

const KonsultanModalNotifikasi = ({ reservasi }) => {
    const [detailReservasiData, setDetailReservasiData] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    // const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        if (reservasi) {
            setDetailReservasiData(reservasi);
            setSelectedDate(reservasi.date);
            // setSelectedTime(reservasi.time);
            console.log("Reservasi data: ", reservasi);
            console.log("Selected date: ", reservasi.date);
            // console.log("Selected time: ", reservasi.time);
        }
    }, [reservasi]);

    let { locale } = useLocale();

    let isDateUnavailable = (date) => isWeekend(date, locale);

     // Validation and status logic
     const metodeStatus = useMemo(() => {
        return detailReservasiData.metode !== "" ? "success" : "nonActive";
    }, [detailReservasiData.metode]);

    const topicStatus = useMemo(() => {
        return detailReservasiData.topic !== "" ? "success" : "nonActive";
    }, [detailReservasiData.topic]);

    const userStatus = useMemo(() => {
        return detailReservasiData.user !== "" ? "success" : "nonActive";
    }, [detailReservasiData.user]);

    const dateStatus = useMemo(() => {
        return selectedDate !== null ? "success" : "nonActive";
    }, [selectedDate]);

    const timeStatus = useMemo(() => {
        return detailReservasiData.time !== "" ? "success" : "nonActive";
    }, [detailReservasiData.time]);

    const queueStatus = useMemo(() => {
        return detailReservasiData.queue !== "" ? "success" : "nonActive";
    }, [detailReservasiData.queue]);

    const linkStatus = useMemo(() => {
        return detailReservasiData.link !== "" ? "success" : "nonActive";
    }, [detailReservasiData.link]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
            {/* <Card className="" style={{ border: "1px solid #f0f0f0", borderRadius: "20px", width: "100%" }}>
                <CardBody>
                    <Stack> */}
                        <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
                            <DatePicker
                                label="Tanggal Konsultasi"
                                variant="bordered"
                                value={selectedDate ? parseDate(selectedDate) : undefined}
                                minValue={today(getLocalTimeZone()).add({ days: 2 })}
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
                                value={detailReservasiData.metode || ""}
                                color={metodeStatus}
                            />
                            <Input
                                label="Konsumen"
                                variant="bordered"
                                isReadOnly
                                className="w-full"
                                value={detailReservasiData.user || ""}
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
                            <Input
                                type="number"
                                label="Nomor Queuean"
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
                    {/* </Stack>
                </CardBody>
            </Card> */}
        </div>
    );
}

export default KonsultanModalNotifikasi;