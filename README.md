# 🌉 LeetBridge

Turn Accepted Solutions into GitHub History.

LeetBridge is a browser automation tool that synchronizes LeetCode solutions directly to GitHub repositories with automatic difficulty-based organization.

## Why I Built It

Maintaining a GitHub repository of LeetCode solutions is repetitive:

1. Solve problem
2. Create file manually
3. Choose correct folder
4. Copy code
5. Commit changes

LeetBridge reduces this workflow to a single click.

## Features

* One-click GitHub synchronization
* Automatic problem ID extraction
* Automatic difficulty detection
* Automatic language detection
* GitHub REST API integration
* Automatic file creation and updates

## Repository Structure

easy/1.java

medium/49.py

hard/123.cpp

## Architecture

```text
┌────────────┐
│  LeetCode  │
└─────┬──────┘
      │
      ▼
┌────────────┐
│ LeetBridge │
└─────┬──────┘
      │
      ▼
┌─────────────────────┐
│ Metadata Extraction │
└─────┬───────────────┘
      │
      ▼
┌─────────────────────┐
│  GitHub REST API    │
└─────┬───────────────┘
      │
      ▼
┌─────────────────────┐
│ GitHub Repository   │
└─────────────────────┘
```

## Tech Stack

* JavaScript
* Tampermonkey
* GitHub REST API
* LeetCode GraphQL API

## Demo

Demo Video: https://youtu.be/87wHSTiaAfA

## Future Improvements

* Auto-upload after Accepted submissions
* Multi-repository support
* Settings UI for GitHub configuration
* Browser extension version
