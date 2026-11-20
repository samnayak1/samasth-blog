// blog.js — reads posts.json and puts your posts on the page.
// index.html uses it to show the list; post.html uses it to show one post.

// Turns "2026-11-20" into "November 20, 2026"
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Downloads posts.json, hides drafts, and sorts newest first
async function loadPosts() {
  const response = await fetch("posts.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Could not load posts.json");
  }
  const posts = await response.json();
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Home page: one card per post
function showPostList(posts) {
  const list = document.getElementById("post-list");
  list.innerHTML = "";

  if (posts.length === 0) {
    list.innerHTML = "<li>No posts yet.</li>";
    return;
  }

  for (const post of posts) {
    const link = document.createElement("a");
    link.href = "post.html?slug=" + encodeURIComponent(post.slug);
    link.textContent = post.title;

    const heading = document.createElement("h2");
    heading.appendChild(link);

    const date = document.createElement("time");
    date.className = "post-date";
    date.textContent = formatDate(post.date);

    const summary = document.createElement("p");
    summary.textContent = post.summary;

    const item = document.createElement("li");
    item.className = "post-card";
    item.append(heading, date, summary);
    list.appendChild(item);
  }
}

// Post page: find the post whose slug is in the URL
function showPost(posts) {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    document.getElementById("post-title").textContent = "Post not found";
    return;
  }

  document.title = post.title + " | " + document.title;
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-date").textContent = formatDate(post.date);
  // The content is HTML you wrote in the editor, so it's safe to insert directly.
  document.getElementById("post-content").innerHTML = post.content;
}

async function start() {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Pages without posts (like about.html) don't need to load posts.json
  if (!document.getElementById("post-list") && !document.getElementById("post")) return;

  try {
    const posts = await loadPosts();
    if (document.getElementById("post-list")) showPostList(posts);
    if (document.getElementById("post")) showPost(posts);
  } catch (error) {
    console.error(error);
    document.querySelector("main").innerHTML =
      '<p class="error">Sorry, the posts couldn\'t be loaded. ' +
      "(If you opened this file by double-clicking it, run a local server instead. See README.md.)</p>";
  }
}

start();
