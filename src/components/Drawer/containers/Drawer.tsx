import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer'
import React from 'react'
import {Alert, Image, StyleSheet, Text, ToastAndroid, View} from 'react-native'
import {Caption, Drawer, Paragraph, Title} from 'react-native-paper'
import colors from '../../../config/colors.json'
import Icon from 'react-native-vector-icons/FontAwesome'
import {RoutesName} from '../../../config/routes.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {connect} from 'react-redux'
Icon.loadFont()

function DrawerContent(props: any) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfo}>
            <Image
              style={styles.userImg}
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/939117743139254273/ry6wyj1q_400x400.jpg'
              }}
            />
            <View>
              <Title>Tarun Bhardwaj</Title>
              <Caption>@tarun_pandat_</Caption>
              <Caption>{props?.auth?.user?.email}</Caption>
            </View>
          </View>
          <View style={[styles.row, {justifyContent: 'space-around'}]}>
            <View style={styles.row}>
              <Paragraph style={{paddingHorizontal: 2}}>10</Paragraph>
              <Caption>Following</Caption>
            </View>
            <View style={styles.row}>
              <Paragraph style={{paddingHorizontal: 2}}>100</Paragraph>
              <Caption>Followers</Caption>
            </View>
          </View>

          <Drawer.Section>
            <DrawerItem
              label={RoutesName.Home}
              icon={({color, size}: any) => (
                <Icon name="home" color={colors.dark} size={20} />
              )}
              onPress={() => props.navigation.navigate(RoutesName.Home)}
            />
            <DrawerItem
              label={RoutesName.Profile}
              icon={({color, size}: any) => (
                <Icon name="user" color={colors.dark} size={20} />
              )}
              onPress={() => props.navigation.navigate(RoutesName.Profile)}
            />
            <DrawerItem
              label={'Top Bar'}
              icon={({color, size}: any) => (
                <Icon name="home" color={colors.dark} size={20} />
              )}
              onPress={() => props.navigation.navigate('Top Bar')}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.drawerBottomSection}>
        <DrawerItem
          label="Sign Out"
          icon={({color, size}: any) => (
            <Icon name="sign-out" color={colors.dark} size={20} />
          )}
          onPress={async () => {
            await AsyncStorage.clear()
            props.logOut()
            props.navigation.navigate(RoutesName.Home)
            // Alert.alert(
            //   'Logout',
            //   'Do you really want to logout?',
            //   [
            //     {
            //       text: 'Cancel',
            //       onPress: () => console.log('Cancel Pressed'),
            //       style: 'cancel'
            //     },
            //     {text: 'OK', onPress: () => console.log('OK Pressed')}
            //   ],
            //   {cancelable: false}
            // )
          }}
        />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  drawerBottomSection: {
    marginBottom: 15,
    borderTopColor: colors.accent,
    borderTopWidth: 1
  },
  drawerContent: {
    padding: 10
  },
  userInfo: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
})
const mapStateToProps = ({Auth}: any) => {
  return {
    auth: Auth
  }
}

const mapDispatchToProps = {
  logOut: () => ({type: 'logout'})
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
