import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  VIEW_SELECTED_EVENT,
  ON_CANCEL_CLICK,
  CREATE_EVENT_BUTTON,
  MANAGE_EVENT,
  CREATE_EVENT_NAVBAR,
} from "../utils/ActionConstants";

export const createEvent = (data) => {
  return {
    type: CREATE_EVENT,
    payload: data,
  };
};
export const updateEvent = (newEvent) => {
  return {
    type: UPDATE_EVENT,
    payload: newEvent,
  };
};

export const deleteEvent = (id) => {
  return {
    type: DELETE_EVENT,
    payload: id,
  };
};

export const viewSelectedEvent = (event) => {
  return {
    type: VIEW_SELECTED_EVENT,
    payload: event,
  };
};
export const onCancelClick = () => {
  return {
    type: ON_CANCEL_CLICK,
  };
};
export const createEventButton = () => {
  return {
    type: CREATE_EVENT_BUTTON,
  };
};

export const manageEvent = (event) => {
  return {
    type: MANAGE_EVENT,
    payload: event,
  };
};

export const createEventNavbar = () => {
  return {
    type: CREATE_EVENT_NAVBAR,
  };
};
