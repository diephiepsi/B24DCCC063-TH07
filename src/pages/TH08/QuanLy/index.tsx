import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Tag, Popconfirm, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

export default () => {
  const { baiViets, setBaiViets } = useModel('QuanLyTH08');

  const columns: any[] = [
    { title: 'Tiêu đề', dataIndex: 'tieuDe', width: '30%' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'trangThai',
      valueEnum: { Draft: { text: 'Nháp', status: 'Default' }, Published: { text: 'Đã đăng', status: 'Success' } },
    },
    { title: 'Thẻ', dataIndex: 'tags', render: (tags: string[]) => tags.map(t => <Tag key={t}>{t}</Tag>), search: false },
    { title: 'Lượt xem', dataIndex: 'luotXem', sorter: true, search: false },
    { title: 'Ngày tạo', dataIndex: 'ngayDang', valueType: 'date', sorter: true },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_: any, record: TH08Type.BaiViet) => [
        <Button key="edit" type="link" icon={<EditOutlined />}>Sửa</Button>,
        <Popconfirm key="del" title="Xóa bài viết?" onConfirm={() => {
          setBaiViets(baiViets.filter(p => p.id !== record.id));
          message.success('Đã xóa');
        }}><Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button></Popconfirm>,
      ],
    },
  ];

  return (
    <ProTable
      headerTitle="Quản lý Bài viết TH08"
      dataSource={baiViets}
      columns={columns}
      rowKey="id"
      toolBarRender={() => [<Button key="add" type="primary" icon={<PlusOutlined />} shape="round">Thêm bài mới</Button>]}
    />
  );
};