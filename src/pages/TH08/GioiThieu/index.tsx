import React from 'react';
import { Card, Avatar, Typography, Tag, Space, Divider } from 'antd';
import { GithubOutlined, FacebookOutlined, MailOutlined } from '@ant-design/icons';

export default () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
    <Card style={{ width: 500, textAlign: 'center', borderRadius: 15, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <Avatar size={100} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Diep" />
      <Typography.Title level={2} style={{ marginTop: 15 }}>Nguyễn Văn Điệp</Typography.Title>
      <Typography.Text type="secondary">Sinh viên CNTT - PTIT</Typography.Text>
      <Divider>Kỹ năng</Divider>
      <Space wrap style={{ justifyContent: 'center' }}>
        <Tag color="blue">ReactJS</Tag><Tag color="cyan">TypeScript</Tag><Tag color="geekblue">UmiJS</Tag><Tag color="purple">Ant Design</Tag>
      </Space>
      <Divider>Liên hệ</Divider>
      <Space size="large" style={{ fontSize: 24 }}>
        <GithubOutlined onClick={() => window.open('https://github.com/')} />
        <FacebookOutlined onClick={() => window.open('https://www.facebook.com/iepnguyen.980727?viewas=100000686899395&locale=vi_VN')}/>
        <MailOutlined onClick={() => window.open('https://mail.google.com/mail/u/0/?pli=1#inbox')}/>
      </Space>
    </Card>
  </div>
);
