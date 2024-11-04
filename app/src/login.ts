import axios from "axios";
import "./assets/styles/style.scss";
import "./assets/styles/entryForm.scss";
import { server } from "./apiConfig";
import { isUserLoggedIn } from "./utils";

if (isUserLoggedIn()) window.location.href = "/";

const form = document.forms.namedItem("loginForm") as HTMLFormElement;

if (!form) {
  throw new Error("Couldn't find form element");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  await loginUser(username, password);
});

const guestLink = document.getElementById("guestLink") as HTMLAnchorElement;

if (!guestLink) {
  throw new Error("Couldn't find guest link element");
}

guestLink.addEventListener("click", async () => {
  try {
    await server.get("/guest", { withCredentials: true });
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
});

async function loginUser(username: string, password: string) {
  try {
    await server.post(
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
}
