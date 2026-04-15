import React from 'react';
import { useMediaQuery } from 'react-responsive';
import './type.css';

const ProfileCard = ({ name, image, description }) => {
	const isMobile = useMediaQuery({ maxWidth: 768 });

	return (
		<div className='card-container'>
			<div className='profile-card'>
				<div className='card-image'>
					<img src={image} alt={name} />
				</div>

				<div className='card-info'>
					<h2>{name}</h2>
					<p>{description}</p>

					<div className='extra-content'>
						{isMobile ? (
							<div className='mobile-only'>
								<button className='btn-call'> Gọi ngay</button>
								<p>
									<small>Giao diện dành cho điện thoại</small>
								</p>
							</div>
						) : (
							<div className='desktop-only'>
								<button className='btn-email'> Gửi Email</button>
								<button className='btn-web'> Ghé thăm Website</button>
								<p>
									<small>Giao diện dành cho máy tính</small>
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

// Component chính để export
const ProfileCardPage = () => {
	return (
		<div style={{ padding: '40px 20px', background: '#f5f5f5', minHeight: '100vh' }}>
			<ProfileCard
				name='Nguyễn Văn A'
				image='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
				description='Sinh viên PTIT - Đam mê xây dựng giao diện người dùng (UI/UX) và lập trình ReactJS chuyên nghiệp.'
			/>
		</div>
	);
};

export default ProfileCardPage;
