import React, { useState, useEffect, useMemo } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { DatePicker, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { today, getLocalTimeZone, parseDate, isWeekend } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import axios from "axios";
import formatDate from "../../../utils/formatedDate"; // Ensure this function outputs ISO 8601 format
import convertToISODate from "../../../utils/convertToISODate";
import { Rate } from "antd";
import { method, time } from "../../../data";

// Function to determine input style
const getInputStyle = (value) => {
  if (value === "") return "nonActive";
  if (/^[a-zA-Z0-9\s;:.,-]+$/.test(value)) return "success";
  return "danger";
};

const UserModalTabelReservasi = ({ reservasi }) => {
  // State hooks
  const [selectedMethod, setSelectedMethod] = useState("");
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [selectedReservasiDate, setSelectedReservasiDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedKonsultan, setSelectedKonsultan] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [konsultanDetails, setKonsultanDetails] = useState(null); // State to hold konsultan details
  const [konsultanUsers, setKonsultanUsers] = useState([]); // State to hold all konsultan users
  const [currentStatus, setCurrentStatus] = useState(""); // State to store the status
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // New state for message type
  const { onClose } = useDisclosure();
  const [isRatingDisabled, setIsRatingDisabled] = useState(false);
  const isReadOnly = currentStatus !== "Menunggu Konfirmasi";

  // Fetch konsultan users
  useEffect(() => {
    const fetchKonsultanUsers = async () => {
      try {
        const response = await axios.get('https://backend-pst.vercel.app/users/konsultan');
        setKonsultanUsers(response.data);
      } catch (error) {
        console.error("Error fetching konsultan users:", error);
      }
    };
    fetchKonsultanUsers();
  }, []);

  // Fetch rating details
  const fetchRating = async (ratingId) => {
    try {
      const response = await axios.get(`https://backend-pst.vercel.app/rating/${ratingId}`);
      console.log('Fetched Rating:', response.data);
      // You can handle the rating data here as needed
    } catch (error) {
      console.error('Error fetching rating:', error);
      setMessage('Gagal mendapatkan rating');
      setMessageType('error');
    }
  };

  // Fetch rating ID based on reservasi
  const fetchRatingId = async () => {
    console.log('Fetching rating ID for reservasi:', reservasi._id);
    try {
      const response = await axios.get(`https://backend-pst.vercel.app/rating?idReservasi=${reservasi._id}`);
      console.log('Rating ID response:', response.data);
      if (response.status === 200) {
        const ratings = response.data;
        if (Array.isArray(ratings) && ratings.length > 0) {
          const rating = ratings.find(r => r.idReservasi === reservasi._id);
          if (rating) {
            setRateValue(rating.score);
            // Disable rating if status is "Menunggu Konfirmasi"
            setIsRatingDisabled(reservasi.status !== "Menunggu Konfirmasi" && rating.score > 0);
          } else {
            setRateValue(0);
            setIsRatingDisabled(reservasi.status === "Menunggu Konfirmasi");
          }
        } else {
          setRateValue(0);
          setIsRatingDisabled(reservasi.status === "Menunggu Konfirmasi");
        }
      } else {
        setMessage('Gagal mendapatkan ID rating');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error fetching rating ID:', error);
      setMessage('Gagal mendapatkan ID rating');
      setMessageType('error');
    }
  };




  useEffect(() => {
    if (reservasi) {
      console.log('Current reservation data:', reservasi);
      setSelectedMethod(reservasi.method || '');

      // Handle topic parsing
      if (Array.isArray(reservasi.topic)) {
        setSelectedTopic(reservasi.topic.map(t => t.trim()));
      } else {
        setSelectedTopic(reservasi.topic ? reservasi.topic.split(',').map(t => t.trim()) : []);
      }

      setSelectedKonsultan(reservasi.idKonsultan || '');

      // Format and parse date
      const formattedDate = formatDate(reservasi.reservasiDate) || '';
      const isoDate = convertToISODate(formattedDate);
      setSelectedReservasiDate(parseDate(isoDate));

      setSelectedTime(reservasi.time || '');
      setLinkValue(reservasi.link || '');
      setDescriptionValue(reservasi.descriptionReservasi || '');
      setCurrentStatus(reservasi.status || '');

      // Fetch rating ID
      fetchRatingId();

      // Update konsultan details if `idKonsultan` is available
      if (reservasi.idKonsultan) {
        const konsultan = konsultanUsers.find(k => k._id === reservasi.idKonsultan);
        if (konsultan) {
          setKonsultanDetails(konsultan);
        } else {
          setKonsultanDetails(null);
        }
      }
    }
  }, [reservasi, konsultanUsers]);


  // Handle update button click
  // const handleEditButtonClick = async () => {
  //   const sanitizedDescription = descriptionValue.replace(/'/g, "\\'");
  //   const formattedDate = selectedReservasiDate ? formatDate(selectedReservasiDate) : '';
  //   const isoDate = convertToISODate(formattedDate);

  //   const data = {
  //     method: selectedMethod,
  //     topic: selectedTopic,
  //     reservasiDate: isoDate,
  //     time: selectedTime,
  //     idKonsultan: selectedKonsultan,
  //     link: linkValue,
  //     descriptionReservasi: sanitizedDescription,
  //     rating: rateValue,
  //     status: reservasi.status
  //   };

  //   try {
  //     const response = await axios.put(`https://backend-pst.vercel.app/reservasi/${reservasi._id}`, data);
  //     if (response.status === 200) {
  //       setMessage('Reservasi berhasil diperbaharui');
  //       setMessageType('success');

  //       try {
  //         const ratingCheck = await axios.get(`https://backend-pst.vercel.app/rating/${reservasi._id}`);
  //         if (ratingCheck.status === 200) {
  //           setMessage('Rating sudah ada untuk reservasi ini');
  //           setMessageType('error');
  //           return;
  //         }
  //       } catch (ratingCheckError) {
  //         try {
  //           await axios.post('https://backend-pst.vercel.app/rating', {
  //             idReservasi: reservasi._id,
  //             score: rateValue
  //           });
  //           setMessage('Rating berhasil dikirim');
  //           setMessageType('success');
  //         } catch (ratingError) {
  //           if (ratingError.response && ratingError.response.status === 400) {
  //             setMessage('Rating sudah ada untuk reservasi ini');
  //             setMessageType('error');
  //           } else {
  //             console.error('Error posting rating:', ratingError);
  //             setMessage('Gagal mengirim rating');
  //             setMessageType('error');
  //           }
  //         }
  //       }

  //       onClose();
  //     } else {
  //       const errorDetails = await response.text();
  //       throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
  //     }
  //   } catch (error) {
  //     console.error('Error updating reservation:', error);
  //     setMessage('Reservasi gagal diperbaharui');
  //     setMessageType('error');
  //   }
  // };

  // const handleEditButtonClick = async () => {
  //   const sanitizedDescription = descriptionValue.replace(/'/g, "\\'");
  //   const formattedDate = selectedReservasiDate ? formatDate(selectedReservasiDate) : '';
  //   const isoDate = convertToISODate(formattedDate);

  //   const data = {
  //     method: selectedMethod,
  //     topic: selectedTopic,
  //     reservasiDate: isoDate,
  //     time: selectedTime,
  //     idKonsultan: selectedKonsultan,
  //     link: linkValue,
  //     descriptionReservasi: sanitizedDescription,
  //     rating: rateValue,
  //     status: reservasi.status
  //   };

  //   try {
  //     // Update reservasi
  //     const response = await axios.put(`https://backend-pst.vercel.app/reservasi/${reservasi._id}`, data);
  //     if (response.status === 200) {
  //       setMessage('Reservasi berhasil diperbaharui');
  //       setMessageType('success');

  //       try {
  //         // Check if rating exists
  //         const ratingCheck = await axios.get(`https://backend-pst.vercel.app/rating/${reservasi._id}`);
  //         if (ratingCheck.status === 200) {
  //           setMessage('Rating sudah ada untuk reservasi ini');
  //           setMessageType('error');
  //           return;
  //         }
  //       } catch (ratingCheckError) {
  //         // Submit the rating and associate it with the consultant
  //         try {
  //           // Submit rating to reservasi
  //           await axios.post('https://backend-pst.vercel.app/rating', {
  //             idReservasi: reservasi._id,
  //             idKonsultan: selectedKonsultan, // Include the consultant's ID
  //             score: rateValue
  //           });

  //           // Update rating for konsultan
  //           await axios.put(`https://backend-pst.vercel.app/konsultan/${selectedKonsultan}/rating`, {
  //             score: rateValue
  //           });

  //           setMessage('Rating berhasil dikirim ke konsultan');
  //           setMessageType('success');
  //         } catch (ratingError) {
  //           if (ratingError.response && ratingError.response.status === 400) {
  //             setMessage('Rating sudah ada untuk reservasi ini');
  //             setMessageType('error');
  //           } else {
  //             console.error('Error posting rating:', ratingError);
  //             setMessage('Gagal mengirim rating');
  //             setMessageType('error');
  //           }
  //         }
  //       }

  //       onClose();
  //     } else {
  //       const errorDetails = await response.text();
  //       throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
  //     }
  //   } catch (error) {
  //     console.error('Error updating reservation:', error);
  //     setMessage('Reservasi gagal diperbaharui');
  //     setMessageType('error');
  //   }
  // };

  const handleEditButtonClick = async () => {
    // const sanitizedDescription = descriptionValue.replace(/'/g, "\\'");
    const formattedDate = selectedReservasiDate ? formatDate(selectedReservasiDate) : '';
    const isoDate = convertToISODate(formattedDate);

    if (rateValue === 0) {
      setMessage('Rating tidak boleh 0');
      setMessageType('error');
      return;
    }

    const data = {
      method: selectedMethod,
      topic: selectedTopic,
      reservasiDate: isoDate,
      time: selectedTime,
      idKonsultan: selectedKonsultan,
      link: linkValue,
      descriptionReservasi: descriptionValue,
      rating: rateValue, // Ensure rating is sent
      status: reservasi.status
    };

    try {
      const response = await axios.put(`https://backend-pst.vercel.app/reservasi/${reservasi._id}`, data);
      if (response.status === 200) {
        setMessage('Reservasi berhasil diperbaharui');
        setMessageType('success');

        try {
          const ratingCheck = await axios.get(`https://backend-pst.vercel.app/rating/${reservasi._id}`);
          if (ratingCheck.status === 200) {
            setMessage('Rating sudah ada untuk reservasi ini');
            setMessageType('error');
            return;
          }
        } catch (ratingCheckError) {
          try {
            const ratingResponse = await axios.post('https://backend-pst.vercel.app/rating', {
              idReservasi: reservasi._id,
              idKonsultan: selectedKonsultan,
              score: rateValue
            });
            setMessage('Rating berhasil dikirim');
            setMessageType('success');
          } catch (ratingError) {
            if (ratingError.response && ratingError.response.status === 400) {
              setMessage('Rating sudah ada untuk reservasi ini');
              setMessageType('error');
            } else {
              setMessage('Gagal mengirim rating');
              setMessageType('error');
            }
          }
        }

        onClose();
      } else {
        const errorDetails = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
      setMessage('Reservasi gagal diperbaharui');
      setMessageType('error');
    }
  };




  useEffect(() => {
    console.log("Selected Method:", selectedMethod);
    console.log("Selected Topic:", selectedTopic);
    console.log("Selected Konsultan:", selectedKonsultan);
    console.log("Konsultan Users:", konsultanUsers);
  }, [selectedMethod, selectedTopic, selectedKonsultan, konsultanUsers]);


  // Locale and date validation
  const { locale } = useLocale();
  const isDateUnavailable = (date) => isWeekend(date, locale);

  // Status checks for form inputs
  const metodeStatus = useMemo(() => selectedMethod ? "success" : "nonActive", [selectedMethod]);
  const topikStatus = useMemo(() => selectedTopic.length > 0 ? "success" : "nonActive", [selectedTopic]);
  const reservasiDateStatus = useMemo(() => {
    if (!selectedReservasiDate) return "nonActive";
    const currentDate = today(getLocalTimeZone());
    return isDateUnavailable(selectedReservasiDate) ? "danger" : selectedReservasiDate.compare(currentDate.add({ days: 2 })) < 0 ? "danger" : "success";
  }, [selectedReservasiDate, locale]);
  const timeStatus = useMemo(() => selectedTime ? "success" : "nonActive", [selectedTime]);
  const konsultanStatus = useMemo(() => selectedKonsultan ? "success" : "nonActive", [selectedKonsultan]);
  const linkStatus = useMemo(() => linkValue ? "success" : "nonActive", [linkValue]);
  const descriptionStatus = useMemo(() => getInputStyle(descriptionValue), [descriptionValue]);

  // const isStatusNotPending = currentStatus !== "Menunggu Konfirmasi";

  const isButtonDisabled = useMemo(() => {
    // Check if all fields are in read-only mode and rating is disabled
    const allReadOnly = isReadOnly && isRatingDisabled;

    return (
      allReadOnly ||
      metodeStatus === "nonActive" ||
      topikStatus === "nonActive" ||
      reservasiDateStatus === "nonActive" ||
      timeStatus === "nonActive" ||
      konsultanStatus === "nonActive" ||
      metodeStatus === "danger" ||
      topikStatus === "danger" ||
      reservasiDateStatus === "danger" ||
      timeStatus === "danger" ||
      konsultanStatus === "danger" ||
      descriptionStatus === "danger"
      // isStatusNotPending
    );
  }, [metodeStatus, topikStatus, reservasiDateStatus, timeStatus, konsultanStatus, descriptionStatus, reservasi.status, rateValue, isReadOnly, isRatingDisabled]);


  console.log('Is Button Disabled:', isButtonDisabled);




  // Available topics from selected konsultan
  const availableTopics = useMemo(() => {
    return konsultanDetails ? konsultanDetails.field : [];
  }, [konsultanDetails]);

  useEffect(() => {
    console.log("Link Value:", linkValue);
  }, [linkValue]);


  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px" }}>
      <div className="grid grid-cols-2 gap-3 w-full mx-[12%]">
        <DatePicker
          label="Tanggal Konsultasi"
          variant="bordered"
          value={selectedReservasiDate}
          minValue={today(getLocalTimeZone())}
          isRequired
          className="w-full"
          onChange={(date) => setSelectedReservasiDate(date)}
          isDateUnavailable={isDateUnavailable}
          errorMessage="Minimal pada hari ini saat hari kerja"
          color={reservasiDateStatus}
          isReadOnly={isReadOnly}
        />
        <Select
          label="Waktu"
          className="w-full"
          variant="bordered"
          selectedKeys={[selectedTime]}
          onChange={(key) => setSelectedTime(key[0])}
          value={selectedTime}
          color={timeStatus}
          isReadOnly={isReadOnly}
        >
          {time.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Metode Konsultasi"
          className="w-full"
          variant="bordered"
          selectedKeys={[selectedMethod]}
          onChange={(key) => setSelectedMethod(key[0])}
          value={selectedMethod}
          color={metodeStatus}
          isReadOnly={isReadOnly}
        >
          {method.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Topik"
          className="w-full"
          variant="bordered"
          selectedKeys={selectedTopic}
          onChange={(keys) => setSelectedTopic(keys.target.value.split(","))}
          value={selectedTopic}
          color={topikStatus}
          selectionMode="multiple"
          isReadOnly={isReadOnly}
        >
          {availableTopics.map((topic) => (
            <SelectItem key={topic} value={topic}>
              {topic}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Konsultan"
          className="w-full"
          variant="bordered"
          selectedKeys={[selectedKonsultan]}
          onChange={(key) => setSelectedKonsultan(key[0])}
          value={selectedKonsultan}
          color={konsultanStatus}
          isReadOnly={isReadOnly}
        >
          {konsultanUsers.map((user) => (
            <SelectItem key={user._id} value={user._id}>
              {user.name}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Link Zoom"
          className="w-full"
          variant="bordered"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          color={linkStatus}
          isReadOnly
        />
        <Textarea
          label="Deskripsi"
          placeholder="Deskripsi konsultasi"
          className="w-full"
          variant="bordered"
          disableAnimation
          disableAutosize
          classNames={{
            base: "max-h-[80px]",
          }}
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          color={descriptionStatus}
          isReadOnly={isReadOnly}
        />
        <div className="flex flex-col justify-center items-center w-full">
          <span className="text-[12px] font-openSans"> Silakan beri penilaian untuk reservasi yang telah Anda ikuti!</span>
          <Rate
            value={rateValue}
            onChange={(value) => setRateValue(value)}
            disabled={isRatingDisabled}
            allowHalf
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-[12%] justify-center items-center">
        <Button
          variant='ghost'
          colorScheme='bluePrimary'
          className="font-openSans text-[12px] text-nonActive border-2 hover:bg-bluePrimary hover:text-white"
          style={{ borderRadius: "20px", width: '100px' }}
          onClick={handleEditButtonClick}
          isDisabled={isButtonDisabled}
        >
          Perbaharui
        </Button>
        {message && (
          <div className={`text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModalTabelReservasi;
