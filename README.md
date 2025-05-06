# Kotsios Radio Player

Kotsios Radio Player is a modern Electron-based application for streaming and managing radio stations. Built with React and TypeScript, it provides a seamless experience for listening to your favorite radio stations with features like metadata display, media session integration, and more.

## Features

- **Radio Streaming**: Stream your favorite radio stations with ease.
- **ICY Metadata Support**: Display song titles and artist information from supported streams.
- **Media Session API**: Control playback using media keys and taskbar media controls.
- **Cross-Platform**: Available for Windows, macOS, and Linux.
- **Customizable UI**: Built with React and styled for a modern look.
- **Electron Integration**: Combines the power of web technologies with desktop capabilities.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) with the following extensions:
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Structure

The project is organized as follows:

- **`src/main`**: Main process code for Electron.
- **`src/preload`**: Preload scripts for secure communication between the renderer and main processes.
- **`src/renderer`**: Frontend code built with React and TypeScript.
- **`icecast_packages`**: Custom libraries for handling Icecast metadata and streaming.
- **`resources`**: Static assets like icons and database files.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kotsiossp97/kotsios-radio-player.git
   cd kotsios-radio-player
   ```
