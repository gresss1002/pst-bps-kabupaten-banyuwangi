import React from "react";
import { Tabs } from "antd";
import "./styles.css";
import ContentTabsElement from "../../layout/ContentTabsElement";

// Komponen TabsTemplate menerima props 'items' untuk membuat tab secara dinamis
const TabsTemplate = ({ items, defaultActiveKey = "1", onChange = (key) => console.log(key) }) => {
  return (
    <ContentTabsElement>
        <Tabs defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} />
    </ContentTabsElement>
    
  );
};

export default TabsTemplate;
