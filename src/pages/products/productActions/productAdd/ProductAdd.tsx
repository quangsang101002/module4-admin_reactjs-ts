import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./ProductAdd.module.scss";
import clsx from "clsx";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import productAPI from "../../../../apis/products/products.api";
import { BodyProduct } from "../../../../apis/products/products.interFace.api";

function ProductAdd(): JSX.Element {
  const [code, setCode] = useState<string>("");
  const [nameProduct, setNameProduct] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [author, setAuthor] = useState<string>("");
  const [classify, setClassify] = useState<string>("");
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[] | null>([]);
  const [number, setNumber] = useState<string>("");
  const [validate, setValidate] = useState<{ [key: string]: string }>({});
  console.log(validate);

  useEffect(() => {
    setDataChanged(true);
  }, [code, nameProduct, price, author, classify, avatar, gallery]);

  useEffect(() => {
    window.addEventListener("beforeunload", confirmExit);
    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, [dataChanged]);

  function confirmExit(e: BeforeUnloadEvent) {
    if (dataChanged) {
      e.preventDefault();
      e.returnValue = "Bạn có chắc muốn rời khỏi trang này?";
    }
  }

  const handleSave = async () => {
    const formData = new FormData();
    // Thêm các trường dữ liệu sản phẩm vào formData
    formData.append("sku", code);
    formData.append("name", nameProduct);
    formData.append("category", classify);
    formData.append("description", author);
    formData.append("unit_price", price.toString());

    // Kiểm tra xem avatar và gallery có giá trị trước khi thêm vào formData
    if (avatar) {
      formData.append("avatar", avatar);
    }

    if (gallery) {
      for (let img of gallery) {
        formData.append("gallery", img);
      }
    }

    try {
      // Gửi bodyProduct tới API để thêm sản phẩm
      await productAPI.addProduct(formData);
    } catch (error) {
      setShow(true);
    }
  };

  const getClassify = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setClassify(event.target.value);
  };

  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/,/, ""); // Chuyển chuỗi thành số

    setPrice(parseInt(numericValue)); // Lưu dưới dạng số
    console.log(numericValue);

    setNumber(new Intl.NumberFormat().format(Number(numericValue) || 0));
  };

  // Để hiển thị giá trị đã định dạng trong giao diện người dùng, bạn có thể sử dụng formattedPrice:

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

  const handleSaveInfo = () => {
    const validateError = validateName();
    if (validateError.size === 0) {
      setShow(false);
      handleSave();
      setValidate({ someKey: "" });
    } else {
      setValidate(Object.fromEntries(validateError));

      return;
    }
  };

  const validateName = () => {
    let error = new Map<string, string>();

    if (typeof code !== "string" || code.length === 0) {
      error.set("sku", "Mã sản phẩm không được bỏ trống");
    } else if (typeof nameProduct !== "string" || nameProduct.length === 0) {
      error.set("nameProduct", "Tên sản phẩm không được bỏ trống");
    } else if (typeof price !== "number" || price.toString().length === 0) {
      error.set("price", "Đơn giá không được bỏ trống");
    }

    return error;
  };

  return (
    <div className={clsx(styles.wrapper, "row")}>
      <div className={clsx(styles.wrapper_content_left, "col-6")}>
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
              {validate.sku}
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
                name="text"
                placeholder="Tên sách"
                value={nameProduct}
                onChange={(event) => setNameProduct(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}>
              {validate.nameProduct}
            </small>
          </Form.Group>

          <Form.Group
            as={Row}
            className={clsx(styles.input, "mb-4")}
            controlId="formPlaintextLastName"
          >
            <Col sm="10">
              <Form.Control
                maxLength={9}
                type="text"
                placeholder="Đơn giá"
                value={number}
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
                <option disabled hidden value="">
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
          <Button className={clsx(styles.btn_save)} onClick={handleSaveInfo}>
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
