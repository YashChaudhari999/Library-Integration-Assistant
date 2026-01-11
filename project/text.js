// Auto-install required packages
import { execSync } from "child_process";
try {
  execSync("npm install express axios", { stdio: "inherit" });
} catch (error) {
  console.error("Failed to install dependencies:", error);
  process.exit(1);
}

import axios from "axios"; // Import axios library
async function fetchData() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log(chalk.green("Response Data:"), response.data);
  } catch (error) {}
}

// Execute function
fetchData();
