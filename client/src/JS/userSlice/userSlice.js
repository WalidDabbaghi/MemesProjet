import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/user";

// Récupérer l'utilisateur du localStorage
const savedUser = JSON.parse(localStorage.getItem("user")) || null;

//**********register user***********************
export const userRegister = createAsyncThunk("user/register", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Échec de l'inscription");
    }
});

//**********login user***********************
export const userLogin = createAsyncThunk("user/login", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Échec de la connexion");
    }
});

//**********current user***********************
export const userCurrent = createAsyncThunk("user/current", async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Aucun token trouvé");

        const response = await axios.get(`${BASE_URL}/current`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.setItem("user", JSON.stringify(response.data.user)); // Sauvegarde des données utilisateur

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Échec de la récupération de l'utilisateur");
    }
});

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: savedUser, // Charger les données au démarrage
        status: "idle",
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.data = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user"); // Supprimer l'utilisateur stocké
        },
    },
    extraReducers: (builder) => {
        builder
            //**********register user***********************
            .addCase(userRegister.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.user;
            })

            //**********login user***********************
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.user;
            })

            //**********current user***********************
            .addCase(userCurrent.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.user;
            });
    },
});

// Export des actions et du reducer
export const { logout } = userSlice.actions;
export default userSlice.reducer;
