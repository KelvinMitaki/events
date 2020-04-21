import EventsReducer from "./EventsReducer";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["eventsReducer"],
};

const reducers = combineReducers({
  eventsReducer: EventsReducer,
});

export default persistReducer(persistConfig, reducers);
