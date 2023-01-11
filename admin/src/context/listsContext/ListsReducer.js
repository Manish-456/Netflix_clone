const ListsReducer = (state , action) => {
 switch(action.type){
  case  "GET_LISTS_MOVIES_START" :
   return {
     isFetching : true,
     lists : [],
     isError : false
   }
  case  "GET_LISTS_MOVIES_SUCCESS" :
   return {
     isFetching : true,
     lists : action.payload,
    
   }
  case  "GET_LISTS_MOVIES_FAILURE" :
   return {
     isFetching : false,
     lists : [],
     isError : true
   }
  case  "DELETE_LISTS_MOVIES_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "DELETE_LISTS_MOVIES_SUCCESS" :
   return {
    lists : state.lists.filter(list => list._id !== action.payload), 
    isFetching : false,
    
   }
  case  "DELETE_LISTS_MOVIES_FAILURE" :
   return {
    ...state,
    isFetching : false,
    
     isError : true
   }
  case  "CREATE_MOVIES_LISTS_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "CREATE_MOVIES_LISTS_SUCCESS" :
   return {
    lists : [...state.lists , action.payload], 
    isFetching : false,
     
   }
  case  "CREATE_MOVIES_LISTS_FAILURE" :
   return {
    ...state,
    isFetching : false,
    
     isError : true
   }
  case  "UPDATE_MOVIES_LISTS_START" :
   return {
     ...state,
    isFetching : false,
     isError : false
   }
  case  "UPDATE_MOVIES_LISTS_SUCCESS" :
   return {
    lists : state.lists.map((list) => {
      return list._id === action.payload._id && action.payload
    }), 
    isFetching : false,
     
   }
  case  "UPDATE_MOVIES_LISTS_FAILURE" :
   return {
    ...state,
    isFetching : false,
    
     isError : true
   }

   default : 
   return {...state}
  
 }
}
export default ListsReducer