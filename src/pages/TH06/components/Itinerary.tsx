import React, { useState, useMemo } from 'react';
import {
	Row,
	Col,
	Card,
	Button,
	List,
	Typography,
	Tag,
	Space,
	Statistic,
	Divider,
	Empty,
	message,
	Popconfirm,
	Badge,
	Select,
	Progress,
	DatePicker,
} from 'antd';
import {
	PlusOutlined,
	DeleteOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	CalendarOutlined,
	EnvironmentOutlined,
	RocketOutlined,
} from '@ant-design/icons';
import moment from 'moment';

interface Destination {
	id: string;
	name: string;
	location: string;
	type: string;
	price: number;
	duration: number;
	rating: number;
	image: string;
	budget?: { food: number; transport: number; accommodation: number };
}

interface PlanDay {
	day: number;
	date: string;
	items: Destination[];
}

interface PlannerProps {
	destinations: Destination[]; // Dữ liệu từ Admin truyền xuống
}

const Planner: React.FC<PlannerProps> = ({ destinations }) => {
	// State quản lý lịch trình người dùng chọn
	const [schedule, setSchedule] = useState<PlanDay[]>([{ day: 1, date: moment().format('YYYY-MM-DD'), items: [] }]);
	const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
	const [budgetLimit] = useState<number>(5000000);
	const [filterType, setFilterType] = useState<string | null>(null);

	// Thêm địa điểm vào ngày đang chọn
	const handleAdd = (dest: Destination) => {
		setSchedule((prev) =>
			prev.map((d, idx) => {
				if (idx === activeDayIndex) {
					if (d.items.some((i) => i.id === dest.id)) {
						message.warning('Địa điểm này đã có trong ngày này!');
						return d;
					}
					return { ...d, items: [...d.items, dest] };
				}
				return d;
			}),
		);
		message.success(`Đã thêm ${dest.name}`);
	};

	const handleDateChange = (date: any) => {
		if (!date) return;
		const newDateStr = date.format('YYYY-MM-DD');
		setSchedule((prev) => prev.map((d, i) => (i === activeDayIndex ? { ...d, date: newDateStr } : d)));
	};

	const addDay = () => {
		const lastDay = schedule[schedule.length - 1];
		const nextDate = moment(lastDay.date).add(1, 'days').format('YYYY-MM-DD');
		setSchedule([...schedule, { day: schedule.length + 1, date: nextDate, items: [] }]);
		setActiveDayIndex(schedule.length);
	};

	const moveItem = (fromIdx: number, toIdx: number) => {
		const newItems = [...schedule[activeDayIndex].items];
		const [moved] = newItems.splice(fromIdx, 1);
		newItems.splice(toIdx, 0, moved);
		setSchedule((prev) => prev.map((d, i) => (i === activeDayIndex ? { ...d, items: newItems } : d)));
	};

	// Tính toán thống kê dựa trên lịch trình hiện tại
	const stats = useMemo(() => {
		let totalBudget = 0;
		let totalTime = 0;
		schedule.forEach((d) =>
			d.items.forEach((item) => {
				totalBudget += item.price;
				totalTime += item.duration || 0;
			}),
		);
		return { totalBudget, totalTime };
	}, [schedule]);

	// Lọc danh sách địa điểm từ props Admin gửi qua
	const filteredData = useMemo(() => {
		let data = [...destinations];
		if (filterType) data = data.filter((d) => d.type === filterType);
		return data;
	}, [destinations, filterType]);

	const { Title, Text } = Typography;
	const { Option } = Select;

	return (
		<div style={{ padding: '30px 4%', backgroundColor: '#f4f7fe', minHeight: '100vh' }}>
			<Row justify='space-between' align='bottom' style={{ marginBottom: 32 }}>
				<Col>
					<Title level={2} style={{ margin: 0, color: '#1a3353' }}>
						<RocketOutlined style={{ color: '#1890ff', marginRight: 8 }} /> Lộ trình du lịch
					</Title>
				</Col>
				<Col>
					<Space size='large'>
						<Statistic
							title='Ngân sách dùng'
							value={stats.totalBudget}
							suffix='đ'
							valueStyle={{ color: stats.totalBudget > budgetLimit ? '#f5222d' : '#52c41a' }}
						/>
						<Statistic title='Thời gian' value={stats.totalTime} suffix='h' />
					</Space>
				</Col>
			</Row>

			<Row gutter={[24, 24]}>
				{/* CỘT TRÁI: DANH SÁCH ĐỊA ĐIỂM TỪ ADMIN */}
				<Col xs={24} lg={9}>
					<Card
						title={
							<b>
								<EnvironmentOutlined /> Khám phá điểm đến
							</b>
						}
						bodyStyle={{ padding: '12px' }}
						style={{ borderRadius: 12 }}
						extra={
							<Select placeholder='Lọc' allowClear style={{ width: 100 }} onChange={setFilterType}>
								<Option value='beach'>Biển</Option>
								<Option value='mountain'>Núi</Option>
								<Option value='city'>Phố</Option>
							</Select>
						}
					>
						<List
							dataSource={filteredData}
							locale={{ emptyText: <Empty description='Admin chưa thêm địa điểm nào' /> }}
							renderItem={(item) => (
								<List.Item style={{ padding: '8px 0', border: 'none' }}>
									<Card hoverable bodyStyle={{ padding: 12 }} style={{ width: '100%', borderRadius: 12 }}>
										<Row gutter={12} align='middle'>
											<Col span={8}>
												<img
													src={item.image}
													style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 8 }}
													alt={item.name}
												/>
											</Col>
											<Col span={12}>
												<Text strong>{item.name}</Text>
												<br />
												<Text type='danger' strong>
													{item.price?.toLocaleString()}đ
												</Text>
											</Col>
											<Col span={4}>
												<Button type='primary' shape='circle' icon={<PlusOutlined />} onClick={() => handleAdd(item)} />
											</Col>
										</Row>
									</Card>
								</List.Item>
							)}
						/>
					</Card>
				</Col>

				{/* CỘT PHẢI: LỊCH TRÌNH CHI TIẾT */}
				<Col xs={24} lg={15}>
					<Card style={{ borderRadius: 12 }} bodyStyle={{ padding: '24px' }}>
						<Text strong>Tiến độ chi tiêu</Text>
						<Progress
							percent={Math.min(100, Math.round((stats.totalBudget / budgetLimit) * 100))}
							status={stats.totalBudget > budgetLimit ? 'exception' : 'active'}
							style={{ marginBottom: 20 }}
						/>

						<div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 15 }}>
							{schedule.map((d, idx) => (
								<Badge key={idx} count={d.items.length}>
									<div
										onClick={() => setActiveDayIndex(idx)}
										style={{
											padding: '10px 18px',
											borderRadius: 12,
											cursor: 'pointer',
											backgroundColor: activeDayIndex === idx ? '#1890ff' : '#fff',
											color: activeDayIndex === idx ? '#fff' : '#595959',
											border: '1px solid #d9d9d9',
											minWidth: 90,
											textAlign: 'center',
										}}
									>
										<div style={{ fontSize: 11 }}>Ngày {idx + 1}</div>
										<div style={{ fontWeight: 'bold' }}>{moment(d.date).format('DD/MM')}</div>
									</div>
								</Badge>
							))}
							<Button type='dashed' icon={<PlusOutlined />} onClick={addDay} style={{ height: 58, borderRadius: 12 }}>
								Thêm
							</Button>
						</div>

						<Divider style={{ margin: '12px 0' }} />

						<div style={{ marginBottom: 20, padding: 15, background: '#f9f9f9', borderRadius: 8 }}>
							<Space>
								<CalendarOutlined />
								<Text>Ngày đi thực tế:</Text>
								<DatePicker
									value={moment(schedule[activeDayIndex].date)}
									onChange={handleDateChange}
									format='DD/MM/YYYY'
									allowClear={false}
								/>
							</Space>
						</div>

						<List
							dataSource={schedule[activeDayIndex].items}
							locale={{ emptyText: <Empty description='Chưa có điểm đến trong ngày này' /> }}
							renderItem={(item, index) => (
								<Card size='small' style={{ marginBottom: 10, borderRadius: 10 }}>
									<Row align='middle'>
										<Col flex='40px'>
											<Text strong style={{ color: '#1890ff' }}>
												{index + 1}
											</Text>
										</Col>
										<Col flex='auto'>
											<Text strong>{item.name}</Text>
											<div style={{ fontSize: 12, color: '#999' }}>{item.price?.toLocaleString()}đ</div>
										</Col>
										<Col>
											<Space>
												<Button
													size='small'
													type='text'
													icon={<ArrowUpOutlined />}
													disabled={index === 0}
													onClick={() => moveItem(index, index - 1)}
												/>
												<Button
													size='small'
													type='text'
													icon={<ArrowDownOutlined />}
													disabled={index === schedule[activeDayIndex].items.length - 1}
													onClick={() => moveItem(index, index + 1)}
												/>
												<Popconfirm
													title='Xóa khỏi ngày này?'
													onConfirm={() => {
														const newS = [...schedule];
														newS[activeDayIndex].items.splice(index, 1);
														setSchedule(newS);
													}}
												>
													<Button size='small' type='text' danger icon={<DeleteOutlined />} />
												</Popconfirm>
											</Space>
										</Col>
									</Row>
								</Card>
							)}
						/>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Planner;
