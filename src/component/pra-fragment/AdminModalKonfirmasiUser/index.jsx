import React from "react";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

const AdminModalKonfirmasiUser = ({ isConfirmOpen, closeConfirmModal, handleConfirmClick }) => {
  return (
    <Modal isOpen={isConfirmOpen}size="sm">
      <ModalOverlay />
      <ModalContent mx="auto" my="auto" style={{ transform: "translate(-50%, -50%)", borderRadius: "20px" }}>
        <ModalHeader>Konfirmasi Perubahan</ModalHeader>
        <ModalCloseButton  />
        <ModalBody>
          <p>Apakah Anda yakin ingin mengubah role user ini?</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="bluePrimary" className="bg-bluePrimary" mr={3} style={{ borderRadius: "20px", width: "60px" }} onClick={handleConfirmClick}>
            Ya
          </Button>
          <Button variant="ghost" className="hover:bg-bluePrimary" style={{ borderRadius: "20px", width: "60px" }} >
            Tidak
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AdminModalKonfirmasiUser;
