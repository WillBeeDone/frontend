import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"


// * в store хранятся данные из всего react приложения
// они изменяются с помощью функции reducer, в которую передается action

export const store = configureStore({
  reducer: {
    
 
    // здесь могли бы быть ваши редьюсеры(подключается из slice). 
    //название ключа выбираем сами, в данном случае auth. auth:authSlice.reducer => подключили слайс, вызвали метод reducer и положили результат его работы в переменную auth
    auth:authReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

