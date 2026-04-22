import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card, Button, Tag, Space } from 'antd';
import { useModel } from 'umi';
import { LogoutOutlined, UserOutlined, TableOutlined, CalendarOutlined, SolutionOutlined } from '@ant-design/icons';
import Login from '@/components/TH07/Login';
import TaskList from '@/components/TH07/TaskList';
import MyTasks from '@/components/TH07/MyTasks';
import TaskCalendar from '@/components/TH07/TaskCalendar';

export default () => {
  const model = useModel('th07'); // Đảm bảo file model đặt là src/models/th07.ts
  if (!model.currentUser) return <Login {...model} />;

  return (
    <PageContainer title="QUẢN LÝ CÔNG VIỆC NHÓM" extra={[
      <Space key="u"><Tag color="blue" icon={<UserOutlined />} style={{ padding: '5px 10px', fontSize: 14 }}>{model.currentUser}</Tag>
      <Button danger icon={<LogoutOutlined />} onClick={() => model.setCurrentUser(null)}>Đăng xuất</Button></Space>
    ]}>
      <Card bordered={false}>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab={<span><TableOutlined /> Danh sách & Tìm kiếm</span>} key="1"><TaskList {...model} /></Tabs.TabPane>
          <Tabs.TabPane tab={<span><SolutionOutlined /> Nhiệm vụ của tôi</span>} key="2"><MyTasks {...model} /></Tabs.TabPane>
          <Tabs.TabPane tab={<span><CalendarOutlined /> Lịch Deadline</span>} key="3"><TaskCalendar {...model} /></Tabs.TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};