import { View } from 'react-native'
import React, { useRef } from 'react'
import { BellIcon } from 'react-native-heroicons/outline'
import Animated from 'react-native-reanimated';

const bellIcon = () => {
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const startShake = () => {
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      });
    };
  return (
    <View>
      <Animated.View style={{ transform: [{ translateY: shakeAnimation }] }}>
        <TouchableOpacity onPress={startShake}>
          <BellIcon size={hp(4)} color="gray" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default bellIcon