# Library-Integration-Assistant

Tired of wasting hours reading NPM docs and debugging integration bugs? Library-Integration-Assistant uses AI to instantly analyze any NPM package, generate flawless integration code, and weave it seamlessly into your existing codebase—without breaking a sweat.

This web app turns the nightmare of manual library integration into a 30-second breeze, preserving your code's structure while adding smart, context-aware enhancements. Perfect for React, Vue, or Node.js devs who want to focus on building, not boilerplate.

## 🚀 Quick Start

Get up and running in under a minute—see the AI magic in action.

1. **Clone and Install**  
   ```bash
   git clone https://github.com/YashChaudhari999/Library-Integration-Assistant.git
   cd Library-Integration-Assistant/project
   npm install
   ```

2. **Run the App**  
   ```bash
   npm run dev
   ```  
   Open [http://localhost:5173](http://localhost:5173) in your browser. (Powered by Vite for lightning-fast development.)

3. **Integrate a Package**  
   - Enter an NPM package name (e.g., `lodash`).  
   - Paste your existing code snippet.  
   - Click "Integrate Library" and watch the AI generate the updated code.  

   **Example: Integrating `lodash` into a React Component**  
   *Before (your original code):*  
   ```jsx
   import React from 'react';

   function MyComponent() {
     const numbers = [1, 2, 3, 4, 5];
     const doubled = numbers.map(num => num * 2); // Manual mapping

     return (
       <div>
         <ul>{doubled.map(num => <li key={num}>{num}</li>)}</ul>
       </div>
     );
   }

   export default MyComponent;
   ```

   *After (AI-generated integration):*  
   ```jsx
   // Auto-install required packages
   // import { execSync } from 'child_process';
   // try {
   //   execSync('npm install lodash', { stdio: 'inherit' });
   // } catch (error) {
   //   console.error('Failed to install dependencies:', error);
   //   process.exit(1);
   // }

   import React from 'react';
   import _ from 'lodash'; // Integrated lodash for utility functions

   function MyComponent() {
     const numbers = [1, 2, 3, 4, 5];
     // Using lodash map for cleaner, more efficient transformation
     const doubled = _.map(numbers, num => num * 2);

     return (
       <div>
         <ul>{doubled.map(num => <li key={num}>{num}</li>)}</ul>
       </div>
     );
   }

   export default MyComponent;
   ```  
   Boom—`lodash` is imported, used optimally, and your component stays intact. Save hours per integration!

## 💡 Why This Tool?

Manual NPM integrations are a dev's worst enemy: endless docs scrolling, copy-paste errors, and refactors that break your flow. Sound familiar?

- **Time Sink on Docs**: Hunting for the right API in verbose READMEs or Stack Overflow? This tool skips it—AI reads and applies the package logic for you.  
- **Error-Prone Copy-Paste**: Wrong import syntax or version mismatches? No more—generates battle-tested code tailored to your snippet.  
- **Structure Breakage**: Adding a lib often means rewriting vars or functions. Here, it preserves everything, just slots in the essentials.  

**Benefits That Hit Home**:  
- **Zero-Doc-Reading Magic**: Input `axios` for a Vue app? Get fetch wrappers woven in without touching your data flows.  
- **Real Dev Wins**: Adding auth like `jsonwebtoken` to a Node script? Or utils like `moment` to React hooks? Done in seconds, not hours—reclaim 2+ hours per library.  
- **Framework-Agnostic Smarts**: Works across JS ecosystems, from Vue components to plain Node, keeping your codebase clean and conflict-free.  

Ditch the frustration; embrace the AI boost.

## ✨ Key Features

**AI-Driven Integration**  
Leverages advanced models (like Gemma via OpenRouter) to dissect any NPM package's API, then crafts precise imports and usage— no manual API guessing required.  

**Codebase-Aware Modifications**  
Scans your code for existing patterns, variables, and functions to avoid conflicts. Example: If your React hook uses `fetch`, it integrates `axios` as an optional enhancer, not a replacement.  

**Minimal Effort**  
Just two inputs: package name + code snippet. No setup rituals or deep configs—the tool detects language (JS, Python hints, etc.) and outputs ready-to-paste code with comments.  

| Aspect          | Manual Integration | Library-Integration-Assistant |
|-----------------|--------------------|-------------------------------|
| **Time**       | Hours (docs + debug) | Seconds (AI generation)      |
| **Error Risk** | High (syntax/version issues) | Low (context-aware output)   |
| **Code Preservation** | Often requires rewrites | 100% intact, seamless adds   |
| **Learning Curve** | Steep (API memorization) | None (plug-and-play)         |

## 🔧 How It Works Under the Hood

Curious about the wizardry? Here's the streamlined flow—no black box vibes.

1. **User Input**: Enter package (e.g., `axios`) and paste code via the clean UI.  
2. **AI Prompt Engineering**: Crafts a targeted prompt (drawing from optimized templates in `.bolt/prompt`) to validate the package on NPM and integrate it surgically—preserving structure with inline comments.  
3. **Code Generation**: Frontend JS fetches from OpenRouter's API (Gemma model for free-tier smarts), processes the response, and extracts clean code. (Node.js backend ready via `server.js` for future scaling.)  
4. **Output Diff**: Displays the full modified code in a copyable `<pre><code>` block, highlighting changes for easy review.  

Built with Vite for snappy dev/reloads and Tailwind CSS for a polished, responsive UI. Language detection ensures JS/ES6+ focus, with hooks for broader langs. Simple, transparent, and extensible.

## 📦 Installation & Setup

Frictionless onboarding for any dev setup. Supports modern browsers (Chrome 90+, Firefox 90+, Safari 14+).

### Prerequisites
- Node.js 18+ (for dev server and npm).  
- An OpenRouter API key (free tier works; sign up at [openrouter.ai](https://openrouter.ai)).  

### Steps
1. Clone the repo:  
   ```bash
   git clone https://github.com/YashChaudhari999/Library-Integration-Assistant.git
   cd Library-Integration-Assistant/project
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Set up API Key:  
   Open `public/script.js` and replace `"API Key"` in the `Authorization` header with your actual OpenRouter key (e.g., `Bearer your-sk-...`). For production, use env vars via Vite's `.env` file:  
   ```
   VITE_OPENROUTER_API_KEY=your-sk-...
   ```  
   Then access it in code as `import.meta.env.VITE_OPENROUTER_API_KEY`.

4. Run the dev server:  
   ```bash
   npm run dev
   ```  
   Visit `http://localhost:5173`. Assets like favicons ensure a pro look out-of-the-box.

For builds: `npm run build` generates a static dist folder—deploy anywhere (Netlify, Vercel).

## 🎯 Usage Guide

Dive in with the intuitive interface: a sidebar for inputs, real-time output pane. No fluff, just results.

### Step-by-Step Workflow
1. **Paste Your Code**: Into the textarea—supports JS snippets from React components, Vue templates, or Node modules.  
2. **Enter Package**: Type any valid NPM lib (e.g., `axios`, `lodash`, `react-query`).  
3. **Generate**: Hit the button; AI analyzes and outputs in ~5-10s (depending on model load).  
4. **Review & Copy**: Scan the result for inline comments (`// Integrated axios for API calls`). Use the "Copy" button to snag it.  

*(Imagine a screenshot here: Clean grid layout with inputs on left, code output on right—loading spinner during AI call.)*

### Real-World Examples

**React Hook with `axios`**:  
*Input Code:*  
```jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```  
*AI Output (Snippet):*  
```jsx
// Auto-install required packages  
// ... (install block)  

import { useState, useEffect } from 'react';
import axios from 'axios'; // Integrated axios for robust HTTP requests

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Switched to axios for better error handling and config options
    axios.get('/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error('API error:', error));
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```  
*Win*: Adds error handling without altering your state logic.

**Vue Component with `lodash`**:  
*Input:* A basic Vue 3 script setup with array filtering.  
*Output*: Imports `_` and upgrades filters to `_.filter()`, keeping `ref` and `onMounted` untouched.

**Node Script with `jsonwebtoken`**:  
*Input:* Simple Express route.  
*Output*: Adds JWT middleware, auto-install, and token validation—perfect for auth boosts.

**Limitations**: Best for JS/ES6+; complex deps (e.g., peer deps) may need manual npm install post-copy. Free AI tiers have token limits—upgrade for heavy use. Test outputs in your env.

## 🤝 Contributing

Love the tool? Help make it even smarter—open-source vibes welcome!

1. Fork the repo and clone your fork.  
2. Set up dev env: `cd project && npm install && npm run dev`.  
3. Code away—follow ESLint rules (via `eslint.config.js`) for clean JS/TS.  
4. Test changes: Try integrations with edge cases like `vue-router` or `express`.  
5. Submit a PR: Clear title/description, reference issues if any. Focus on AI prompt tweaks, new framework templates (e.g., Svelte support), or UI polish.  

Ideas to spark: Enhance prompt folder in `.bolt` for better multi-lang detection, add diff visualization, or integrate local NPM caching. Your contrib could save devs worldwide!