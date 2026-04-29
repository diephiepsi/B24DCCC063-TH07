import React, { useEffect } from 'react';
import { useParams, useModel, history } from 'umi';
import { Typography, Tag, Button, Divider, Row, Col, Card, Space } from 'antd';
import { ArrowLeftOutlined, EyeOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';

export default () => {
  const { id } = useParams<{ id: string }>();
  const { baiViets, setBaiViets } = useModel('QuanLyTH08');
  const post = baiViets.find(b => b.id === id);

  useEffect(() => {
    if (post) {
      setBaiViets(prev => prev.map(item => item.id === id ? { ...item, luotXem: item.luotXem + 1 } : item));
    }
  }, [id]);

  if (!post) return null;

  const related = baiViets.filter(b => b.id !== id && b.tags.some(t => post.tags.includes(t))).slice(0, 3);

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px' }}>
      <Button icon={<ArrowLeftOutlined />} onClick={() => history.goBack()}>Quay lại</Button>
      <img src={post.anhDaiDien} style={{ width: '100%', height: 400, objectFit: 'cover', marginTop: 20, borderRadius: 12 }} />
      <Typography.Title style={{ marginTop: 20 }}>{post.tieuDe}</Typography.Title>
      <Space split={<Divider type="vertical" />} style={{ marginBottom: 20 }}>
        <span><UserOutlined /> {post.tacGia}</span>
        <span><CalendarOutlined /> {post.ngayDang}</span>
        <span><EyeOutlined /> {post.luotXem + 1} lượt xem</span>
      </Space>
      <div>{post.tags.map(t => <Tag key={t} color="blue">{t}</Tag>)}</div>
      <Divider />
      <div className="markdown-body"><ReactMarkdown>{post.noiDung}</ReactMarkdown></div>
      
      <Divider orientation="left">Bài viết liên quan</Divider>
      <Row gutter={16}>
        {related.map(item => (
          <Col span={8} key={item.id}>
            <Card size="small" hoverable onClick={() => history.push(`/th08/chi-tiet/${item.id}`)} cover={<img src={item.anhDaiDien} style={{ height: 120, objectFit: 'cover' }} />}>
              <Card.Meta title={item.tieuDe} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};