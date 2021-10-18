import axios from 'axios';

export const getTodos = async (page) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/?_page=${page}&_limit=10`
  );
  return response.data;
};
