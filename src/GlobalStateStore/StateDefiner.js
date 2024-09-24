import { createSlice } from "@reduxjs/toolkit";

// Function to fetch user data from localStorage
const fetchData = () => {
    const data = localStorage.getItem('NotesProblem');

    if (data) {
        try {
            const parsedData = JSON.parse(data);
            if (
                parsedData &&
                typeof parsedData.name === 'string' &&
                typeof parsedData.email === 'string' &&
                typeof parsedData.userId === 'string'
            ) {
                return {
                    name: parsedData.name || "",
                    email: parsedData.email || "",
                    userId: parsedData.userId || "",
                    loginStatus: parsedData.name.trim() !== "" && parsedData.email.trim() !== ""
                };
            }
        } catch (error) {
            console.error('Error parsing data from localStorage:', error);
        }
    }

    // Return default user object if no valid data found
    return {
        name: "",
        email: "",
        userId: "",
        loginStatus: false
    };
};

// Set the initial state and store it in localStorage on application load
const initialState = {
    user: fetchData()
};

// Store the initial state in localStorage if not already present
localStorage.setItem("NotesProblem", JSON.stringify(initialState.user));

export const stateSlice = createSlice({
    name: "NotesProblemState",
    initialState,
    reducers: {
        loggedin: (state, action) => {
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
            state.user.userId = action.payload.$id;
            state.user.loginStatus = true;
            localStorage.setItem("NotesProblem", JSON.stringify(state.user));
        },

        loggedOut: (state) => {
            state.user.name = "";
            state.user.email = "";
            state.user.userId = "";
            state.user.loginStatus = false;
            localStorage.setItem("NotesProblem", JSON.stringify(state.user));
        }
    }
});

export const { loggedin, loggedOut } = stateSlice.actions;

const stateSliceReducers = stateSlice.reducer;

export default stateSliceReducers;
