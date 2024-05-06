import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "react-native-masonry-list";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

const Racipes = ({ racipeData, categories }) => {
  return (
    <View className="mx-4 space-y-3 ">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Racipes
      </Text>
      <View>
        {categories.length == 0 || racipeData.length == 0 ? null : (
          <MasonryList
            data={racipeData}
            keyExtractor={(item)=> item.idMeals}
            numColunms={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }, ind) => (
              <RacipeCard item={item} index={ind} />
            )}
            // refreshing={isLoadingNext}
            // onRefresh={()=> refresh({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};
export default Racipes;

const RacipeCard = ({ item, index }) => {
  let isEven = index % 2 == 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping()}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 0 : 8,
        }}
        className="flex justify-center mb-4 space-y-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 ? hp(25) : hp(35),
            borderRadius: hp(35),
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
