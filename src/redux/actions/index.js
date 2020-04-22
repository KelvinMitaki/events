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
  OPEN_MODAL,
  CLOSE_MODAL,
  LOGIN_USER,
  LOGOUT_USER,
} from "../reducers/utils/ActionConstants";
import { toastr } from "react-redux-toastr";

//EVENTS

export const createEvent = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: data,
      });
      toastr.success("Success!", "Event has been created");
    } catch (error) {
      console.log(error);
      toastr.error("Oops!!!", "Something went wrong");
    }
  };
};
export const updateEvent = (newEvent) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: newEvent,
      });
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      console.log(error);
      toastr.error("Oops!!!", "Something went wrong");
    }
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
export const changeOpenState = () => {
  return {
    type: CHANGE_OPEN_STATE,
  };
};

//MODALS

export const openModal = (modalType, modalProps) => {
  return {
    type: OPEN_MODAL,
    payload: {
      modalType,
      modalProps,
    },
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

//AUTH
export const logInUser = (creds) => {
  return {
    type: LOGIN_USER,
    payload: creds,
  };
};

export const logOutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
