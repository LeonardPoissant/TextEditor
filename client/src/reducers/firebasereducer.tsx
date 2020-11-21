import { combineReducers } from "redux";
import { FirebaseReducer, firebaseReducer, FirestoreReducer } from "react-redux-firebase";

//import { firestoreReducer } from "redux-firestore";

export interface Profile {
    profile:Object,
    displayName: string,
    avatarUrl: string
};

export interface RootState {
    firebase: FirebaseReducer.Reducer<Profile>,
};

export const rootReducer = combineReducers<RootState>({
    firebase: firebaseReducer,
});
