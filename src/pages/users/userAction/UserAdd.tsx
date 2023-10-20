import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import styles from "./UserAdd.module.scss";
import clsx from "clsx";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDropzone } from "react-dropzone";
import { AiOutlinePlusCircle } from "react-icons/ai";
import UserApi from "../../../apis/users/users.api";

function UserAdd(): JSX.Element {
  const [userName, setUserName] = useState<string>("");
  const [email, setMail] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [firstName, setFirtName] = useState<string>("");
  const [lastName, setLName] = useState<string>("");
  const [classify, setClassify] = useState<string>("");
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[] | null>([]);
  const [number, setNumber] = useState<string>("");
  const [validate, setValidate] = useState<{ [key: string]: string }>({});
  const [productPreview, setproductPreview] = useState<Product[]>([]);
  const [base64Image, setBase64Image] = useState<string>("");
  const [base64Images, setBase64Images] = useState<string[]>([]);

  console.log("avatar", avatar);
  console.log("gallery", gallery);

  interface Product {
    category: number;
    created_at: string;
    created_by_id: number;
    description: string;
    image: string;
    name: string;
    product_id: number;
    sku: string;
    unit_price: number;
    updated_at: string;
    updated_by_id: number;
  }

  useEffect(() => {
    setDataChanged(true);
  }, [userName, email, price, firstName, classify, avatar, gallery]);

  useEffect(() => {
    window.addEventListener("beforeunload", confirmExit);
    window.addEventListener("unload", handleUnload);
    window.addEventListener("popstate", () => {
      console.log(1);
    });
    return () => {
      window.removeEventListener("beforeunload", confirmExit);
      window.removeEventListener("unload", handleUnload);
    };
  }, [dataChanged]);

  function confirmExit(e: BeforeUnloadEvent) {
    if (dataChanged) {
      e.preventDefault();
      e.returnValue = "Bạn có chắc muốn rời khỏi trang này?";
    }
  }

  function handleUnload(e: BeforeUnloadEvent) {
    if (dataChanged) {
      e.preventDefault();
      // handleDelete();
      e.returnValue = "Bạn có chắc muốn rời khỏi trang này?";
    }
  }

  const handleAdd = async () => {
    const formData = new FormData();
    // Thêm các trường dữ liệu sản phẩm vào formData
    formData.append("sku", userName);
    formData.append("name", email);
    formData.append("category", classify);
    formData.append("description", firstName);
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
      await UserApi.AddUser(formData);
    } catch (error) {
      setShow(true);
    }
  };

  const getClassify = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setClassify(event.target.value);
  };

  const setLastName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/,/, ""); // Chuyển chuỗi thành số

    setPrice(parseInt(numericValue)); // Lưu dưới dạng số

    setNumber(new Intl.NumberFormat().format(Number(numericValue) || 0));
  };

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

  const handleSubmit = () => {
    const validateError = validateName();
    if (validateError.size === 0) {
      setShow(false);
      handleAdd();
      setValidate({ someKey: "" });
    } else {
      setValidate(Object.fromEntries(validateError));

      return;
    }
  };

  const validateName = () => {
    let error = new Map<string, string>();

    if (typeof userName !== "string" || userName.length === 0) {
      error.set("sku", "Mã sản phẩm không được bỏ trống");
    } else if (typeof email !== "string" || email.length === 0) {
      error.set("email", "Tên sản phẩm không được bỏ trống");
    } else if (typeof price !== "number" || price.toString().length === 0) {
      error.set("price", "Đơn giá không được bỏ trống");
    }

    return error;
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setAvatar(file);
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data: string = reader.result as string;
      setBase64Image(base64Data);
    };
    reader.readAsDataURL(file);

    // setGallery(acceptedFiles);
    // acceptedFiles.forEach((file) => {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     const base64Data = reader.result as string;
    //     setBase64Images((prevImages) => [...prevImages, base64Data]);
    //   };
    //   reader.readAsDataURL(file);
    // });
  };

  const onDrop2 = (acceptedFiles: File[]) => {
    // console.log("onDrop2", onDrop2);
    // const file = acceptedFiles[0];
    // setAvatar(file);
    // const reader = new FileReader();

    // reader.onload = () => {
    //   const base64Data: string = reader.result as string;
    //   setBase64Image(base64Data);
    // };
    // reader.readAsDataURL(file);

    setGallery(acceptedFiles);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        setBase64Images((prevImages) => [...prevImages, base64Data]);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropzone = useDropzone({
    onDrop: onDrop2,
  });

  dropzone.getRootProps;
  dropzone.getInputProps;
  dropzone.isDragActive;
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
                placeholder="userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}>
              {validate.sku}
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
                name="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setMail(event.target.value)}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}>
              {validate.email}
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
                placeholder="firstName"
                value={firstName}
                onChange={(event) => setFirtName(event.target.value)}
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
                maxLength={9}
                type="text"
                placeholder="lastName"
                value={lastName}
                onChange={setLastName}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}></small>
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
                placeholder="passWord"
                value={number}
                onChange={setLastName}
              />
            </Col>
            <small className="text-center" style={{ color: "red" }}></small>
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
                placeholder="repeatPassWord"
                value={number}
                onChange={setLastName}
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
                  Rode
                </option>
                <option value="1">Admind</option>
                <option value="2">Customer</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <div className={clsx(styles.btn_wrapper)}>
            <div className={clsx(styles.btn)}>
              <div>
                <div {...getRootProps()}>
                  {/* <input {...getRootProps({ multiple: false })} /> */}
                  {isDragActive ? (
                    <p>Thả hình ảnh vào đây...</p>
                  ) : (
                    <Button>Tải ảnh đại diện</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button className={clsx(styles.btn_save)} onClick={handleSubmit}>
            Lưu
          </Button>
        </form>
      </div>
      <div
        className={clsx(styles.wrapper_content_right, "col-6")}
        style={{ border: "2px solid" }}
      >
        <div className={clsx(styles.preview_product, "row")}>
          <div className={clsx(styles.content_preview_product_left, "col-12")}>
            <div className="wrapper-conten-info">
              <div className={styles.preview}>
                {base64Image && (
                  <img
                    className="mt-3"
                    src={base64Image}
                    alt="Uploaded"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </div>
              <div>
                <h2 className="text-center mt-5">
                  <b>{userName}</b>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdd;
