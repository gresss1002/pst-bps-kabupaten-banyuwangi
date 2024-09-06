import { Button, Card, CardBody, Stack, useDisclosure } from "@chakra-ui/react";
import { FaCheckCircle, FaToolbox } from "react-icons/fa";
import { useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import ContentTabs from "../../layout/ContentTabs";
import ModalCardKonsultan from "../../pra-fragment/ModalCardKonsultan";
import { user } from "../../../data";
import { Rate } from "antd";

const CardKonsultan = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedKonsultan, setSelectedKonsultan] = useState(null);

    // Filter users to get only those with the role 'konsultan'
    const konsultanUsers = user.filter(user => user.role === "Konsultan");

    const handleButtonClick = (konsultan) => {
        setSelectedKonsultan(konsultan);
        onOpen();
    };

    return (
        <>
            <ContentTabs title='Konsultan'>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-4 font-inter">
                    {konsultanUsers.map((konsultan) => (
                        <Card key={konsultan.email} maxW='sm' style={{ border: "1px solid #f0f0f0", borderRadius: "20px" }} className="hover:bg-hoverActive">
                            <CardBody>
                                {/* Assuming you have image URLs for konsultan */}
                                <img
                                    src={konsultan.image} // Add image URL in the user data if needed
                                    alt={konsultan.name}
                                    style={{ borderRadius: "18px", justifyItems: "center", alignItems: "center" }}
                                    className="w-full h-auto object-cover text-[12px] font-openSans"
                                />
                                <Stack mt='4' spacing='2' className="font-openSans">
                                    <div className="flex flex-col justify-center items-center gap-1">
                                        <h1 className="text-[16px] font-bold text-center">{konsultan.name}</h1>
                                        <h1 className="flex flex-row gap-1 text-[12px]">
                                            <FaToolbox />{konsultan.position}
                                        </h1>
                                    </div>
                                    <Rate allowHalf disabled value={konsultan.rating} className="flex justify-center"/>
                                    <div className="flex flex-wrap gap-2 justify-center items-center overflow-x-hidden font-openSans">
                                        {/* Use field as topic */}
                                        {konsultan.field && konsultan.field.map((topic, topicIndex) => (
                                            <div
                                                key={topicIndex}
                                                className="bg-gray-200 flex justify-center items-center rounded-xl shadow-md py-1 px-1 font-openSans text-[12px]"
                                            >
                                                Survei {topic}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2 justify-center items-center font-openSans">
                                        {konsultan.available.map((day, dayIndex) => (
                                            <div
                                                key={dayIndex}
                                                className="flex flex-row gap-1 items-center text-[12px]"
                                            >
                                                <FaCheckCircle />
                                                <span>{day}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Stack>
                            </CardBody>
                            <div className="flex justify-center top-0 h-[50px] text-[14px] font-openSans">
                                <Button variant='ghost' colorScheme='bluePrimary' className="text-nonActive border-2 hover:bg-bluePrimary hover:text-white gap-2" style={{ borderRadius: "20px", width: '110px' }} onClick={() => handleButtonClick(konsultan)} >
                                    Reservasi
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </ContentTabs>

            {selectedKonsultan && (
                <Modal size="2xl" isOpen={isOpen} onClose={onClose} style={{ marginTop: '113px', width: "100%" }}>
                    <ModalContent>
                        <ModalHeader className="flex flex-col font-inter text-xl font-bold justify-center items-center text-bluePrimary">
                            Reservasi Konsultan {selectedKonsultan.name}
                        </ModalHeader>
                        <ModalBody className="mb-4">
                            <ModalCardKonsultan konsultan={selectedKonsultan} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}

export default CardKonsultan;
