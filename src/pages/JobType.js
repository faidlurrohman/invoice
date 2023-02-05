import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
} from "antd";

export default function JobType() {
  const [modal, modalHolder] = Modal.useModal();
  const [messageApi, messageHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [loadingData, setLoadingData] = useState(false);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [isShow, setShow] = useState(false);

  const [isEdit, setEdit] = useState(false);

  // modal
  const handleModal = useCallback(() => {
    form.resetFields();
    setShow(!isShow);
    setEdit(false);
  }, [isShow]);

  // edit
  const handleEdit = useCallback(
    (value) => {
      setEdit(true);
      setShow(true);
      form.setFieldsValue({ id: value?.id, name: value?.name });
    },
    [form]
  );

  // modal input
  const ModalInput = () => {
    return (
      <Modal
        centered
        open={isShow}
        title={`${isEdit ? `Edit` : `Add`} Job Type`}
        onCancel={handleModal}
        footer={null}
      >
        <div className="pt-4">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            labelAlign="left"
            onFinish={handleAdd}
            autoComplete="off"
          >
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input name of job type!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={`pt-2`}>
              <Space direction="horizontal">
                <Button onClick={handleModal}>Cancel</Button>
                <Button htmlType="submit" loading={loadingAdd}>
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    );
  };

  // delete
  const handleDelete = (id) => {
    modal.confirm({
      title: "Are you sure to delete?",
      okType: "default",
      centered: true,
      okText: "Ok",
      cancelText: "Cancel",
      onOk: () => {
        const FORM = new FormData();
        FORM.append("id", id);

        axios({
          method: "POST",
          url: "jobtype/delete",
          data: FORM,
        }).then((response) => {
          getData();
          messageApi.open({
            type: "success",
            content: response?.messages?.success,
          });
        });
      },
    });
  };

  // add or edit
  const handleAdd = useCallback(({ id, name }) => {
    const FORM = new FormData();
    FORM.append("name", name);

    if (id) FORM.append("id", id);

    setLoadingAdd(true);

    axios({
      method: "POST",
      url: `/jobtype/${id ? `edit` : `add`}`,
      data: FORM,
    })
      .then((response) => {
        setLoadingAdd(false);
        setEdit(false);
        setShow(false);
        getData();
        messageApi.open({
          type: "success",
          content: response?.messages?.success,
        });
      })
      .catch(() => setLoadingAdd(false));
  }, []);

  // get
  const getData = () => {
    setLoadingData(true);
    axios
      .get("/jobtype")
      .then((results) => {
        setData(results);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`p-4`}>
      <Space className="pb-4" direction="horizontal">
        <Button onClick={handleModal}>Add</Button>
      </Space>
      <Table
        rowKey={(record) => record.id}
        dataSource={data}
        loading={loadingData}
      >
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column
          align="center"
          title="Action"
          key="action"
          width={`10%`}
          render={(_, record) => (
            <Space size="middle">
              <Button type="link" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button
                type="link"
                danger
                onClick={() => handleDelete(record?.id)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
      <ModalInput />
      {modalHolder}
      {messageHolder}
    </div>
  );
}
