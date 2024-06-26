import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { CachedImage } from "../helpers/image";

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cate, ind) => {
          let isActive = cate.strCategory == activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <TouchableOpacity
              key={ind}
              onPress={() => handleChangeCategory(cate.strCategory)}
              className="flex items-center space-y-1"
            >
              <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                <Image
                source={{ uri: cate.strCategoryThumb }}
                style={{ width: hp(6), height: hp(6) }}
                className="rounded-full"
              />
              {/* <CachedImage  uri={cate.strCategoryThumb}
                style={{ width: hp(6), height: hp(6) }}
                className="rounded-full" /> */}
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cate.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
