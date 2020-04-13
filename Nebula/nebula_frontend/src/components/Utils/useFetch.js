import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [state, setState] = useState({ response: null, loaded: false });

  useEffect(() => {
    setState({ response: null, loaded: false });
    axios
      .get(url)
      .then((res) => {
        setState({ response: res.data, loaded: true });
      })
      .catch((err) => console.log(err));
  }, [url]);

  return state;
};

export const useFetchList = (url) => {
  const [state, setState] = useState({ data: [], loaded: false });

  useEffect(() => {
    setState({ data: [], loaded: false });

    const fetchDataList = (url) => {
      axios
        .get(url)
        .then((res) => {
          setState((currentState) => ({
            ...currentState,
            data: currentState.data.concat(res.data.data),
          }));
          if (res.data.links.next !== null) {
            fetchDataList(res.data.links.next);
          } else {
            setState((currentState) => ({ ...currentState, loaded: true }));
          }
        })
        .catch((err) => console.log(err));
    };

    fetchDataList(url);
  }, [url]);

  return state;
};
