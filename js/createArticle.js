import { supabase } from "./supabase.js";

const form = document.querySelector("#article-form");
const message = document.querySelector("#message");

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

  const title = document.querySelector("#title").value.trim();
  const category = document.querySelector("#category").value.trim();
  const body = document.querySelector("#body").value.trim();

  message.textContent = "";
  message.className = "";

  if (!title || !category || !body) {
    message.textContent = "Please fill in all fields.";
    message.className = "error";
    return;
  }

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
    console.error("Insert error:", error);
    message.textContent = error.message;
    message.className = "error";
    return;
  }

  message.textContent = "Article published successfully.";
  message.className = "success";

  form.reset();
});

checkUser();