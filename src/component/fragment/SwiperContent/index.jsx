import { useEffect, useRef } from "react";
import { Card, Stack, Text } from "@chakra-ui/react"; // Tetap gunakan Card
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { swiper } from "../../../data";

const DynamicButton = ({ to, children }) => {
  const isInternalLink = to.startsWith("/");

  if (isInternalLink) {
    return (
      <Link to={to} className="flex items-center gaLink-2 text-nonActive hover:text-bluePrimary text-[12px] font-openSans gap-2">
        {children}
        <FaArrowRight />
      </Link>
    );
  } else {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="flex items-center gaLink-2 text-nonActive hover:text-bluePrimary text-[12px] font-openSans gap-2">
        {children}
        <FaArrowRight />
      </a>
    );
  }
};

export const SwiperContent = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const updateCardHeights = () => {
      if (cardsRef.current.length > 0) {
        const cardHeights = cardsRef.current.map(card => {
          const contentHeight = card.querySelector('.content')?.clientHeight || 0;
          const buttonHeight = card.querySelector('.button')?.clientHeight || 0;
          return contentHeight + buttonHeight;
        });

        const maxCardHeight = Math.max(...cardHeights);

        cardsRef.current.forEach(card => {
          card.style.height = `${maxCardHeight}px`;
        });
      }
    };

    updateCardHeights();
    window.addEventListener('resize', updateCardHeights);

    return () => {
      window.removeEventListener('resize', updateCardHeights);
    };
  }, []);

  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination, A11y]}
      slidesPerView={4}
      navigation={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="w-full px-8 pb-10"
      style={{
        "--swiper-navigation-color": "#003c80",
        "--swiper-pagination-color": "#003c80",
        "--swiper-navigation-size": "35px",
      }}
      breakpoints={{
        200: {
          slidesPerView: 1,
          spaceBetween: 4
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 8
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 12
        },
        1340: {
          slidesPerView: 4,
          spaceBetween: 15
        },
        1532: {
          slidesPerView: 4,
          spaceBetween: 15
        },
      }}
    >
      {swiper.map((item, index) => (
        <SwiperSlide key={index} className="flex">
          <Card
            ref={el => cardsRef.current[index] = el} // Set ref for each card
            className="transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col"
            style={{ border: "1px solid #F7F7F7", borderRadius: "20px", flexGrow: 1 }}
          >
            <div className="content flex flex-col flex-grow p-4">
              <div className="flex justify-center items-center w-full h-[130px] overflow-hidden rounded-xl">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="object-contain w-full h-full rounded-xl" // Gunakan object-contain agar gambar tidak terpotong
                />
              </div>
              <div mt="4" spacing="2" className="flex flex-col">
                <p className="font-bold text-center font-inter lg:text-[16px] md:text-[14px] sm:text-[12px] xs:text-[11px] xxs:text-[10px]">
                  {item.title}
                </p>
                <Text className="text-openSans lg:text-[12px] md:text-[11px] sm:text-[10px] xs:text-[9px] xxs:text-[8px] text-justify">
                  {item.content}
                </Text>
              </div>
            </div>
            <div className="button flex justify-center items-center p-4">
              <DynamicButton to={item.link}>
                Kunjungi
              </DynamicButton>
            </div>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
