import { CloseOutlined } from "@ant-design/icons";
import { Layout, Drawer, Spin } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import Header from "./Header";

type Props = {
  children?: React.ReactNode;
  loading?: boolean;
};

function HomeLayout({ children, loading }: Props) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  // Media query for responsive layout: max-width 768px (mobile)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <Layout className="!h-[100vh] bg-[#F5F4F9] p-6">
      {isMobile ? (
        <>
          <Drawer
            placement="left"
            onClose={() => setDrawerVisible(false)}
            closeIcon={<CloseOutlined style={{ color: "black" }} />}
            visible={drawerVisible}
            bodyStyle={{ padding: 0 }}
            className="!bg-[#D57D25] text-white flex flex-col"
          >
            {<Sidebar />}
          </Drawer>
        </>
      ) : (
        <Sider
          trigger={null}
          width={290}
          className="text-white flex flex-col !h-[95vh] !bg-transparent overflow-auto hide-scrollbar rounded-[20.15px] !mb-6"
        >
          {<Sidebar />}
        </Sider>
      )}
      <Layout>
        <Header
          drawerVisible={drawerVisible}
          setDrawerVisible={setDrawerVisible}
        />
        <Content
          style={{
            minHeight: 280,
            backgroundColor: "#F5F4F9",
          }}
          className={`lg:p-6 h-[calc(100vh-64px)] overflow-auto hide-scrollbar`}
        >
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Spin size="large" />
            </div>
          ) : (
            children
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomeLayout;
