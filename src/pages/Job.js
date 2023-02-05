import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function Job() {
  const [modal, modalHolder] = Modal.useModal();
  const [messageApi, messageHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [jobType, setJobType] = useState();
  const [customer, setCustomer] = useState();
  const [customerType, setCustomerType] = useState();
  const [customerCode, setCustomerCode] = useState();
  const [loadingData, setLoadingData] = useState(false);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [isShow, setShow] = useState(false);

  const [isEdit, setEdit] = useState(false);

  // modal
  const handleModal = useCallback(() => {
    form.resetFields();
    form.setFieldValue({
      job_orders: [],
    });
    setShow(!isShow);
    setEdit(false);
  }, [isShow]);

  // edit
  const handleEdit = useCallback(
    (value) => {
      setEdit(true);
      setShow(true);

      let _jo = JSON.parse(value?.job_orders);

      form.setFieldsValue({
        id: value?.id,
        customer_ship_id: value?.customer_ship_id,
        customer_type_id: value?.customer_type_id,
        customer_code_id: value?.customer_code_id,
        job_orders: !!_jo.length
          ? _jo.map((item) => {
              item.type_id = String(item.type_id);

              return item;
            })
          : [],
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
        title={`${isEdit ? `Edit` : `Add`} Job`}
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
              name="customer_ship_id"
              label="Customer"
              rules={[
                {
                  required: true,
                  message: "Please select customer!",
                },
              ]}
            >
              <Select allowClear>
                {customer &&
                  customer.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item?.id}>
                        {item?.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              name="customer_type_id"
              label="Customer Type"
              rules={[
                {
                  required: true,
                  message: "Please select customer type!",
                },
              ]}
            >
              <Select allowClear>
                {customerType &&
                  customerType.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item?.id}>
                        {item?.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              name="customer_code_id"
              label="Customer Code"
              rules={[
                {
                  required: true,
                  message: "Please select customer code!",
                },
              ]}
            >
              <Select allowClear>
                {customerCode &&
                  customerCode.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item?.id}>
                        {item?.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            {/* job order */}
            <Form.List name="job_orders">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item noStyle>
                        <Form.Item
                          {...field}
                          label="Job Type"
                          name={[field.name, "type_id"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select job type!",
                            },
                          ]}
                        >
                          <Select allowClear style={{ width: 160 }}>
                            {jobType &&
                              jobType.map((item) => {
                                return (
                                  <Select.Option key={item.id} value={item?.id}>
                                    {item?.name}
                                  </Select.Option>
                                );
                              })}
                          </Select>
                        </Form.Item>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Cost"
                        name={[field.name, "cost"]}
                        rules={[
                          {
                            required: true,
                            message: "Please input cost!",
                          },
                        ]}
                        labelCol={12}
                      >
                        <InputNumber style={{ width: 150 }} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add job order
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
          url: "job/delete",
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
  const handleAdd = useCallback(
    ({
      id,
      customer_ship_id,
      customer_type_id,
      customer_code_id,
      job_orders,
    }) => {
      const FORM = new FormData();

      if (id) FORM.append("id", id);

      FORM.append("customer_ship_id", customer_ship_id);
      FORM.append("customer_type_id", customer_type_id);
      FORM.append("customer_code_id", customer_code_id);
      FORM.append(
        "job_orders",
        JSON.stringify(
          job_orders
            ? job_orders.map((item) => {
                item.type_id = parseInt(item.type_id);

                return item;
              })
            : []
        )
      );

      setLoadingAdd(true);

      axios({
        method: "POST",
        url: `/job/${id ? `edit` : `add`}`,
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
    },
    []
  );

  // get job
  const getData = () => {
    const endpoints = [
      "/job",
      "/jobtype",
      "/customer",
      "/customer_type",
      "/customer_code",
    ];

    setLoadingData(true);
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(([job, job_type, customer, customer_type, customer_code]) => {
        setData(job);
        setJobType(job_type);
        setCustomer(customer);
        setCustomerType(customer_type);
        setCustomerCode(customer_code);
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
        <Table.Column title="Job No" dataIndex="job_no" key="job_no" />
        <Table.Column
          title="Customer"
          dataIndex="customer_ship"
          key="customer_ship"
        />
        <Table.Column
          title="Customer Type"
          dataIndex="customer_type"
          key="customer_type"
        />
        <Table.Column
          title="Customer Code"
          dataIndex="customer_code"
          key="customer_code"
        />
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
