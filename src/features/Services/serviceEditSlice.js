import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'idle',
    id: '',
    name: '',
    price: '',
    content: ''
};

export const serviceEditSlice = createSlice({
    name: 'serviceEdit',
    initialState,
    reducers: {
        changeEditServiceField: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        setEditStatus: (state, action) => {
            state.status = action.payload;
        },
        setEditService: (state, action) => {
            Object.assign(state, action.payload);
        },
        cleanEditService: (state) => {
            return initialState;
        },
    },
})

export const { changeEditServiceField, setEditStatus, setEditService, cleanEditService } = serviceEditSlice.actions
export default serviceEditSlice.reducer