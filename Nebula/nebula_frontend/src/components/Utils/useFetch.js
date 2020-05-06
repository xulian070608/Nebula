import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

export const useFetch = (url) => {
  const [state, setState] = useState({ data: null, loaded: false });
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    setState({ data: null, loaded: false });
    axios
      .get(url)
      .then((res) => {
        if (isMountedRef.current) {
          setState({ data: res.data.data, loaded: true });
        }
      })
      .catch((err) => console.log(err));
    return () => (isMountedRef.current = false);
  }, [url]);

  return state;
};

export const useFetchList = (url) => {
  const [state, setState] = useState({ data: [], loaded: false });
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    setState({ data: [], loaded: false });
    const fetchDataList = (url) => {
      axios
        .get(url)
        .then((res) => {
          if (isMountedRef.current) {
            setState((currentState) => ({
              ...currentState,
              data: currentState.data.concat(res.data.data),
            }));
            if (res.data.links.next !== null) {
              fetchDataList(res.data.links.next);
            } else {
              setState((currentState) => ({ ...currentState, loaded: true }));
            }
          }
        })
        .catch((err) => console.log(err));
    };

    fetchDataList(url);

    return () => (isMountedRef.current = false);
  }, [url]);

  return state;
};
