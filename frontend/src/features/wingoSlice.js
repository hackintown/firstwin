import { createSlice } from "@reduxjs/toolkit";

const wingoSlice = createSlice({
  name: "wingo",
  initialState: {
    activeGameType: "30sec", // Default active game type
    games: {
      "30sec": { currentGame: null, history: [], countdown: null },
      "1min": { currentGame: null, history: [], countdown: null },
      "3min": { currentGame: null, history: [], countdown: null },
      "5min": { currentGame: null, history: [], countdown: null },
    },
  },
  reducers: {
    // Update the currently active game type
    setActiveGameType: (state, action) => {
      state.activeGameType = action.payload;
    },

    // Update the current game state for a specific game type
    setCurrentGame: (state, action) => {
      const { gameType, data } = action.payload;
      state.games[gameType].currentGame = data;
    },

    // Append new results to the game history
    addGameHistory: (state, action) => {
      const { gameType, history } = action.payload;
      // Limit history to 20 entries for performance
      state.games[gameType].history = [...history, ...state.games[gameType].history].slice(0, 20);
    },

    // Set the countdown for a specific game type
    setCountdown: (state, action) => {
      const { gameType, countdown, showAnimation } = action.payload;
      state.games[gameType].countdown = { value: countdown, showAnimation };
  },

    // Add the result of a completed game to the history
    setGameResult: (state, action) => {
      const { gameType, result, period } = action.payload;
      // Prepend the new result to the history array
      state.games[gameType].history.unshift({ period, ...result });

      // Maintain a history size of 20 for performance
      state.games[gameType].history = state.games[gameType].history.slice(0, 20);
    },

    // Update the state of the game based on live updates
    updateGameState: (state, action) => {
      const { gameType, stateUpdate } = action.payload;
      state.games[gameType].currentGame = {
        ...state.games[gameType].currentGame,
        ...stateUpdate,
      };
    },
  },
});

export const {
  setActiveGameType,
  setCurrentGame,
  addGameHistory,
  setCountdown,
  setGameResult,
  updateGameState,
} = wingoSlice.actions;

export default wingoSlice.reducer;
