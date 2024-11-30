import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const UserSearch = () => {
    const [APIData, setAPIData] = useState([]);              // Lưu dữ liệu API gốc
    const [searchInput, setSearchInput] = useState('');      // Lưu đầu vào tìm kiếm
    const [filteredResults, setFilteredResults] = useState([]); // Lưu kết quả tìm kiếm lọc

    // useEffect để gọi API khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
                setAPIData(response.data);
                setFilteredResults(response.data); // Hiển thị tất cả dữ liệu ban đầu
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };
        fetchData();
    }, []);

    // Hàm xử lý tìm kiếm
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);  // Cập nhật state searchInput

        if (searchValue.trim() !== '') {
            // Lọc dữ liệu dựa trên chuỗi tìm kiếm
            const filteredData = APIData.filter((item) => {
                return Object.values(item)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFilteredResults(filteredData); // Cập nhật kết quả lọc
        } else {
            setFilteredResults(APIData); // Hiển thị tất cả dữ liệu nếu ô tìm kiếm trống
        }
    };

    return (
        <div>
            <h1>Danh sách người dùng</h1>
            {/* Ô nhập tìm kiếm */}
            <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchInput}
                onChange={(e) => searchItems(e.target.value)}  // Gọi hàm tìm kiếm khi người dùng nhập
            />
            {/* Hiển thị kết quả tìm kiếm */}
            <ul>
                {filteredResults.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearch;
