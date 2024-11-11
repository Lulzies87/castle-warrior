import axios from "axios";
import "./assets/styles/style.scss";
import "./assets/styles/entryForm.scss";
import { server } from "./apiConfig";
import { isUserLoggedIn } from "./utils";

if (isUserLoggedIn()) window.location.href = "/";

const form = document.forms.namedItem("registerForm") as HTMLFormElement;

if (!form) {
  throw new Error("Couldn't find form element");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("confirmPassword") as string;

  if (password !== passwordConfirm) {
    throw new Error("Passwords don't match");
  }

  try {
    await isAvailable(username);
    await registerUser(username, password);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log("No response recieved from the server");
      }
    }
  }
});

async function isAvailable(username: string): Promise<boolean> {
  try {
    await server.get("/api/checkUsername", { params: { username } });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 400) {
        console.error("Username already taken");
        return false;
      } else {
        console.error("Error checking username:", error);
        return false;
      }
    }
    console.error("Unexpected error:", error);
    return false;
  }
}
async function registerUser(username: string, password: string) {
  try {
    await server.post(
      "/api/register",
      { username, password },
      { withCredentials: true }
    );

    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}
