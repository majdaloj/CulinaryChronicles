import axios from 'axios';
import { SAMPLE_USER_ID } from './constants';

const api_url = 'https://api-open-source-astrology.onrender.com/';
// const api_url = "http://localhost:3000/";

export const get_projects = async (search, user_id) => {
  const result = await axios.get(
    `${api_url}project?search=${search}&user_id=${user_id}&limit=9`
  );
  return result.data;
};

export const saveProject = async ({ projectId, userId }) => {
  const result = await axios.post(`${api_url}contributor/favorite`, {
    project_id: projectId,
    user_id: userId,
  });
  return result.data;
};

export const unSaveProject = async ({ projectId, userId }) => {
  const result = await axios.post(`${api_url}contributor/unfavorite`, {
    project_id: projectId,
    user_id: userId,
  });
  return result.data;
};

export const getCurrentUser = async () => {
  const userId = localStorage.getItem('userId') || SAMPLE_USER_ID;

  const result = await axios.get(`${api_url}contributor/${userId}`);

  return result.data;
};

export const getSavedProjects = async () => {
  const userId = localStorage.getItem('userId') || SAMPLE_USER_ID;
  const result = await axios.get(`${api_url}contributor/${userId}/favorite`);
  return result.data;
};
