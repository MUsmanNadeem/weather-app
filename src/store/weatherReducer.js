import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    searchQuery: "",
    weatherInfo: [],
    showLoader: false,
    showError: false,
    shownFarenhietTemp: false,
  },
  reducers: {
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
    setTempType: (state, { payload }) => {
      state.shownFarenhietTemp = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(weatherDataAsync.pending, (state, { payload }) => {
      state.showLoader = true;
      state.showError = false;
    });

    builder.addCase(weatherDataAsync.fulfilled, (state, { payload }) => {
      state.showLoader = false;
      state.weatherInfo = payload;
    });

    builder.addCase(weatherDataAsync.rejected, (state, { payload }) => {
      state.showLoader = false;
      state.showError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setSearchQuery, setTempType } = weatherSlice.actions;

export default weatherSlice.reducer;
export const weatherDataAsync = createAsyncThunk(
  "weather/data",
  async (disptachedData, thunkAPI) => {
    const state = thunkAPI.getState();
    const rejectWithValue = thunkAPI.rejectWithValue();
    const searchQuery = state.weatherSlice.searchQuery;
    const tempType = state.weatherSlice.shownFarenhietTemp;
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&cnt=5&units=${
          tempType ? "metric" : "imperial"
        }&appid=337eaa2ba65564479244ff2634a42d1f`
      );
      return data?.list;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
