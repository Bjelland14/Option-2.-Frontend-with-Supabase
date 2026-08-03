import { supabase } from "./supabase.js";

const articlesContainer = document.querySelector("#articles-container");
const message = document.querySelector("#message");

async function getArticles() {
  articlesContainer.innerHTML = "<p>Loading articles...</p>";

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    articlesContainer.innerHTML = "";
    message.textContent = "Could not load articles.";
    message.className = "error";
    return;
  }

  if (data.length === 0) {
    articlesContainer.innerHTML = "<p>No articles have been published yet.</p>";
    return;
  }

  articlesContainer.innerHTML = "";

  data.forEach((article) => {
    const articleCard = document.createElement("article");
    articleCard.className = "article-card";

    const title = document.createElement("h2");
    title.textContent = article.title;

    const category = document.createElement("p");
    category.className = "article-category";
    category.textContent = article.category;

    const body = document.createElement("p");
    body.textContent = article.body;

    const date = document.createElement("p");
    date.className = "article-date";
    date.textContent = new Date(article.created_at).toLocaleDateString();

    articleCard.append(title, category, body, date);
    articlesContainer.append(articleCard);
  });
}

getArticles();