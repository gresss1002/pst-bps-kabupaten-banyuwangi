import TabsSideBar from "../component/elements/TabsSideBar";
import CardKonsultan from "../component/fragment/CardKonsultan";
import UserFormProfile from "../component/fragment/UserFormProfile";
import UserNotifikasi from "../component/fragment/UserNotifikasi";
import ContentSection from "../component/layout/ContentSection";
import UserAlur from "../component/fragment/UserAlur";
import UserTabelReservasi from "../component/fragment/UserTabelReservasi";
import UserPengaduan from "../component/fragment/UserPengaduan";

const UserPages = ({ userData }) => {
    const data = [
        {
            key: 'set',
            title: 'Profile Setting',
            subtitle: 'Lihat/Ubah Data Diri',
            description: 'Silahkan lengkapi data diri anda!',
            content: <UserFormProfile userData={userData} />,
        },
        {
            key: 'reservasi',
            title: 'Reservasi Konsultasi',
            subtitle: 'Buat Reservasi Konsultasi',
            description: 'Silahkan ajukan reservasi dengan memilih konsultan pilihan Anda!',
            content: (
                <div className="flex flex-col gap-4">
                    <UserAlur />
                    <CardKonsultan />
                </div>
            )
            ,
        },
        {
            key: 'riwayat',
            title: 'Riwayat Konsultasi',
            subtitle: 'Daftar Konsultasi',
            description: 'Anda dapat melihat daftar history konsultasi anda disini!',
            content: <UserTabelReservasi />,
        },
        {
            key: 'notif',
            title: 'Notifikasi',
            subtitle: 'Notifikasi Pemberitahuan',
            description: 'Anda dapat memantau pemberitahuan terbaru mengenai perubahan status reservasi disini',
            content:<UserNotifikasi/>
        },
        {
            key: 'aduan',
            title: 'Pengaduan',
            subtitle: 'Buat Pengaduan',
            description: 'Anda dapat pengaduan berupa saran maupun keluhan terhadap pelayanan di BPS Kabupaten Banyuwangi',
            content:<UserPengaduan/>
        },
    ];

    return (
        <ContentSection>
            <TabsSideBar data={data} />
        </ContentSection>
    );
};

export default UserPages;