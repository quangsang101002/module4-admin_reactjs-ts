import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
function Pagination() {
  return (
    <>
      <div>
        {" "}
        <div className="paging text-center mt-5 mb-5">
          <div>
            <button className="btn-pagig">
              <AiOutlineLeft />
            </button>
            {/* <a href={`/admin/product/${getNumberPages}`}> */}
            <button
              className="btn-pagig"
              // onClick={(event) => getNumberPager(event)}
            >
              1
            </button>
            {/* </a> */}
            {/* <a href={`/admin/product/${getNumberPages}`}> */}
            <button
              className="btn-pagig"
              // onClick={(event) => getNumberPager(event)}
            >
              2
            </button>
            {/* </a> */}
            {/* <a href={`/admin/product/${getNumberPages}`}> */}
            <button
              className="btn-pagig"
              // onClick={(event) => getNumberPager(event)}
            >
              3
            </button>
            {/* </a> */}
            <span className="btn-pagig">...</span>
            <button className="btn-pagig">
              <AiOutlineRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
