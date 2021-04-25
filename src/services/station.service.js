import axios from "axios";

import { BaseValue } from "../constants";

export const getAllStations = async () => {
  const { data } = await axios.get(`${BaseValue.API_URL}/stations`);
  return data;
};

export const getStationById = async (id) => {
  const { data } = await axios.get(`${BaseValue.API_URL}/stations/${id}`);
  return data;
};
