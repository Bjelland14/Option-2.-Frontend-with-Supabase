import { supabase } from "./supabase.js";

const articlesContainer = document.querySelector("#articles-container");
const message = document.querySelector("#message");

async function getArticles() {
  articlesContainer.innerHTML = "<p>Loading articles...</p>";

  try {
    const userResponse = await supabase.auth.getUser();

    if (userResponse.error) {
      console.error(userResponse.error);
    }

    const user = userResponse.data.user;

    const articleResponse = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    const data = articleResponse.data;
    const error = articleResponse.error;

    if (error) {
      console.error(error);
      articlesContainer.innerHTML = "";
      message.textContent = "Could not load articles.";
      message.className = "error";
      return;
    }

    if (data.length === 0) {
      articlesContainer.innerHTML =
        "<p>No articles have been published yet.</p>";
      return;
    }

    articlesContainer.innerHTML = "";

    data.forEach((article) => {
      const articleCard = document.createElement("article");
      articleCard.className = "article-card";

      const title = document.createElement("h2");
      title.textContent = article.title;

      const category = document.createElement("p");
      category.textContent = article.category;

      const body = document.createElement("p");
      body.textContent = article.body;

      articleCard.append(title, category, body);

      if (user && user.id === article.submitted_by) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", async () => {
          const confirmed = confirm(
            "Are you sure you want to delete this article?"
          );

          if (!confirmed) {
            return;
          }

          try {
            const deleteResponse = await supabase
              .from("articles")
              .delete()
              .eq("id", article.id);

            const deleteError = deleteResponse.error;

            if (deleteError) {
              console.error(deleteError);
              message.textContent = "Could not delete the article.";
              message.className = "error";
              return;
            }

            message.textContent = "Article deleted successfully.";
            message.className = "success";

            getArticles();
          } catch (error) {
            console.error(error);
            message.textContent = "Could not delete the article.";
            message.className = "error";
          }
        });

        articleCard.append(deleteButton);
      }

      articlesContainer.append(articleCard);
    });
  } catch (error) {
    console.error(error);
    articlesContainer.innerHTML = "";
    message.textContent = "Something went wrong. Please try again.";
    message.className = "error";
  }
}

getArticles();