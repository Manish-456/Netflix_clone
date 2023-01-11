const MovieReducer = (state , action) => {
 switch(action.type){
  case  "GET_MOVIES_START" :
   return {
     isFetching : true,
     movies : [],
     isError : false
   }
  case  "GET_MOVIES_SUCCESS" :
   return {
     isFetching : true,
     movies : action.payload,
    
   }
  case  "GET_MOVIES_FAILURE" :
   return {
     isFetching : false,
     movies : [],
     isError : true
   }
  case  "DELETE_MOVIES_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "DELETE_MOVIES_SUCCESS" :
   return {
    movies : state.movies.filter(movie => movie._id !== action.payload), 
    isFetching : false,
    
   }
  case  "DELETE_MOVIES_FAILURE" :
   return {
    ...state,
    isFetching : false,
    
     isError : true
   }
  case  "PUBLISH_MOVIES_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "PUBLISH_MOVIES_SUCCESS" :
   return {
    movies : [...state.movies , action.payload], 
    isFetching : false,
     
   }
  case  "PUBLISH_MOVIES_FAILURE" :
   return {
    ...state,
    isFetching : false,
    
     isError : true
   }
  case  "UPDATE_MOVIES_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "UPDATE_MOVIES_SUCCESS" :
   return {
    movies : state.movies.map((movie) => {
      return movie._id === action.payload._id && action.payload 
    }),
    isFetching : false,
     
   }
  case  "UPDATE_MOVIES_FAILURE" :
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