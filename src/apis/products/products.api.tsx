import api from "../base.api";
import { BodyProduct } from "./products.interFace.api";
import { LoginResponse } from "../auth/auth/responses/login.response";
import { getAccessToken } from "../../utilities/token.util";

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
const addProduct = async (bodyProducts: FormData) => {
  console.log("bodyProducts", bodyProducts);
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    try {
      const response = await api.postForm("/product", bodyProducts, {
        params: param,
      });
      return response.data;
    } catch (error: any) {
      return Promise.reject(error.response.data.error);
    }
  }
};
const productAPI = {
  ShowProduct,
  addProduct,
};

export default productAPI;
