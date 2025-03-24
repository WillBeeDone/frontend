import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"


// useAppDispatch() вы используете для отправки данных, выполнения actions
export const useAppDispatch: () => AppDispatch = useDispatch

// useAppSelector() для получения данных из store в любом компоненте
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
