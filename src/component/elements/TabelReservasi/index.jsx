import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Input, Modal, ModalHeader, ModalContent, ModalBody } from "@nextui-org/react";
import { ConfigProvider, Table } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import "./styles.css";
import convertToISODate from "../../../utils/convertToISODate";
import formatDate from "../../../utils/formatedDate";
import { parseDate } from "@internationalized/date";
import dayjs from 'dayjs';

const TabelReservasi = ({ reservasi, ModalTabelReservasiComponent }) => {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(reservasi);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedReservasi, setSelectedReservasi] = useState(null);

    useEffect(() => {
        // Adding order property to track creation sequence
        const filtered = reservasi
            .map((item, index) => ({
                ...item,
                key: item.id || `key-${index}`, // Unique key
                order: index, // Track creation order
            }))
            .sort((a, b) => a.order - b.order); // Sort by creation order
        setFilteredData(filtered);
    }, [reservasi]);

    const handleEditClick = (reservasi) => {
        setSelectedReservasi(reservasi);
        onOpen();
    };

    const handleCloseClick = () => {
        setSelectedReservasi(null);
        onClose();
    };

    const columns = [
        {
            title: "No",
            dataIndex: "order",
            key: "order",
            sorter: (a, b) => a.order - b.order, // Sort by creation order
            render: (text, record) => record.order + 1, // Display 1-based index
            width: '10%',
        },
        {
            title: "Tanggal",
            dataIndex: "reservasiDate",
            key: "reservasiDate",
            filters: [...new Set(reservasi.map(item => formatDate(item.reservasiDate)))].map(date => ({ text: date, value: date })),
            filteredValue: filteredInfo.date || null,
            onFilter: (value, record) => formatDate(record.reservasiDate) === value,
            sorter: (a, b) => new Date(a.reservasiDate) - new Date(b.reservasiDate),
            sortOrder: sortedInfo.columnKey === "reservasiDate" ? sortedInfo.order : null,
            render: (text) => formatDate(text),
            width: '18%',
        },
        {
            title: "Waktu",
            dataIndex: "time",
            key: "time",
            sorter: (a, b) => {
                const [hoursA, minutesA] = a.time.split(':').map(Number);
                const [hoursB, minutesB] = b.time.split(':').map(Number);
                const timeA = new Date(1970, 0, 1, hoursA, minutesA);
                const timeB = new Date(1970, 0, 1, hoursB, minutesB);
                return timeA - timeB;
            }, // Sorter for time
            sortOrder: sortedInfo.columnKey === "time" ? sortedInfo.order : null,
            width: '18%',
        },
        {
            title: "Metode",
            dataIndex: "method",
            key: "method",
            sorter: (a, b) => a.method.length - b.method.length,
            sortOrder: sortedInfo.columnKey === "method" ? sortedInfo.order : null,
            width: '14%',
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
            width: '20%',
        },
        {
            title: "Antrian",
            dataIndex: "queue",
            key: "queue",
            sorter: (a, b) => a.queue - b.queue,
            sortOrder: sortedInfo.columnKey === "queue" ? sortedInfo.order : null,
            width: '10%',
        },
        {
            title: "Aksi",
            dataIndex: "aksi",
            key: "aksi",
            fixed: "right",
            render: (_, reservasi) => (
                <div className="flex space-x-3 justify-center items-center">
                    <FaPen className="cursor-pointer md:text-sm hover:text-bluePrimary" onClick={() => handleEditClick(reservasi)} />
                    <FaTrash className="cursor-pointer md:text-sm hover:text-red-600" />
                </div>
            ),
            width: '10%',
        },
    ];

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full">
                <Input
                    label="Pencarian tabel"
                    radius="lg"
                    variant="bordered"
                    classNames={{
                        label: "text-black/50 dark:text-white/90 font-openSans",
                        input: [
                            "bg-transparent",
                            "dark:text-white/90 font-openSans",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "w-full",
                            "shadow-sm",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    endContent={<BiSearchAlt className="text-base flex justify-center items-center" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            colorPrimary: "#FFFFFF",
                            colorBgContainer: "#EDF2F7",
                            headerBg: "#002b6a",
                            headerSplitColor: "#002b6a",
                            headerSortHoverBg: "#002b6a",
                            headerSortActiveBg: "#002b6a",
                            fixedHeaderSortActiveBg: "#002b6a",
                            headerColor: "#ffffff",
                            rowHoverBg: "#ced2d7",
                            borderColor: "#FFFFFF",
                            bodySortBg: "#fdfefe",
                            fontFamily: "Open Sans",
                            algorithm: true,
                            cellPaddingBlock: 8,
                        },
                    },
                }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    onChange={(pagination, filters, sorter) => {
                        setFilteredInfo(filters);
                        setSortedInfo(sorter);
                    }}
                    rowClassName={(record, index) =>
                        index % 2 === 0 ? "even-row" : "odd-row"
                    }
                    scroll={{
                        y: 300,
                        x: 'max-content'
                    }}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], position: ['bottomCenter'] }}
                    style={{ width: '100%' }}
                    className="mt-2 w-full font-openSans text-[10px]"
                />
            </ConfigProvider>

            <Modal size="3xl" isOpen={isOpen} onClose={handleCloseClick} style={{ marginTop: '123px', width: "100%" }}>
                <ModalContent>
                    <ModalHeader className="flex flex-col font-inter text-xl font-bold justify-center items-center text-bluePrimary">Form Reservasi</ModalHeader>
                    <ModalBody className="mb-4">
                        {selectedReservasi && <ModalTabelReservasiComponent reservasi={selectedReservasi} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default TabelReservasi;
