import { useState, useEffect } from "react";
import { get } from "./apiCalls";
import { post } from "./apiCalls";

const useAxiosGet = (url, { onComplete, onError } = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await get(url);
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
    let queryUrl = url;
    const params = Object.keys(queryParams)
    if(params.length > 0) {
      queryUrl = `${queryUrl}?${params.map(param => {
        return `${param}=${queryParams[param]}`
      }).join("&")}`
    }
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

export { useAxiosGet, useLazyAxiosGet, useAxiosPost };
