import axios from "axios";

const api_url = `http://localhost:3000`;

export const isLogin = (data)=> axios.get(`${api_url}/user/verify/${data.Token}`);
export const createUser = (data)=> {return axios.post(`${api_url}/user/signup`,data)}
export const loginUser = (data)=> {return axios.post(`${api_url}/user/login`,data)}
export const createBlog = (data)=> {return axios.post(`${api_url}/blogs/create`,data)}
export const viewBlogs = ()=> {return axios.get(`${api_url}/blogs/view`)}