import { Card, Form, Input, Button, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, SecurityScanOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = ({ allUsers, setAllUsers, setCurrentUser }: any) => {
  const onFinish = (values: any) => {
    const { username, password } = values;
    // Tìm kiếm xem user đã tồn tại trong hệ thống (allUsers) chưa
    const user = allUsers.find((u: any) => u.username === username);

    if (user) {
      // Nếu user đã tồn tại -> Kiểm tra mật khẩu
      if (user.password === password) {
        setCurrentUser(username);
        message.success(`Chào mừng ${username} trở lại!`);
      } else {
        message.error('Mật khẩu không chính xác. Vui lòng thử lại!');
      }
    } else {
      // Nếu user chưa tồn tại -> Tự động "đăng ký" và đăng nhập
      setAllUsers([...allUsers, { username, password }]);
      setCurrentUser(username);
      message.success('Tài khoản mới đã được tạo và đăng nhập thành công!');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        // Nền Gradient xanh dương - tím hiện đại, nhẹ nhàng
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        padding: 20,
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 16,
          // Hiệu ứng Glassmorphism: đổ bóng mờ và bo góc mạnh
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
        bordered={false}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          {/* Icon bảo mật lớn phía trên tiêu đề */}
          <SecurityScanOutlined style={{ fontSize: 50, color: '#1890ff', marginBottom: 15 }} />
          <Title level={2} style={{ margin: 0, color: '#262626' }}>
            QUẢN LÝ CÔNG VIỆC
          </Title>
          <Text type="secondary">TH07 - Đăng nhập hệ thống</Text>
        </div>

        <Form
          name="login_form"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large" // Làm cho các ô input và nút bấm lớn hơn, dễ thao tác
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Tên đăng nhập (Username)"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Mật khẩu (Password)"
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 10 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              icon={<LoginOutlined />}
              style={{
                borderRadius: 8,
                height: 45,
                fontSize: 16,
                fontWeight: 'bold',
                // Hiệu ứng shadow cho nút bấm
                boxShadow: '0 4px 14px 0 rgba(24, 144, 255, 0.3)',
              }}
            >
              ĐĂNG NHẬP / ĐĂNG KÝ
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '20px 0' }} />

        
      </Card>
    </div>
  );
};


export default Login;