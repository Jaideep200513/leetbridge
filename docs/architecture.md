# LeetBridge Architecture

## Workflow

```text
┌──────────────────┐
│ LeetCode Problem │
└────────┬─────────┘
         │
         ▼
┌─────────────────────┐
│ Metadata Extraction │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Problem Information │
├─────────────────────┤
│ • Problem ID        │
│ • Difficulty        │
│ • Language          │
│ • Source Code       │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ Path Generation     │
├─────────────────────┤
│ easy/1.java         │
│ medium/49.py        │
│ hard/123.cpp        │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ GitHub REST API     │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│ GitHub Repository   │
└─────────────────────┘
```

## Responsibilities

### Metadata Extraction
- Extract code from the Monaco editor
- Detect programming language
- Retrieve problem metadata from LeetCode GraphQL API

### Repository Organization
- Generate difficulty-aware folder structure
- Generate language-aware file extensions
- Maintain consistent repository organization

### GitHub Integration
- Create new solution files
- Update existing solution files
- Commit changes through GitHub REST API
