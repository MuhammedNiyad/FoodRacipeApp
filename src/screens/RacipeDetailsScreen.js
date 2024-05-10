import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../helpers/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Loading } from "../components/loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";


const RacipeDetailsScreen = (props) => {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [recipeDetails, setRacipedetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeDetails(item.idMeal);
  }, []);

  const getRecipeDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      // console.log('Categories Data:', response.data);
      if (response && response.data) {
        setRacipedetails(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const ingredientsIndexes = (meal)=>{
    if(!meal) return [];
    let indexes = [];
    for(let i = 1; i<=20; i++){
      if(meal['strIngredient'+i]){
        indexes.push(i);
      }
    }
    return indexes;
  }

  const getYoutubeVideoId = url =>{
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if(match && match[1]){
      return match[1];
    }
    return null;
  }

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      {/* racipe image */}
      <View className="flex-row justify-center">
        {/* <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{ width: wp(98), height: hp(50), borderRadius: 40 }}
          className={"mt-1"}
        /> */}
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 40,
          }}
          transitionTag={item.strMeal}
          className="mt-1"
        />
      </View>
      {/* back button */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="py-2 pl-2 pr-[10px] rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.1)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon
            size={hp(3.1)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* racipe description */}
      {loading ? (
        <Loading size="large" className="mt-16" color="gray" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name area */}
          <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {recipeDetails?.strMeal}
            </Text>
          </Animated.View>
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {recipeDetails?.strArea}
            </Text>
          </View>

          {/* misc */}
          <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="flex-row justify-around">
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UserIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Serving
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={"#525252"}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Ingredients */}
          <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="space-y-4">
            <Text style={{fontSize:hp(1.5)}} className='font-bold flex-1 text-neutral-700'>Ingedients</Text>
            <View className="space-y-2 ml-3">  
              {
                ingredientsIndexes(recipeDetails).map(i=>{
                  return(
                    <View key={i} className='flex-row space-x-4'>
                      <View style={{height:hp(1.5), width:hp(1.5)}} className="bg-amber-300 rounded-full mt-[5px]">
                      </View>
                        <View className='flex-row space-x-2'>
                          <Text style={{fontSize:hp(1.7)}} className='font-extrabold text-neutral-700'>{recipeDetails['strMeasure'+i]}</Text>
                          <Text style={{fontSize:hp(1.7)}} className='font-medium text-neutral-600'>{recipeDetails['strIngredient'+i]}</Text>
                        </View>
                    </View>
                  )
                })
              }
            </View>
          </Animated.View>

          {/* Instructions */}
          <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
            <Text style={{fontSize:hp(1.5)}} className='font-bold flex-1 text-neutral-700'>Instructions</Text>
            <Text style={{fontSize:hp(1.6)}} className="text-neutral-700">
              { recipeDetails?.strInstructions}
            </Text>
          </Animated.View>
          {/* racipe video */}
          {
            recipeDetails?.strYoutube && (
              <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} className='space-y-4'>
                            <Text style={{fontSize:hp(1.5)}} className='font-bold flex-1 text-neutral-700'>Racipe Video</Text>
                <View>
                  <YoutubeIframe videoId={getYoutubeVideoId(recipeDetails.strYoutube)} height={hp(30)}/>
                </View>
              </Animated.View>
            )
          }
        </View>
      )}
    </ScrollView>
  );
};

export default RacipeDetailsScreen;
