import colors from "@/shared/colors";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
  agent: Agent;
};
export type Agent = {
  id: number;
  name: string;
  desc: string;
  image: string;
  initialText: string;
  prompt: string;
  type: string;
  featured?: boolean;
};

export default function AgentCard({ agent }: Props) {
  return (
    <View
      style={{
        backgroundColor: colors.WHITE,
        borderRadius: 15,
        minHeight: 220,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          padding: 15,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {agent.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: colors.GRAY,
            marginTop: 2,
          }}
        >
          {agent.desc}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        {/** @ts-ignore */}
        <Image
          source={agent.image}
          style={{
            width: 120,
            height: 120,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
}
