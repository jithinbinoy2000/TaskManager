import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";

const taskStore = configureStore({
    reducer:{
taskSlice
    }
})
export default taskStore