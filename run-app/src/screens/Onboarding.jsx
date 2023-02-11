import React, { useRef, useState, useEffect } from "react";
import Carousel, {
  Pagination,
} from "react-native-snap-carousel";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { Button, Headline, Caption } from "react-native-paper";
import { sliderOnboard } from "../utils/data";
import { WIDTH } from "../utils/Constants";

export const SLIDER_WIDTH = WIDTH;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);

export const OnBoard = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setData(sliderOnboard);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Headline style={styles.headline}>{item.name}</Headline>
          <Caption style={styles.caption}>{item.description}</Caption>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={carouselRef}
            dotStyle={styles.dotStyle}
            tappableDots={false}
            inactiveDotStyle={styles.inactiveDotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <Button
            onPress={goForward}
            mode="contained"
            buttonColor="#7B61FF"
            labelStyle={{ color: "white", fontSize: 18 }}
            contentStyle={{ width: 150, height: 56 }}
          >
            Next {"->"}
          </Button>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/onboarding.png")}
        style={styles.onboardImage}
      />
      <Carousel
        //layout={"tinder"} //собирает стопкой
        layoutCardOffset={`9`}
        /*layout={'stack'} 
        layoutCardOffset={`18`}*/
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        hasParallaxImages={false}
      />
      <View style={styles.BottomView}>
        <Text style={styles.BottomViewtext}>Already have an account? </Text>
        <Button
          type="text"
          onPress={() => navigation.navigate("Login")}
          textColor="#7B61FF"
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#28333F",
    alignItems: "center",
    paddingTop: 30,
  },

  item: {
    borderRadius: 64,
    alignItems: "center",
    backgroundColor: "#2F3C50",
    marginVertical: 20,
    width: 303,
    height: 303,
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 64,
  },

  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7B61FF",
  },
  inactiveDotStyle: {
    backgroundColor: "gray",
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
  },
  headline: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 30,
    color: "#ffffff",
    paddingVertical: 20,
  },
  caption: {
    color: "#AEA8B3",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    paddingHorizontal: 72,

    textAlign: "center",
  },
  BottomView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 48,
  },
  BottomViewtext: {
    color: "#ffffff",
    fontSize: 14,
  },
});
