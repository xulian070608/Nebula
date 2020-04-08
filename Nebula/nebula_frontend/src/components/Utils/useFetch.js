import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loaded: false });

  useEffect(() => {
    setState({ data: null, loaded: false });
    axios.get(url).then((res) => {
      console.log(res);
      setState({ data: res.data, loaded: true });
      localStorage.setItem("floorData", res.data);
      var floorData = localStorage.getItem("floorData");
      console.log(floorData.data);
    });
  }, [url]);

  return state;
};

export const useFetchList = (url) => {
  const [state, setState] = useState({ data: [], loaded: false });

  useEffect(() => {
    setState({ data: [], loaded: false });

    const fetchDataList = (url) => {
      axios.get(url).then((res) => {
        setState((currentState) => ({
          ...currentState,
          data: currentState.data.concat(res.data.data),
        }));
        if (res.data.links.next !== null) {
          fetchDataList(res.data.links.next);
        } else {
          setState((currentState) => ({ ...currentState, loaded: true }));
        }
      });
    };

    fetchDataList(url);
  }, [url]);

  return state;
};
