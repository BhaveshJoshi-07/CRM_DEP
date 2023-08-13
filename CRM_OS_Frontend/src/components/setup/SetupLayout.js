import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import SideBar from "../layouts/SideBar";

export default function SetupLayout() {
  return (
    <>
      <Layout>
        <Layout.Sider
          className='bg-teal-700 overflow-y-auto overflow-x-hidden'
          style={{ height: "calc(100vh - 102px)" }}
        >
          <SideBar />
        </Layout.Sider>
        <Layout.Content
          className='px-4 overflow-y-auto overflow-x-hidden'
          style={{ height: "calc(100vh - 102px)" }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </>
  );
}
