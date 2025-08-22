// This file acts as a centralized data store for the application.
// We use a global object here to pass data between screens that are not directly related,
// which is a robust workaround for a known issue in Expo Router.
export const guestDataStore = {
  data: null, // This property will temporarily hold the guest data before it is read by the Home screen.
};