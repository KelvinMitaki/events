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
  LOGOUT_USER,
  LOADING_START,
  LOADING_STOP,
} from "../reducers/utils/ActionConstants";
import { toastr } from "react-redux-toastr";
import { SubmissionError, reset } from "redux-form";

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

export const loadingStart = () => {
  return {
    type: LOADING_START,
  };
};

export const loadingStop = () => {
  return {
    type: LOADING_STOP,
  };
};

//AUTH

export const logInUser = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message,
      });
    }
  };
};

export const logOutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const registerUser = (user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log(createdUser);
    await createdUser.user.updateProfile({
      displayName: user.displayName,
    });
    const newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message,
    });
  }
};

export const socialLogin = (selectedProvider) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    dispatch(closeModal());
    let user = await firebase.login({
      provider: selectedProvider,
      type: "popup",
    });
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.profile.displayName,
        photoURL: user.profile.avatarUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (creds) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await user.updatePassword(creds.newPassword1);
    await dispatch(reset("account"));
    toastr.success("Success", "Your password has been updated");
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message,
    });
  }
};

export const updateProfileInFirestore = (user) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    await firebase.updateProfile(user);
    toastr.success("Success", "Your profile has been updated");
  } catch (error) {
    console.log(error);
  }
};
