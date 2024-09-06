/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardBody, Stack } from "@chakra-ui/react";
import { DatePicker, Input } from "@nextui-org/react";
import { today, isWeekend, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

const UserModalNotifikasi = ({ reservasi }) => {
    const [detailReservasiData, setDetailReservasiData] = useState({});
    const [selectedReservasiDate, setSelectedReservasiDate] = useState("");
    // const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        if (reservasi) {
            setDetailReservasiData(reservasi);
            setSelectedReservasiDate(reservasi.reservasiDate);
            // setSelectedTime(reservasi.time);
            console.log("Reservasi data: ", reservasi);
            console.log("Selected date: ", reservasi.reservasiDate);
            // console.log("Selected time: ", reservasi.time);
        }
    }, [reservasi]);

    let { locale } = useLocale();

    let isDateUnavailable = (date) => isWeekend(date, locale);

     // Validation and status logic
     const methodStatus = useMemo(() => {
        return detailReservasiData.method !== "" ? "success" : "nonActive";
    }, [detailReservasiData.method]);

    const topicStatus = useMemo(() => {
        return detailReservasiData.topic !== "" ? "success" : "nonActive";
    }, [detailReservasiData.topic]);

    const konsultanStatus = useMemo(() => {
        return detailReservasiData.konsultan !== "" ? "success" : "nonActive";
    }, [detailReservasiData.konsultan]);

    const dateStatus = useMemo(() => {
        return selectedReservasiDate !== null ? "success" : "nonActive";
    }, [selectedReservasiDate]);

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
                                value={selectedReservasiDate ? parseDate(selectedReservasiDate) : undefined}
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
                                value={detailReservasiData.method || ""}
                                color={methodStatus}
                            />
                            <Input
                                label="Konsultan"
                                variant="bordered"
                                isReadOnly
                                className="w-full"
                                value={detailReservasiData.konsultan || ""}
                                color={konsultanStatus}
                            />
                            <Input
                                label="Topik"
                                variant="bordered"
                                isReadOnly
                                className="w-full"
                                value={detailReservasiData.topic || []}
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
                    {/* </Stack>
                </CardBody>
            </Card> */}
        </div>
    );
}

export default UserModalNotifikasi;