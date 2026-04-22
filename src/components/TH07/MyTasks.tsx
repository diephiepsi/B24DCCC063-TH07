import React from 'react';
import { List, Card, Tag, Statistic, Row, Col, Empty } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

export default ({ tasks, currentUser }: any) => {
  const data = tasks.filter((t: any) => t.assignee === currentUser);
  const done = data.filter((t: any) => t.status === 'Done').length;

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}><Card><Statistic title="Nhiệm vụ của bạn" value={data.length} /></Card></Col>
        <Col span={12}><Card><Statistic title="Hoàn thành" value={done} valueStyle={{ color: '#52c41a' }} suffix={`/ ${data.length}`} /></Card></Col>
      </Row>
      <Card title={<b>Việc được phân công cho {currentUser}</b>}>
        <List dataSource={data} locale={{ emptyText: <Empty description="Bạn đang rảnh rỗi!" /> }}
          renderItem={(item: any) => (
            <List.Item extra={<Tag color={item.status === 'Done' ? 'green' : 'orange'}>{item.status}</Tag>}>
              <List.Item.Meta title={<b>{item.title}</b>} description={<span><ClockCircleOutlined /> Deadline: {item.deadline}</span>} />
            </List.Item>
          )} />
      </Card>
    </div>
  );
};