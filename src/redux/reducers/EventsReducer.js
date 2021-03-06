import {
  CREATE_EVENT,
  UPDATE_EVENT,
  VIEW_SELECTED_EVENT,
  ON_CANCEL_CLICK,
  CREATE_EVENT_BUTTON,
  MANAGE_EVENT,
  CREATE_EVENT_NAVBAR,
  CHANGE_OPEN_STATE,
  LOADING_START,
  LOADING_STOP,
  FETCH_EVENTS,
  FETCH_USER_EVENTS,
} from "./utils/ActionConstants";

const INITIAL_STATE = {
  events: [],
  isOpen: false,
  selectedEvent: null,
  loading: false,
  userEvents: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [action.payload, ...state.events],
        isOpen: false,
      };
    case UPDATE_EVENT:
      const result = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload;
        } else {
          return event;
        }
      });
      return { ...state, events: result };
    case VIEW_SELECTED_EVENT:
      return { ...state, selectedEvent: action.payload, isOpen: true };
    case ON_CANCEL_CLICK:
      return { ...state, isOpen: false };
    case CREATE_EVENT_BUTTON:
      return { ...state, isOpen: true, selectedEvent: null };
    case CREATE_EVENT_NAVBAR:
      return { ...state, selectedEvent: null };
    case MANAGE_EVENT:
      return { ...state, selectedEvent: action.payload };
    case CHANGE_OPEN_STATE:
      return { ...state, isOpen: false };
    case LOADING_START:
      return { ...state, loading: true };
    case LOADING_STOP:
      return { ...state, loading: false };
    case FETCH_EVENTS:
      return { ...state, events: action.payload };
    case FETCH_USER_EVENTS:
      return { ...state, userEvents: action.payload };
    default:
      return state;
  }
};
