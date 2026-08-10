import { supabase } from "./supabase.js";

const form = document.querySelector("#login-form");
const message = document.querySelector("#message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim().toLowerCase();
  const password = document.querySelector("#password").value;

  message.textContent = "";
  message.className = "";

  const loginResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const error = loginResponse.error;

  if (error) {
    message.textContent = "Could not log in. Check your email and password.";
    message.className = "error";
    return;
  }

  message.textContent = "Login successful.";
  message.className = "success";

  setTimeout(() => {
    window.location.href = "./index.html";
  }, 1000);
});