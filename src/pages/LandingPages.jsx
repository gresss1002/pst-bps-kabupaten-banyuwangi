/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Footer from "../component/layout/Footer";
import ContentSection from '../component/layout/ContentSection';
import SearchBar from '../component/fragment/SearchBar';
import { SwiperContent } from '../component/fragment/SwiperContent';
import Tentang from '../component/fragment/Tentang';

const LandingPages = ({ setActiveSection }) => {

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const options = {
            threshold: 0.25,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const newHash = `#${entry.target.id}`;
                    setActiveSection(newHash);
                    window.history.replaceState(null, null, newHash);
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, [setActiveSection]);

    useEffect(() => {
        const handleHashChange = () => {
            const section = document.querySelector(window.location.hash);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        if (window.location.hash) {
            handleHashChange();
        }

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <div className="flex flex-col">
            <ContentSection>
                <section id="beranda" className="scroll-mt-[93px] flex flex-col gap-8">
                    <div className='flex flex-col text-center font-inter gap-2'>
                        <p className="text-2xl font-bold text-bluePrimary">
                            Selamat datang di Pelayanan Statistik Terpadu BPS Kabupaten Banyuwangi
                        </p>
                        <p className='text-[14px]'>
                            Di website ini Anda dapat menemukan berbagai layanan yang kami sediakan dan informasi kontak yang dapat dihubungi
                        </p>
                    </div>
                    <SearchBar />
                    <SwiperContent />
                </section>
                <section id="tentang" className="scroll-mt-[93px]">
                    <Tentang />
                </section>
            </ContentSection>
            <section id="kontak">
                <Footer />
            </section>
            {/* <FloatButton.BackTop /> */}
        </div>
    );
};

export default LandingPages;
