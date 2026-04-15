import { List, Card, Tag, Statistic, Row, Col } from 'antd';

export default ({ tasks, currentUser }: any) => {
  const data = tasks.filter((t: any) => t.assignee === currentUser);
  const done = data.filter((t: any) => t.status === 'Done').length;

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}><Card><Statistic title="Việc của bạn" value={data.length} /></Card></Col>
        <Col span={12}><Card><Statistic title="Đã hoàn thành" value={done} valueStyle={{ color: '#52c41a' }} suffix={`/ ${data.length}`} /></Card></Col>
      </Row>
      <Card title={`Danh sách việc của ${currentUser}`}>
        <List dataSource={data} renderItem={(item: any) => (
          <List.Item extra={<Tag color={item.status === 'Done' ? 'green' : 'orange'}>{item.status}</Tag>}>
            <List.Item.Meta title={<b>{item.title}</b>} description={`Hạn: ${item.deadline}`} />
          </List.Item>
        )} />
      </Card>
    </div>
  );
};