import { agents } from "@/shared/AgentList";
import React from "react";
import { FlatList, View } from "react-native";
import AgentCard from "./AgentCard";
import NonFeaturedAgentCard from "./NonFeaturedAgentCard";

export default function AgentListComponent({ isFeatured }: any) {
  return (
    <View>
      <FlatList
        data={agents}
        numColumns={2}
        // @ts-ignore
        renderItem={({ item, index }) =>
          (item.featured = isFeatured && (
            <View
              style={{
                flex: 1,
                padding: 5,
              }}
            >
              {item.featured ? (
                <AgentCard agent={item} key={index} />
              ) : (
                <NonFeaturedAgentCard agent={item} key={index} />
              )}
            </View>
          ))
        }
      />
    </View>
  );
}
