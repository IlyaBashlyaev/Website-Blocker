// ==UserScript==
// @name         Website Blocker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Blocks certain websites
// @author       Ilya Bashlyaev
// @match        *://*/*
// @grant        none
// ==/UserScript==

// Blocked websites list: domains and their subdomains, full website URLs
// Edit this list to enter your websites
const blocked_websites = `
--- Replace this string and enter your websites here ---
`;

(function () {
    'use strict';
    // Getting the blocked websites from the custom function
    const blocked_websites_array = blocked_websites.split('\n').filter(i => i);

    // Getting the current domain and URL
    const current_domain = window.location.hostname,
        current_URL = window.location.href;

    // Fast website check
    const is_blocked = blocked_websites_array.some(website => current_domain.endsWith(website) || current_URL.includes(website));

    if (is_blocked) {
        try {
            // Display of the blocking message instead of the page content
            document.documentElement.innerHTML = `
                <style>
                    body {
                        margin: 0;
                        padding: 2em;
                        height: calc(100vh - 4em);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        font-family: sans-serif;
                        background-color: #111;
                        color: #fff;
                    }
                    .block-message {
                        max-width: 600px;
                    }
                </style>
                <body>
                    <div class="block-message">
                        <h1>🚫 Website blocked 🚫</h1>
                        <p>This webpage has been blocked by the Userscript called "Website Blocker".</p>
                        <p>If you believe that this is an error, update the blocked websites list in your Userscript.</p>
                    </div>
                </body>
            `;
        }
        catch {
            // Redirect to Google if there was error on replacing the content
            window.location.href = 'https://www.google.com';
        }

        // Stop further webpage execution
        throw new Error('Access to this webpage is blocked');
    }
})();