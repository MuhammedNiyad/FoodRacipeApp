import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export const Loading = (props) => {
  return (
    <View className='flex-1 flex justify-center items-center'>
        <ActivityIndicator {...props}  />
    </View>
  )
}
