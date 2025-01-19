import { API_ROUTES } from "@/constants/ApiRoutes";
import { api } from "../axios/axios";

export async function postLogin({email, password}: {email: string, password: string}) {
  const res = await api.post(API_ROUTES.AUTH.LOGIN, {email, password});
  return res.data;
}