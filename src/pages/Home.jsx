import React from 'react';
import home from '../img/home.jpg'; // Đảm bảo đường dẫn đúng với cấu trúc file của bạn

function Home(props) {
    return (
        <div
            style={{
                position: 'relative',
                marginTop: '-50px',
                backgroundImage: `url(${home})`, // Chèn đường dẫn hình ảnh vào template string
                backgroundSize: 'cover',          // Phủ toàn bộ container
                backgroundPosition: 'center',     // Căn giữa hình ảnh
                height: '100vh',                  // Chiều cao toàn màn hình (ví dụ)
                width: '100%',                    // Chiều rộng đầy đủ
            }}
        >
            <p style={{
                position: 'absolute', top: '20vh', left: '20vh',
                fontSize: '10rem', color: '#fff', textShadow: '2px 4px 6px rgba(0, 0, 0, 0.7)',
                userSelect: 'none',
            }}
            >
                Quản Lí<br />Tài Khoản
            </p>
        </div>
    );
}

export default Home;
