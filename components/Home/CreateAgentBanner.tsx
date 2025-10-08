import colors from "@/shared/colors";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CreateAgentBanner() {
  return (
    <View
      style={{
        backgroundColor: colors.PRIMARY,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
      }}
    >
      <Image
        source={require("./../../assets/images/agents/agentGroup.png")}
        style={{
          width: 200,
          height: 120,
          resizeMode: "contain",
        }}
      />
      <View
        style={{
          padding: 10,
          width: 190,
        }}
      >
        <Text
          style={{
            fontSize: 19,
            fontWeight: "bold",
            color: colors.WHITE,
          }}
        >
          Create Your Own Agent
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.WHITE,
            padding: 7,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: colors.PRIMARY,
              textAlign: "center",
            }}
          >
            Create Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
