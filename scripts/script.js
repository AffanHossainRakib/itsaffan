document.addEventListener("DOMContentLoaded", () => {
  const lastModified = document.getElementById("last-modified");
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
});
