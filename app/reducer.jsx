
export const reducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
        ...action.user
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        ...action.user
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        id:null,
        image:null,
        name: "ad",
        surName: "soyad",
        userName: null,
      };
    case "UPDATE_TOKEN":
        return {
          ...prevState,
          userToken:action.token
        }
    case "UPDATE_ID":
      return {
        ...prevState,
        id:action.id
      }
    case "UPDATE_IMAGE":
        return {
          ...prevState,
          image:action.image
        }
    case "UPDATE_NAME":
      return {
        ...prevState, 
        name: action.name
      }
    case "UPDATE_SURNAME":
        return {
          ...prevState,
          surName:action.surName
        }
    case "UPDATE_USERNAME":
      return {
        ...prevState,
        userName:action.userName
      };
    case "GET_USER":
      return {
        ...prevState,
        ...action.user
      };
    default:
      return {
        ...prevState
      }
  }
}