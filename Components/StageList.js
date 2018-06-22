// Components/StageList.js

import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import StageItem from './StageItem'
import { connect } from 'react-redux'

class StageList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stages: []
    }
  }

  _displayDetailForStage = (idStage) => {
    this.props.navigation.navigate('StageDetail', {idStage: idStage})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.stages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <StageItem
              stage={item}
              isStageFavorite={(this.props.favoritesStage.findIndex(stage => stage.id === item.id) !== -1) ? true : false} // Bonus pour différencier les stages déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForStage={this._displayDetailForStage}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.stages.length > 0 && this.props.page < this.props.totalPages) {
              this.props.loadStages()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesStage: state.toggleFavorite.favoritesStage
  }
}

export default connect(mapStateToProps)(StageList)
