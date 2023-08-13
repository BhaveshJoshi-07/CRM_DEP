import { Button, Card, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";
import CreateEmailForm from "../Email/CreateEmailForm";
import CreateDrawer from "./CreateDrawer";

export default function Emails({ ref, data, loading, name, singleLoadThunk }) {
  // Drawer state
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Title",
      key: "title",
      render: ({ subject, id }) =>
        id ? <Link to={`/admin/email/${id}`}>{subject}</Link> : "-",
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: "Subject",
      key: "subject",
      dataIndex: "subject",
      render: (subject) =>
        subject?.length > 20 ? subject.slice(0, 20) : subject,
    },

    {
      title: "Owner",
      dataIndex: "emailOwner",
      key: "owner",
      render: (emailOwner, item) => (
        <Link to={`/admin/setup/staffs/${item?.emailOwnerId}`}>
          {emailOwner?.firstName} {emailOwner?.lastName}
        </Link>
      ),
    },
    {
      title: "Status",
      key: "Status",
      dataIndex: "status",
      render: (status) =>
        status === true ? (
          <span className='text-green-600'>Sent</span>
        ) : (
          "Failed"
        ),
    },
    {
      title: "Create date",
      key: "Create date",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("MMMM Do YYYY"),
    },
  ];

  return (
    <Card
      title={<span className='font-bold'>Emails</span>}
      bodyStyle={{ padding: 0 }}
      extra={
        <UserPrivateComponent permission='create-email'>
          <Button
            onClick={() => setOpen(true)}
            className='flex items-center'
            icon={<BiPlus />}
          >
            Add
          </Button>
        </UserPrivateComponent>
      }
    >
      <div>
        <UserPrivateComponent permission='readAll-email'>
          <Table
            bordered
            columns={columns}
            loading={loading}
            dataSource={data ? data.crmEmail : []}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: 800, y: 300 }}
          />
        </UserPrivateComponent>
      </div>

      <UserPrivateComponent permission='create-email'>
        <CreateDrawer onClose={onClose} open={open} title={"Email"}>
          <CreateEmailForm
            onClose={onClose}
            open={open}
            createAs={{ name, value: data?.id, singleLoadThunk }}
          />
        </CreateDrawer>
      </UserPrivateComponent>
    </Card>
  );
}
