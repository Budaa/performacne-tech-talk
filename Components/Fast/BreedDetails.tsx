import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";

import { useLogReRender } from "../utils";

const styles = StyleSheet.create({
  container: { marginTop: 50 },
  image: { width: "100%", height: 250 },
});

const BreedDetailsComponent = ({ breed, rating, voteUp }) => {
  useLogReRender("BreedDetails", breed.id);

  const image = breed?.image || {};

  const imageSource = React.useMemo(() => ({ uri: image?.url }), [image?.url]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{breed.name}</Text>
      <Text>{`Score: ${rating}`}</Text>
      <Text>{breed.description}</Text>
      <TouchableOpacity onPress={() => voteUp(breed?.id)}>
        <Image source={imageSource} style={styles.image} resizeMode={"cover"} />
      </TouchableOpacity>
    </View>
  );
};

const isEqual = (prev, next) => {
  return prev.rating === next.rating;
};

export const BreedDetails = memo(BreedDetailsComponent, isEqual);
