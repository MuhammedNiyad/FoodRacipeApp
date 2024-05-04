import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Categories = () => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoryData.map((cate, ind) => (
          <TouchableOpacity key={ind} className="flex items-center space-y-1">
            <View className="rounded-full p-[6px]">
              <Image
                source={{ uri: cate.image }}
                style={{ width: hp(6), height: hp(6) }}
                className="rounded-full"
              />
				</View>
				<Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>{cate.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
