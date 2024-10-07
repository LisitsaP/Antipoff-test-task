import axios from 'axios';

const API_URL = 'https://66f4e45677b5e889709ac60c.mockapi.io'; 

export interface User {
    id: string;
    name: string;
    imageUrl: string;
    role: string;
    content: string;
    telNumber: string;
    email: string;
}


export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};