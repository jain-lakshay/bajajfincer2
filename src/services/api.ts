import axios from 'axios';
import { FormResponse, UserData } from '../types/form';

const API_BASE_URL = 'https://dynamic-form-generator-9rl7.onrender.com';

export const createUser = async (userData: UserData) => {
  const response = await axios.post(`${API_BASE_URL}/create-user`, userData);
  return response.data;
};

export const getForm = async (rollNumber: string) => {
  const response = await axios.get<FormResponse>(`${API_BASE_URL}/get-form?rollNumber=${rollNumber}`);
  return response.data;
};