import React, { useState, useEffect } from 'react';
import {
	Table,
	Tag,
	Space,
	Button,
	Input,
	Select,
	Card,
	Typography,
	Modal,
	Form,
	message,
	Popconfirm,
	Tooltip,
	Avatar,
	Row,
	Col,
	Statistic,
} from 'antd';
import {
	PlusOutlined,
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
	EyeOutlined,
	GlobalOutlined,
	RocketOutlined,
	CheckCircleOutlined,
	FileTextFilled,
	FireFilled,
	PieChartFilled,
	FormOutlined,
	ThunderboltFilled,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface BaiViet {
	id: string;
	tieuDe: string;
	slug: string;
	tomTat: string;
	noiDung: string;
	tacGia: string;
	ngayDang: string;
	tags: string[];
	luotXem: number;
	trangThai: 'Published' | 'Draft';
	anhDaiDien: string;
}

const PostManagement: React.FC = () => {
	const [form] = Form.useForm();
	const [baiViets, setBaiViets] = useState<BaiViet[]>(() => {
		const saved = localStorage.getItem('th08_posts');
		return saved ? JSON.parse(saved) : [];
	});

	const [danhSachTags] = useState<string[]>(['React', 'TH08', 'TypeScript', 'Frontend', 'UmiJS']);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [searchText, setSearchText] = useState('');
	const [filterStatus, setFilterStatus] = useState<string | null>(null);

	useEffect(() => {
		localStorage.setItem('th08_posts', JSON.stringify(baiViets));
	}, [baiViets]);

	const showModal = (record?: BaiViet) => {
		if (record) {
			setEditingId(record.id);
			form.setFieldsValue(record);
		} else {
			setEditingId(null);
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleSave = (values: any) => {
		if (editingId) {
			const updatedData = baiViets.map((item) => (item.id === editingId ? { ...item, ...values } : item));
			setBaiViets(updatedData);
			message.success('Cập nhật nội dung thành công!');
		} else {
			const newPost: BaiViet = {
				...values,
				id: `bv-${Date.now()}`,
				luotXem: 0,
				ngayDang: dayjs().format('YYYY-MM-DD'),
				tacGia: 'Nguyễn Văn Điệp',
			};
			setBaiViets([newPost, ...baiViets]);
			message.success('Xuất bản bài viết thành công!');
		}
		setIsModalVisible(false);
		form.resetFields();
	};

	const handleDelete = (id: string) => {
		setBaiViets(baiViets.filter((item) => item.id !== id));
		message.error('Đã xóa bài viết');
	};

	const columns = [
		{
			title: 'BÀI VIẾT',
			key: 'article',
			width: '45%',
			render: (record: BaiViet) => (
				<Space size={16}>
					<Avatar
						shape='square'
						size={72}
						src={record.anhDaiDien || 'https://via.placeholder.com/150'}
						style={{ borderRadius: '14px', boxShadow: '0 8px 16px rgba(0,0,0,0.06)', border: '2px solid #fff' }}
					/>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
						<Text strong style={{ fontSize: '16px', color: '#1e293b', letterSpacing: '-0.3px' }}>
							{record.tieuDe}
						</Text>
						<Text type='secondary' style={{ fontSize: '13px' }}>
							<GlobalOutlined style={{ color: '#6366f1' }} /> /{record.slug}
						</Text>
						<div style={{ marginTop: '2px' }}>
							<Tag
								icon={<FileTextFilled />}
								style={{
									border: 'none',
									background: '#f1f5f9',
									color: '#64748b',
									borderRadius: '4px',
									fontSize: '11px',
								}}
							>
								{record.ngayDang}
							</Tag>
						</div>
					</div>
				</Space>
			),
		},
		{
			title: 'TRẠNG THÁI',
			dataIndex: 'trangThai',
			key: 'trangThai',
			align: 'center' as const,
			render: (status: string) => (
				<Tag
					color={status === 'Published' ? 'success' : 'warning'}
					style={{
						borderRadius: '20px',
						fontWeight: 700,
						padding: '4px 14px',
						fontSize: '11px',
					}}
				>
					{status === 'Published' ? <CheckCircleOutlined /> : <FormOutlined />}{' '}
					{status === 'Published' ? 'ĐÃ ĐĂNG' : 'BẢN NHÁP'}
				</Tag>
			),
		},
		{
			title: 'CHỦ ĐỀ',
			dataIndex: 'tags',
			key: 'tags',
			render: (tags: string[]) => (
				<Space size={[0, 4]} wrap style={{ maxWidth: '200px' }}>
					{tags?.map((tag) => (
						<Tag
							key={tag}
							style={{ borderRadius: '6px', background: '#eef2ff', border: 'none', color: '#4f46e5', fontWeight: 500 }}
						>
							#{tag}
						</Tag>
					))}
				</Space>
			),
		},
		{
			title: 'XU HƯỚNG',
			dataIndex: 'luotXem',
			key: 'luotXem',
			sorter: (a: BaiViet, b: BaiViet) => a.luotXem - b.luotXem,
			render: (val: number) => (
				<div style={{ background: '#fff7ed', padding: '6px 12px', borderRadius: '10px', display: 'inline-block' }}>
					<Statistic
						value={val}
						valueStyle={{ fontSize: '14px', color: '#ea580c', fontWeight: 800 }}
						prefix={<FireFilled style={{ fontSize: '14px' }} />}
					/>
				</div>
			),
		},
		{
			title: '',
			key: 'action',
			align: 'right' as const,
			render: (record: BaiViet) => (
				<Space>
					<Tooltip title='Chỉnh sửa'>
						<Button
							type='text'
							shape='circle'
							icon={<EditOutlined style={{ color: '#4f46e5', fontSize: '18px' }} />}
							onClick={() => showModal(record)}
							style={{ background: '#f5f3ff' }}
						/>
					</Tooltip>
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa bài viết này không?'
						onConfirm={() => handleDelete(record.id)}
						okText='Xóa'
						cancelText='Hủy'
						okButtonProps={{ danger: true, style: { borderRadius: '8px' } }}
					>
						<Button
							type='text'
							danger
							shape='circle'
							icon={<DeleteOutlined style={{ fontSize: '18px' }} />}
							style={{ background: '#fff1f2' }}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];

	const filteredData = baiViets.filter((item) => {
		const matchSearch = item.tieuDe.toLowerCase().includes(searchText.toLowerCase());
		const matchStatus = filterStatus ? item.trangThai === filterStatus : true;
		return matchSearch && matchStatus;
	});

	return (
		<div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh' }}>
			<Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
				<Col span={6}>
					<Card bordered={false} style={{ borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
						<Statistic
							title={
								<Text strong style={{ color: '#64748b' }}>
									TỔNG BÀI VIẾT
								</Text>
							}
							value={baiViets.length}
							prefix={<FileTextFilled style={{ color: '#6366f1' }} />}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
						<Statistic
							title={
								<Text strong style={{ color: '#64748b' }}>
									ĐÃ XUẤT BẢN
								</Text>
							}
							value={baiViets.filter((b) => b.trangThai === 'Published').length}
							prefix={<ThunderboltFilled style={{ color: '#10b981' }} />}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
						<Statistic
							title={
								<Text strong style={{ color: '#64748b' }}>
									LƯỢT XEM
								</Text>
							}
							value={baiViets.reduce((acc, cur) => acc + (cur.luotXem || 0), 0)}
							prefix={<EyeOutlined style={{ color: '#f59e0b' }} />}
						/>
					</Card>
				</Col>
				<Col span={6}>
					<Card bordered={false} style={{ borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
						<Statistic
							title={
								<Text strong style={{ color: '#64748b' }}>
									CHỦ ĐỀ
								</Text>
							}
							value={danhSachTags.length}
							prefix={<PieChartFilled style={{ color: '#ec4899' }} />}
						/>
					</Card>
				</Col>
			</Row>

			<Card
				bordered={false}
				style={{ borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)' }}
				bodyStyle={{ padding: '0' }}
			>
				<div
					style={{
						padding: '32px',
						borderBottom: '1px solid #f1f5f9',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Space size='large'>
						<Input
							placeholder='Tìm kiếm nội dung...'
							prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
							style={{ width: 400, borderRadius: '14px', background: '#f1f5f9', border: 'none', height: '48px' }}
							size='large'
							onChange={(e) => setSearchText(e.target.value)}
							allowClear
						/>
						<Select
							placeholder='Trạng thái'
							style={{ width: 180 }}
							size='large'
							allowClear
							onChange={(val) => setFilterStatus(val)}
						>
							<Select.Option value='Published'>Công khai</Select.Option>
							<Select.Option value='Draft'>Bản nháp</Select.Option>
						</Select>
					</Space>
					<Button
						type='primary'
						size='large'
						icon={<PlusOutlined />}
						onClick={() => showModal()}
						style={{
							borderRadius: '16px',
							height: '52px',
							fontWeight: 800,
							background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
							border: 'none',
							padding: '0 32px',
							boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)',
						}}
					>
						VIẾT BÀI MỚI
					</Button>
				</div>

				<Table
					columns={columns}
					dataSource={filteredData}
					rowKey='id'
					pagination={{ pageSize: 6, style: { padding: '24px' } }}
				/>
			</Card>

			<Modal
				title={
					<div style={{ textAlign: 'center', padding: '10px 0' }}>
						<div
							style={{
								background: '#f5f3ff',
								width: '56px',
								height: '56px',
								borderRadius: '16px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								margin: '0 auto 16px',
							}}
						>
							<RocketOutlined style={{ fontSize: '28px', color: '#6366f1' }} />
						</div>
						<Title level={3} style={{ margin: 0, fontWeight: 800 }}>
							{editingId ? 'Cập Nhật Nội Dung' : 'Soạn Thảo Bài Viết'}
						</Title>
					</div>
				}
				visible={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				onOk={() => form.submit()}
				width={1100}
				centered
				okText='LƯU BÀI VIẾT'
				cancelText='HỦY'
				okButtonProps={{ style: { height: '48px', borderRadius: '12px', fontWeight: 700, padding: '0 32px' } }}
				cancelButtonProps={{ style: { height: '48px', borderRadius: '12px' }, type: 'text' }}
			>
				<Form form={form} layout='vertical' onFinish={handleSave} style={{ marginTop: '24px' }}>
					<Row gutter={32}>
						<Col span={15}>
							<Form.Item
								name='tieuDe'
								label={<Text strong>TIÊU ĐỀ BÀI VIẾT</Text>}
								rules={[{ required: true, message: 'Nhập tiêu đề!' }]}
							>
								<Input placeholder='Nhập tiêu đề thu hút...' size='large' style={{ borderRadius: '10px' }} />
							</Form.Item>
							<Form.Item
								name='tomTat'
								label={<Text strong>TÓM TẮT NGẮN</Text>}
								rules={[{ required: true, message: 'Nhập tóm tắt!' }]}
							>
								<TextArea rows={3} placeholder='Mô tả nội dung bài viết...' style={{ borderRadius: '10px' }} />
							</Form.Item>
							<Form.Item
								name='noiDung'
								label={<Text strong>NỘI DUNG (MARKDOWN)</Text>}
								rules={[{ required: true, message: 'Nhập nội dung!' }]}
							>
								<TextArea
									rows={15}
									style={{ borderRadius: '10px', background: '#f8fafc', fontFamily: 'monospace', fontSize: '14px' }}
								/>
							</Form.Item>
						</Col>
						<Col span={9}>
							<div
								style={{ background: '#f8fafc', padding: '28px', borderRadius: '24px', border: '1px solid #e2e8f0' }}
							>
								<Form.Item name='trangThai' label={<Text strong>TRẠNG THÁI</Text>} initialValue='Published'>
									<Select size='large' style={{ borderRadius: '10px' }}>
										<Select.Option value='Published'>Công khai bài viết</Select.Option>
										<Select.Option value='Draft'>Lưu bản nháp</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item name='tags' label={<Text strong>CHỦ ĐỀ (TAGS)</Text>}>
									<Select mode='tags' placeholder='Chọn tag' size='large' style={{ borderRadius: '10px' }}>
										{danhSachTags.map((t) => (
											<Select.Option key={t} value={t}>
												{t}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
								<Form.Item name='slug' label={<Text strong>ĐƯỜNG DẪN (SLUG)</Text>} rules={[{ required: true }]}>
									<Input prefix={<GlobalOutlined />} placeholder='slug-bai-viet' style={{ borderRadius: '8px' }} />
								</Form.Item>
								<Form.Item name='anhDaiDien' label={<Text strong>URL ẢNH BÌA</Text>} rules={[{ required: true }]}>
									<Input placeholder='Link ảnh từ Unsplash/Pexels...' style={{ borderRadius: '8px' }} />
								</Form.Item>
								<div style={{ marginTop: '24px', textAlign: 'center' }}>
									<Text
										type='secondary'
										style={{ fontSize: '11px', display: 'block', marginBottom: '10px', fontWeight: 800 }}
									>
										XEM TRƯỚC ẢNH BÌA
									</Text>
									<Form.Item shouldUpdate={(prev, curr) => prev.anhDaiDien !== curr.anhDaiDien} noStyle>
										{({ getFieldValue }) => (
											<div
												style={{
													width: '100%',
													height: '180px',
													borderRadius: '16px',
													overflow: 'hidden',
													border: '2px dashed #cbd5e1',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													background: '#fff',
												}}
											>
												{getFieldValue('anhDaiDien') ? (
													<img
														src={getFieldValue('anhDaiDien')}
														alt='Preview'
														style={{ width: '100%', height: '100%', objectFit: 'cover' }}
													/>
												) : (
													<Text type='secondary'>Chưa có ảnh</Text>
												)}
											</div>
										)}
									</Form.Item>
								</div>
							</div>
						</Col>
					</Row>
				</Form>
			</Modal>
		</div>
	);
};

export default PostManagement;
