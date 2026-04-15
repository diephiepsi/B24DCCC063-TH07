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
				image='https://www.bing.com/images/search?view=detailV2&ccid=hV21m%2fxI&id=02827630943F40DA774A01944FA9FD3B4BEFF5B4&thid=OIP.hV21m_xIjZclIHZHwnK1eQHaHN&mediaurl=https%3a%2f%2fcdn.kona-blue.com%2fupload%2fkona-blue_com%2fpost%2fimages%2f2024%2f09%2f18%2f457%2favatar-mac-dinh-11.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.855db59bfc488d9725207647c272b579%3frik%3dtPXvSzv9qU%252bUAQ%26pid%3dImgRaw%26r%3d0&exph=633&expw=650&q=Anh+%c4%90ai+Dien+Facebook+Mac+%c4%90inh&FORM=IRPRST&ck=6C08960260B0A1310E4AFB32AE522F83&selectedIndex=7&itb=0'
				description='Sinh viên PTIT - Đam mê xây dựng giao diện người dùng (UI/UX) và lập trình ReactJS chuyên nghiệp.'
			/>
		</div>
	);
};

export default ProfileCardPage;
