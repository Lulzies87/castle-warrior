# castle-warrior
## Project Overview
This project is a 2D game developed using TypeScript and GSAP library for animations. The game involves a player character navigating through levels, collecting diamonds, and interacting with enemies and doors.
***Please note that this project is still a work in progress.***

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

The goal is to collect diamonds to earn points and enter the door to progress to the next level.

## Code Structure
The project structure is organized as follows:
**src/main.ts**: Contains the main game logic, level initialization, player setup, and game elements like diamonds, enemies, and doors.
**src/utils.ts**: Includes utility functions for parsing 2D arrays and creating objects from 2D arrays.

## Functionality
The parse2D function in utils.ts is used to convert a 1D array into a 2D array by splitting it into rows of a specified length. This function is crucial for setting up collision blocks and level layouts in the game, it takes a 1D array like levelData and converts it into a 2D array where each row contains 16 elements. The resulting parsedLevel array will be a 2D representation of the original data.

## Acknowledgements
This project utilizes the GSAP library for animations and follows best practices for game development in TypeScript.
Feel free to explore the codebase further to understand the game mechanics and customization options available.

## Next Steps
- Implement a scoring system.
- Develop combat mechanisms.