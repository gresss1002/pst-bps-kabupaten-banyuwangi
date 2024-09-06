/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { ConfigProvider, Table } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import "./styles.css";
import { complaints } from "../../../data";

const AdminTabelPengaduan = () => {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(complaints);

    useEffect(() => {
        const filtered = complaints.filter((item) =>
            Object.keys(item).some((key) =>
                String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
            )
        ).map((item, index) => ({
            ...item,
            key: index + 1 // Menambahkan key dinamis berdasarkan indeks
        }));
        setFilteredData(filtered);
    }, [searchTerm, complaints]);

    const columns = [
        {
            title: "No",
            dataIndex: "key",
            key: "key",
            sorter: (a, b) => a.key - b.key,
            sortOrder: sortedInfo.columnKey === "key" ? sortedInfo.order : null,
            width: '10%'
        },
        {
            title: "Jenis Kelamin",
            dataIndex: "gender",
            key: "gender",
            // filters: [...new Set(complaints.map(item => item.gender))].map(gender => ({ text: gender, value: gender })),
            // filteredValue: filteredInfo.gender || null,
            // onFilter: (value, record) => record.gender.includes(value),
            // sorter: (a, b) => a.gender.localeCompare(b.gender), // Mengubah ke string sorter
            // sortOrder: sortedInfo.columnKey === "gender" ? sortedInfo.order : null,
            width: '18%',
        },
        {
            title: "Materi",
            dataIndex: "material",
            key: "material",
            // sorter: (a, b) => a.material.localeCompare(b.material),
            // sortOrder: sortedInfo.columnKey === "material" ? sortedInfo.order : null,
            width: '18%'
        },
        {
            title: "Saran",
            dataIndex: "complaint",
            key: "complaint",
            // sorter: (a, b) => a.complaint.length - b.complaint.length,
            // sortOrder: sortedInfo.columnKey === "complaint" ? sortedInfo.order : null,
            width: '34%'
        },
        {
            title: "No Telp",
            dataIndex: "telepon",
            key: "telepon",
            // sorter: (a, b) => a.telepon.length - b.telepon.length,
            // sortOrder: sortedInfo.columnKey === "telepon" ? sortedInfo.order : null,
            width: '20%'
        },
        // {
        //     title: "Aksi",
        //     dataIndex: "aksi",
        //     key: "aksi",
        //     fixed:"right",
        //     render: (_, complaints) => (
        //         <div className="flex space-x-3 justify-center items-center">
        //             <FaPen className="cursor-pointer md:text-sm hover:text-bluePrimary" onClick={() => handleEditClick(complaints)} />
        //             <FaTrash className="cursor-pointer md:text-sm hover:text-red-600" />
        //         </div>
        //     ),
        //     width: '10%'
        // },
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
                    }}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '25', '50', '100'],
                        position: ['bottomCenter']
                    }}
                    style={{ width: '100%' }}
                    className="mt-2 w-full font-openSans text-[10px]"
                />
            </ConfigProvider>
        </div>
    );
};

export default AdminTabelPengaduan;
