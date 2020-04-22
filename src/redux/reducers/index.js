import EventsReducer from "./EventsReducer";
import modalsReducer from "./modalsReducer";
import authReducer from "./authReducer";
import storage from "redux-persist/lib/storage";

import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["eventsReducer"],
};

const reducers = combineReducers({
  eventsReducer: EventsReducer,
  form: formReducer,
  modals: modalsReducer,
  auth: authReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default persistReducer(persistConfig, reducers);
