import React, { useState } from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { Fontisto } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
//fi fi-credit-card
const userLoggedOption = ({ title, screen, icon, logout, email }) => {
  const navigation = useNavigation()

  const [selectedIcon] = useState(icon)

  //select the right icon

  return (
    <Pressable
      onPress={() =>
        navigation.navigate(`${screen}`, {
          email: { email },
        })
      }
      style={{
        alignSelf: 'center',
        width: '90%',

        marginVertical: 20,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {selectedIcon}
        <Text style={{ fontFamily: 'Inter_400Regular', color: '#094067' }}>
          {title}
        </Text>
        {/* to use MaterialIcons */}

        <AntDesign name="right" size={24} color="#094067" />
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    color: '#094067',
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
  },
  ViewContainer: {
    flex: 1,
    marginTop: 20,
  },

  viewHeading: {
    alignSelf: 'flex-start',
    fontSize: 23,
    marginBottom: 30,
    textTransform: 'none',
    marginHorizontal: 20,
  },
})

export default userLoggedOption
