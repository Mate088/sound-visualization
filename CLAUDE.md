# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a browser-based audio visualization application that creates real-time visual effects synchronized with audio playback. The application uses the Web Audio API to analyze frequency data and renders animated columns on an HTML5 canvas that respond to the audio spectrum.

## Architecture

- **Frontend-only application**: No build system, package.json, or backend dependencies
- **Pure vanilla JavaScript**: No frameworks or libraries used
- **Single-page application**: All functionality contained in one HTML file with separate CSS and JS files

### Key Components

- `index.html`: Main application entry point with audio element and canvas
- `js/index.js`: Core application logic containing:
  - Web Audio API setup (`AudioContext`, `MediaElementSource`, `AnalyserNode`)
  - Canvas rendering system with `drawColumn()` and `render()` functions
  - Audio playback controls and event handling
  - Responsive canvas resizing
- `css/style.css`: Application styling with dark theme and translucent controls
- `css/normalize.css`: CSS reset/normalization

### Audio Processing Architecture

- **Audio Context**: Creates Web Audio API context for audio processing
- **Source**: `MediaElementSource` connects HTML5 audio element to Web Audio API
- **Analyser**: `AnalyserNode` with 2048 FFT size for frequency analysis
- **Frequency Data**: `Uint8Array` buffer containing real-time frequency spectrum data
- **Visualization**: Real-time rendering loop using `requestAnimationFrame`

### Canvas Rendering System

- **Column-based visualization**: Each frequency bin renders as a vertical column
- **Gradient effects**: Linear gradients from red to orange to white
- **Responsive scaling**: Canvas dimensions and column heights scale with window size
- **Performance optimization**: Uses efficient clearing and redrawing techniques

## Development Commands

This project has no build system or package manager. To develop:

1. **Serve locally**: Use any static file server (e.g., `python -m http.server` or Live Server extension)
2. **Testing**: Open in browser and verify audio playback and visualization work
3. **Browser compatibility**: Test in Chrome/Firefox (requires HTTPS for some features)

## File Structure

```
/
├── index.html              # Main application file
├── js/
│   └── index.js           # Application logic and Web Audio API code
├── css/
│   ├── style.css          # Application styling
│   └── normalize.css      # CSS reset
└── *.m4a                  # Audio file(s) for playback
```

## Key Configuration

- `columnCount = 2048`: Controls FFT size and number of visualization columns
- `columnsGap = 30`: Spacing between visualization columns
- Canvas automatically resizes to full viewport dimensions
- Frequency data normalized to canvas height with scaling factor

## Browser Requirements

- Modern browser with Web Audio API support
- HTTPS may be required for audio context in some browsers
- File access permissions needed for local audio files