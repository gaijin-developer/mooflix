import axAPI from "../lib/axios";
import { refreshToken } from "./userService";

export async function getSearchResults(param: string) {
  try {
    const result = await axAPI.get(`/search?s=${param}`);
    return result.data.Search;
  } catch {
    await refreshToken();
  }
}

export async function getHomeVideos() {
  try {
    const response = await axAPI.get(`/movies`);
    return response.data.Search;
  } catch {
    // console.log("error");
  }
}
