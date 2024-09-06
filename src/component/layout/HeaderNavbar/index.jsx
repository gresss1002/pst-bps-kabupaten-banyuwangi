import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom for internal links

const HeaderNavbar = () => {
  const [activeSection, setActiveSection] = useState(window.location.hash || '#beranda');

  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

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
          "hover:data-[active=true]:after:bg-bluePrimary", // Hover state
        ],
        wrapper: 'px-[8%]',
      }}
    >
      <NavbarContent>
        <NavbarBrand>
          <div className='flex flex-row gap-2'>
            <img src='https://www.bps.go.id/_next/image?url=%2Fassets%2Flogo-bps.png&w=3840&q=75' alt="logo BPS" className="w-8 h-10 md:w-14 md:h-12" />
            <div className="flex flex-col font-inter">
              <p className="text-[14px] xs:text-sm lg:text-[14px] font-bold leading-normal">Pelayanan Statistik Terpadu</p>
              <p className="text-[12px] xs:text-[11px] lg:text-[12px] text-inherit leading-snug">BPS Kabupaten Banyuwangi</p>
            </div>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem
          isActive={isActive('#beranda')}
          className={`font-inter text-[14px] ${isActive('#beranda') ? 'text-bluePrimary' : 'text-gray-600'}`}
        >
          <a href='#beranda'>
            Beranda
          </a>
        </NavbarItem>
        <NavbarItem
          isActive={isActive('#tentang')}
          className={`font-inter text-[14px] ${isActive('#tentang') ? 'text-bluePrimary' : 'text-gray-600'}`}
        >
          <a href='#tentang'>
            Tentang
          </a>
        </NavbarItem>
        <NavbarItem
          isActive={isActive('#kontak')}
          className={`font-inter text-[14px] ${isActive('#kontak') ? 'text-bluePrimary ' : 'text-gray-600'}`}
        >
          <a href='#kontak'>
            Kontak
          </a>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default HeaderNavbar;
