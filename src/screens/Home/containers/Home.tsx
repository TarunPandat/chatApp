import React from 'react'
import {Button, FlatList, Text, View} from 'react-native'
import BlogContext from '../../../components/Context/BlogContext'
import { TextInput } from 'react-native-paper'
import colors from '../../../config/colors.json'
import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont()

function Home({navigation, router}: any) {
  const [blog, setBlog] = React.useState<any>('')

  const data = React.useContext(BlogContext)

  const addBlog = () => {
    if(blog) {
      data.setBlogs({type: 'add_blog', payload: blog})
    setBlog('')
    }
  }

  const deleteBlog = (item: any) => {
      data.setBlogs({type: 'delete_blog', item})
  }

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      
      <FlatList
      style={{ backgroundColor: router?.headerColor}}
        data={data.blogs}
        keyExtractor={(item: any, i: any) => i.toString()}
        renderItem={({item, index}: any) => {
            return (
            <View style={{flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 10, justifyContent: 'space-between'}}>
              <Text style={{color: colors.white}}>{++index} {item.name}</Text>
              <Icon name='trash' color={colors.white} size={20} onPress={() => deleteBlog(item)} />
            </View>
            )
        }}
        ItemSeparatorComponent={() => {
         return <View style={{borderBottomColor: colors.white, borderBottomWidth: 1}}></View>
        }}
        ListEmptyComponent={() => {
          return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 100}} ><Text style={{ color: colors.white}}>No Data Found</Text></View>
        }}
        ListFooterComponent={() => {
         return data.blogs.length ? <View style={{borderBottomColor: colors.white, borderBottomWidth: 1}}></View> : null

        }}
      />
      <View style={{flexDirection: 'row', height: 40, backgroundColor: colors.white}}>
      <TextInput
      value={blog}
        style={{flex: 1, height: 40, backgroundColor: colors.white}}
        onChangeText={(text: any) => setBlog(text)}
    />
    <View><Button onPress={addBlog} title={`Add blog`} /></View>
      </View>
    </View>
  )
}

export default Home
