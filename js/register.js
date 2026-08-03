import { supabase } from "./supabase.js";

const form = document.querySelector("#register-form");
const message = document.querySelector("#message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  message.textContent = "";
  message.className = "";

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    message.className = "error";
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    message.textContent = error.message;
    message.className = "error";
    return;
  }

  message.textContent =
    "Registration successful. Check your email to confirm your account.";
  message.className = "success";

  form.reset();
});