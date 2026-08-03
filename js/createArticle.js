import { supabase } from "./supabase.js";

const form = document.querySelector("#article-form");
const message = document.querySelector("#message");
const logoutButton = document.querySelector("#logout-button");

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "./login.html";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const category = document.querySelector("#category").value;
  const body = document.querySelector("#body").value;

  message.textContent = "";
  message.className = "";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    message.textContent = "You must be logged in.";
    message.className = "error";
    return;
  }

  const { error } = await supabase.from("articles").insert({
    title,
    category,
    body,
    submitted_by: user.id,
  });

  if (error) {
    message.textContent = "Could not publish the article.";
    message.className = "error";
    return;
  }

  message.textContent = "Article published successfully.";
  message.className = "success";

  form.reset();
});

logoutButton.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "./index.html";
});

checkUser();