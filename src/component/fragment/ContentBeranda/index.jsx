import React, { useEffect } from 'react';
import SearchBar from "../SearchBar";
import { SwiperContent } from "../SwiperContent";
import ContentSection from "../../layout/ContentSection";

const ContentBeranda = () => {
    return (
        <ContentSection title=''>
            <section className="flex flex-col gap-8">
                <div className='flex flex-col justify-center items-center'>
                    <p className="mb-3 text-2xl font-bold font-pt-sans-caption text-active">
                        Selamat datang di Pelayanan Statistik Terpadu BPS Kabupaten Banyuwangi
                    </p>
                    <p className='text-[14px] font-pt-sans'>
                        Di website ini Anda dapat menemukan berbagai layanan yang kami sediakan dan informasi kontak yang dapat dihubungi
                    </p>
                </div>
                <SearchBar />
                <SwiperContent />
            </section>
        </ContentSection>
    )
}

export default ContentBeranda;