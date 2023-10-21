import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "react-bootstrap";
import Styles from "./UserList.module.scss";
import clsx from "clsx";
import UserApi from "../../apis/users/users.api";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import "../../components/GlobalStyles/globalSTyleTable/StyleTable.scss";
import { IoMdAddCircle } from "react-icons/io";
import { User } from "../../../src/apis/GlobleIterface/GlobleInterFace";
import PaginationAdmin from "../../components/table/Pagination";
import PageNotFound from "../../components/errors/PageNotFound";
function UserList() {
  const [displayProduct, setDisplayProduct] = useState<User[]>([]);
  const [search, setSeach] = useState<string>("");
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<number[]>([]);

  console.log("isChange", isChange);

  useEffect(() => {
    fetchDataProduct();
  }, []);

  useEffect(() => {
    fetchDataProduct();
  }, [search, currentPage, isChange]);

  const fetchDataProduct = async () => {
    try {
      const response = await UserApi.SearchUser(search, 7, currentPage);
      if (response) {
        setDisplayProduct(response.result.recount);
        setTotalProduct(response.result.total);
      } else {
        alert("Invalid response format");
      }
    } catch (err) {
      alert(err);
    }
  };

  const searchUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeach(event.target.value);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const DeleteUser = async (id: number) => {
    try {
      await UserApi.deleteUser(id);
      await setIsChange(!isChange);
    } catch (err) {
      alert(err);
    }
  };
  const getId = (id: number) => {
    if (idUser.includes(id)) {
      const exits = idUser.filter((Userid) => Userid != id);
      setIdUser(exits);
    } else {
      setIdUser([...idUser, id]);
    }
  };
  const getAllId = () => {
    if (displayProduct.length === idUser.length) {
      setIdUser([]);
    } else {
      const allId = displayProduct.map((userId) => userId.id);
      setIdUser(allId);
    }
  };
  const handleDeleteAll = async () => {
    try {
      await UserApi.deleteUser(idUser);
      setIsChange(!isChange);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="wrapper">
      <div className="header_content">
        <div className="header_title">
          <h1>Quản lí người dùng</h1>
        </div>
        <div className="input_search">
          <input
            type="text"
            placeholder="Search..."
            onChange={searchUser}
          ></input>
          <small className="search">
            <IoIosSearch />
          </small>
        </div>
        <div className="add_product">
          <Link to="/admin/user_add">
            <Button className="btn_create_product">
              <IoMdAddCircle />
              Thêm Mới
            </Button>
          </Link>
          <Button className="btn_create_product" onClick={handleDeleteAll}>
            Xóa Tất Cả
          </Button>
        </div>
      </div>

      <table id="customers">
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={getAllId} />
            </th>
            <th>Tên Đăng Nhập</th>
            <th>Email</th>
            <th>Tên Người Dùng</th>
            <th>Vai Trò</th>

            <th>Thời gian tạo</th>
            <th>Thời gian cập nhật</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className={Styles.wrapper_table}>
          {displayProduct.length === 0 ? (
            <tr>
              <td colSpan={9}>
                <h1 className="text-center">Không có sản phẩm nào</h1>
              </td>
            </tr>
          ) : (
            <>
              {displayProduct.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox" onChange={() => getId(user.id)} />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {" "}
                    {user.role === 1 ? (
                      <span>Admin</span>
                    ) : (
                      <span>Customers</span>
                    )}
                  </td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{moment(user.created_at).format("YYYY-MM-DD HH:mm")}</td>
                  <td>{moment(user.updated_at).format("YYYY-MM-DD HH:mm")}</td>
                  <td className="edit-main">
                    <Link to={`/admin/user_edit/${user.id}`}>
                      {" "}
                      <Button>Sửa </Button>
                    </Link>

                    <Button
                      className="ml-3"
                      variant="danger"
                      onClick={() => DeleteUser(user.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <PaginationAdmin total={totalProduct} setPage={handlePageChange} />
    </div>
  );
}

export default UserList;
