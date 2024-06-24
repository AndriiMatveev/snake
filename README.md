# Snake Game

This project implements the classic Snake game using React and Redux.

## Description

The Snake Game project includes two versions: one using local React state management and another using centralized Redux state management.

### ReactSnakePage

The React version of the Snake game using local state management.

#### Features

- State management (snake direction, position, score, game over status) handled using React hooks (`useState`, `useEffect`, `useCallback`).
- Game logic and state managed locally within the component.
- Basic keyboard event handling for snake direction control.
- Utilizes local storage to persist and display total score across game sessions.

### ReduxSnakePage

The Redux version of the Snake game using centralized state management.

#### Features

- Centralized state management using Redux.
- State (snake direction, position, score, game over status) stored in global Redux store.
- Actions (`setDirection`, `setSnake`, `setScore`, etc.) dispatched to update state.
- Improved predictability and scalability through centralized state management.
- Total score stored and retrieved from local storage.

## Getting Started

### Prerequisite: Node 18+

To get started with the project locally, follow these steps:

1. Install dependencies: 
```bash
   npm install 
``` 

2. Run the application: 
```bash
   npm start 
``` 

#### After completing these steps, the project will be accessible at `http://localhost:3000`.


