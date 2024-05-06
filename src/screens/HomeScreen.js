import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Categories from '../components/categories';
import Racipes from '../components/racipes';
import { categoryData } from '../constants';

const HomeScreen = () => {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [CategoriesData, setCategoriesData] = useState([]);
  const [racipeData, setRacipeData] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipe();
  },[])

  const getCategories = async ()=>{
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      // console.log('Categories Data:', response.data);
      if(response && response.data){
        setCategoriesData(response.data.categories);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
  const getRecipe = async (category='beef')=>{
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('Categories Data:', response.data);
      if(response && response.data){
        setRacipeData(response.data.meals);
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  return (
    <View>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between">
          <Image
            source={require("../../assets/avatar.png")}
            style={{ height: hp(5), width: hp(5) }}
            className="rounded-full"
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>

        {/* greeting and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            hello, Niyad
          </Text>
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="text-neutral-600">
              Make your own food.
            </Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className="text-neutral-600">
            stay at <Text className="text-amber-400">Home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* categories */}
        <View>
          <Categories categories={CategoriesData} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
        </View>

        {/* racipes */}
        <View>
          <Racipes racipeData={racipeData} categories={categoryData}/>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen