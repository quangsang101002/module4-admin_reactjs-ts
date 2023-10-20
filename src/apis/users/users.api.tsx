import api from "../base.api";
import { LoginResponse } from "../auth/auth/responses/login.response";
import { getAccessToken } from "../../utilities/token.util";

const SearchUser = async (name: string, limit: number, page: number) => {
  const accessToken = getAccessToken();
  if (accessToken !== null) {
    const parama = {
      token: accessToken,
    };

    const param = {
      name: name,
      limit: limit,
      page: page,
    };

    try {
      const response = await api.get("/users", {
        params: param,
        headers: parama,
      });
      return response.data;
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  } else {
    console.error("Access token is null.");
    throw new Error("Access token is null.");
  }
};
const deleteUser = async (id: any) => {
  console.log("id", id);

  const accessToken = getAccessToken();
  if (accessToken !== undefined) {
    const param = {
      token: accessToken,
    };

    return await api
      .delete(`/users/${id}`, { headers: param })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("API Error", error);
        throw error;
      });
  }
};
const UserApi = {
  SearchUser,
  deleteUser,
};
export default UserApi;
