import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { Headline, Caption, useTheme } from "react-native-paper";
import { storeData } from "../utils/data";
import { WIDTH } from "../utils/Constants";

export const StoreScreen = ({ route, navigation }) => {
  const { filterTypes, specials } = storeData;
  const theme = useTheme();
  const renderItem = ({ item }) => {
    return (
      <View style={styles.filterTypes}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#2f353b" : "rgba(47, 60, 80, 0.4)",
            },
            styles.filterTypesItem,
          ]}
          onPress={() => Alert.alert("test", `${item.id}`)}
        >
          <Image source={item.url} style={styles.filterTypesImage} />
        </Pressable>
        <Text style={styles.filterTypesTitle}>{item.title}</Text>
      </View>
    );
  };
  const renderSpecial = ({ item }) => {
    return (
      <Pressable
        style={{
          ...styles.specialsItem,
          backgroundColor: item.color,
        }}
      >
        <View style={styles.specialsItemText}>
          <Headline style={styles.specialsItemHeadline}>
            {item.headline}
          </Headline>
          <Caption style={styles.specialsItemCaption}>{item.caption}</Caption>
        </View>
        <View style={styles.specialsItemImageBlock}>
          <View style={styles.specialsItemImageBlockText}>
            <Text style={styles.specialsItemImageBlockMultiply}>x</Text>
            <Text style={styles.specialsItemImageBlockMultiplyPoints}>
              {item.points}
            </Text>
          </View>

          <Image source={item.url} style={styles.specialsItemImage} />
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.topFilter}>
        <FlatList
          contentContainerStyle={{
            backgroundColor: "#28333F",
          }}
          style={{
            backgroundColor: "#28333F",
          }}
          data={filterTypes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </View>
      <View style={styles.specials}>
        <FlatList
          contentContainerStyle={{
            backgroundColor: "#28333F",
          }}
          style={{
            backgroundColor: "#28333F",
          }}
          data={specials}
          renderItem={renderSpecial}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </View>
      <View style={styles.brands}>
        <View style={{ ...styles.brandsRow, marginBottom: 15 }}>
          <Pressable style={styles.brandsItem}>
            <Image
              source={require("../../assets/images/puma.png")}
              style={styles.brandsItemImage}
            />
            <Text style={styles.brandsItemTitle}>Puma</Text>
          </Pressable>
          <Pressable style={styles.brandsItem}>
            <Image
              source={require("../../assets/images/reebok.png")}
              style={styles.brandsItemImage}
            />
            <Text style={styles.brandsItemTitle}>Reebok</Text>
          </Pressable>
          <Pressable style={styles.brandsItem}>
            <Image
              source={require("../../assets/images/nike.png")}
              style={styles.brandsItemImage}
            />
            <Text style={styles.brandsItemTitle}>Nike</Text>
          </Pressable>
          <Pressable style={styles.brandsItem}>
            <Image
              source={require("../../assets/images/adidas.png")}
              style={styles.brandsItemImage}
            />
            <Text style={styles.brandsItemTitle}>Adidas</Text>
          </Pressable>
        </View>
        <View style={styles.brandsRow}>
          <Pressable style={styles.brandsItem}>
            <Image
              source={require("../../assets/images/puma.png")}
              style={styles.brandsItemImage}
            />
            <Text style={styles.brandsItemTitle}>Asics</Text>
          </Pressable>
          <Pressable style={styles.brandsItem}>
            <Image
              source={require("../../assets/images/reebok.png")}
              style={styles.brandsItemImage}
            />
            <Text style={styles.brandsItemTitle}>Demix</Text>
          </Pressable>
          <Pressable style={styles.brandsItem}>
            <Image
              source={require("../../assets/images/nike.png")}
              style={styles.brandsItemImage}
            />
            <Text style={styles.brandsItemTitle}>Nike</Text>
          </Pressable>
          <Pressable style={styles.brandsItem}>
            <Image
              source={require("../../assets/images/coin.png")}
              style={styles.brandsItemImage}
            />
            <Text style={styles.brandsItemTitle}>See All</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.popular}>
        <View style={styles.popularTitle}>
          <Text style={styles.popularHeader}>Popular</Text>
          <Text
            style={styles.popularLink}
            onPress={() => navigation.navigate("AddAddress")}
          >
            See All
          </Text>
        </View>
        <View style={styles.popularItems}>
          <Pressable style={styles.popularItem} onPress={() => {}}>
            <View style={styles.popularItemImageBlock}>
              <Image
                source={require("../../assets/images/nike2.png")}
                style={styles.popularItemImage}
              />
              <View style={styles.popularItemImageCoins}>
                <Image
                  source={require("../../assets/images/coin.png")}
                  style={styles.popularItemImageCoin}
                />
                <Text style={styles.popularItemImageText}>1200</Text>
              </View>
            </View>

            <Text style={styles.popularItemBrand}>Nike</Text>
            <Text style={styles.popularItemModel}>Air Force 1 Low '07</Text>
          </Pressable>
          <Pressable style={styles.popularItem} onPress={() => {}}>
            <View style={styles.popularItemImageBlock}>
              <Image
                source={require("../../assets/images/nike1.png")}
                style={styles.popularItemImage}
              />
              <View style={styles.popularItemImageCoins}>
                <Image
                  source={require("../../assets/images/coin.png")}
                  style={styles.popularItemImageCoin}
                />
                <Text style={styles.popularItemImageText}>1100</Text>
              </View>
            </View>

            <Text style={styles.popularItemBrand}>Nike</Text>
            <Text style={styles.popularItemModel}>Air Lunaroll 1</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#28333F",
  },
  topFilter: {
    width: WIDTH,
    paddingHorizontal: 8,
    flexDirection: "row",
    marginVertical: 24,
  },
  filterTypesImage: {
    width: 46,
    height: 46,
    borderRadius: 100,
  },
  filterTypes: {
    alignItems: "center",
    justifyContent: "center",
  },
  filterTypesTitle: {
    color: "#CDCDCD",
    fontSize: 10,
    fontWeight: "400",
  },
  filterTypesItem: {
    width: 56,
    height: 56,
    borderRadius: 100,
    marginRight: 8,
    marginBottom: 5,
    borderTopColor: "rgba(241, 73, 133, 0.4)",
    borderBottomColor: "rgba(123, 97, 255, 0.4)",
    borderEndColor: "rgba(241, 73, 133, 0.4)",

    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderLeftWidth: 5,
    borderTopWidth: 5,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: "#2F3C50",
    marginVertical: 12,
    width: 343,
    height: 148,
    paddingHorizontal: 16,
  },
  specials: {
    width: WIDTH,
  },
  specialsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 291,
    height: 125,
    borderRadius: 16,
    marginHorizontal: 10,
  },
  specialsItemText: {
    width: 174,
    marginHorizontal: 16,
  },
  specialsItemHeadline: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  specialsItemCaption: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "400",
  },
  specialsItemImageBlock: {
    flexDirection: "row",
    position: "relative",
  },

  specialsItemImageBlockMultiply: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "400",
  },
  specialsItemImageBlockMultiplyPoints: {
    color: "#ffffff",
    fontSize: 35,
    fontWeight: "600",
  },
  specialsItemImageBlockText: {
    flexDirection: "row",
    alignItems: "baseline",
    position: "absolute",
    top: 30,
    left: -14,
  },
  specialsItemImage: {},
  brands: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  brandsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  brandsItem: {
    alignItems: "center",
    justifyContent: "space-between",
    width: 73,
    height: 73,
    backgroundColor: "#2F3C50",
    borderColor: "#484C53",
    borderWidth: 0.5,
    borderRadius: 12,
    padding: 15,
  },
  brandsItemImage: {},
  brandsItemTitle: {
    color: "#CDCDCD",
    fontSize: 10,
    fontWeight: "400",
  },
  popular: {
    paddingHorizontal: 16,
  },
  popularTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
  },
  popularHeader: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  popularLink: {
    color: "#7B61FF",
    fontSize: 14,
    fontWeight: "400",
  },
  popularItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popularItem: {
    width: WIDTH * 0.43,
    height: 174,
    backgroundColor: "#2F3C50",
    borderRadius: 12,
    borderColor: "#484C53",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  popularItemModel: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "400",
  },
  popularItemBrand: {
    color: "#CDCDCD",
    fontSize: 10,
    fontWeight: "400",
    alignSelf: "auto",
  },
  popularItemImage: {
    width: 139,
    height: 95,
    borderRadius: 12,
    marginBottom: 5,
  },
  popularItemImageBlock: {
    position: "relative",
  },
  popularItemImageCoins: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    height: 24,
    borderRadius: 100,
    backgroundColor: "rgba(47, 60, 80, 0.8)",
  },
  popularItemImageCoin: {
    width: 12,
    height: 12,
    color: "#ffffff",
  },
  popularItemImageText: {
    fontWeight: "400",
    fontSize: 12,
    color: "#ffffff",
  },

  headline: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 18,
    color: "#ffffff",
  },
  caption: {
    color: "#CDCDCD",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    width: 200,
  },
});
