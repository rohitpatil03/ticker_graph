# Ticker Graph 📈

A powerful terminal-based stock price charting application built with React and OpenTUI. Visualize real-time candlestick charts for any stock ticker directly in your terminal.

## Features

- **Real-time Stock Data**: Fetch live stock data from Yahoo Finance
- **Interactive Candlestick Charts**: Beautiful candlestick visualization in your terminal
- **Customizable Intervals**: View data in 15-minute, 30-minute, hourly, or daily intervals
- **Auto-Refresh**: Automatically refresh stock data at regular intervals
- **Flexible Timeframes**: Set custom start and end dates for historical data analysis
- **Dynamic Sizing**: Adjust chart rows and columns on the fly
- **Leader Key Commands**: Efficient keyboard shortcuts for quick access
- **Cross-platform**: Works seamlessly on macOS, Linux, and Windows (with WSL)

## Prerequisites

- **Bun** (v1.0+) - Fast all-in-one JavaScript runtime
- **Node.js** (optional, for TypeScript type checking)

To install Bun, visit [bun.sh](https://bun.sh)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticker_graph
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Build the project** (optional - for standalone executable)
   ```bash
   bun run build
   ```

   This creates a standalone `ticker_graph` executable that can be run without Node.js or Bun.

## Usage

### Starting the Application

**Development mode** (with hot reload):
```bash
bun dev
```

**Production mode** (using compiled binary):
```bash
./ticker_graph
```

### Keyboard Shortcuts

#### Global Shortcuts
| Key | Action |
|-----|--------|
| `` ` `` | Toggle developer console |
| `Ctrl + T` | Activate leader key mode |
| `Ctrl + R` | Toggle auto refresh |
| `Esc` | Close active modal, help, and cancel leader mode |

#### Leader Key Commands
Press `Ctrl + T`, then one of the following keys:

| Key | Action | Input |
|-----|--------|-------|
| `r` | Set number of rows | Enter the row value |
| `c` | Set number of columns | Enter the number of columns |
| `s` | Set stock name | Enter the Stock Name (e.g., AAPL, GOOGL, MSFT) |
| `h` | Set stock start date | Enter the Start Date (dd/mm/yyyy format) |
| `l` | Set stock end date | Enter the End Date (dd/mm/yyyy format) |
| `i` | Set stock interval | Select Stock Interval from list (15m, 30m, 1h, 1d) |
| `?` | Open help modal | Display this help information |

### Example Workflows

1. **View Apple stock for the last 3 days in hourly intervals**
   - Press `Ctrl + T` then `s`
   - Enter `AAPL`
   - Press `Ctrl + T` then `i`
   - Select `1h`
   - Press `Ctrl + T` then `l`
   - Enter today's date

2. **Expand the chart view**
   - Press `Ctrl + T` then `r`
   - Enter a larger number (e.g., 50)
   - Press `Ctrl + T` then `c`
   - Enter a larger number (e.g., 200)

3. **Keep data updated automatically**
   - Press `Ctrl + R` to toggle auto-refresh
   - The chart will automatically fetch new data at intervals

## Project Structure

```
ticker_graph/
├── src/
│   ├── components/          # React UI components
│   │   ├── App.jsx          # Main application component
│   │   ├── ChartBody.jsx    # Chart rendering logic
│   │   ├── Candlestick.jsx  # Candlestick chart component
│   │   ├── TopBar.jsx       # Header and stock information
│   │   ├── XAxis.jsx        # Horizontal axis with dates
│   │   ├── YAxis.jsx        # Vertical axis with prices
│   │   ├── Modal.jsx        # Input modal component
│   │   └── HelpModal.jsx    # Help display modal
│   ├── hooks/               # Custom React hooks
│   │   ├── useChartData.js  # Data fetching and processing
│   │   └── useChartDimensions.js # Chart sizing logic
│   ├── utils/               # Utility functions
│   │   ├── chartCalculations.js  # Math calculations for chart
│   │   ├── dateFormatter.js      # Date formatting utilities
│   │   └── fileLoader.js         # File loading utilities
│   ├── constants/           # Application constants
│   ├── data.json            # Sample data
│   ├── help.json            # Help content
│   └── index.jsx            # Application entry point
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Technologies Used

- **React 19.2.3** - UI library for building components
- **OpenTUI 0.1.69** - Terminal UI framework
- **Yahoo Finance 2** - Real-time stock data API
- **Bun** - JavaScript runtime and package manager
- **TypeScript** - For type safety (optional)

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@opentui/core` | ^0.1.69 | Core TUI framework |
| `@opentui/react` | ^0.1.69 | React bindings for OpenTUI |
| `react` | ^19.2.3 | UI framework |
| `yahoo-finance2` | ^3.11.2 | Stock data API |

## API Reference

The application uses the **Yahoo Finance API** (@yahoo-finance2) to fetch stock data. No API key is required.

Supported data:
- Open, High, Low, Close prices
- Trading volume
- Adjusted close price
- Historical data for any trading symbol

## Troubleshooting

### Issue: No data appears in the chart
- Ensure the stock ticker symbol is valid (e.g., AAPL, MSFT, GOOGL)
- Check your internet connection for API calls
- Verify the date range is valid (end date after start date)

### Issue: Application crashes on startup
- Ensure Bun is installed correctly: `bun --version`
- Try clearing the cache: `rm -rf node_modules` and `bun install` again
- Check that your terminal supports 256 colors

### Issue: Keyboard shortcuts not working
- Some terminal emulators may not properly support all keyboard combinations
- Try using a different terminal (VSCode Integrated Terminal, iTerm2, Windows Terminal, etc.)

## Contributing

We are actively working on improving Ticker Graph! Here are ways you can help:

- **Report Bugs**: Found an issue? Open an issue on GitHub
- **Request Features**: Have ideas for new features? Suggest them!
- **Submit Pull Requests**: Fix bugs or add features and submit PRs
- **Improve Documentation**: Help us improve our docs and examples

## Future Enhancements (Coming Soon)

- 📊 Multiple chart types (line charts, OHLC bars)
- 💰 Portfolio tracking
- 🔔 Price alerts
- 📈 Technical indicators (Moving Averages, RSI, MACD)
- 💾 Save and load custom layouts
- 🌐 Support for international stock exchanges

## License

MIT

---

## ⭐ If you like this project, please consider giving it a star on GitHub!

Your support helps us continue development and makes it easier for others to discover this tool.

```
git clone https://github.com/yourusername/ticker_graph.git
cd ticker_graph
bun install
bun dev
```

Happy trading! 📈
