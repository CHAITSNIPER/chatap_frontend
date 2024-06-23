export const host = "http://127.0.0.1:5009";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const ItemRoute = `${host}/api/item/adding`;
export const sellRoute = `${host}/api/item/achieve`;
export const getUserByID = (userID) => `${host}/api/auth/getcred/${userID}`;
export const allUsersRoute = (userID)=>`${host}/api/auth/allusers/${userID}`;
export const sendMessageRoute=`${host}/api/messages/addmsg`;
export const getMessages = `${host}/api/messages/getmsg`;
export const addUserItem = `${host}/api/item/addingof`;
export const getProductDetails = (id) => `${host}/api/item/getProductDetails/${id}`;
export const getSelected = (name) => `${host}/api/item/getSelected/${name}`;
export const FetchItems = (username) => `${host}/api/item/Recents/${username}`;
export const ForgotPasswordRoute = `${host}/api/auth/forgotPassword`;
export const DeleteRoute = `${host}/api/item/deleteRoute`;
export const ValidateAdmin = (user)=> `${host}/api/auth/validateAdmin/${user}`