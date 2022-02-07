import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const initialState = {
    status: 'idle',
    deletingItems: [],
    deletedItems: 0,
    services: [
        { id: nanoid(), name: 'Замена стекла', price: 22000 },
        { id: nanoid(), name: 'Замена дисплея', price: 25000 },
    ]
};

export const serviceListSlice = createSlice({
    name: 'serviceList',
    initialState,
    reducers: {
        editService: (state, action) => {
            const { name, price, id } = action.payload;

            //Если в полях нет данных, то ничего не делаем
            if (!name || !price) return state;

            const service = state.find(service => service.id === id);
            if (service) {
                service.name = name;
                service.price = Number(price);
            }
            else state.push({ id: nanoid(), name, price: Number(price) });
        },
        setServices: (state, action) => {
            state.services = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        startDelete: (state, action) => {
            state.deletingItems.push(action.payload);
        },
        finishDelete: (state, action) => {
            state.deletedItems++;
        },
        cleanDeletingStatuses: (state, action) => {
            state.deletedItems = 0;
            state.deletingItems = [];
        },
        removeService: (state, action) => {
            const id = action.payload;
            state.services = state.services.filter(service => service.id !== action.payload);
        },
    },
})

export const { editService, setServices, setStatus, startDelete, finishDelete, cleanDeletingStatuses } = serviceListSlice.actions
export default serviceListSlice.reducer