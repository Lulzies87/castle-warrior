# castle-warrior
Castle Warrior is a web-based game where players navigate through levels, collect diamonds, and fight enemies. The game is built using TypeScript, Express, and MongoDB.

***Please note that this project is still a work in progress.***

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Functionality](#functionality)
- [Acknowledgements](#acknowledgements)
- [Next Steps](#next-steps)

## Installation
To run the project locally, follow these steps:
 1. Clone the repository.
 2. Install dependencies by running npm install.
 3. Start the development server with npm run dev.

## Usage
Once the project is running, the player can control the character using the following keys:

**A**: Move left

**D**: Move right

**W**: Jump / Enter door

**SPACE**: Attack enemies

The goal is to collect diamonds and earn points.

## Code Structure
The project is organized as follows:

- **src/main.ts**: This file contains the main game logic, including canvas setup, rendering context, level initialization, player setup, and the integration of game elements such as diamonds, enemies, and doors.

- **src/levels.ts**: Manages the level data and initialization. It includes the setup for background, player, collisions, doors, diamonds, enemies, and game instructions. The file also handles the positioning of instructions relative to the canvas.

- **src/utils.ts**: Provides utility functions for parsing 2D arrays and creating game objects from these arrays, facilitating the setup of collision blocks and other level elements.

- **src/classes**: Contains class definitions for various game components, including `Player`, `CollisionBlock`, `Diamond`, `Door`, `Enemy`, `Sprite`, and `InstructionManager`. These classes encapsulate the behavior and properties of game entities.

- **src/assets**: Stores game assets such as images and stylesheets used for rendering the game visuals and styling.

- **src/eventListeners.ts**: Handles keyboard input events to control player actions within the game.

## Functionality
Castle Warrior is designed to provide an engaging gaming experience with the following features:

- **Level Navigation**: Players can navigate through multiple levels, each with unique layouts and challenges. Levels are initialized and managed in `src/levels.ts`, where the game elements are set up.

- **Player Interaction**: The player character can move around the canvas, collect diamonds, and interact with other game elements. Player actions are controlled via keyboard inputs, handled in `src/eventListeners.ts`.

- **Dynamic Instructions**: Instructions are displayed to guide players through the game. The `InstructionManager` class in `src/classes/InstructionManager.ts` manages the display and timing of these instructions, positioning them relative to the canvas.

- **Game Elements**: The game includes various interactive elements such as diamonds, enemies, and doors. These elements are integrated into the game through `src/main.ts` and are defined in their respective classes within `src/classes`.

- **Backend Integration**: The game is supported by an Express server, as seen in `api/src/index.ts`, which handles API requests and connects to a MongoDB database. This setup allows for potential expansion to include features like saving game progress or fetching dynamic level data.

## Acknowledgements
This project utilizes the GSAP library for animations and follows best practices for game development in TypeScript.
Feel free to explore the codebase further to understand the game mechanics and customization options available.

## Next Steps
- Implement a scoring system.
- Develop combat mechanisms.