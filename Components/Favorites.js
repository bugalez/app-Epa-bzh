// Components/favorites.js

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StageList from './StageList'
import { connect } from 'react-redux'

class Favorites extends React.Component {
  render(){
    return (
      <View style={styles.main_container}>

      <StageList
        stages={this.props.favoritesStage}
        navigation={this.props.navigation}
        favoriteList={true}

      />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#B7271A'
  }
})

const mapStateToProps = state => {
  return {
    favoritesStage: state.toggleFavorite.favoritesStage
  }
}

export default connect(mapStateToProps)(Favorites)
