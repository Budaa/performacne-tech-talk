import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useLogReRender } from "../utils";

export const BreedDetails = ({ breed, rating, onVoteUp }) => {
  useLogReRender("BreedDetails", breed.id);

  const image = breed?.image || {};
  return (
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{breed.name}</Text>
      <Text>{`Score: ${rating}`}</Text>
      <Text>{breed.description}</Text>
      <TouchableOpacity onPress={() => onVoteUp()}>
        <Image
          source={{ uri: image?.url }}
          style={{ width: "100%", height: 250 }}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    </View>
  );
};
