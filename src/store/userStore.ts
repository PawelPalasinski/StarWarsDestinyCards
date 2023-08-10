import { create } from "zustand";
import {
  isValidLogin,
  isValidPassword,
  isExistingUser,
} from "../js/loginAndPasswordValidation";

const useUserStore = create((set) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  return {
    isLoggedIn: false,
    loggedInUser: null,
    users: storedUsers,
    addUser: (login, password) => {
      const state = useUserStore.getState();
      const users = state.users;

      if (!isValidLogin(login)) {
        console.log("Invalid login. Must be between 3 and 20 characters.");
        return;
      }

      if (!isValidPassword(password)) {
        console.log(
          "Invalid password. Must contain at least one uppercase letter and one digit."
        );
        return;
      }

      if (isExistingUser(users, login)) {
        console.log("User with this login already exists.");
        return;
      }

      const newUser = {
        login,
        password,
        collection: [],
      };
      set((state) => ({
        users: [...state.users, newUser],
        loggedInUser: newUser,
        isLoggedIn: true,
      }));
      console.log(`User added: ${login}`);
      localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));
    },

    handleLogin: (login, password) => {
      const state = useUserStore.getState();
      const isLoggedIn = state.isLoggedIn;
      if (!isLoggedIn) {
        const user = state.users.find((user) => user.login === login);
        if (user && user.password === password) {
          set({ isLoggedIn: true, loggedInUser: user });
          console.log(`Logged in as: ${login}`);
          return user;
        } else {
          console.log("Invalid login or password");
          return null;
        }
      } else {
        console.log("User is already logged in");
        return null;
      }
    },

    handleLogout: () => {
      const state = useUserStore.getState();
      const isLoggedIn = state.isLoggedIn;
      if (isLoggedIn) {
        set({ isLoggedIn: false, loggedInUser: null });
        console.log("Logged out successfully");
      } else {
        console.log("User is already logged out");
      }
    },

    handleAddOrRemoveFromCollection: (
      login,
      cardCode,
      rating,
      cardImage,
      cardName
    ) => {
      set((state) => {
        const userIndex = state.users.findIndex((user) => user.login === login);
        if (userIndex !== -1) {
          const updatedUsers = [...state.users];
          const user = { ...updatedUsers[userIndex] };
          const collection = user.collection || [];
          const cardIndex = collection.findIndex(
            (card) => card.cardCode === cardCode
          );
          if (cardIndex !== -1) {
            // DEL
            collection.splice(cardIndex, 1);
            console.log(
              `STORE: Card ${cardCode}: ${cardName} removed from collection for user: ${login}`
            );
          } else {
            // ADD
            const newCard = { cardCode, rate: rating, cardImage, cardName };

            collection.push(newCard);
            console.log(
              `STORE: Card ${cardCode}: ${cardName} added to collection for user: ${login}`
            );
          }
          user.collection = collection.length > 0 ? collection : null;
          updatedUsers[userIndex] = user;
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          return { users: updatedUsers, loggedInUser: user };
        } else {
          console.log(`User: ${login} not found`);
          return state;
        }
      });
    },

    setRating: (login, cardCode, rating) => {
      set((state) => {
        const userIndex = state.users.findIndex((user) => user.login === login);
        if (userIndex !== -1) {
          const updatedUsers = [...state.users];
          const user = { ...updatedUsers[userIndex] };
          const collection = user.collection || [];
          const cardIndex = collection.findIndex(
            (card) => card.cardCode === cardCode
          );
          if (cardIndex !== -1) {
            collection[cardIndex].rate = rating;
            console.log(
              `Updated rating for card ${cardCode} for user: ${login}`
            );
          }
          user.collection = collection.length > 0 ? collection : null;
          updatedUsers[userIndex] = user;
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          return { users: updatedUsers };
        } else {
          console.log(`User: ${login} not found`);
          return state;
        }
      });
    },

    getButtonText: (cardCode) => {
      const state = useUserStore.getState();
      const isLoggedIn = state.isLoggedIn;
      const collection = useUserStore.getState().loggedInUser.collection || [];
      const isCardInCollection = collection.some(
        (card) => card.cardCode === cardCode
      );

      if (isLoggedIn) {
        return isCardInCollection ? "DEL" : "ADD";
      } else {
        return "LOGIN";
      }
    },
  };
});

export default useUserStore;
