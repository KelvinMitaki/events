import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  VIEW_SELECTED_EVENT,
  ON_CANCEL_CLICK,
  CREATE_EVENT_BUTTON,
  MANAGE_EVENT,
  CREATE_EVENT_NAVBAR,
  CHANGE_OPEN_STATE,
} from "../utils/ActionConstants";
import { eventsData } from "../EventsData/EventsData";
import cuid from "cuid";

const INITIAL_STATE = {
  events: eventsData,
  isOpen: false,
  selectedEvent: null,
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
    case DELETE_EVENT:
      const newEvents = state.events.filter(
        (event) => event.id !== action.payload
      );
      return { ...state, events: newEvents };
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
    default:
      return state;
  }
};
