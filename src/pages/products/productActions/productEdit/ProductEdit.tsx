// import React, { useState, useEffect } from "react";

// function ProductEdit() {
//   const [dataChanged, setDataChanged] = useState<boolean>(false);
//   const [confirmExit, setConfirmExit] = useState<boolean>(false);

//   useEffect(() => {
//     if (dataChanged) {
//       window.onbeforeunload = () => true;
//     } else {
//       window.onbeforeunload = null;
//     }
//   }, [dataChanged]);

//   const handleDataChange = () => {
//     setDataChanged(true);
//   };

//   const handleSave = () => {
//     setDataChanged(false);
//   };

//   // const handleGoBack = () => {
//   //   if (dataChanged) {
//   //     setConfirmExit(true);
//   //   } else {
//   //     window.history.back();
//   //   }
//   // };

//   // const handleConfirmExit = (confirmed: boolean) => {
//   //   if (confirmed) {
//   //     window.history.back();
//   //   } else {
//   //     setConfirmExit(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   const handlePopstate = () => {
//   //     setDataChanged(true);
//   //   };

//   //   window.addEventListener("popstate", handlePopstate);

//   //   return () => {
//   //     window.removeEventListener("popstate", handlePopstate);
//   //   };
//   // }, [dataChanged]);

//   return (
//     <div>
//       <h1>Trang sửa sản phẩm</h1>
//       <button onClick={handleDataChange}>Thay đổi dữ liệu</button>
//       <button onClick={handleSave}>Lưu dữ liệu</button>
//       {/* <button onClick={handleGoBack}>Go back</button>
//        */}

//       {/* {confirmExit && (
//         <div className="confirmation-modal">
//           <p>Bạn có chắc muốn rời khỏi trang này? Dữ liệu chưa được lưu.</p>
//           <button onClick={() => handleConfirmExit(true)}>Có</button>
//           <button onClick={() => handleConfirmExit(false)}>Không</button>
//         </div>
//       )} */}
//     </div>
//   );
// }

// export default ProductEdit;

// import React, { useState } from "react";

// function ProductEdit() {
//   const [isRequired, setRequired] = useState<boolean>(false);

//   const toggleRequired = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     setRequired(!isRequired);
//   };

//   return (
//     <div>
//       <form className="was-validated">
//         <div className="mb-3">
//           <label htmlFor="validationTextarea" className="form-label">
//             Textarea
//           </label>
//           <textarea
//             className={`form-control ${isRequired ? "is-invalid" : ""}`}
//             id="validationTextarea"
//             placeholder="Required example textarea"
//             required={isRequired}
//           ></textarea>
//           <div className="invalid-feedback">
//             Please enter a message in the textarea.
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ProductEdit;

//Dùng base 64 tải 1 ảnh
// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import { useDropzone } from "react-dropzone";

// function ProductEdit() {
//   // Khai báo một state 'base64Image' để lưu trữ dữ liệu ảnh dưới dạng base64.
//   const [base64Image, setBase64Image] = useState<string>("");

//   // Hàm 'onDrop' được gọi khi tệp hình ảnh được thả vào khu vực Dropzone.
//   const onDrop = (acceptedFiles: File[]) => {
//     // Lấy tệp hình ảnh đầu tiên từ mảng 'acceptedFiles'.
//     const file = acceptedFiles[0];

//     // Tạo một đối tượng FileReader để đọc tệp hình ảnh và chuyển đổi nó thành base64.
//     const reader = new FileReader();

//     // Thiết lập một hàm xử lý sự kiện cho sự kiện 'onload' của FileReader.
//     reader.onload = () => {
//       // 'reader.result' chứa dữ liệu ảnh dưới dạng base64.
//       const base64Data: string = reader.result as string;
//       // Đặt state 'base64Image' với dữ liệu ảnh base64.
//       setBase64Image(base64Data);
//     };

//     // Đọc tệp hình ảnh và kích hoạt sự kiện 'onload' khi đọc xong.
//     reader.readAsDataURL(file);
//   };

//   // Sử dụng hook 'useDropzone' từ thư viện react-dropzone để quản lý khu vực Dropzone.
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div>
//       {/* 'getRootProps' chứa các thuộc tính và hàm để quản lý khu vực Dropzone. */}
//       <div {...getRootProps()} style={dropzoneStyle}>
//         {/* 'getInputProps' chứa thuộc tính và sự kiện cho phần tử input. */}
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Thả hình ảnh vào đây...</p>
//         ) : (
//           <Button>Tải ảnh đại diện</Button>
//         )}
//       </div>
//       {/* Nếu đã chọn một ảnh, hiển thị ảnh đó dưới dạng base64. */}
//       {base64Image && (
//         <img src={base64Image} alt="Uploaded" style={{ maxWidth: "100%" }} />
//       )}
//     </div>
//   );
// }

// // Định nghĩa một đối tượng CSS để tùy chỉnh giao diện cho khu vực Dropzone.
// const dropzoneStyle: React.CSSProperties = {
//   border: "2px dashed #cccccc",
//   borderRadius: "4px",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: "20px",
//   cursor: "pointer",
// };

// export default ProductEdit;

//Tải nhiều ảnh
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function ProductEdit() {
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
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

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps({ multiple: true })} />
        {isDragActive ? (
          <p>Thả hình ảnh vào đây...</p>
        ) : (
          <p>Kéo và thả nhiều hình ảnh hoặc nhấp để chọn hình ảnh</p>
        )}
      </div>
      <div className="row">
        {base64Images.map((base64Image, index) => (
          <div key={index} className="col-2">
            <img
              src={base64Image}
              alt="Uploaded"
              style={{ maxWidth: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const dropzoneStyle: React.CSSProperties = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  cursor: "pointer",
};

export default ProductEdit;
