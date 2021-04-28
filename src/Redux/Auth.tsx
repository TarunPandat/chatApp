const initialState = {
  login: false,
  authToken: null,
  user: null,
  introComplete: false,
  a: 1,
  location: []
}

const Auth = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        login: action.payload.login,
        authToken: action.payload?.authToken || null,
        user: action.payload?.user || null
      }
    case 'introDone':
      return {...state, introComplete: true}
    case 'logout':
      return {...state, login: false, authToken: null, user: null}
    case 'a':
      return {...state, a: action.payload}
    case 'saveLoc':
      return {...state, location: []}
    default:
      return state
  }
}

export default Auth
