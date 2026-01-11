document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyBtn");
  const resultContainer = document.getElementById("rrrr");

  copyBtn.addEventListener("click", () => {
    const textToCopy = resultContainer.innerText.trim();
    if (!textToCopy) return;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Integration result copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  });

  // Call this function whenever the result is updated
});
