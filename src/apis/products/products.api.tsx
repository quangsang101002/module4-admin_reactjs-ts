import api from "../base.api";
import { BodyProduct } from "./products.interFace.api";
const ShowProduct = async (name: string, limit: number, page: number) => {
  const params = {
    name: name,
    limit: limit,
    page: page,
  };

  try {
    const response = await api.get("/product", {
      params: params,
    });

    console.log("response ", response);

    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};
const addProduct = async (bodyProducts: BodyProduct) => {
  console.log("bodyProducts", bodyProducts);

  try {
    const response = await api.postForm("/product");
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response.data.error);
  }
};

const productAPI = {
  ShowProduct,
  addProduct,
};

export default productAPI;
