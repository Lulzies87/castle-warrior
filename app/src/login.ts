import axios from "axios";
import "./assets/styles/style.scss";
import "./assets/styles/login.scss";
import { server } from "./apiConfig";

const form = document.forms.namedItem("loginForm") as HTMLFormElement;

if (!form) {
  throw new Error("Couldn't find form element");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const res = await server.post(
      "/login",
      { username, password },
      { withCredentials: true }
    );

    window.location.href = "/";
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err);
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log("No response recieved from the server");
      }
    }
  }
});
