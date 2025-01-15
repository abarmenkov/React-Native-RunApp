import React, { useRef, useState, useEffect } from "react";
//import Carousel, { Pagination } from "react-native-snap-carousel";
//import Carousel from "react-native-snap-carousel";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { Button, Headline, Caption, useTheme } from "react-native-paper";
import { sliderOnboard } from "../utils/data";
import { WIDTH, AppStyles } from "../utils/Constants";
import MyButton from "../components/MyButton";
//import { RotateInDownLeft } from "react-native-reanimated";
//import { configureLayoutAnimations } from "react-native-reanimated/lib/typescript/reanimated2/core";

export const SLIDER_WIDTH = WIDTH;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);

export const OnBoard = ({ route, navigation }) => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const carouselRef = useRef(null);
  const theme = useTheme();

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setData(sliderOnboard);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            ...styles.item,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
        >
          <Headline
            style={{ ...styles.headline, color: theme.colors.onBackground }}
          >
            {item.name}
          </Headline>
          <Caption style={styles.caption}>{item.description}</Caption>
          {/*<Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={carouselRef}
            dotStyle={{
              ...styles.dotStyle,
              backgroundColor: theme.colors.primaryContainer,
            }}
            tappableDots={false}
            inactiveDotStyle={styles.inactiveDotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
          <MyButton
            label="Next"
            onPress={() => {
              goForward();
            }}
            style={{
              ...AppStyles.button,
              backgroundColor: theme.colors.primaryContainer,
              width: WIDTH * 0.35,
              height: 54,
              borderRadius: 20,
            }}
            textStyle={{
              ...AppStyles.btnText,
              color: theme.colors.onBackground,
            }}
          />*/}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        ...AppStyles.container,
        backgroundColor: theme.colors.onSecondary,
        paddingTop: 30,
      }}
    >
      <Image
        source={require("../../assets/images/onboarding.png")}
        style={styles.onboardImage}
      />
      {/*<Carousel
        //layout={"tinder"} //собирает стопкой
        layoutCardOffset={`9`}
        layout={'stack'} 
        layoutCardOffset={`18`}*/}
      {/*ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        hasParallaxImages={false}
      />*/}
      <View style={styles.BottomView}>
        <Text
          style={{ ...styles.BottomViewtext, color: theme.colors.onBackground }}
        >
          Already have an account?{" "}
        </Text>
        <Button
          type="text"
          onPress={() => navigation.navigate("Login")}
          textColor={theme.colors.primaryContainer}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 64,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 20,
    width: WIDTH * 0.75,
    height: WIDTH * 0.75,
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
    fontSize: 14,
  },
});
