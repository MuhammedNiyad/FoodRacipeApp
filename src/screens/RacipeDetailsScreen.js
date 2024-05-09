import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Loading } from '../components/loading';

const RacipeDetailsScreen = (props) => {
  let item = props.route.params;
  const [isFavourite, setIsFavourite]= useState(false)
  const navigation = useNavigation();
  const [recipeDetails,setRacipedetails] = useState(null);
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    getRecipeDetails(item.idMeal)
  },[])
  
  const getRecipeDetails = async (id)=>{
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      // console.log('Categories Data:', response.data);
      if(response && response.data){
        setRacipedetails(response.data.meals[0]);
        setLoading(false)
      }
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  return (
    <ScrollView
    className="bg-white flex-1"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:30}}>
      <StatusBar style='light'/>
      {/* racipe image */}
      <View className='flex-row justify-center'>
        <CachedImage 
        uri={item.strMealThumb}
        style={{width: wp(98), height:hp(50), borderRadius:40,}} className={"mt-1"}/>
      </View>
      {/* back button */}
      <View className='w-full absolute flex-row justify-between items-center pt-14'>
        <TouchableOpacity onPress={()=>navigation.goBack()} className='py-2 pl-2 pr-[10px] rounded-full ml-5 bg-white'>
          <ChevronLeftIcon size={hp(3.1)} strokeWidth={4.5} color={"#fbbf24"}/>
        </TouchableOpacity>
        <TouchableOpacity className='p-2 rounded-full mr-5 bg-white' onPress={()=>setIsFavourite(!isFavourite)}>
          <HeartIcon size={hp(3.1)} strokeWidth={4.5} color={isFavourite? "red" : "gray"}/>
        </TouchableOpacity>
      </View>

      {/* racipe description */}
      {
        loading?(
          <Loading size="large" className='mt-16' color='gray' />
        ) : (
          <View>
            <Text>discription</Text>
          </View>
        )
      }
    </ScrollView>
  )
}

export default RacipeDetailsScreen