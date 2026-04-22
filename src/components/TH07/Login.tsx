import React from 'react';
import { Card, Form, Input, Button, Typography, message, Divider, Space, Tag } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, SecurityScanOutlined, InfoCircleOutlined } from '@ant-design/icons';

const Login = ({ allUsers, setAllUsers, setCurrentUser }: any) => {
  const onFinish = (values: any) => {
    const user = allUsers.find((u: any) => u.username === values.username);
    if (user) {
      if (user.password === values.password) {
        setCurrentUser(values.username);
        message.success(`Chào mừng ${values.username}!`);
      } else message.error('Sai mật khẩu!');
    } else {
      setAllUsers([...allUsers, values]);
      setCurrentUser(values.username);
      message.success('Tài khoản mới đã được tự động đăng ký!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Card style={{ width: 400, borderRadius: 20, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} bordered={false}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <SecurityScanOutlined style={{ fontSize: 50, color: '#764ba2', marginBottom: 10 }} />
          <Typography.Title level={2}>HỆ THỐNG TH07</Typography.Title>
        </div>
        <Form onFinish={onFinish} layout="vertical" size="large">
          <Form.Item name="username" rules={[{ required: true, message: 'Nhập tên đăng nhập!' }]}><Input prefix={<UserOutlined />} placeholder="Username" /></Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Nhập mật khẩu!' }]}><Input.Password prefix={<LockOutlined />} placeholder="Password" /></Form.Item>
          <Button type="primary" htmlType="submit" block icon={<LoginOutlined />} style={{ height: 50, borderRadius: 10, background: '#764ba2', border: 'none' }}>ĐĂNG NHẬP / ĐĂNG KÝ</Button>
        </Form>
        <Divider />
        <div style={{ textAlign: 'center', background: '#f0f2f5', padding: '15px', borderRadius: 12 }}>
          <Space direction="vertical" size={0}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}><InfoCircleOutlined /> Tài khoản mẫu:</Typography.Text>
            <Typography.Text strong>admin / 123</Typography.Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};
export default Login;