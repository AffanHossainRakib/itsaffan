document.addEventListener("DOMContentLoaded", () => {
  const lastModified = document.getElementById("last-modified");
  const date = new Date(document.lastModified);
  lastModified.innerText = `Last Modified: ${date.toLocaleDateString(
    "en-GB"
  )} ${date.toLocaleTimeString("en-GB")}`;
});
