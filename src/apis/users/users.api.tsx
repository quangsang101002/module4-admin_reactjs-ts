import api from "../base.api";
import { LoginResponse } from "../auth/auth/responses/login.response";

const SearchUser = async (name: string, limit: number, page: number) => {
  const param = {
    name: name,
    limit: limit,
    page: page,
  };

  try {
    const response = await api.get("/user", { params: param });
    return response.data;
  } catch (error) {
    console.error("API Error", error);
    throw error;
  }
};

const UserApi = {
  SearchUser,
};
export default UserApi;
