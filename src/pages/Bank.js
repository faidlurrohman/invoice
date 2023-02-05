import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Space,
  Table,
} from "antd";

export default function Bank() {
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
      form.setFieldsValue({
        id: value?.id,
        name: value?.name,
        unique_no: value?.unique_no,
      });
    },
    [form]
  );

  // modal input
  const ModalInput = () => {
    return (
      <Modal
        centered
        open={isShow}
        title={`${isEdit ? `Edit` : `Add`} Bank`}
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
                  message: "Please input name of bank!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Unique No"
              name={"unique_no"}
              rules={[
                {
                  required: true,
                  message: "Please input unique no!",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
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
          url: "bank/delete",
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
  const handleAdd = useCallback(({ id, name, unique_no }) => {
    const FORM = new FormData();
    FORM.append("name", name);
    FORM.append("unique_no", unique_no);

    if (id) FORM.append("id", id);

    setLoadingAdd(true);

    axios({
      method: "POST",
      url: `/bank/${id ? `edit` : `add`}`,
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
      .get("/bank")
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