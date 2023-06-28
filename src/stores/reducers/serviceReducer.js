function service(state = { data: {} }, action) {
    switch (action.type) {
      case 'SET_TOKEN':
        return {
          ...state,
          data: action.data
        }
      default:
        return state
    }
  }
  
  export default service
  