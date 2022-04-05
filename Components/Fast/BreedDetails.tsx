import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { useLogReRender } from "../utils";

const BreedDetailsComponent = ({ breed, rating, voteUp }) => {
  useLogReRender("BreedDetails", breed.id);

  const image = breed?.image || {};
  return (
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{breed.name}</Text>
      <Text>{`Score: ${rating}`}</Text>
      <Text>{breed.description}</Text>
      <TouchableOpacity onPress={() => voteUp(breed?.id)}>
        <Image
          source={{ uri: image?.url }}
          style={{ width: "100%", height: 250 }}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    </View>
  );
};

const isEqual = (prev, next) => {
  return prev.rating === next.rating;
};

export const BreedDetails = memo(BreedDetailsComponent, isEqual);
