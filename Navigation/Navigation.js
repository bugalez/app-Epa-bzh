// Navigation/Navgation.js

import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import StageDetail from '../Components/StageDetail'
import Favorites from '../Components/Favorites'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: () => ({
      title: 'Rechercher',
      headerTitle:(
            <Image
              resizeMode="cover"
              style={{
                width: 256,
                height: 40,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginLeft: 60
              }}
              source={require('../Images/EPA-bzh-logo.png')}
            />
      ),
      headerStyle: {
        backgroundColor: '#62150E',
        borderColor: 'black',
        borderWidth: 1
      },
      headerTitleStyle: {
        color: '#fff',
        marginLeft: 100
      }
    })
  },
  StageDetail: {
    screen: StageDetail,
    navigationOptions: () => ({
      title: 'Détail',
      headerStyle: {
        backgroundColor: '#62150E',
        borderColor: 'black',
        borderWidth: 1
      },
      headerTitleStyle: {
        color: '#fff',
      }
    })
  }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: () => ({
      title: 'Favorites',
      headerStyle: {
        backgroundColor: '#62150E',
        borderColor: 'black',
        borderWidth: 1,
      },
      headerTitleStyle: {
        color: '#fff',
      }
    })
  },
  StageDetail: {
    screen: StageDetail,
    navigationOptions: () => ({
      title: 'Détail des favoris',
      headerStyle: {
        backgroundColor: '#62150E',
        borderColor: 'black',
        borderWidth: 1
      },
      headerTitleStyle: {
        color: '#fff',
      }
    })

  }
})

const StagesTabNavigator = createBottomTabNavigator({
  search: {
    screen: SearchStackNavigator,
    navigationOptions: () => ({
      tabBarIcon: () => {
        return <Image
                  source={require('../Images/icons8-search-32.png')}
                  style={styles.icon}
                />
      },
      tabBarOptions:{
        showLabel: false,
        activeBackgroundColor: '#62150E',
        inactiveBackgroundColor: '#921f15',
        style:{
        }
      }
    })
},
Favorites: {
  screen: FavoritesStackNavigator,
  navigationOptions: () => ({
    tabBarIcon: () => {
      return <Image
                source={require('../Images/icons8-ok-50.png')}
                style={styles.icon}
              />
    },
    tabBarOptions:{
      showLabel: false,
      activeBackgroundColor: '#62150E',
      inactiveBackgroundColor: '#921f15',
      style:{
      }
    }
  })
}
},
{
  tabBarOptions: {

  }
}
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default StagesTabNavigator
