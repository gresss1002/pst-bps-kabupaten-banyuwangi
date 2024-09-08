import TabsSideBar from "../component/elements/TabsSideBar";
import KonsultanAlur from "../component/fragment/KonsultanAlur";
import KonsultanFormProfile from "../component/fragment/KonsultanFormProfile";
import ContentSection from "../component/layout/ContentSection";
import KonsultanNotifikasi from "../component/fragment/KonsultanNotifikasi";
import KonsultanTabelReservasi from "../component/fragment/KonsultanTabelReservasi";


const KonsultanPages = ({ userData }) => {
    const data = [
        {
            key: 'set',
            title: 'Profile Setting',
            subtitle: 'Lihat/Ubah Data Diri',
            description: 'Silahkan lengkapi data diri anda!',
            content: <KonsultanFormProfile userData={userData} />,
        },
        {
            key: 'reservasi',
            title: 'Alur Konsultasi',
            subtitle: 'Alur Reservasi Konsultasi',
            description: 'Berikut merupakan alur reservasi konsultasi',
            content: <KonsultanAlur />,
        },
        {
            key: 'riwayat',
            title: 'Riwayat Konsultasi',
            subtitle: 'Daftar Konsultasi',
            description: 'Anda dapat melihat daftar history konsultasi anda disini!',
            content: <KonsultanTabelReservasi />,
        },
        {
            key: 'notif',
            title: 'Notifikasi',
            subtitle: 'Notifikasi Pemberitahuan',
            description: 'Anda dapat memantau pemberitahuan terbaru mengenai perubahan status reservasi disini',
            content:<KonsultanNotifikasi/>
        },
    ]
    
    return (
        <ContentSection>
            <TabsSideBar data={data} />
        </ContentSection>
    );
};

export default KonsultanPages;