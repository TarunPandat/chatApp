import {SignIn, SignUp} from '../screens/Auth'
import {ChatList} from '../screens/Chat'
import Chat from '../screens/Chat/containers/Chat'
import {Home} from '../screens/Home'
import {Intro} from '../screens/Intro'
import {Map} from '../screens/Map'
import {Profile} from '../screens/Profile'
import {SplashScreen} from '../screens/SplashScreen'
import colors from './colors.json'

export const RoutesName = {
  Splash: 'Splash',
  Intro: 'Intro',
  SignIn: 'SignIn',
  SignUp: 'SignUp',
  Home: 'Home',
  Profile: 'Profile',
  Map: 'Map',
  ChatList: 'ChatList',
  Chat: 'Chat'
}

export const Routes = {
  Splash: {
    title: RoutesName.Splash,
    name: RoutesName.Splash,
    component: SplashScreen,
    layout: [],
    options: {headerShown: false}
  },
  Intro: {
    title: RoutesName.Intro,
    name: RoutesName.Intro,
    component: Intro,
    layout: [],
    headerColor: colors.primary,
    options: {headerShown: false}
  },
  SignIn: {
    title: RoutesName.SignIn,
    name: RoutesName.SignIn,
    component: SignIn,
    layout: [],
    headerColor: colors.primary,
    options: {headerShown: false}
  },
  SignUp: {
    title: RoutesName.SignUp,
    name: RoutesName.SignUp,
    component: SignUp,
    layout: [],
    headerColor: colors.primary,
    options: {headerShown: false}
  },
  Home: {
    title: RoutesName.Home,
    name: RoutesName.Home,
    component: Home,
    layout: ['header'],
    headerColor: colors.primary,
    options: {headerShown: false}
  },
  Profile: {
    title: RoutesName.Profile,
    name: RoutesName.Profile,
    component: Profile,
    layout: ['header'],
    headerColor: colors.warning,
    options: {headerShown: true},
    back: true
  },
  Map: {
    title: RoutesName.Map,
    name: RoutesName.Map,
    component: Map,
    layout: ['header'],
    headerColor: colors.warning,
    options: {headerShown: true},
    back: true
  },
  ChatList: {
    title: RoutesName.ChatList,
    name: RoutesName.ChatList,
    component: ChatList,
    layout: ['header'],
    headerColor: colors.warning,
    options: {headerShown: true},
    back: false
  },
  Chat: {
    title: RoutesName.ChatList,
    name: RoutesName.ChatList,
    component: Chat,
    layout: ['header'],
    headerColor: colors.warning,
    options: {headerShown: false},
    back: true
  }
}
