import Geolocation from '@react-native-community/geolocation'
import React from 'react'
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps'
import {Title, Caption} from 'react-native-paper'
import colors from '../../../config/colors.json'
import {markers} from '../../../config/constants/map'
import LocationCard from '../components/LocationCard'
import MapMarker from '../components/MapMarker'
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'
import {withNavigation, withNavigationFocus} from '@react-navigation/compat'

function Map({isFocused}: any) {
  const [location, setLocation] = React.useState<any>({
    latitude: 28.4159548,
    longitude: 77.297935
  })

  const {width} = Dimensions.get('window')
  const CARD_WIDTH = width * 0.8
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        })
      },
      (e: any) => console.log(e),
      {enableHighAccuracy: true, maximumAge: 2000, timeout: 2000}
    )
  }
  const checkLocation = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )

      if (granted) {
        console.log('You can use the ACCESS_FINE_LOCATION')
      } else {
        console.log('ACCESS_FINE_LOCATION permission denied')
      }
    } else {
      Geolocation.requestAuthorization()
    }
  }
  React.useEffect(() => {
    getLocation()
    checkLocation()
  }, [isFocused])

  const ref = React.useRef<any>(0)
  const scrollRef = React.useRef<any>(0)
  const goToCentre = () => {
    ref.current.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0015
      },
      350
    )
  }

  let mapIndex = 0
  let mapAnimation = new Animated.Value(0)

  React.useEffect(() => {
    mapAnimation.addListener(({value}: any) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3)
      if (index >= markers.length) {
        index = markers.length - 1
      }
      if (index <= 0) {
        index = 0
      }

      const timeOut = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index
          const {location} = markers[index]

          ref.current.animateToRegion(
            {
              ...location,
              latitudeDelta: 0.0055,
              longitudeDelta: 0.0055
            },
            350
          )
        }
      }, 100)
      clearTimeout(timeOut)
    })
  }, [isFocused])

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH
    ]

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp'
    })

    return {scale}
  })

  const onMarkerPress = (e: any) => {
    let markerID = e._targetInst.return.key
    let x = markerID * CARD_WIDTH + markerID * 20
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET
    }
    scrollRef.current.scrollTo({x: x, y: 0, animated: true})
  }

  const positionWatcher = Geolocation.watchPosition(
    (a: any) => {
      // console.log('Redux Location Cords:', location)
      // saveLoc({...a.coords})
      // console.log('====================================')
      // console.log('Get Location')
      // console.log('====================================')
      setLocation({
        ...location,
        ...a.coords
      })
      return a
    },
    (a: any) => {
      // console.log('nkj', a)
    },
    {timeout: 3000, enableHighAccuracy: true, distanceFilter: 100}
  )

  React.useEffect(() => {
    if (!isFocused) {
      Geolocation.clearWatch(positionWatcher)
      // Geolocation.stopObserving()
    }
  }, [isFocused])

  return (
    <View>
      <TouchableOpacity
        style={{position: 'absolute', right: 10, top: 50, zIndex: 100}}
        onPress={goToCentre}>
        <Icon name="location-arrow" size={30} color={colors.dark} />
      </TouchableOpacity>
      <MapView
        ref={ref}
        // initialRegion={{
        //   latitude: 28.4159548,
        //   longitude: 77.297935,
        //   latitudeDelta: 0.05,
        //   longitudeDelta: 0.045
        // }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          // ...currentLoc?.coords,
          latitudeDelta: 0.021,
          longitudeDelta: 0.021
        }}
        scrollEnabled={true}
        showsCompass={true}
        showsBuildings={true}
        showsIndoors={true}
        showsIndoorLevelPicker={true}
        showsTraffic={true}
        showsMyLocationButton={true}
        showsUserLocation={true}
        rotateEnabled={true}
        zoomControlEnabled={true}
        style={{height: '100%'}}

        // onRegionChange={(region: any) => setLocation({latitude: region.latitude, longitude: region.longitude})}
      >
        <Polyline
          coordinates={[
            {
              latitude: 28.4159548,
              longitude: 77.297935
            },
            {
              latitude: 29.4159548,
              longitude: 76.297935
            }
          ]}
        />
        {markers.map((item: any, i: any) => {
          const scaleStyle = {
            transform: [{scale: interpolations[i].scale}]
          }
          return (
            <Marker
              key={`${i}`}
              coordinate={item.location}
              title={item.title}
              description={item.description}
              onPress={onMarkerPress}
              onDragEnd={(e: any) => console.log(e.nativeEvent)}
              draggable>
              <Animated.View style={scaleStyle}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginBottom: Platform.OS === 'android' ? 20 : 50
                  }}
                />
              </Animated.View>
            </Marker>
          )
        })}
      </MapView>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation
                }
              }
            }
          ],
          {useNativeDriver: true}
        )}
        style={{position: 'absolute', width: '100%', bottom: 100, zIndex: 100}}>
        {markers.map((item: any, i: any) => {
          return <LocationCard key={`${i}`} region={item} width={CARD_WIDTH} />
        })}
      </Animated.ScrollView>
    </View>
  )
}

const mapStatesToProps = ({Auth}: any) => {
  return {
    locationCord: Auth.location
  }
}

const mapDispatchToProps = {
  saveLoc: (payload: any) => ({type: 'saveLoc', payload})
}

export default withNavigationFocus(
  connect(mapStatesToProps, mapDispatchToProps)(Map)
)
