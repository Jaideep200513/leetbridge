// ==UserScript==
// @name         LeetCode GitHub Sync
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Upload LeetCode solutions to GitHub
// @match        https://leetcode.com/problems/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const GITHUB_TOKEN = "YOUR_GITHUB_TOKEN";

    const OWNER = "YOUR_USERNAME";
    const REPO = "YOUR_REPO_NAME";

    console.log("LeetCode Sync Loaded!");

    async function uploadToGitHub(path, content, commitMessage) {

        const encodedContent = btoa(
            unescape(encodeURIComponent(content))
        );

        let sha = null;

        const fileResponse = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
            {
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github+json"
                }
            }
        );

        if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            sha = fileData.sha;
        }

        const body = {
            message: commitMessage,
            content: encodedContent
        };

        if (sha) {
            body.sha = sha;
        }

        const uploadResponse = await fetch(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github+json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        );

        return uploadResponse;
    }

    const button = document.createElement("button");
    button.innerText = "📤 Upload Solution";

    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "99999";
    button.style.padding = "12px 18px";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.background = "#2563eb";
    button.style.color = "white";
    button.style.border = "none";
    button.style.fontWeight = "bold";

    button.onclick = async () => {

        console.log("Button clicked");

        try {

            const code =
                document.querySelector('.view-lines')?.innerText;

            if (!code || code.trim().length === 0) {
                alert("❌ No code detected in editor.");
                return;
            }

            const language =
                document
                    .querySelector('[data-mode-id]')
                    ?.getAttribute('data-mode-id');

            if (!language) {
                alert("❌ Could not detect language.");
                return;
            }

            const slug =
                window.location.pathname.split("/")[2];

            const graphqlResponse = await fetch(
                "https://leetcode.com/graphql",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: `
                            query questionData($titleSlug: String!) {
                                question(titleSlug: $titleSlug) {
                                    questionFrontendId
                                    difficulty
                                    title
                                }
                            }
                        `,
                        variables: {
                            titleSlug: slug
                        }
                    })
                }
            );

            const data = await graphqlResponse.json();

            const question = data?.data?.question;

            if (!question) {
                alert("❌ Could not fetch problem information.");
                return;
            }

            const difficultyFolder = {
                Easy: "easy",
                Medium: "medium",
                Hard: "hard"
            };

            const extensions = {
                java: "java",
                python: "py",
                cpp: "cpp",
                javascript: "js",
                c: "c",
                csharp: "cs",
                golang: "go",
                rust: "rs",
                kotlin: "kt",
                typescript: "ts"
            };

            const folder =
                difficultyFolder[question.difficulty];

            const extension =
                extensions[language];

            if (!folder) {
                alert(
                    `❌ Unsupported difficulty: ${question.difficulty}`
                );
                return;
            }

            if (!extension) {
                alert(
                    `❌ Unsupported language: ${language}`
                );
                return;
            }

            const filePath =
                `${folder}/${question.questionFrontendId}.${extension}`;

            const confirmed = confirm(
                `Upload ${filePath} to GitHub?`
            );

            if (!confirmed) {
                return;
            }

            button.disabled = true;
            button.innerText = "⏳ Uploading...";

            const uploadResponse = await uploadToGitHub(
                filePath,
                code,
                `LeetCode #${question.questionFrontendId}`
            );

            button.disabled = false;
            button.innerText = "📤 Upload Solution";

            if (uploadResponse.ok) {

                alert(`✅ Uploaded ${filePath}`);

            } else {

                const error =
                    await uploadResponse.text();

                console.error(error);

                alert(
                    "❌ Upload failed. Check console."
                );
            }

        } catch (err) {

            console.error(err);

            button.disabled = false;
            button.innerText = "📤 Upload Solution";

            alert(
                "❌ Unexpected error. Check console."
            );
        }
    };

    document.body.appendChild(button);

})();
