const MovieReducer = (state , action) => {
 switch(action.type){
  case  "GET_USERS_START" :
   return {
     isFetching : true,
    users : [],
     isError : false
   }
  case  "GET_USERS_SUCCESS" :
   return {
     isFetching : true,
     users : action.payload,
    
   }
  case  "GET_USERS_FAILURE" :
   return {
     isFetching : false,
     users : [],
     isError : true
   }
  case  "DELETE_USERS_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "DELETE_USERS_SUCCESS" :
   return {
    users : state.users.filter(user => user._id !== action.payload), 
    isFetching : false,
    
   }
  case  "DELETE_USERS_FAILURE" :
   return {
    ...state,
    isFetching : false,
    
     isError : true
   }
  case  "CREATE_USER_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "CREATE_USER_SUCCESS" :
   return {
    users : [...state.users , action.payload], 
    isFetching : false,
     
   }
  case  "CREATE_USER_FAILURE" :
   return {
    ...state,
    isFetching : false,
    
     isError : true
   }
  case  "UPDATE_USERS_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "UPDATE_USERS_SUCCESS" :
   return {
    users : state.users.map((user) => {
      return user._id === action.payload._id && action.payload
    }), 
    isFetching : false,
   }
  case  "UPDATE_USERS_FAILURE" :
   return {
    ...state,
    isFetching : false,
    
     isError : true
   }

   default : 
   return {...state}
  
 }
}
export default MovieReducer