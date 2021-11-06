export default (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        auth: action.payload,
      };
    case "USER_AUTH":
      return {
        ...state,
        isAuth: action.payload.isAuth,
      };
    case "GET_USER":
      return {
        ...state,
      };
    case "USER_REGISTER":
      return {
        ...state,
        success: action.payload,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};
