import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearch: (state) => {
      state.searchTerm = '';
    },
  },
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export const selectSearchTerm = (state) => state.search.searchTerm;

export default searchSlice.reducer;
