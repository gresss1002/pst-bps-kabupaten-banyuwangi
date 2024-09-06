import { Button, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
// import UserModalNotifikasi from "../UserModalNotifikasi";

const FormatNotifikasi = ({ reservasi, ModalNotifkasiComponent }) => {
    let statusMessage;

    if (reservasi.status === 'Disetujui') {
        statusMessage = 'disetujui';
    } else if (reservasi.status === 'Diubah Konsultan') {
        statusMessage = 'diubah oleh konsultan';
    } else if (reservasi.status === 'Diubah Admin') {
        statusMessage = 'diubah oleh admin';
    }

    // Format topics array or single topic
    const formatTopics = (topics) => {
        if (Array.isArray(topics)) {
            if (topics.length === 0) return "";
            if (topics.length === 1) return topics[0];
            if (topics.length === 2) return `${topics[0]} dan ${topics[1]}`;
            return `${topics.slice(0, -1).join(', ')}, dan ${topics[topics.length - 1]}`;
        }
        return topics;
    };

    const formattedTopics = formatTopics(reservasi.topic);

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <p className="font-openSans text-[14px] hover:text-white" onClick={onOpen}>
                Reservasi <span className="font-bold">{formattedTopics}</span> Anda pada <span className="font-bold">{reservasi.reservasiDate}</span> telah {statusMessage}.
            </p>

            <Modal size="2xl" isOpen={isOpen} onClose={onClose} style={{ marginTop: '113px', width: "100%" }} >
                <ModalContent >
                    <ModalHeader className="flex flex-col font-inter text-xl font-bold justify-center items-center text-bluePrimary">
                        Notifikasi {formattedTopics}
                    </ModalHeader>
                    <ModalBody className="mb-4">
                        {reservasi && <ModalNotifkasiComponent reservasi={reservasi} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default FormatNotifikasi;
