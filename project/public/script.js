document.addEventListener("DOMContentLoaded", () => {
  const npmPackageInput = document.getElementById("npmPackage");
  const codebaseInput = document.getElementById("codebase");
  const integrateBtn = document.getElementById("integrateBtn");
  const resultContainer = document.getElementById("resultContainer");
  const rrrr = document.getElementById("rrrr");

  function setLoading(isLoading) {
    integrateBtn.disabled = isLoading;
    integrateBtn.innerHTML = isLoading ? "Analyzing..." : "Integrate Library";
    resultContainer.innerHTML = isLoading
      ? "<div class='result-loading'>Loading...</div>"
      : "";
  }

  function detectLanguage(code) {
    if (/^import\s+[\w{}]+\s+from\s+['"].+['"];?/m.test(code))
      return "JavaScript";
    if (/^require\s*\(.+\)/m.test(code)) return "JavaScript";
    if (/module\.exports\s*=/.test(code)) return "JavaScript";
    if (/^#include\s+<.+>/m.test(code)) return "C++";
    if (/^\s*def\s+\w+\(.*\):/m.test(code)) return "Python";
    if (/^\s*public\s+class\s+\w+/m.test(code)) return "Java";
    return "Unknown";
  }

  async function handleIntegration() {
    const npmPackage = npmPackageInput.value.trim();
    const codebase = codebaseInput.value.trim();

    if (!npmPackage || !codebase) {
      resultContainer.innerHTML = `<div class="result-error">Please provide both an NPM package name and your codebase.</div>`;
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "google/gemma-3-27b-it:free",
            messages: [
              {
                role: "user",
                content: `ensure that "${npmPackage}" is present in NPM Libraries. If it exists, integrate it into the following ${detectLanguage()} code: ${codebase} by only adding to the existing code without introducing extra variables. Ensure that "${npmPackage}" is correctly imported and used within the code. Add an automatic installation script at the top using a try-catch block: "// Auto-install required packages  
import { execSync } from 'child_process';
try {  
  execSync('npm install express ${npmPackage}', { stdio: 'inherit' });  
} catch (error) {  
  console.error('Failed to install dependencies:', error);  
  process.exit(1);  
}

"and provide the entire modified code with the required changes included. Add useful comments ('//') explaining the integration of "${npmPackage}" at relevant lines. Do not include extra text, explanations, or messages—only the modified code with inline comments, and ensure that backticks are removed from the final output.`
              }
            ]
          })
        }
      );

      // const data = await response.json();
      const data = await response.json();
      console.log("OpenRouter raw response:", data);

      // let integrationResult = "";

      let integrationResult = data.choices[0].message.content.trim();

      if (data.choices && data.choices.length > 0) {
        const choice = data.choices[0];

        if (choice.message && choice.message.content) {
          integrationResult = choice.message.content.trim();
        } else if (choice.text) {
          integrationResult = choice.text.trim();
        }
      }

      if (!integrationResult) {
        throw new Error(
          "AI returned an empty response. This may be due to free model limits or prompt size."
        );
      }

      resultContainer.innerHTML = `<pre><code>${integrationResult}</code></pre>`;

      rrrr.innerHTML = `<pre><code>${integrationResult}</code></pre>`;
    } catch (error) {
      const errorMessage = error.message || JSON.stringify(error, null, 2);

      resultContainer.innerHTML = `<div class="result-error"><pre>${errorMessage}</pre></div>`;

      rrrr.innerHTML = `<div class="result-error"><pre>${errorMessage}</pre></div>`;
    } finally {
      setLoading(false);
    }
  }

  integrateBtn.addEventListener("click", handleIntegration);
});
