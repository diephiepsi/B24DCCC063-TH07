import React, { useState } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

export default () => {
  const { danhSachTags, setDanhSachTags, baiViets } = useModel('QuanLyTH08');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [form] = Form.useForm();

  const columns: any[] = [
    { title: 'Tên thẻ (Tag)', dataIndex: 'name', key: 'name' },
    { 
      title: 'Số bài viết đang dùng', 
      key: 'count',
      render: (_: any, record: any) => {
        // Tính số bài viết có chứa tag này
        const count = baiViets.filter(bv => bv.tags.includes(record.name)).length;
        return <b>{count} bài viết</b>;
      }
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_: any, record: any) => [
        <Button key="edit" type="link" onClick={() => {
          setEditingTag(record.name);
          form.setFieldsValue({ name: record.name });
          setIsModalOpen(true);
        }} icon={<EditOutlined />}>Sửa</Button>,
        <Popconfirm key="del" title="Xóa thẻ này?" onConfirm={() => {
          setDanhSachTags(danhSachTags.filter(t => t !== record.name));
          message.success('Đã xóa thẻ');
        }}>
          <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>
      ],
    },
  ];

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingTag) {
      setDanhSachTags(danhSachTags.map(t => t === editingTag ? values.name : t));
      message.success('Đã cập nhật thẻ');
    } else {
      setDanhSachTags([...danhSachTags, values.name]);
      message.success('Đã thêm thẻ mới');
    }
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <ProTable
        headerTitle="Danh sách thẻ bài viết"
        dataSource={danhSachTags.map(t => ({ name: t }))}
        columns={columns}
        rowKey="name"
        search={false}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => {
            setEditingTag(null);
            setIsModalOpen(true);
          }}>Thêm thẻ</Button>
        ]}
      />
      <Modal 
        title={editingTag ? "Sửa thẻ" : "Thêm thẻ mới"} 
        visible={isModalOpen} 
        onOk={handleOk} 
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên thẻ" rules={[{ required: true, message: 'Không được để trống' }]}>
            <Input placeholder="Ví dụ: React, Nodejs..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};