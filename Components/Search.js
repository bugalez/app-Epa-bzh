// Components/Search.js

import React from 'react'
import { Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
 } from 'react-native'
 import StageItem from './StageItem'
 import StageList from './StageList'
 import { getStageFromApiSearchedText } from '../API/AikidoApi'
 import { connect } from 'react-redux'

class Search extends React.Component{

  constructor(props) {
    super(props)
     this._loadStage = this._loadStages.bind(this),
     this.searchedText = ""
      this.state = {
        stages:[],
        isLoading: false
      }
  }

 componentDidMount (){
        this.setState({stages : this._searchStages()})
  }

  _searchStages(){
    this.setState({
      stage : [],
    }, () => {
      this._loadStages()
    })
  }

  _displayDetailForStage = (idStage) => {
      this.props.navigation.navigate("StageDetail", { idStage: idStage })
  }

  _displayLoading(){
    if(this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator
            size= "large"

          />
        </View>
      )
    }
  }

  _loadStages(){
    if(this.searchedText.length > 0){
      this.setState({
        isLoading: true
      })
      getStageFromApiSearchedText(this.searchedText).then(data => {
        this.setState({
          stages: data,
          isLoading: false
        })
    })
  }else{
    this.setState({isLoading: true})
    getStageFromApiSearchedText().then(data => {
      this.setState({
        stages: data,
        isLoading: false
      })
      })
    }
  }

  _searchTextInputChanged(text){
    let texte
    texte=text.charAt(0).toUpperCase() + text.slice(1)
    this.searchedText = texte
  }

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

    return(
      <View style={styles.main_container}>
        <TextInput
          style={styles.text_input}
          placeholder='Rechercher'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => {this._searchStages()}}
        />
        <Button title='Rechercher une ville' color="#62150E" onPress={() => {this._searchStages()}}/>
        <StageList
          stages={this.state.stages}
          navigation={this.props.navigation}
          loadStages={this._loadStages}
          favoriteList={false}
            />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
main_container: {
flex: 1,
backgroundColor: '#921f15'
},
text_input: {
  borderWidth: 1,
  borderColor: 'gray',
  marginBottom: 5,
  marginTop: 10,
  marginLeft: 5,
  marginRight: 5,
  paddingLeft: 5,
  color: '#fff',
  height: 50,
  backgroundColor: '#B7271A'
},
loading_container: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 100,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center'
}
})



export default Search
