import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {DrawerContent} from '../components/Drawer'
import React from 'react'
import {Routes, RoutesName} from './routes.config'
import Layout from './Layout'
import colors from '../config/colors.json'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Platform, StatusBar, View} from 'react-native'
import {Header} from '../components/Header'
import {connect} from 'react-redux'

Icon.loadFont()

const Navigation = ({auth}: any) => {
  const Stack = createStackNavigator()
  const Drawer = createDrawerNavigator()

  const Tab = createBottomTabNavigator()
  const MTab = createMaterialBottomTabNavigator()
  const TTab = createMaterialTopTabNavigator()

  const noHeaderOption = {headerShown: false}

  const TopTab = (props: any) => {
    return (
      <View style={{flex: 1, flexDirection: 'column', height: 100}}>
        {Platform.OS === 'ios' ? (
          <View style={{height: 40, backgroundColor: colors.primary}}>
            <StatusBar
              barStyle={'light-content'}
              backgroundColor={colors.primary}
            />
          </View>
        ) : (
          <StatusBar backgroundColor={colors.primary} />
        )}
        <Header title="top tab" {...props} />
        <TTab.Navigator
          tabBarOptions={{
            tabStyle: {height: 40},
            labelStyle: {fontSize: 10},
            showIcon: true,
            showLabel: false,
            activeTintColor: colors.primary,
            inactiveTintColor: colors.accent
            // scrollEnabled: true
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color}: any) => {
              let iconName = ''

              if (route.name === RoutesName.Home) {
                iconName = focused ? 'home' : 'home'
              } else if (route.name === RoutesName.Profile) {
                iconName = focused ? 'user' : 'user'
              } else if (route.name === RoutesName.ChatList) {
                iconName = focused ? 'comments' : 'comments'
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={20} color={color} />
            }
          })}>
          <TTab.Screen name={RoutesName.Home}>
            {(props: any) => (
              <Routes.Home.component router={Routes.Home} {...props} />
            )}
          </TTab.Screen>
          <TTab.Screen name={RoutesName.Profile}>
            {(props: any) => (
              <Routes.Profile.component router={Routes.Profile} {...props} />
            )}
          </TTab.Screen>
          <TTab.Screen name={RoutesName.ChatList}>
            {(props: any) => (
              <Routes.ChatList.component router={Routes.ChatList} {...props} />
            )}
          </TTab.Screen>
        </TTab.Navigator>
      </View>
    )
  }

  const ProfileTab = () => {
    return (
      <MTab.Navigator
        initialRouteName={RoutesName.Profile}
        activeColor={colors.white}
        shifting={true}>
        <MTab.Screen
          name={RoutesName.Home}
          options={{
            tabBarLabel: 'Updates',
            tabBarColor: colors.primary,
            tabBarBadge: 2,
            tabBarIcon: ({}) => (
              <Icon name="home" color={colors.white} size={26} />
            )
          }}>
          {(props: any) => <Layout router={Routes.Home} {...props} />}
        </MTab.Screen>
        <MTab.Screen
          name={RoutesName.Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: colors.warning,
            tabBarIcon: ({}: any) => (
              <Icon name="user" color={colors.white} size={26} />
            )
          }}>
          {(props: any) => <Layout router={Routes.Profile} {...props} />}
        </MTab.Screen>
      </MTab.Navigator>
    )
  }

  const HomeTab = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = ''

            if (route.name === RoutesName.Home) {
              iconName = focused ? 'home' : 'home'
            } else if (route.name === RoutesName.Profile) {
              iconName = focused ? 'user' : 'user'
            } else if (route.name === RoutesName.Map) {
              iconName = focused ? 'map' : 'map-o'
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />
          }
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray'
        }}>
        <Tab.Screen name={RoutesName.Home}>
          {(props: any) => <Layout router={Routes.Home} {...props} />}
        </Tab.Screen>
        <Tab.Screen name={RoutesName.Profile} options={{tabBarBadge: 2}}>
          {(props: any) => <Layout router={Routes.Profile} {...props} />}
        </Tab.Screen>
        <Tab.Screen name={RoutesName.Map} options={{tabBarBadge: 2}}>
          {(props: any) => <Layout router={Routes.Map} {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    )
  }

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props: any) => <DrawerContent {...props} />}
        initialRouteName={'Top Bar'}>
        <Drawer.Screen name={RoutesName.Home} component={HomeTab} />
        <Drawer.Screen name={RoutesName.Profile} component={ProfileTab} />
        <Drawer.Screen name="Top Bar" component={TopTab} />
      </Drawer.Navigator>
    )
  }

  const Home = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name={RoutesName.Chat} options={Routes.Chat.options}>
          {(props: any) => <Layout router={Routes.Chat} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  const Auth = () => {
    return (
      <Stack.Navigator screenOptions={noHeaderOption}>
        <Stack.Screen name={RoutesName.SignIn}>
          {(props: any) => <Layout router={Routes.SignIn} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={RoutesName.SignUp}>
          {(props: any) => <Layout router={Routes.SignUp} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  const SplashScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name={RoutesName.Splash} options={noHeaderOption}>
          {(props: any) => <Layout router={Routes.Splash} {...props} />}
        </Stack.Screen>
        <Stack.Screen name={RoutesName.Intro} options={noHeaderOption}>
          {(props: any) => <Layout router={Routes.Intro} {...props} />}
        </Stack.Screen>
        {auth?.login ? (
          <Stack.Screen
            name={RoutesName.Home}
            options={noHeaderOption}
            component={Home}
          />
        ) : (
          <Stack.Screen name="Home" component={Auth} options={noHeaderOption} />
        )}
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <SplashScreen />
    </NavigationContainer>
  )
}

const mapStateToProps = ({Auth}: any) => {
  return {
    auth: Auth
  }
}

export default connect(mapStateToProps)(Navigation)
