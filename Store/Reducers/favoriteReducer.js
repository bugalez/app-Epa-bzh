// Store/Reducers/favoriteReducer.js

const initialState = { favoritesStage: []}

function toggleFavorite(state= initialState, action){
  let nexstate
  switch (action.type) {
    case 'TOOGLE_FAVORITE':
      const favoriteStageIndex = state.favoritesStage.findIndex(item => item.id === action.value.id)
      if(favoriteStageIndex !== -1){
        nextState = {
          ...state,
          favoritesStage: state.favoritesStage.filter((item, index) => index !== favoriteStageIndex)
        }
      }
      else{
        nextState = {
          ...state,
          favoritesStage: [...state.favoritesStage, action.value]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleFavorite
