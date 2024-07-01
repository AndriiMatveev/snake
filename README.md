# Snake Game

This project implements the classic Snake game using React, Redux, and React-Redux.

## Description

The Snake Game project includes three versions: one using local React state management, another using centralized Redux state management, and a third using React-Redux for combined functionality.

### ReactSnakePage

The React version of the Snake game uses local state management.

#### Features

- State management (snake direction, position, score, game over status) handled using React hooks (`useState`, `useEffect`, `useCallback`).
- Game logic and state managed locally within the component.
- Basic keyboard event handling for snake direction control.
- Utilizes local storage to persist and display total score across game sessions.

### ReduxSnakePage

The Redux version of the Snake game uses centralized state management with Redux.

#### Features

- Centralized state management using Redux.- Game logic and state managed locally within the component.
- State (snake direction, position, score, game over status) stored in the global Redux store.
- Actions (setDirection, setSnake, setScore, etc.) dispatched to update state.
- Improved predictability and scalability through centralized state management.
- Total score stored and retrieved from local storage.

### ReactReduxSnakePage

The React-Redux version of the Snake game combines React and Redux for state management.

#### Features

- State management using both React and Redux principles.
- State (snake direction, position, score, game over status) managed through Redux.
- Actions dispatched to update state, providing a scalable and predictable approach.
- Utilizes React components connected to the Redux store (connect from react-redux).

### Routing

The application uses React Router (react-router-dom) for routing between different game versions and pages.

## Getting Started

### Prerequisite: Node 18+

To get started with the project locally, follow these steps:

1. Clone the repository.

2. Install dependencies: 
```bash
   npm install 
``` 

3. Run the application: 
```bash
   npm start 
``` 

#### After completing these steps, the project will be accessible at `http://localhost:3000`.


