import axios from "axios";

import { BaseValue } from "../constants";

export const isLogged = async () => {
  const token = localStorage.getItem("token");
  return token;
};

export const login = async (form) => {
  const { email, password } = form;
  const { data } = await axios.post(`${BaseValue.API_URL}/users/admin/login`, {
    email,
    password,
  });
  return data;
};
