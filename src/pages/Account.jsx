import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/Account.module.scss'
import ListAccount from './componentAccount/ListAccount';

const UserSearch = () => {
    const [APIData, setAPIData] = useState([]);              // Lưu dữ liệu API gốc
    const [searchInput, setSearchInput] = useState('');      // Lưu đầu vào tìm kiếm
    const [filteredResults, setFilteredResults] = useState([]); // Lưu kết quả tìm kiếm lọc
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({})

    // useEffect để gọi API khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Kiểm tra nếu dữ liệu đã tồn tại trong sessionStorage
            const storedData = sessionStorage.getItem('customerData');
            if (storedData) {
                // Nếu có dữ liệu trong sessionStorage, dùng dữ liệu đó
                setAPIData(JSON.parse(storedData));
                setFilteredResults(JSON.parse(storedData)); // Hiển thị tất cả dữ liệu ban đầu
                setLoading(false);
            } else {
                // Nếu chưa có dữ liệu trong sessionStorage, gọi API để lấy dữ liệu
                try {
                    const response = await axios.get(`http://localhost:8080/customer`);
                    setAPIData(response.data);
                    setFilteredResults(response.data); // Hiển thị tất cả dữ liệu ban đầu
                    // Lưu dữ liệu vào sessionStorage để sử dụng sau này
                    sessionStorage.setItem('customerData', JSON.stringify(response.data));
                    setLoading(false);
                } catch (error) {
                    console.error("Lỗi khi gọi API:", error);
                    setLoading(false);
                }
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

    const handleListAccout = (customer) => {
        setCustomer(customer);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Danh sách người dùng</h1>
            {loading ?
                <div className={styles.loading}>
                    <Spinner className={styles.loading} animation="border" variant="primary" />
                </div>
                :
                <>
                    <input
                        className={styles.search}
                        type="text"
                        placeholder="Tìm kiếm customer..."
                        value={searchInput}
                        onChange={(e) => searchItems(e.target.value)}  // Gọi hàm tìm kiếm khi người dùng nhập
                    />
                    <div className={styles.table__center}>


                        <table border="2" style={{ width: '90%', borderCollapse: 'collapse'}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Tên</th>
                                    <th>Địa chỉ Nhà</th>
                                    <th>Địa chỉ Văn Phòng</th>
                                    <th>Số điện thoại</th>
                                    <th>Tài khoản</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredResults.map((customer) => (
                                    <tr onClick={() => handleListAccout(customer)} key={customer.cid}>
                                        <td>{customer.cid}</td>
                                        <td>{customer.cemail}</td>
                                        <td>{`${customer.cfirstName} ${customer.clastName}`}</td>
                                        <td>{customer.chomeAddress}</td>
                                        <td>{customer.cofficeAddress}</td>
                                        <td>
                                            {customer.cphoneNumberEntitty.map((phone, index) => (
                                                <div key={index}>{phone.cphoneNumber}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {customer.acountEntitty.map((account, index) => (
                                                <div key={index}>{account.account_number}</div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {customer && (
                <ListAccount />
            )}
        </div>
    );
};

export default UserSearch;
