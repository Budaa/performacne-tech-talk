import { useEffect, useRef } from "react";
import axios from "axios";

export const useLogReRender = (componentName: string, id?: string) => {
  const initialRender = useFirstRender();
  useEffect(() => {
    if (!initialRender) {
      console.log("Re-rendered: ", componentName, id);
    }
  });
};

export const useFirstRender = () => {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};

export const catsAPI = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: { "x-api-key": "ab4589a2-ca04-4b1c-af40-953518f68268" },
});
