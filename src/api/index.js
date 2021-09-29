export const API_URL =
  "https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT/";

export async function fetchAllPosts(url) {
  try {
    const response = await fetch(`${url}/posts`);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
