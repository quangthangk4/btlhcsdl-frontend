import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from '../styles/Account.module.scss'
import ListAccount from './componentAccount/ListAccount';

const UserSearch = () => {
    const [APIData, setAPIData] = useState([]);              // Lưu dữ liệu API gốc
    const [searchInput, setSearchInput] = useState('');      // Lưu đầu vào tìm kiếm
    const [filteredResults, setFilteredResults] = useState([]); // Lưu kết quả tìm kiếm lọc
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState({})
    const [open, setOpen] = useState(true);


    // useEffect để gọi API khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // sessionStorage.removeItem('customerData');
            const storedData = sessionStorage.getItem('customerData');
            if (storedData) {
                setAPIData(JSON.parse(storedData));
                setFilteredResults(JSON.parse(storedData));
                setLoading(false);

                console.log(APIData);
            } else {
                // Nếu chưa có dữ liệu trong sessionStorage, gọi API để lấy dữ liệu
                try {
                    const response = await axios.get(`http://localhost:8080/customer`);
                    setAPIData(response.data);
                    setFilteredResults(response.data);
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
        setOpen(true);
    }

    const handleOpen = (data) => {
        setOpen(data);
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Danh sách người dùng</h2>
            {loading ?
                <div className={styles.loading}>
                    <Spinner className={styles.loading__spinner} animation="border" variant="primary" />
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

                        <table border="2" style={{ width: '90%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Tên</th>
                                    <th>Địa chỉ Nhà</th>
                                    <th>Địa chỉ Văn Phòng</th>
                                    <th>Số điện thoại</th>

                                </tr>
                            </thead>
                            <tbody>
                                {(filteredResults || []).map((customer) => (
                                    <tr onClick={() => handleListAccout(customer)} key={customer.cid}>
                                        <td>{customer.cid}</td>
                                        <td>{customer.cemail}</td>
                                        <td>{`${customer.cfirstName} ${customer.clastName}`}</td>
                                        <td>{customer.chomeAddress}</td>
                                        <td>{customer.cofficeAddress}</td>
                                        <td>
                                            {(customer.cphoneNumberEntitty || []).map((phone, index) => (
                                                <div key={index}>{phone.cphoneNumber}</div>
                                            ))}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
            {customer.cid && (
                <ListAccount customer={customer} open={open} handleOpen={handleOpen} />
            )}
        </div>
    );
};

export default UserSearch;
