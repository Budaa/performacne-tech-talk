import React, { useCallback, useEffect, useState } from "react";
import * as R from "ramda";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { catsAPI, useLogReRender } from "../utils";
import { BreedDetails } from "./BreedDetails";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: { fontSize: 22, textAlign: "center", padding: 20 },
});

export const Fast = () => {
  const [breeds, setBreeds] = React.useState({});
  const [catRatings, dispatch] = React.useReducer((state, action) => {
    if (action.type === "SCORE") {
      return R.over(R.lensPath([action.payload, "score"]), R.inc)(state);
    }

    if (action.type === "INIT") {
      return action.payload;
    }
  }, {});
  ({});

  const fetchCats = async () => {
    const { data } = await catsAPI.get("/breeds");
    setBreeds(data);
  };

  const initializeCatRatings = (breeds) => {
    const ratingsObj = R.compose(
      R.fromPairs,
      R.map(R.compose((breedId) => [breedId, { score: 0 }], R.prop("id")))
    )(breeds);
    // {
    //   breedId: {
    //     score: 0,
    //   },
    // };

    dispatch({ type: "INIT", payload: ratingsObj });
  };

  useEffect(() => {
    if (breeds.length > 0) {
      initializeCatRatings(breeds);
    }
  }, [breeds.length]);

  useEffect(() => {
    fetchCats();
  }, []);

  const voteUp = React.useCallback((id) => {
    dispatch({ type: "SCORE", payload: id });
  }, []);

  useLogReRender("App");

  const renderItem = useCallback(
    ({ item: breed }) => {
      return (
        <BreedDetails
          breed={breed}
          rating={R.path([breed.id, "score"])(catRatings)}
          voteUp={voteUp}
        />
      );
    },
    [catRatings]
  );

  const keyExtractor = useCallback(R.prop("id"), []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cat Breeds 🐈</Text>
      <FlatList
        data={breeds}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
