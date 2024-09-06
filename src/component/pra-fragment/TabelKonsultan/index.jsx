/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Input, Modal, ModalHeader, ModalContent, ModalBody } from "@nextui-org/react";
import { ConfigProvider, Table } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { users } from "../../../data";
import "./styles.css";

const TabelKonsultan = ({ users, ModalTabelUserComponent, space }) => {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Filter users with role 'konsumen'
        const konsumenUsers = users.filter(user => user.role === 'konsultan');
        
        // Further filter based on search term
        const filtered = konsumenUsers.filter((item) =>
            Object.keys(item).some((key) =>
                String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
            )
        ).map((item, index) => ({
            ...item,
            key: index + 1 // Menambahkan key dinamis berdasarkan indeks
        }));
        setFilteredData(filtered);
    }, [searchTerm, users]);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        onOpen();
    };

    const handleCloseClick = () => {
        setSelectedUser(null);
        onClose();
    };

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
            title: "Nama",
            dataIndex: "name",
            key: "name",
            filters: [...new Set(users.map(item => item.name))].map(name => ({ text: name, value: name })),
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
            width: '18%'
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
            width: '18%'
        },
        {
            title: "Telepon",
            dataIndex: "telepon",
            key: "telepon",
            sorter: (a, b) => a.telepon.length - b.telepon.length,
            sortOrder: sortedInfo.columnKey === "telepon" ? sortedInfo.order : null,
            width: '24%'
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            sorter: (a, b) => a.role.localeCompare(b.role),
            sortOrder: sortedInfo.columnKey === "role" ? sortedInfo.order : null,
            width: '20%'
        },
        {
            title: "Aksi",
            dataIndex: "aksi",
            key: "aksi",
            fixed: "right",
            render: (_, user) => (
                <div className="flex space-x-3 justify-center items-center">
                    <FaPen className="cursor-pointer md:text-sm hover:text-bluePrimary" onClick={() => handleEditClick(user)} />
                    <FaTrash className="cursor-pointer md:text-sm hover:text-red-600" />
                </div>
            ),
            width: '10%'
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
                    scroll={{ y: 300 }}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], position: ['bottomCenter'] }}
                    style={{ width: '100%' }}
                    className="mt-2 w-full font-openSans text-[10px]"
                />
            </ConfigProvider>

            <Modal size="3xl" isOpen={isOpen} onClose={handleCloseClick} style={{ marginTop: '120px', width: "100%" }}>
                <ModalContent>
                    <ModalHeader className="flex flex-col font-inter text-xl font-bold justify-center items-center text-bluePrimary">Form Detail User</ModalHeader>
                    <ModalBody className="mb-4">
                        {selectedUser && <ModalTabelUserComponent users={selectedUser} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default TabelKonsultan;
