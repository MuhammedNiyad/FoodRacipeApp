import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/categories";
import Racipes from "../components/racipes";
import { categoryData } from "../constants";


const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [CategoriesData, setCategoriesData] = useState([]);
  const [racipeData, setRacipeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCategories();
    getRecipe();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipe(category);
    setActiveCategory(category);
    setRacipeData([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategoriesData(response.data.categories);
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const getRecipe = async (category = "beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setRacipeData(response.data.meals);
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const handleSearch = (query) => {
    if(query === ''){
      setSearchQuery('')

      getRecipe(activeCategory);
      return;
    }
    setSearchQuery(query);
    setRacipeData(filterRecipes(query));
  };

  const filterRecipes = (query) => {
    if (!query) return racipeData;
    return racipeData.filter(recipe => recipe.strMeal.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <View>
      <StatusBar style="dark" />
      <FlatList
        data={[{ key: "Categories" }, { key: "Recipes" }]}
        renderItem={({ item }) => {
          switch (item.key) {
            case "Categories":
              return (
                <Categories
                  categories={CategoriesData}
                  activeCategory={activeCategory}
                  handleChangeCategory={handleChangeCategory}
                />
              );
            case "Recipes":
              return (
                <Racipes racipeData={filterRecipes(searchQuery)} categories={categoryData} />
              );
            default:
              return null;
          }
        }}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListHeaderComponent={
          <View className='space-y-5 pt-14'>
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
              <Text
                style={{ fontSize: hp(1.7) }}
                className="text-neutral-600"
              >
                hello, How are you?
              </Text>
              <View>
                <Text
                  style={{ fontSize: hp(3.8) }}
                  className="text-neutral-600"
                >
                  Make your own food.
                </Text>
              </View>
              <Text style={{ fontSize: hp(3.8) }} className="text-neutral-600">
                stay at <Text className="text-amber-400">Home</Text>
              </Text>
            </View>

            {/* search bar */}
            <View className="mx-4 mb-5 flex-row items-center rounded-full bg-black/5 p-[6px]">
              <TextInput
                placeholder="Search any recipe"
                placeholderTextColor={"gray"}
                style={{ fontSize: hp(1.7) }}
                className="flex-1 text-base pl-3 tracking-wider"
                value={searchQuery}
                onChangeText={handleSearch}
              />
              <View className="bg-white rounded-full p-3">
                <MagnifyingGlassIcon
                  size={hp(2.5)}
                  strokeWidth={3}
                  color={"gray"}
                />
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View className="flex-col items-center gap-5 mt-10">
            <View
              style={{ borderBottomWidth: 1, borderColor: "#000", width: '70%', }}
            />
            <View
              style={{ borderBottomWidth: 1, borderColor: "#000", width: "50%" ,  }}
            />
            <View
              style={{ borderBottomWidth: 1, borderColor: "#000", width: "30%" }}
            />
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;
