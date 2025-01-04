import axios from "axios";

const api_url = `http://localhost:3000`;

export const createUser = (data)=> axios.post(`${api_url}/user/signup`,data);
export const loginUser = (data)=> axios.post(`${api_url}/user/login`,data);
export const viewBlogs = ()=> axios.get(`${api_url}/blogs/view`);