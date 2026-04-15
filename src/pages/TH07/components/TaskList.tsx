import ProTable from '@ant-design/pro-table';
import { Button, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';

export default (props: any) => {
  const { tasks, setTasks, allUsers } = props;

  const handleSave = async (v: any, id?: string) => {
    if (id) setTasks(tasks.map((t: any) => t.id === id ? { ...t, ...v } : t));
    else setTasks([...tasks, { ...v, id: Date.now().toString() }]);
    return true;
  };

  const userEnum = allUsers.reduce((acc: any, cur: any) => ({ ...acc, [cur.username]: { text: cur.username } }), {});

  return (
    <ProTable
      rowKey="id"
      search={{ defaultCollapsed: false }}
      params={{ tasks }} // Kích hoạt render lại khi tasks đổi
      request={async (params: any) => {
        let data = [...tasks];
        if (params.title) data = data.filter(i => i.title.toLowerCase().includes(params.title.toLowerCase()));
        if (params.assignee) data = data.filter(i => i.assignee === params.assignee);
        if (params.status) data = data.filter(i => i.status === params.status);
        return { data, success: true };
      }}
      columns={[
        { title: 'Tên tác vụ', dataIndex: 'title' },
        { title: 'Người thực hiện', dataIndex: 'assignee', valueType: 'select', valueEnum: userEnum },
        { title: 'Trạng thái', dataIndex: 'status', valueEnum: { Todo: 'Chưa làm', Doing: 'Đang làm', Done: 'Xong' } },
        { title: 'Hạn chót', dataIndex: 'deadline', valueType: 'date', search: false },
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
    <ProFormText name="title" label="Tên việc" rules={[{ required: true }]} />
    <ProFormSelect name="assignee" label="Giao cho người đã đăng nhập" options={allUsers.map((u:any)=>u.username)} rules={[{ required: true }]} />
    <ProFormSelect name="status" label="Trạng thái" options={['Todo', 'Doing', 'Done']} initialValue="Todo" />
    <ProFormDatePicker name="deadline" label="Hạn chót" width="100%" rules={[{ required: true }]} />
  </>
);