import React, { useState, useEffect } from "react";

function ProductEdit() {
  const [dataChanged, setDataChanged] = useState<boolean>(false);
  // const [confirmExit, setConfirmExit] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("beforeunload", confirmExit);
    return () => {
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, [dataChanged]);

  // Hàm xác nhận thoát khỏi trang
  function confirmExit(e: BeforeUnloadEvent) {
    if (dataChanged) {
      e.preventDefault();
      e.returnValue = "Bạn có chắc muốn rời khỏi trang này?";
    }
  }

  const handleDataChange = () => {
    setDataChanged(true);
  };

  const handleSave = () => {
    setDataChanged(false);
  };

  // const handleGoBack = () => {
  //   if (dataChanged) {
  //     setConfirmExit(true);
  //   } else {
  //     window.history.back();
  //   }
  // };

  // const handleConfirmExit = (confirmed: boolean) => {
  //   if (confirmed) {
  //     window.history.back();
  //   } else {
  //     setConfirmExit(false);
  //   }
  // };

  // useEffect(() => {
  //   const handlePopstate = () => {
  //     setDataChanged(true);
  //   };

  //   window.addEventListener("popstate", handlePopstate);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopstate);
  //   };
  // }, [dataChanged]);

  return (
    <div>
      <h1>Trang sửa sản phẩm</h1>
      <button onClick={handleDataChange}>Thay đổi dữ liệu</button>
      <button onClick={handleSave}>Lưu dữ liệu</button>
      {/* <button onClick={handleGoBack}>Go back</button>
       */}

      {/* {confirmExit && (
        <div className="confirmation-modal">
          <p>Bạn có chắc muốn rời khỏi trang này? Dữ liệu chưa được lưu.</p>
          <button onClick={() => handleConfirmExit(true)}>Có</button>
          <button onClick={() => handleConfirmExit(false)}>Không</button>
        </div>
      )} */}
    </div>
  );
}

export default ProductEdit;
