import TabsSideBar from "../component/elements/TabsSideBar";
import ContentSection from "../component/layout/ContentSection";
import AdminFormProfile from "../component/fragment/AdminFormProfile";
import AdminAlur from "../component/fragment/AdminAlur";
import AdminNotifikasi from "../component/fragment/AdminNotifikasi";
import TabelEditContent from "../component/fragment/TabelEditContent";
import AdminTabsMonitoring from "../component/fragment/AdminTabsMonitoring";
import AdminTabsRiwayat from "../component/fragment/AdminTabsRiwayat";
import AdminTabsUser from "../component/fragment/AdminTabsUser";

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
        content: <AdminTabsMonitoring />,
    },
    {
        key: 'riwayat',
        title: 'Riwayat',
        subtitle: 'Daftar Konsultasi',
        description: 'Anda dapat melihat daftar history konsultasi anda disini!',
        content: <AdminTabsRiwayat />,
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

const AdminPages = () => {
    return (
        <ContentSection>
            <TabsSideBar data={data} />
        </ContentSection>
    );
};

export default AdminPages;