import { Button } from "react-bootstrap";
import { useState } from "react";
import styles from "./ProductAdd.module.scss";
import clsx from "clsx";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import productAPI from "../../../../apis/products/products.api";

function ProductAdd(): JSX.Element {
  const [code, setCode] = useState<string>("");
  const [nameProduct, setNameProduct] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");
  const [classify, setClassify] = useState<string>("");
  const [validate, setValidate] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);

  const [gallery, setGallery] = useState<File[] | null>([]);

  const handleSave = async () => {
    // const allProduct = {
    //   sku: code,
    //   name: nameProduct,
    //   category: classify,
    //   author: author,
    //   unit_price: price,
    //   avatar: avatar,
    //   gallery: gallery, // Đảm bảo gallery là một mảng
    // };
    // try {
    //   await productAPI.addProduct(allProduct);
    // } catch (error) {
    //   setShow(true);
    // }
  };

  const getClassify = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setClassify(event.target.value);
  };

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    const numericValue = parseFloat(inputValue); // Chuyển chuỗi thành số

    setPrice(numericValue); // Lưu dưới dạng số
  };

  // Để hiển thị giá trị đã định dạng trong giao diện người dùng, bạn có thể sử dụng formattedPrice:

  const formattedPrice = price.toLocaleString("vi-VN", {
    style: "decimal",
  });
  console.log(formattedPrice);

  // Và sau đó sử dụng `formattedPrice` để hiển thị giá trị trong JSX.

  const uploadAvatarImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();
    fileInput.addEventListener("change", (e) => handleFileSelect(e));
  };

  const handleFileSelect = async (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const selectedFile = inputElement.files[0];

      if (selectedFile) {
        setAvatar(selectedFile);
      }
    }
  };

  const uploadDescriptionImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true; // Cho phép chọn nhiều tệp
    fileInput.click();
    fileInput.addEventListener("change", (e) => handleFileSelectAll(e));
  };
  const handleFileSelectAll = async (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.files) {
      const selectedFiles = Array.from(inputElement.files); // Chuyển NodeList thành mảng
      if (selectedFiles) {
        setGallery(selectedFiles);
      }
    }
  };

  return (
    <div className={clsx(styles.wrapper, "row")}>
      <div className={clsx(styles.wrapper_content_left, "col-6")}>
        <h2>{formattedPrice}</h2>
        <form method="post">
          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextUserName"
          >
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Mã sản phẩm"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}>
              {/* {validate.sku}
                    {errorDisplay.messageSku}
                    {errorDisplay.sku} */}
            </small>
          </Form.Group>

          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextEmail"
          >
            <Col sm="10">
              <Form.Control
                type="email"
                name="text"
                placeholder="Tên Tác giả"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}>
              {/* {validate.nameProduct}
                    {errorDisplay.messageName}
                    {errorDisplay.nameProduct} */}
            </small>
          </Form.Group>

          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextFirstName"
          >
            <Col sm="10">
              <Form.Control
                type="text"
                // as="textarea"
                placeholder="Tên sách"
                value={nameProduct}
                onChange={(event) => setNameProduct(event.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextLastName"
          >
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Đơn giá"
                value={price || 0}
                onChange={handlePrice}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}></small>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Col sm="10">
              <Form.Select
                className={clsx(styles.input_select, "mb-4")}
                onChange={(event) => getClassify(event)}
                value={classify}
              >
                <option disabled hidden value="0">
                  Thể loại
                </option>
                <option value="1">Sách thiếu nhi</option>
                <option value="2">Sách văn học nghệ thuật</option>
                <option value="3">Sách Truyện, tiểu thuyết</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <div className={clsx(styles.btn_wrapper)}>
            <Button className={clsx(styles.btn)} onClick={uploadAvatarImage}>
              Tải ảnh bìa
            </Button>

            <Button
              className={clsx(styles.btn)}
              onClick={uploadDescriptionImage}
            >
              Tải ảnh mô tả
            </Button>
          </div>
          <Button className={clsx(styles.btn_save)} onClick={handleSave}>
            Lưu
          </Button>
        </form>
      </div>
      <div
        className={clsx(styles.wrapper_content_right, "col-6")}
        style={{ border: "2px solid" }}
      >
        <div className={clsx(styles.preview_product, "row")}>
          <div className={clsx(styles.content_preview_product_left, "col-6")}>
            <div className={styles.preview}>
              <img
                src="https://product.hstatic.net/200000542683/product/dac-nhan-tam-bia-cung_7b27996e707248f686f5949517965ddb.jpg"
                alt="img-preview"
              />
            </div>
          </div>
          <div className={clsx(styles.content_preview_product_right, "col-6")}>
            <div className={clsx(styles.name)}>
              <h2>Đắc Nhân Tâm</h2>
            </div>
            <div className={styles.author}>
              <h2>
                <b>Tác giả: </b>Chưa cập nhật
              </h2>
            </div>
            <div className={styles.prices}>
              <h2>126.000VNĐ</h2>
            </div>
            <div className={styles.wrapper_btn}>
              <button>-</button>1<button>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdd;
