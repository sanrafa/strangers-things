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

export async function registerNewUser(url, username, password) {
  try {
    const response = await fetch(`${url}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
