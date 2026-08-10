import { supabase } from "./supabase.js";

const loginLink = document.querySelector("#login-link");
const registerLink = document.querySelector("#register-link");
const createLink = document.querySelector("#create-link");
const logoutButton = document.querySelector("#logout-button");

async function updateNavigation() {
  const sessionResponse = await supabase.auth.getSession();
  const session = sessionResponse.data.session;

  if (session) {
    loginLink.classList.add("hidden");
    registerLink.classList.add("hidden");
    createLink.classList.remove("hidden");
    logoutButton.classList.remove("hidden");
  } else {
    loginLink.classList.remove("hidden");
    registerLink.classList.remove("hidden");
    createLink.classList.add("hidden");
    logoutButton.classList.add("hidden");
  }
}

logoutButton.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "./index.html";
});

updateNavigation();