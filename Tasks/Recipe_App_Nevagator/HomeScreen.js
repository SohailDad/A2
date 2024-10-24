import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const recipes = [
  {
    id: "1",
    name: "Spaghetti",
    category: "Pasta",
    ingredients: ["Spaghetti", "Tomato sauce", "Garlic"],
    instructions: "Boil spaghetti. Add sauce.",
  },
  {
    id: "2",
    name: "Chicken Curry",
    category: "Curry",
    ingredients: ["Chicken", "Curry powder", "Coconut milk"],
    instructions: "Cook chicken. Add curry powder and coconut milk.",
  },
  {
    id: "3",
    name: "Pancakes",
    category: "Breakfast",
    ingredients: ["Flour", "Eggs", "Milk"],
    instructions: "Mix ingredients and fry.",
  },
  // Add more recipes here
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(text.toLowerCase()) ||
        recipe.category.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredRecipes(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or category"
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { recipe: item })}
          >
            <View style={styles.recipeItem}>
              <Text style={styles.recipeName}>{item.name}</Text>
              <Text style={styles.recipeCategory}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  recipeItem: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    borderRadius: 8,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeCategory: {
    fontSize: 14,
    color: "#888",
  },
});
