import AgentListComponent from "@/components/Home/AgentListComponent";
import CreateAgentBanner from "@/components/Home/CreateAgentBanner";
import colors from "@/shared/colors";
import { useNavigation } from "expo-router";
import { Settings } from "lucide-react-native";
import React, { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          AI Pocket Agent
        </Text>
      ),
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity
          style={{
            marginLeft: 15,
            display: "flex",
            flexDirection: "row",
            gap: 6,
            backgroundColor: colors.PRIMARY,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Image
            source={require("./../../assets/images/diamond.png")}
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text
            style={{
              color: colors.WHITE,
              fontWeight: "bold",
            }}
          >
            Pro
          </Text>
        </TouchableOpacity>
      ),
      headerRight: () => <Settings style={{ marginRight: 15 }} />,
    });
  }, []);
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={
        <View
          style={{
            padding: 15,
          }}
        >
          <AgentListComponent isFeatured={true} />
          <CreateAgentBanner />
          <AgentListComponent isFeatured={false} />
        </View>
      }
    />
  );
}
