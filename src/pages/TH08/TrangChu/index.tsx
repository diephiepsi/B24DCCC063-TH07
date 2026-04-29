import React, { useState, useMemo } from 'react';
import { Row, Col, Card, Input, Tag, Pagination, Typography, Space, Empty } from 'antd';
import { useModel, history } from 'umi';
import { debounce } from 'lodash';

const { Title, Paragraph, Text } = Typography;

export default () => {
  const { baiViets } = useModel('QuanLyTH08');
  const [keyword, setKeyword] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const onSearch = useMemo(() => debounce((val: string) => {
    setKeyword(val);
    setPage(1);
  }, 300), []);

  const filteredData = baiViets.filter(item => {
    const matchSearch = item.tieuDe.toLowerCase().includes(keyword.toLowerCase());
    const matchTag = selectedTag ? item.tags.includes(selectedTag) : true;
    return matchSearch && matchTag && item.trangThai === 'Published';
  });

  const displayData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Blog Cá Nhân TH08</Title>
      
      <Space direction="vertical" style={{ width: '100%', marginBottom: 30 }} size="middle">
        <Input.Search 
          placeholder="Tìm kiếm bài viết..." 
          size="large" 
          onChange={(e) => onSearch(e.target.value)} 
          allowClear
        />
        <Space wrap>
          <Text strong>Lọc theo thẻ:</Text>
          <Tag color={!selectedTag ? 'blue' : 'default'} onClick={() => setSelectedTag(null)} style={{ cursor: 'pointer' }}>Tất cả</Tag>
          {['React', 'TH08', 'TypeScript', 'Frontend'].map(t => (
            <Tag key={t} color={selectedTag === t ? 'blue' : 'default'} onClick={() => setSelectedTag(t)} style={{ cursor: 'pointer' }}>{t}</Tag>
          ))}
        </Space>
      </Space>

      <Row gutter={[24, 24]}>
        {displayData.length > 0 ? displayData.map(item => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <Card
              hoverable
              cover={<img alt="cover" src={item.anhDaiDien} style={{ height: 200, objectFit: 'cover' }} />}
              onClick={() => history.push(`/th08/chi-tiet/${item.id}`)}
            >
              <Card.Meta 
                title={item.tieuDe}
                description={
                  <Space direction="vertical">
                    <div style={{ marginTop: 8 }}>{item.tags.map(t => <Tag key={t} color="cyan">{t}</Tag>)}</div>
                    <Paragraph ellipsis={{ rows: 2 }}>{item.tomTat}</Paragraph>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{item.ngayDang} • {item.luotXem} lượt xem</Text>
                  </Space>
                }
              />
            </Card>
          </Col>
        )) : <Empty style={{ width: '100%' }} />}
      </Row>

      <Pagination 
        style={{ marginTop: 40, textAlign: 'center' }} 
        current={page} 
        total={filteredData.length} 
        pageSize={pageSize} 
        onChange={setPage} 
      />
    </div>
  );
};