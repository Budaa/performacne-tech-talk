import React, { useEffect, useState } from "react";
import * as R from "ramda";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { catsAPI, useLogReRender } from "../utils";
import { BreedDetails } from "./BreedDetails";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});

export const Slow = () => {
  const [breeds, setBreed] = useState([]);
  const [catRatings, setCatRatings] = useState({});

  const fetchCats = async () => {
    const { data } = await catsAPI.get("/breeds");
    setBreed(data);
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

    setCatRatings(ratingsObj);
  };

  useEffect(() => {
    if (breeds.length > 0) {
      initializeCatRatings(breeds);
    }
  }, [breeds.length]);

  useEffect(() => {
    fetchCats();
  }, []);

  const voteUp = (id) => {
    setCatRatings(R.over(R.lensPath([id, "score"]), R.inc)(catRatings));
  };

  useLogReRender("App");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, textAlign: "center", padding: 20 }}>
        Cat Breeds 🐈
      </Text>
      <ScrollView style={{flex: 1}}>
        {breeds.map((breed, index) => {
          return (
            <View key={index} style={{ marginTop: 50 }}>
              <BreedDetails
                breed={breed}
                rating={R.path([breed.id, "score"])(catRatings)}
                onVoteUp={() => {
                  voteUp(breed.id);
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
