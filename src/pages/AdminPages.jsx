import TabsSideBar from "../component/elements/TabsSideBar";
import ContentSection from "../component/layout/ContentSection";
import AdminFormProfile from "../component/fragment/AdminFormProfile";
import AdminAlur from "../component/fragment/AdminAlur";
import AdminNotifikasi from "../component/fragment/AdminNotifikasi";
import TabelEditContent from "../component/fragment/TabelEditContent";
import AdminTabsMonitoring from "../component/fragment/AdminTabsMonitoring";
import AdminTabsRiwayat from "../component/fragment/AdminTabsRiwayat";
import AdminTabsUser from "../component/fragment/AdminTabsUser";
import AdminTabelReservasi from "../component/pra-fragment/AdminTabelReservasi";
import BarSumReservasi from "../component/pra-fragment/BarSumReservasi";
import BarSumTopik from "../component/pra-fragment/BarSumTopik";
import DonutStatusReservasi from "../component/pra-fragment/DonutStatusReservasi";
import LineDayReservasi from "../component/pra-fragment/LineDayReservasi";
import SlopeDaysTopik from "../component/pra-fragment/SlopeDaysTopik";



const AdminPages = ({ userData }) => {
    const data = [
        {
            key: 'set',
            title: 'Profile Setting',
            subtitle: 'Lihat/Ubah Data Diri',
            description: 'Silahkan lengkapi data diri anda!',
            content: <AdminFormProfile />,
        },
        {
            key: 'reservasi',
            title: 'Alur Konsultasi',
            subtitle: 'Alur Reservasi Konsultasi',
            description: 'Berikut merupakan alur reservasi konsultasi',
            content: <AdminAlur />,
        },
        {
            key: 'chart',
            title: 'Monitoring',
            subtitle: 'Lihat Statistik Reservasi Konsultasi',
            description: 'Berikut merupakan statistik reservasi konsultasi',
            content: <div className="w-full">
            <BarSumReservasi />
            <BarSumTopik />
            <DonutStatusReservasi />
            <LineDayReservasi />
            <SlopeDaysTopik />
        </div>
        },
        {
            key: 'riwayat',
            title: 'Riwayat',
            subtitle: 'Daftar Konsultasi',
            description: 'Anda dapat melihat daftar history konsultasi anda disini!',
            content: <AdminTabelReservasi />,
        },
        {
            key: 'notif',
            title: 'Notifikasi',
            subtitle: 'Notifikasi Pemberitahuan',
            description: 'Anda dapat memantau pemberitahuan terbaru mengenai perubahan status reservasi disini',
            content: <AdminNotifikasi />
        },
        {
            key: 'user',
            title: 'User',
            subtitle: 'Daftar Konsultasi',
            description: 'Anda dapat melihat daftar history konsultasi anda disini!',
            content: <AdminTabsUser />,
        },
        {
            key: 'edit',
            title: 'Edit Beranda',
            subtitle: 'Ubah Konten Beranda',
            description: 'Anda dapat mengubah ataupun menghapus konten swiper pada beranda',
            content: <TabelEditContent />
        },
        // {
        //     key: 'riwayatPengaduan',
        //     title: 'Riwayat Pengaduan',
        //     subtitle: 'Daftar Pengaduan',
        //     description: 'Anda dapat melihat daftar history pengaduan anda disini!',
        //     content: <AdminTabelPengaduan />,
        // },
    ]
    return (
        <ContentSection>
            <TabsSideBar data={data} />
        </ContentSection>
    );
};

export default AdminPages;