import { View, Text, Pressable, Image, FlatList } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import MasonryList from "react-native-masonry-list/src/MasonryList";
import { Loading } from "./loading";
import { CachedImage } from "../helpers/image";
import { useNavigation } from "@react-navigation/native";

const Racipes = ({ racipeData, categories }) => {

  const navigation = useNavigation();

  return (
    <View className="mx-4 space-y-3 ">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Racipes
      </Text>
      <View>
        {categories.length == 0 || racipeData.length == 0 ? (
          <Loading size="large" color="gray" className="mt-20" />
        ) : (
          <FlatList
            data={racipeData}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RacipeCard item={item} index={index} navigation={navigation} />
            )}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};
export default Racipes;

const RacipeCard = ({ item, index, navigation }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping()}
      className="flex-1 mt-2"
    >
      <Pressable className="flex justify-center mb-4 space-y-1 px-2" onPress={()=> navigation.navigate('RacipeDetails', {...item})}>
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: hp(35),
            borderRadius: hp(5),
          }}
          className="bg-black/5"
        /> */}
        <CachedImage
           uri={item.strMealThumb}
          style={{
            width: hp(21),
            height: hp(20),
            borderRadius: hp(5),
          }}
          className="bg-black/5"
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
