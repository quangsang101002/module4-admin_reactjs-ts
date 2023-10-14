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
import Pagination from "../../components/table/Pagination";
import { Product } from "../products/ProductsInterFace";
function ProductList() {
  const [displayProduct, setDisplayProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetchDataProduct();
  }, []);

  const fetchDataProduct = async () => {
    try {
      const response = await UserApi.SearchUser("", 7, 1);
      if (response) {
        setDisplayProduct(response.result.recount);
      } else {
        alert("Invalid response format");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className={Styles.header_content}>
          <div className={Styles.header_title}>
            <h1>Quản lí sản phẩm</h1>
          </div>
          <div className={Styles.input_search}>
            <input type="text" placeholder="Search..."></input>
            <small className={Styles.search}>
              <IoIosSearch />
            </small>
          </div>
          <div className={Styles.add_product}>
            <Link to="/admin/product_add">
              <Button className={Styles.btn_create_product}>
                <IoMdAddCircle />
                Thêm Mới
              </Button>
              <Button className={Styles.btn_create_product}>Xóa Tất Cả</Button>
            </Link>
          </div>
        </div>

        <table id="customers">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Mô tả</th>
              <th>Phân loại</th>
              <th>Thời gian tạo</th>
              <th>Thời gian cập nhật</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody className={Styles.wrapper_table}>
            {displayProduct.length === 0 ? (
              <div className={clsx(Styles.serach_emrty)}>
                <h1 className="text-center">Không có sản phẩm nào</h1>
              </div>
            ) : (
              <>
                {displayProduct.map((user, index) => (
                  <tr key={user.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{user.sku}</td>
                    <td>{user.name}</td>
                    <td>{user.unit_price}</td>
                    <td>{user.description}</td>
                    <td>
                      {user.category === 1
                        ? "STN"
                        : user.category === 2
                        ? "VH & NT"
                        : "T & TT"}
                    </td>

                    <td>
                      {moment(user.created_at).format("YYYY-MM-DD HH:mm")}
                    </td>
                    <td>
                      {moment(user.updated_at).format("YYYY-MM-DD HH:mm")}
                    </td>
                    <td className="edit-main">
                      <Link to="/admin/product_edit">
                        {" "}
                        <Button>Sửa </Button>
                      </Link>

                      <Button className="ml-3" variant="danger">
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
}

export default ProductList;
