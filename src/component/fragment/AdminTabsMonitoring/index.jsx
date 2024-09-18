import React from "react";
import TabsTemplate from "../../elements/TabsTemplate";
import BarSumTopik from "../../pra-fragment/BarSumTopik";
import LineDayReservasi from "../../pra-fragment/LineDayReservasi";
import DonutStatusReservasi from "../../pra-fragment/DonutStatusReservasi";
import SlopeDaysTopik from "../../pra-fragment/SlopeDaysTopik";
import "./styles.css";
import BarSumComKecamatan from "../../pra-fragment/BarSumComKecamatan";
import BarSumReservasi from "../../pra-fragment/BarSumReservasi";

const tabsMonitoring = [
    {
        key: '1',
        label: 'Reservasi',
        children: <div className="w-full">
            <BarSumReservasi />
            <BarSumTopik />
            <DonutStatusReservasi />
            <LineDayReservasi />
            <SlopeDaysTopik />
        </div>,
    },
    {
        key: '2',
        label: 'Pengaduan',
        children: <BarSumComKecamatan />,
    },
];
const AdminTabsMonitoring = () => {
    return (
        <TabsTemplate items={tabsMonitoring} />
    );
};

export default AdminTabsMonitoring;
