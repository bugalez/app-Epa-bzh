// Components/StageDetail.js

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Image,
  Share,
  Alert
} from 'react-native'
import { getStageFromApiwithId } from '../API/AikidoApi'
import { connect } from 'react-redux'

class StageDetail extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      stage: undefined,
      isLoading: false
    }
  }



  componentDidMount(){
    const favoriteStageIndex = this.props.favoritesStage.findIndex(item => item.id === this.props.navigation.state.params.idStage)
    if(favoriteStageIndex !== -1){
      this.setState({
        stage: this.props.favoritesStage[favoriteStageIndex]
      })
      return
    }
    this.setState({ isloading: true })
    getStageFromApiwithId(this.props.navigation.state.params.idStage).then(data =>{
      this.setState({
        stage: data,
        isLoading: false
      })
    })
  }

  _displayLoading(){
    if(this.state.isLoading) {
      return (
        <View style={styles.loading_container} >
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  _toggleFavorite(){
    const action = {type:"TOOGLE_FAVORITE", value: this.state.stage}
    this.props.dispatch(action)
  }


  _displayFavoriteImage() {
    var sourceImage= require('../Images/icons8-ok-50-1.png')
    if(this.props.favoritesStage.findIndex(item => item.id === this.state.stage.id) !== -1){
      sourceImage = require('../Images/icons8-cancel-50.png')
    }
    return(
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  _displayStage() {
    const { stage } = this.state
    if(stage != undefined){
      return(
        <ScrollView style={styles.scrollview_container}>
          <View style={styles.lieux_container}>
            <Text style={styles.text_lieux}>{stage.lieux}</Text>
          </View>
          <View style={styles.infos_container}>
            <View style={styles.dates_container}>
              <Text style={styles.text_dates}>{stage.dates}</Text>
              <Text style={styles.text_horaires}>{stage.horaires}</Text>
            </View>
            <View style={styles.intervenants_container}>
              <Text style={styles.text_intervenants}>{stage.intervenants}</Text>
              <TouchableOpacity
                style={styles.favorite_container}
                onPress={() => this._toggleFavorite()}>
                {this._displayFavoriteImage()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contact_container}>
            <Text style={styles.text_prof}> Professeur : {stage.professeurs}</Text>
            <Text style={styles.text_tel}>Tél : {stage.tel}</Text>
            <Text style={styles.text_mail}>Email : {stage.mail}</Text>
            <Text style={styles.text_site}>Site web : {stage.site}</Text>
          </View>

        </ScrollView>
      )
    }
  }

  _shareStage() {
    const { stage } = this.state
    Share.share({ title: stage.lieux, message: stage.lieux })
      .then(
        Alert.alert(
          'Succès',
          'Stage Partagé',
          [
            {text: 'OK', onPress: ()=>{}},
          ]
        )
      )
      .catch(err =>
        Alert.alert(
        'Echec',
        'Stage non partagé',
        [
          {text: 'OK', onPress: ()=>{}},
        ]
      )
    )
  }

  _displayFloatingActionButton(){
    const { stage } = this.state
    if(stage!==undefined ){
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={()=>this._shareStage()}>
            <Image
              style={styles.share_image}
              source={require('../Images/ic_share.android.png')} />
          </TouchableOpacity>
      )
    }
  }


  render(){
    return(
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayStage()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1,
    backgroundColor: '#B7271A'
  },
  favorite_container: {
    alignItems: 'center',
    marginTop: 20
  },
  favorite_image: {
    width: 40,
    height: 40
  },
  infos_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  dates_container : {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intervenants_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  lieux_container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_lieux: {
    fontSize: 30,
    color: '#fff',
    marginVertical: 20
  },
  text_dates: {
    marginRight: 20,
    color: '#fff',
    marginBottom: 20
  },
  text_intervenants: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },
  contact_container: {
    marginLeft: 30,
  },
  text_horaires: {
    color: '#fff'
  },
  text_prof:{
    color: '#fff',
    marginVertical: 10
  },
  text_mail:{
    color: '#fff',
    marginVertical: 10
  },
  text_tel:{
    color: '#fff',
    marginVertical: 10
  },
  text_site:{
    color: '#fff',
    marginVertical: 10
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 30,
    bottom: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(233, 30, 99, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_image: {
    width: 30,
    height: 30
  }

})

const mapStateToProps = (state) => {
  return {
    favoritesStage: state.toggleFavorite.favoritesStage
  }
}

export default connect(mapStateToProps)(StageDetail)
