import React from "react";
import TabsTemplate from "../../elements/TabsTemplate";
import AdminTabelReservasi from "../../pra-fragment/AdminTabelReservasi";
import AdminTabelPengaduan from "../../pra-fragment/AdminTabelPengaduan";

const tabsRiwayat = [
    {
        key: '1',
        label: 'Reservasi',
        children: <AdminTabelReservasi />,
    },
    {
        key: '2',
        label: 'Pengaduan',
        children: <AdminTabelPengaduan />,
    },
];
const AdminTabsRiwayat = () => {
    return (
        <TabsTemplate items={tabsRiwayat} />
    );
};

export default AdminTabsRiwayat;
