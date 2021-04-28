import React from 'react'
import {Image, View} from 'react-native'
import {Caption, Title} from 'react-native-paper'
import colors from '../../../config/colors.json'

function LocationCard({region, width}: any) {
  return (
    <View
      style={{
        padding: 0,
        margin: 10,
        borderRadius: 5,
        backgroundColor: colors.white,
        width: width,
        height: 200,
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
      <Image
        source={{uri: region.image}}
        style={{width: '100%', height: 130, resizeMode: 'cover'}}
      />
      <View style={{paddingHorizontal: 10, flexDirection: 'column'}}>
        <Title style={{fontSize: 14, margin: 0, padding: 0}}>
          {region.title}
        </Title>
        <Caption style={{fontSize: 10, margin: 0, padding: 0}}>
          {region.discription}
        </Caption>
      </View>
    </View>
  )
}

export default LocationCard
