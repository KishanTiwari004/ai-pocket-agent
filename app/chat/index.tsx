import colors from "@/shared/colors";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Camera, Plus, Send } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialMessage = [
  { role: "user", text: "Hi How Are You?" },
  { role: "assistant", text: "I am Good" },
];

export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, agentPrompt, agentId, initialText } =
    useLocalSearchParams();
  const [messages, setMessages] = useState(initialMessage);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName,
      headerRight: () => <Plus />,
    });
  }, []);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        padding: 10,
        flex: 1,
      }}
    >
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.messageContainer,
              item.role == "user"
                ? styles.userMessage
                : styles.assistantMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                item.role == "user" ? styles.userText : styles.assistantText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* Input box */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
        >
          <Camera size={27} />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Type your message..." />
        <TouchableOpacity
          style={{
            backgroundColor: colors.PRIMARY,
            padding: 7,
            borderRadius: 99,
          }}
        >
          <Send color={colors.WHITE} size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "75%",
    marginVertical: 4,
    padding: 10,
    margin: 10,
    borderRadius: 12,
  },
  userMessage: {
    backgroundColor: colors.PRIMARY,
    alignSelf: "flex-end",
    borderBottomRightRadius: 2,
  },
  assistantMessage: {
    backgroundColor: colors.LIGHT_GRAY,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: colors.WHITE,
  },
  assistantText: {
    color: colors.BLACK,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: colors.WHITE,
    marginRight: 8,
    paddingHorizontal: 15,
  },
});
