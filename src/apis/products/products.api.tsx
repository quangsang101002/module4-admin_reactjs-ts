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

    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};
const addProduct = async (bodyProducts: FormData) => {
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
const updateProduct = async (id: any, bodyProducts: FormData) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };

    return await api
      .put(`/product/${id}`, bodyProducts, {
        params: param,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("API Error", error);
        throw error;
      });
  }
};

const deleteProduct = async (id: any) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    return await api
      .delete(`/product/${id}`, { params: param })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("API Error", error);
        throw error;
      });
  }
};

const getProductDetail = async (id: any) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const param: LoginResponse = {
      token: accessToken,
    };
    try {
      const response = await api.get(`/product/${id}`, { params: param });
      return response.data.result;
    } catch (error: any) {
      return Promise.reject(error.response.data.error);
    }
  }
};
const productAPI = {
  ShowProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
};

export default productAPI;
