import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/react";
import { Input, Modal, ModalHeader, ModalContent, ModalBody } from "@nextui-org/react";
import { ConfigProvider, notification, Table } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import "./styles.css";
import AdminModalTabelEditContent from "../../pra-fragment/AdminModalTabelEditContent";

const TabelEditContent = () => {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [swiperData, setSwiperData] = useState([]); // Swiper data state
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedSwiper, setSelectedSwiper] = useState(null);

    // Fetch data from the API on component mount
    useEffect(() => {

        const fetchSwiperData = async () => {
            try {
                const response = await axios.get("https://backend-pst.vercel.app/swiper"); // Your API endpoint
                setSwiperData(response.data); // Store the fetched data
            } catch (error) {
                console.error("Error fetching swiper data:", error);
            }
        };

        fetchSwiperData();
    }, []);

    // Filter swiper data based on the search term
    useEffect(() => {
        const filtered = swiperData
            .filter((item) =>
                Object.keys(item).some((key) =>
                    String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
            .map((item, index) => ({
                ...item,
                key: index + 1 // Adding a dynamic key based on index
            }));
        setFilteredData(filtered);
    }, [searchTerm, swiperData]);

    const handleEditClick = (swiper) => {
        setSelectedSwiper(swiper);
        onOpen();
    };

    
    const handleDeleteClick = async (swiper) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://backend-pst.vercel.app/swiper/${swiper._id}`); // Update with your API route
                notification.success({ message: 'Data berhasil dihapus.' });
                // Optionally refresh the data or remove the deleted item from state
                setFilteredData((prevData) => prevData.filter(item => item._id !== swiper._id));
            } catch (error) {
                notification.error({ message: 'Gagal menghapus data.' });
                console.error(error);
            }
        }
    };

    const handleCloseClick = () => {
        setSelectedSwiper(null);
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
            title: "Foto",
            dataIndex: "image",
            key: "image",
            width: '18%',
            render: (text) => <img src={text} alt="Image" style={{ width: '100%', height: 'auto' }} />
        },
        {
            title: "Judul",
            dataIndex: "title",
            key: "title",
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
            width: '18%'
        },
        {
            title: "Deskripsi",
            dataIndex: "content",
            key: "content",
            sorter: (a, b) => a.content.length - b.content.length,
            sortOrder: sortedInfo.columnKey === "content" ? sortedInfo.order : null,
            width: '24%'
        },
        {
            title: "Link",
            dataIndex: "link",
            key: "link",
            sorter: (a, b) => a.link.length - b.link.length,
            sortOrder: sortedInfo.columnKey === "link" ? sortedInfo.order : null,
            width: '20%',
            render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>
        },
        {
            title: "Aksi",
            dataIndex: "aksi",
            key: "aksi",
            render: (_, swiper) => (
                <div className="flex space-x-3 justify-center items-center">
                    <FaPen className="cursor-pointer md:text-sm hover:text-bluePrimary" onClick={() => handleEditClick(swiper)} />
                    <FaTrash className="cursor-pointer md:text-sm hover:text-red-600" onClick={() => handleDeleteClick(swiper)}/>
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
                    scroll={{
                         y: 450,  
                         x:500,
                      }}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100'], position: ['bottomCenter'] }}
                    style={{ width: '100%' }}
                    className="mt-2 w-full font-openSans text-[10px]"
                />
            </ConfigProvider>

            <Modal size="2xl" isOpen={isOpen} onClose={handleCloseClick} style={{ marginTop: '113px', width: "100%" }}>
                <ModalContent>
                    <ModalHeader className="flex flex-col font-inter text-xl font-bold justify-center items-center text-bluePrimary">Edit Content Beranda</ModalHeader>
                    <ModalBody className="mb-4">
                        {selectedSwiper && <AdminModalTabelEditContent swiper={selectedSwiper} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default TabelEditContent;
