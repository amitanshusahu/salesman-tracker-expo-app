import axios from "axios";

export const api = axios.create({
  headers: {'Content-Length': 'application/json'}
})