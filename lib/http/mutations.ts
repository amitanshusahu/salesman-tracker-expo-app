import { API_ROUTES } from "@/constants/ApiRoutes";
import { api } from "../axios/axios";

export async function postLogin() {
  const res = await api.post(API_ROUTES.AUTH.LOGIN);
  return res.data;
}