import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {type ITodoItem} from "../../types";

type SliceState = { todoList: ITodoItem[], editingItem: null | ITodoItem, statusFiltered: number }

const initialState: SliceState = {todoList: [], editingItem: null, statusFiltered: -1}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setStatusFiltered: (state, action: PayloadAction<number>) => {
            state.statusFiltered = action.payload
        },
        setEditingItem: (state, action: PayloadAction<ITodoItem | null>) => {
            state.editingItem = action.payload
        },
        addTask: (state, action: PayloadAction<ITodoItem>) => {
            state.todoList = [action.payload, ...state.todoList]
        },
        setTodoList: (state, action: PayloadAction<ITodoItem[]>) => {
            state.todoList = action.payload
        },
    }
})

export const {
    setStatusFiltered,
    setEditingItem,
    addTask,
    setTodoList
} = appSlice.actions

export default appSlice.reducer;
