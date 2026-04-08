import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card, Button, Tag, Space } from 'antd';
import { useModel } from 'umi';
import Login from './components/Login';
import TaskList from './components/TaskList';
import AssignmentView from './components/AssignmentView';
import TaskCalendar from './components/TaskCalendar';

export default () => {
  const model = useModel('localStorage.th07' as any);
  if (!model.currentUser) return <Login {...model} />;

  return (
    <PageContainer title="QUẢN LÝ CÔNG VIỆC" extra={[
      <Space key="u"><Tag color="blue">{model.currentUser}</Tag><Button onClick={() => model.setCurrentUser(null)}>Đăng xuất</Button></Space>
    ]}>
      <Card bordered={false}>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="1. Tất cả & Tìm kiếm" key="1"><TaskList {...model} /></Tabs.TabPane>
          <Tabs.TabPane tab="2. Việc của tôi" key="2"><AssignmentView {...model} /></Tabs.TabPane>
          <Tabs.TabPane tab="3. Lịch Deadline" key="3"><TaskCalendar {...model} /></Tabs.TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};