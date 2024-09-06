import React from "react";
import TabsTemplate from "../../elements/TabsTemplate";
import AdminTabelPengaduan from "../../pra-fragment/AdminTabelPengaduan";
import AdminTabelUser from "../../pra-fragment/AdminTabelUser";
import AdminModalTabelKonsultan from "../../pra-fragment/AdminModalTabelKonsultan";
import AdminTabelKonsultan from "../../pra-fragment/AdminTabelKonsultan";

const tabsUser = [
    {
        key: '1',
        label: 'Konsumen',
        children: <AdminTabelUser />,
    },
    {
        key: '2',
        label: 'Konsultan',
        children: <AdminTabelKonsultan />,
    },
];
const AdminTabsUser = () => {
    return (
        <TabsTemplate items={tabsUser} />
    );
};

export default AdminTabsUser;
