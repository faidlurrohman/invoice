import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Excel } from "antd-table-saveas-excel";
import PieChart, {
  Series as PieSeries,
  Label as PieLabel,
  Connector,
} from "devextreme-react/pie-chart";
import { exportWidgets } from "devextreme/viz/export";

let data_exports = [],
  columns_exports = [],
  jt_tmp = [],
  ttl_jt = {};

export default function Invoice() {
  const [modal, modalHolder] = Modal.useModal();
  const [messageApi, messageHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [bank, setBank] = useState();
  const [job, setJob] = useState();
  const [loadingData, setLoadingData] = useState(false);

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [isShow, setShow] = useState(false);

  const [isEdit, setEdit] = useState(false);

  const pieChartRef = useRef();

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
        bank_id: value?.bank_id,
        job_id: value?.job_id,
        payment: value?.payment,
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

  const handleJobChange = (value) => {
    form.setFieldsValue({
      job_orders: [],
      payment: "",
    });

    if (value) {
      let _fj = job.find((i) => i.id === value);
      let _pfj = JSON.parse(_fj?.job_orders);
      let _ttl = 0;

      _pfj.map((i) => {
        _ttl += i?.cost;
      });

      form.setFieldsValue({
        job_orders: _pfj,
        payment: _ttl,
      });
    }
  };

  // modal input
  const ModalInput = () => {
    return (
      <Modal
        centered
        open={isShow}
        title={`${isEdit ? `Edit` : `Add`} Invoice`}
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
              name="bank_id"
              label="Bank"
              rules={[
                {
                  required: true,
                  message: "Please select bank!",
                },
              ]}
            >
              <Select allowClear>
                {bank &&
                  bank.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item?.id}>
                        {item?.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              name="job_id"
              label="Job No"
              rules={[
                {
                  required: true,
                  message: "Please select job!",
                },
              ]}
            >
              <Select allowClear onChange={handleJobChange}>
                {job &&
                  job.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item?.id}>
                        {item?.job_no}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
            {/* job order */}
            <Form.List name="job_orders">
              {(fields) => (
                <>
                  {fields.map((field) => (
                    <Space key={field.key} align="baseline">
                      <Form.Item noStyle>
                        <Form.Item
                          {...field}
                          label="Job Type"
                          name={[field.name, "job_type"]}
                          rules={[{ required: true }]}
                        >
                          <Input
                            disabled
                            style={{ width: 160, color: "rgba(0, 0, 0, 0.88)" }}
                          />
                        </Form.Item>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        label="Cost"
                        name={[field.name, "cost"]}
                        rules={[{ required: true }]}
                        labelCol={12}
                      >
                        <InputNumber style={{ width: 170 }} disabled />
                      </Form.Item>
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
            <Form.Item
              label="Payment"
              name={"payment"}
              labelAlign={"right"}
              labelCol={{ offset: 11, span: 4 }}
              rules={[
                {
                  required: true,
                  message: "Payment cant be empty!",
                },
              ]}
              style={{ marginLeft: 14 }}
            >
              <Input
                style={{ width: 170, color: "rgba(0, 0, 0, 0.88)" }}
                disabled
              />
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
          url: "invoice/delete",
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
  const handleAdd = useCallback(({ id, job_id, bank_id, payment }) => {
    const FORM = new FormData();

    if (id) FORM.append("id", id);

    FORM.append("job_id", job_id);
    FORM.append("bank_id", bank_id);
    FORM.append("payment", payment);

    setLoadingAdd(true);

    axios({
      method: "POST",
      url: `/invoice/${id ? `edit` : `add`}`,
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

  // get job
  const getData = () => {
    const endpoints = ["/invoice", "/job", "/bank", "/jobtype"];

    setLoadingData(true);
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(([invoice, job, bank, jobtype]) => {
        setData(invoice);
        setJob(job);
        setBank(bank);
        setLoadingData(false);
        makeCsv(invoice, jobtype);
      })
      .catch(() => setLoadingData(false));
  };

  // handle csv file
  const makeCsv = (invoice, jobtype) => {
    let jp = [];
    jt_tmp = jobtype;
    ttl_jt = {};
    columns_exports = [];
    data_exports = [];

    jobtype.map((item) => {
      jp.push({
        title: item?.name,
        dataIndex: `${item?.name}_${item?.id}`,
        key: `${item?.name}_${item?.id}`,
        width: 80,
      });
    });

    jp.push({
      title: "Pembayaran Diterima",
      dataIndex: "payment",
      key: "payment",
      width: 100,
    });

    columns_exports = [
      {
        title: "PT. SCN",
        render: () => (
          <img
            className="max-w-full md:max-w-md"
            src={"/logo192.png"}
            alt="Not found"
          />
        ),
        children: [
          {
            title: "LAPORAN PEMBAYARAN / PENERIMAAN DARI CUSTOMER",
            children: [
              {
                title: "",
                children: [
                  {
                    title: "No",
                    dataIndex: "no",
                    key: "no",
                    width: 30,
                  },
                  {
                    title: "Tgl. Pembayaran",
                    dataIndex: "invoice_date",
                    key: "invoice_date",
                    width: 120,
                  },
                  {
                    title: "No Invoice/Nota",
                    dataIndex: "invoice_no",
                    key: "invoice_no",
                    width: 120,
                  },
                  {
                    title: "No PUK",
                    dataIndex: "job_no",
                    key: "job_no",
                    width: 120,
                  },
                  {
                    title: "Tanggal PUK",
                    dataIndex: "job_date",
                    key: "job_date",
                    width: 120,
                  },
                  {
                    title: "Nama Kapal",
                    dataIndex: "customer_ship",
                    key: "customer_ship",
                    width: 120,
                  },
                  {
                    title: "Jenis Kustomer",
                    dataIndex: "customer_type",
                    key: "customer_type",
                    width: 120,
                  },
                  {
                    title: "Kode Kustomer",
                    dataIndex: "customer_code",
                    key: "customer_code",
                    width: 120,
                  },
                ],
              },
              {
                title: "Jenis Pelayanan",
                children: jp,
              },
              {
                title: "Shared Penerimaan",
                children: [
                  {
                    title: "PT. SCN 60%",
                    dataIndex: "to_scn",
                    key: "to_snc",
                    width: 100,
                  },
                  {
                    title: "BP. Batam 40%",
                    dataIndex: "to_bp_batam",
                    key: "to_bp_batam",
                    width: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    if (!!invoice.length) {
      invoice.map((item, indexInvoice) => {
        const {
          invoice_date,
          invoice_no,
          job_date,
          job_no,
          payment,
          customer_ship,
          customer_type,
          customer_code,
          job_orders,
        } = item;
        const pjo = job_orders ? JSON.parse(job_orders) : [];
        let _obj = {
          no: indexInvoice + 1,
          invoice_date,
          invoice_no,
          job_date,
          job_no,
          payment,
          customer_ship,
          customer_type,
          customer_code,
          to_scn: parseInt((parseInt(payment) / 100) * 60),
          to_bp_batam: parseInt((parseInt(payment) / 100) * 40),
        };

        if (!!pjo.length) {
          pjo.map((child) => {
            let unq = `${child?.job_type}_${child?.type_id}`;
            let unq_ttl = `${child?.job_type}_${child?.type_id}_ttl`;

            _obj[unq] = child?.cost;

            if (ttl_jt[unq_ttl]) {
              ttl_jt[unq_ttl] = ttl_jt[unq_ttl] += child?.cost;
            } else {
              ttl_jt[unq_ttl] = child?.cost;
            }
          });
        }

        data_exports.push(_obj);

        if (ttl_jt[`payment_ttl`]) {
          ttl_jt[`payment_ttl`] = ttl_jt[`payment_ttl`] += parseInt(payment);
        } else {
          ttl_jt[`payment_ttl`] = parseInt(payment);
        }

        if (ttl_jt[`to_scn_ttl`]) {
          ttl_jt[`to_scn_ttl`] = ttl_jt[`to_scn_ttl`] += _obj.to_scn;
        } else {
          ttl_jt[`to_scn_ttl`] = _obj.to_scn;
        }

        if (ttl_jt[`to_bp_batam_ttl`]) {
          ttl_jt[`to_bp_batam_ttl`] = ttl_jt[`to_bp_batam_ttl`] +=
            _obj.to_bp_batam;
        } else {
          ttl_jt[`to_bp_batam_ttl`] = _obj.to_bp_batam;
        }
      });
    }
  };

  // export
  const makeExcel = () => {
    const excel = new Excel();

    excel.addSheet("Laporan");
    excel.addColumns(columns_exports);
    excel.addDataSource(data_exports);
    excel.drawCell(0, excel.currentRow, {
      hMerge: 7,
      vMerge: 1,
      value: "TOTAL",
      style: {
        bold: true,
        v: "right",
        h: "right",
      },
    });

    if (!!jt_tmp.length) {
      let df_row = 7;
      jt_tmp.map((i) => {
        excel.drawCell((df_row += 1), excel.currentRow - 2, {
          hMerge: 0,
          vMerge: 1,
          value: ttl_jt[`${i?.name}_${i?.id}_ttl`],
          style: {
            bold: true,
            v: "right",
            h: "right",
          },
        });
      });

      excel.drawCell((df_row += 1), excel.currentRow - 2, {
        hMerge: 0,
        vMerge: 1,
        value: ttl_jt[`payment_ttl`],
        style: {
          bold: true,
          v: "right",
          h: "right",
        },
      });

      excel.drawCell((df_row += 1), excel.currentRow - 2, {
        hMerge: 0,
        vMerge: 1,
        value: ttl_jt[`to_scn_ttl`],
        style: {
          bold: true,
          v: "right",
          h: "right",
        },
      });

      excel.drawCell((df_row += 1), excel.currentRow - 2, {
        hMerge: 0,
        vMerge: 1,
        value: ttl_jt[`to_bp_batam_ttl`],
        style: {
          bold: true,
          v: "right",
          h: "right",
        },
      });
    }

    excel.saveAs("Laporan.xlsx");
  };

  const makeChart = () => {
    exportWidgets(pieChartRef.current?.instance, {
      fileName: "Chart",
      format: "PNG",
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`p-4`}>
      <Space className="pb-4" direction="horizontal">
        <Button onClick={handleModal}>Add</Button>
        {data && (
          <>
            <Button onClick={() => makeExcel()}>Download XLS</Button>
            <Button onClick={() => makeChart()}>Download Chart</Button>
          </>
        )}
      </Space>
      <Table
        rowKey={(record) => record.id}
        dataSource={data}
        loading={loadingData}
      >
        <Table.Column
          title="Invoice Date"
          dataIndex="invoice_date"
          key="invoice_date"
        />
        <Table.Column
          title="Invoice No"
          dataIndex="invoice_no"
          key="invoice_no"
        />
        <Table.Column title="Job Date" dataIndex="job_date" key="job_date" />
        <Table.Column title="Job No" dataIndex="job_no" key="job_no" />
        <Table.Column title="Bank" dataIndex="bank" key="bank" />
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
      </Table>{" "}
      {data && (
        <div className="charts">
          <PieChart
            id="pieChart"
            ref={pieChartRef}
            dataSource={[
              {
                name: "PT. SCN",
                total: ttl_jt?.to_scn_ttl || 0,
              },
              {
                name: "BP BATAM",
                total: ttl_jt?.to_bp_batam_ttl || 0,
              },
            ]}
            palette="Harmony Light"
            title={"Penerimaan Jasa Kepelabuhan"}
          >
            <PieSeries argumentField="name" valueField="total">
              <PieLabel
                visible={true}
                customizeText={(arg) => `${arg.valueText} ${arg.percentText}`}
              >
                <Connector visible={true} />
              </PieLabel>
            </PieSeries>
          </PieChart>
        </div>
      )}
      <ModalInput />
      {modalHolder}
      {messageHolder}
    </div>
  );
}
