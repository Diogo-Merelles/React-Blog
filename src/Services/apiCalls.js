import axios from "axios";


export const get = async (url) => {
  const response = await axios.get(url);

  const result = {
    data: null, 
    error: null
  }

  if (response.status === 200) {
    result.data = response.data;
  } else {
    result.error = response.error;
  }
  return result;
};

export const post = async (url, payload) => {
    const response = await axios.post(url, payload);

    const result = {
        data: null,
        error: null
    }

    if (response.status === 201) {
        result.data = response.data;

    } else {
        result.error = response.error;
    }

    return result;
}

export const put = async (url, payload = {}) => {
  const response = await axios.put(url, payload);

  const result = {
    data: null, 
    error: null
  }

  if (response.status === 200) {
    result.data = response.data
  } else {
    result.error = response.error
  }

  return result;
}

export const remove = async (url) => {
  const response = await axios.delete(url);
  const result = {
    data: null, 
    error: null
  }

  if (response.status === 200) {
    result.data = response.data;
  } else {
    result.error = response.error;
  }
  return result;
}

export const deleteUser = async (url, currentUserId) => {
  const response = await axios.delete(url, + `/${currentUserId}`);
  return response;
  
}

export const deleteBlog = async (url, id) => {
  const response = await axios.delete(url, + `/${id}`);
  return response;
}
