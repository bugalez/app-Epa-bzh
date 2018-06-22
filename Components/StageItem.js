// Components/StageItem.js

import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

class StageItem extends React.Component{

  _displayFavoriteImage(){
    if(this.props.isStageFavorite) {
      return(
        <Image
          style={styles.favorite_image}
          source={require('../Images/if_circle-check_430087.png')}
        />
      )
    }
  }

  render(){
    // Equivaut à const stage = this.props.stage
    const { stage, displayDetailForStage } = this.props

    return(

      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForStage(stage.id)} >

        <View style={styles.main_container} >

          <View style={styles.dates_container}>
            <Text style={styles.date_text} >{stage.dates}</Text>
            <Text style={styles.horaire_text} >{stage.horaires}</Text>
          </View>

          <View style={styles.infos_container}>
            {this._displayFavoriteImage()}
            <Text style={styles.lieu_text} > {stage.lieux}</Text>
          </View>
          <View style={styles.intervenant_container}>
            <Text style={styles.intervenant_text} >{stage.intervenants} </Text>
          </View>
        </View>
      </TouchableOpacity>

    )
  }
}

const styles=StyleSheet.create({
  main_container: {
    height: 60,
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#62150E',
    backgroundColor: '#921f15'
  },
  dates_container:{
    justifyContent: 'space-around',
    marginLeft: 5,
    width: 'auto',
  },
  infos_container: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  intervenant_container: {
    justifyContent: 'center',
    marginRight: 5
  },
  lieu_text: {
    fontWeight: 'bold',
    color: '#fff',
  },
  date_text:{
    fontSize: 11,
    fontWeight: 'bold',
    color: 'grey'
  },
  horaire_text: {
    fontSize: 11,
    color: 'gray'
  },
  intervenant_text: {
    color: 'grey'
  },
  favorite_image: {
    width: 25,
    height: 25,

  }

})

export default StageItem
