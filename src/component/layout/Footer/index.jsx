/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Divider } from '@nextui-org/react';
import React from 'react';
import { FaEnvelopeSquare, FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare, FaYoutubeSquare } from 'react-icons/fa';
import { FaSquareTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-blueSecondary text-softBlue font-inter">
      {/* Kontainer luar dengan padding 8% */}
      <div className="w-full bg-blueSecondary px-[5%] md:px-[8%]">
        {/* Kontainer dalam tanpa padding atau margin tambahan */}
        <div className="py-4 flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-0">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-10 text-[14px] w-full">
            <div className="flex flex-row gap-2 w-full lg:w-[65%]">
              <img 
                src="https://www.bps.go.id/_next/image?url=%2Fassets%2Flogo-bps.png&w=3840&q=75" 
                alt="logo BPS" 
                className="w-10 h-10 md:w-14 md:h-12"
              />
              <div className="flex flex-col font-inter text-[14px]">
                <p>Badan Pusat Statistik Kabupaten Banyuwangi</p>
                <p>Jl. K.H. Agus Salim No.87, Lingkungan Cuking Rw., Mojopanggung, Kec. Banyuwangi, Kabupaten Banyuwangi, Jawa Timur 68425</p>
                <p>Surabaya 60292, Telp. (031) 8439343, Fax (031) 8494007, 8471143</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full lg:w-[35%]">
              <p className="font-bold">Hubungi Kami</p>
              <div className="flex flex-col gap-3">
                <a className="flex flex-row items-center gap-2" href="">
                  <FaEnvelopeSquare className="w-6 h-6 hover:text-white" />
                  <p>Email</p>
                </a>
                <a className="flex flex-row items-center gap-2" href="">
                  <FaFacebookSquare className="w-6 h-6 hover:text-white" />
                  <p>Facebook</p>
                </a>
                <a className="flex flex-row items-center gap-2" href="">
                  <FaSquareTwitter className="w-6 h-6 hover:text-white" />
                  <p>Twitter</p>
                </a>
                <a className="flex flex-row items-center gap-2" href="">
                  <FaInstagramSquare className="w-6 h-6 hover:text-white" />
                  <p>Instagram</p>
                </a>
                <a className="flex flex-row items-center gap-2" href="">
                  <FaWhatsappSquare className="w-6 h-6 hover:text-white" />
                  <p>WhatsApp</p>
                </a>
                <a className="flex flex-row items-center gap-2" href="">
                  <FaYoutubeSquare className="w-6 h-6 hover:text-white" />
                  <p>YouTube</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider className="bg-nonActive opacity-30" />
      <div className="w-full bg-bluePrimary text-center flex justify-center items-center text-white px-[5%] md:px-[8%] py-3 text-[12px] md:text-[14px]">
        <p>Semua Hak Dilindungi © 2024, BPS Kabupaten Banyuwangi</p>
      </div>
    </footer>
  );
};

export default Footer;
