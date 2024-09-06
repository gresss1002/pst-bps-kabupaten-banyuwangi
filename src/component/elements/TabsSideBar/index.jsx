import { Card, CardBody, CardHeader, Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import "./styles.css";

const TabsSideBar = ({ data }) => {
  const [isVertical] = React.useState(true);


  return (
    //   <div className="px-[8%] my-16">
    <div className="flex flex-col w-full mt-4">
      {/* {colors.map((color) => ( */}
        <Tabs  aria-label="Options" isVertical={isVertical} >
          {data.map((item, index) => (
            <Tab key={index} title={item.title} >
              <Card className="w-full min-h-screen">
                <CardHeader className="flex gap-2 px-6 py-3">
                  <div className="flex flex-col font-inter">
                    <p className="text-2xl font-bold text-bluePrimary">{item.subtitle}</p>
                    <p className="text-[14px] ">{item.description}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="font-openSans">
                  {item.content}
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      {/* ))} */}
    </div>
    //   </div>


  );
};

export default TabsSideBar;
