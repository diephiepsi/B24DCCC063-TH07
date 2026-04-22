import React from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Popconfirm, message, Tag } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';
import { filterTasksLocal } from '@/services/TH07';

const TaskList = (props: any) => {
  const { tasks, setTasks, allUsers } = props;

  const handleSave = async (v: any, id?: string) => {
    if (id) setTasks(tasks.map((t: any) => t.id === id ? { ...t, ...v } : t));
    else setTasks([{ ...v, id: Date.now().toString() }, ...tasks]);
    return true;
  };

  const userEnum = allUsers.reduce((acc: any, cur: any) => ({ ...acc, [cur.username]: { text: cur.username } }), {});

  return (
    <ProTable
      rowKey="id"
      search={{ defaultCollapsed: false }}
      params={{ tasks }} // Buộc ProTable render lại khi mảng tasks đổi
      request={async (params) => ({ data: filterTasksLocal(tasks, params), success: true })}
      columns={[
        { title: 'Tên tác vụ', dataIndex: 'title', copyable: true },
        { title: 'Người thực hiện', dataIndex: 'assignee', valueType: 'select', valueEnum: userEnum },
        { title: 'Trạng thái', dataIndex: 'status', valueEnum: { Todo: { text: 'Chưa làm', status: 'Default' }, Doing: { text: 'Đang làm', status: 'Processing' }, Done: { text: 'Đã xong', status: 'Success' } } },
        { title: 'Deadline', dataIndex: 'deadline', valueType: 'date', search: false },
        { title: 'Thao tác', valueType: 'option', render: (_, r) => [
          <ModalForm key="e" title="Sửa" trigger={<Button type="link" icon={<EditOutlined />} />} initialValues={r} onFinish={v => handleSave(v, r.id)}><Fields allUsers={allUsers} /></ModalForm>,
          <Popconfirm key="d" title="Xóa?" onConfirm={() => setTasks(tasks.filter((t: any) => t.id !== r.id))}><Button type="link" danger icon={<DeleteOutlined />} /></Popconfirm>
        ]}
      ]}
      toolBarRender={() => [<ModalForm key="a" title="Thêm việc" trigger={<Button type="primary" icon={<PlusOutlined />}>Thêm mới</Button>} onFinish={handleSave}><Fields allUsers={allUsers} /></ModalForm>]}
    />
  );
};

const Fields = ({ allUsers }: any) => (
  <>
    <ProFormText name="title" label="Tên công việc" rules={[{ required: true }]} />
    <ProFormSelect name="assignee" label="Phân công cho người dùng thực tế" options={allUsers.map((u: any) => u.username)} rules={[{ required: true }]} />
    <div style={{ display: 'flex', gap: 10 }}>
      <ProFormSelect name="priority" label="Ưu tiên" options={['Low', 'Medium', 'High']} width="sm" />
      <ProFormSelect name="status" label="Trạng thái" options={['Todo', 'Doing', 'Done']} width="sm" />
    </div>
    <ProFormDatePicker name="deadline" label="Hạn chót" width="100%" rules={[{ required: true }]} />
  </>
);
export default TaskList;