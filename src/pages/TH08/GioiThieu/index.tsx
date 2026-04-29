import React from 'react';
import { Card, Avatar, Typography, Tag, Row, Col, Divider, Space, Tooltip } from 'antd';
import { GithubOutlined, FacebookOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

// Danh sách thành viên nhóm TH08 với Link GitHub đã cập nhật
const NHOM_PHAT_TRIEN = [
  {
    ten: 'Nguyễn Văn Điệp',
    vaiTro: 'Nhóm trưởng / Fullstack Developer',
    moTa: 'Chịu trách nhiệm quản lý dự án và xây dựng các tính năng cốt lõi của Blog.',
    kyNang: ['React', 'UmiJS', 'Ant Design'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diep',
    github: 'https://github.com/diephiepsi',
    facebook: '#', // Điền link FB vào đây
    email: 'mailto:your-email@gmail.com', // Điền email vào đây
  },
  {
    ten: 'Lê Trọng Mai',
    vaiTro: 'Frontend Developer',
    moTa: 'Tập trung vào trải nghiệm người dùng và thiết kế giao diện trang chủ chuyên nghiệp.',
    kyNang: ['HTML/CSS', 'Javascript', 'UI/UX'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai',
    github: 'https://github.com/mailt-B24DCCC189',
    facebook: '#',
    email: 'mailto:email-của-mai@gmail.com',
  },
  {
    ten: 'Vương Hồng Tuyển',
    vaiTro: 'Backend Developer',
    moTa: 'Xây dựng cấu trúc dữ liệu và xử lý logic quản lý nội dung bài viết.',
    kyNang: ['Node.js', 'MySQL', 'API Design'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tuyen',
    github: 'https://github.com/htuyn',
    facebook: '#',
    email: 'mailto:email-của-tuyển@gmail.com',
  },
  {
    ten: 'Bùi Văn Thắng',
    vaiTro: 'Content / Tester',
    moTa: 'Quản lý nội dung Markdown và kiểm thử các chức năng tìm kiếm, phân trang.',
    kyNang: ['Markdown', 'Quality Control', 'Data'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thang',
    github: 'https://github.com/B24DCCC242-buivanthang',
    facebook: '#',
    email: 'mailto:email-của-thắng@gmail.com',
  }
];

export default () => {
  return (
    <div style={{ padding: '40px 24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 50 }}>
        <Title level={1}>Đội Ngũ Phát Triển Dự Án TH08</Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          Nhóm sinh viên CNTT - Học viện Công nghệ Bưu chính Viễn thông (PTIT)
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} justify="center">
        {NHOM_PHAT_TRIEN.map((member, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              hoverable
              style={{ borderRadius: 16, textAlign: 'center', height: '100%', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
              bodyStyle={{ padding: '30px 20px' }}
            >
              <Avatar 
                size={100} 
                src={member.avatar} 
                icon={<UserOutlined />} 
                style={{ marginBottom: 20, border: '4px solid #f0f2f5' }}
              />
              <Title level={4} style={{ marginBottom: 4 }}>{member.ten}</Title>
              <Text type="secondary" strong>{member.vaiTro}</Text>
              
              <Divider plain style={{ margin: '15px 0' }}>Giới thiệu</Divider>
              
              <Paragraph style={{ height: 60, overflow: 'hidden', fontSize: '13px' }}>
                {member.moTa}
              </Paragraph>

              <div style={{ marginBottom: 20 }}>
                {member.kyNang.map(skill => (
                  <Tag key={skill} color="blue" style={{ margin: '2px', borderRadius: 4 }}>{skill}</Tag>
                ))}
              </div>

              <Space size="large">
                <Tooltip title="Ghé thăm GitHub">
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <GithubOutlined style={{ fontSize: 22, color: '#333' }} />
                  </a>
                </Tooltip>
                
                <Tooltip title="Liên hệ Facebook">
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                    <FacebookOutlined style={{ fontSize: 22, color: '#1877f2' }} />
                  </a>
                </Tooltip>
                
                <Tooltip title="Gửi Email">
                  <a href={member.email}>
                    <MailOutlined style={{ fontSize: 22, color: '#ff4d4f' }} />
                  </a>
                </Tooltip>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: 60, textAlign: 'center' }}>
        <Divider />
        <Text type="secondary">© 2026 Nhóm TH08 - PTIT - Giảng viên hướng dẫn: nvnhan</Text>
      </div>
    </div>
  );
};