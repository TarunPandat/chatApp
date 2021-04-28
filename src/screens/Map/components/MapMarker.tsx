import React from 'react'
import { Image, Platform, View } from 'react-native'
import { Marker } from 'react-native-maps'
import { markers } from '../../../config/constants/map'

function MapMarker() {
    return (
       markers.map((item: any, i: any) => {
       return <Marker
        key={`${i}`}
        coordinate={item.location}
        title={item.title}
        description={item.discription}
        onDragEnd={(e: any) => console.log(e)}
        draggable
      >
          <View >
          <Image source={{uri: item.image}}
          style={{width: 50, height: 50, borderRadius: 25, marginBottom: Platform.OS === 'android' ? 20: 50}} />
          </View>
      </Marker>
       })
    )
}

export default MapMarker
