# 3 Charts - Department of Defense Funding Analysis

This repository contains three charts focused on Department of Defense funding analysis. It features three interactive charts that provide insights into defense spending patterns, budget allocations, and fiscal year comparisons.

## Development Setup

### Prerequisites

* Node.js (version 20.12.2 recommended)
* npm (version 10.8.3 recommended)
* Git

### Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/Rob-Gould/3charts.git
   cd 3charts
   ```

2. Install dependencies:
   ```shell
   npm install
   ```

3. Start the development server:
   ```shell
   npm start
   ```

4. The application will be available at `http://localhost:3000`

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts development server with hot reloading |
| `npm run build` | Builds production-ready assets |
| `npm test` | Runs test suite |

## Configuration

The application can be configured through environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_FY` | 2025 | Default fiscal year to display |

## Troubleshooting

If you encounter any issues during installation:

1. Make sure you're using the correct Node.js version
2. Try clearing npm cache: `npm cache clean --force`
3. If you see dependency errors: `npm install --legacy-peer-deps`
