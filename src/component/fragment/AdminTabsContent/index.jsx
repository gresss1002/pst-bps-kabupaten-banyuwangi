import React from "react";
import TabsTemplate from "../../elements/TabsTemplate";
import TabelEditContent from "../TabelEditContent";
import AdminCreateContent from "../../pra-fragment/AdminCreateContent";

const tabsContent = [
    {
        key: '1',
        label: 'Buat',
        children: <AdminCreateContent/>,
    },
    {
        key: '2',
        label: 'Edit',
        children: <TabelEditContent />,
    },
];

const AdminTabsContent = () => {
    return (
        <TabsTemplate items={tabsContent} />
    );
};

export default AdminTabsContent;
