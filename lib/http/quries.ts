import { API_ROUTES } from "@/constants/ApiRoutes";
import { api } from "../axios/axios";

export async function getMe() {
  const res = await api.get(API_ROUTES.AUTH.ME);
  return res.data;
}