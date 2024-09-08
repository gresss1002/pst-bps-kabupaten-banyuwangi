import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import axiosInstance from '../../../utils/axiosInstance';

const DoneLoginHeaderNavbar = ({ userData }) => {
  const [activeSection, setActiveSection] = useState(window.location.hash || '#beranda');


  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash);
    };

    // Menambahkan event listener
    window.addEventListener('hashchange', handleHashChange)

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isActive = (href) => href === activeSection;

  return (
    <Navbar
      maxWidth="full"
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
      }}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-bluePrimary",

        ],
        wrapper: 'px-[8%]',
      }}
    >
      <NavbarContent >
        <NavbarBrand>
          <div className='flex flex-row gap-2'>
            <img src='https://www.bps.go.id/_next/image?url=%2Fassets%2Flogo-bps.png&w=3840&q=75' alt="logo BPS" className=" w-8 h-10 md:w-14 md:h-12" />
            <div className="flex flex-col font-inter " >
              <p className="text-[14px] xs:text-sm lg:text-[14px] font-bold leading-normal">Pelayanan Statistik Terpadu</p>
              <p className="text-[12px] xs:text-[11px] lg:text-[12px] text-inherit leading-snug">BPS Kabupaten Banyuwangi</p>
            </div>
          </div>

        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          {userData != null && (
            <User
              className='font-inter'
              name={(<p className='text-[14px] font-bold'>
                {userData?.name}
              </p>)}
              description={(<p className='text-[10px] text-bluePrimary'>
                {userData?.role}
              </p>)}
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
              }}
            />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default DoneLoginHeaderNavbar;
