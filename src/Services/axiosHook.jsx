import { useState, useEffect } from "react";
import { get, put, post, remove, checkEmail } from "./apiCalls";

function parseQueryParams(url, queryParams = {}) {
  let newUrl = url;
  const params = Object.keys(queryParams)
  if(params.length > 0) {
    newUrl = `${newUrl}?${params.map(param => {
      return `${param}=${queryParams[param]}`
    }).join("&")}`
  }
  return newUrl;
}

const useAxiosGet = (url, { onComplete, onError } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (queryParams = {}) => {
      let queryUrl = parseQueryParams(url, queryParams)
      const { data, error } = await get(queryUrl);
      if (data) {
        setData(data);
        if (onComplete) {
          onComplete(data);
        }
      }
      if (error) {
        setError(error);
        if (onError) {
          onError(error);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};
//lazy
const useLazyAxiosGet = (url, { onComplete, onError } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (queryParams = {}) => {
    setLoading(true);
    let queryUrl = parseQueryParams(url, queryParams)
    const { data, error } = await get(queryUrl);
    if (data) {
      setData(data);
      if (onComplete) {
        onComplete(data);
      }
    }
    if (error) {
      setError(error);
      if (onError) {
        onError(error);
      }
    }
    setLoading(false);
  };

  return { fetchData, data, error, loading };
};

const useAxiosPost = (url, { onComplete, onError } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const updateData = async (payload = {}) => {
    setLoading(true);
    const { data, error } = await post(url, payload);
    if (data) {
      setData(data);
      if (onComplete) {
        onComplete(data);
      }
    }
    if (error) {
      setError(error);
      if (onError) {
        onError(error);
      }
    }
    setLoading(false);
  };
  return { updateData, data, error, loading };
};

const useAxiosPut = (url, { onComplete, onError } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateData = async (payload = {}) => {
    setLoading(true);
    const { data, error } = await put(url, payload);
    if (data) {
      setData(data);
      if (onComplete) {
        onComplete(data);
      }
    }
    if (error) {
      setError(error);
      if (onError) {
        onError(error);
      }
    }
    setLoading(false);
  };
  return { updateData, data, error, loading };
};

const useAxiosRemove = (url, {onComplete, onError} = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeData = async () => {
    setLoading(true)
    const { data, error } = await remove(url);
    if (data) {
      setData(data);
      if (onComplete) {
        onComplete(data);
      }
    }
    if (error) {
      setError(error);
      if (onError) {
        onError(error);
      }
    }
    setLoading(false);
  };
  return { removeData, data, error, loading };
  }


export { useAxiosGet, useLazyAxiosGet, useAxiosPost, useAxiosPut, useAxiosRemove };
