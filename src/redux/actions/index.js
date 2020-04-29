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
  FETCH_EVENTS,
} from "../reducers/utils/ActionConstants";
import { toastr } from "react-redux-toastr";
import { SubmissionError, reset } from "redux-form";
import cuid from "cuid";
import firebase from "../../app/config/firebase";

//EVENTS

export const fetchEvents = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events,
  };
};

const createNewEvent = (user, photoURL, event) => {
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || "/assets/user.png",
    created: new Date(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: new Date(),
        photoURL: photoURL || "/assets/user.png",
        displayName: user.displayName,
        host: true,
      },
    },
  };
};

export const createEvent = (event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const photoURL =
    getState().firebase.profile.photoURL ||
    getState().firebase.profile.avatarUrl;
  const newEvent = createNewEvent(user, photoURL, event);
  try {
    const createdEvent = await firestore.add("events", newEvent);
    await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
      eventId: createdEvent.id,
      userUid: user.uid,
      eventDate: event.date,
      host: true,
    });
    toastr.success("Success!", "Event has been created");
    return createdEvent;
  } catch (error) {
    toastr.error("Oops!!!", "Something went wrong");
  }
};

export const updateEvent = (newEvent) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`/events/${newEvent.id}`, newEvent);
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      console.log(error);
      toastr.error("Oops!!!", "Something went wrong");
    }
  };
};

export const cancelEventToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel the event?"
    : "This will reactivate the event, are you sure?";
  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`events/${eventId}`, {
          cancelled: cancelled,
        }),
    });
  } catch (error) {
    console.log(error);
  }
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
  const { date, ...newEvent } = event;
  const newDate = date.toDate();

  const newEventWithDate = {
    ...newEvent,
    date: newDate,
  };
  return {
    type: MANAGE_EVENT,
    payload: newEventWithDate,
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

//LOADER
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

  const { isLoaded, isEmpty, ...updatedUser } = user;

  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Your profile has been updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const imageName = cuid();
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName,
  };
  dispatch(loadingStart());
  try {
    //UPLOAD THE FILE TO FIREBASE STORAGE
    const uploadedFile = await firebase.uploadFile(path, file, null, options);
    //GET URL OF THE IMAGE
    const downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    //GET USERDOC
    const userDoc = await firestore.get(`users/${user.uid}`);
    //CHECK IF USER HAS PROFILE PHOTO IF NOT UPDATE PROFILE PHOTO
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL,
      });
    }
    await user.updateProfile({
      photoURL: downloadURL,
    });
    //ADD THE IMAGE TO FIRESTORE
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }],
      },
      {
        name: imageName,
        url: downloadURL,
      }
    );
    dispatch(loadingStop());
  } catch (error) {
    console.log(error);
    dispatch(loadingStop());
  }
};

export const deletePhoto = (photo) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting photo");
  }
};
export const updateProfilePhoto = (photo) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    await firebase.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    toastr.error("Oops!!!", "Problem updating main photo");
  }
};

export const goingToEvent = (event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const profile = getState().firebase.profile;
  const attendee = {
    going: true,
    joinDate: firestore.FieldValue.serverTimestamp(),
    photoURL: profile.photoURL || "/assets/user.png",
    displayName: profile.displayName,
    host: false,
  };
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee,
    });
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventDate: event.date,
      eventId: event.id,
      host: false,
      userUid: user.uid,
    });
    toastr.success("Success", "You have signed up to the event");
  } catch (error) {
    console.log(error);
    toastr.error("Oops!!!", "Problem signing up to the event");
  }
};

export const cancelGoingToEvent = (event) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firestore.update(`/events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete(),
    });
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success("Success!", "You have removed yourself from this event ");
  } catch (error) {
    console.log(error);
    toastr.error("Oops!!!", "Something went wrong when cancelling the event");
  }
};

export const getEventsForDashboard = (lastEvent) => async (
  dispatch,
  getState
) => {
  let today = new Date();
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection("events");
  dispatch(loadingStart());
  try {
    let startAfter =
      lastEvent &&
      (await firestore.collection("events").doc(lastEvent.id).get());

    let query;
    lastEvent
      ? (query = eventsRef
          // .where("date", ">=", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2))
      : (query = eventsRef
          // .where("date", ">=", today)
          .orderBy("date")
          .limit(2));

    const querySnapshot = await query.get();
    if (querySnapshot.docs.length === 0) {
      dispatch(loadingStop());
      return querySnapshot;
    }
    let events = [];

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      let evt = {
        ...querySnapshot.docs[i].data(),
        id: querySnapshot.docs[i].id,
      };
      events.push(evt);
    }
    dispatch(fetchEvents(events));
    dispatch(loadingStop());
    return querySnapshot;
  } catch (error) {
    console.log(error);
    dispatch(loadingStop());
  }
};

export const getUserEvents = (userUid, activeTab) => async (dispatch) => {
  dispatch(loadingStart());
  const firestore = firebase.firestore();
  const today = new Date();
  const eventsRef = firestore.collection("event_attendee");
  let query;
  switch (activeTab) {
    case 1: //PAST EVENTS
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc");
      break;
    case 2: //FUTURE EVENTS
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", ">=", today)
        .orderBy("eventDate");
      break;
    case 3: //HOSTED EVENTS
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("eventDate", "desc");
      break;

    default:
      query = eventsRef
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc");
      break;
  }
  try {
    const querySnapshot = await query.get();

    const events = [];
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      let evt = await firestore
        .collection("events")
        .doc(querySnapshot.docs[i].data().eventId)
        .get();
      events.push({ ...evt.data(), id: evt.id });
    }

    dispatch(fetchEvents(events));
    dispatch(loadingStop());
  } catch (error) {
    console.log(error);
    dispatch(loadingStop());
  }
};
//CHAT
export const addEventComment = (eventId, formValues, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || "/assets/user.png",
    uid: user.uid,
    text: formValues.comment,
    date: Date.now(),
  };
  dispatch(loadingStart());
  try {
    await firebase.push(`event_chat/${eventId}`, newComment);
    dispatch(loadingStop());
  } catch (error) {
    console.log(error);
    dispatch(loadingStop());
    toastr.error("Oops", "Problem adding comment");
  }
};
