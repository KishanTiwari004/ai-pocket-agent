// import colors from "@/shared/colors";
// import { AIChatModel } from "@/shared/GlobalApi";
// import { useLocalSearchParams, useNavigation } from "expo-router";
// import { Camera, Plus, Send } from "lucide-react-native";
// import React, { useEffect, useState } from "react";
// import {
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// type Message = {
//   role: string;
//   content: string;
// };

// export default function ChatUI() {
//   const navigation = useNavigation();
//   const { agentName, agentPrompt, agentId, initialText } =
//     useLocalSearchParams();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>();
//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTitle: agentName,
//       headerRight: () => <Plus />,
//     });
//   }, []);

//   useEffect(() => {
//     if (agentPrompt) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "system", content: agentPrompt.toString() },
//       ]);
//     }
//   }, [agentPrompt]);

//   const onSendMessage = async () => {
//     if (!input?.trim()) return;

//     const newMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");

//     const loadingMsg = { role: "assistant", content: "Loading..." };
//     setMessages((prev) => [...prev, loadingMsg]);

//     const result = await AIChatModel([...messages, newMessage]);
//     console.log(result.aiResponse);
//     setMessages((prev) => [...prev, result.aiResponse]);
//   };

//   return (
//     <KeyboardAvoidingView
//       keyboardVerticalOffset={80}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       style={{
//         padding: 10,
//         flex: 1,
//       }}
//     >
//       <FlatList
//         data={messages}
//         // @ts-ignore
//         renderItem={({ item, index }) =>
//           item.role !== "system" && (
//             <View
//               style={[
//                 styles.messageContainer,
//                 item.role == "user"
//                   ? styles.userMessage
//                   : styles.assistantMessage,
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.messageText,
//                   item.role == "user" ? styles.userText : styles.assistantText,
//                 ]}
//               >
//                 {item.content}
//               </Text>
//             </View>
//           )
//         }
//       />

//       {/* Input box */}
//       <View style={styles.inputContainer}>
//         <TouchableOpacity
//           style={{
//             marginRight: 10,
//           }}
//         >
//           <Camera size={27} />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message..."
//           onChangeText={(v) => setInput(v)}
//           value={input}
//         />
//         <TouchableOpacity
//           style={{
//             backgroundColor: colors.PRIMARY,
//             padding: 7,
//             borderRadius: 99,
//           }}
//           onPress={onSendMessage}
//         >
//           <Send color={colors.WHITE} size={20} />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   messageContainer: {
//     maxWidth: "75%",
//     marginVertical: 4,
//     padding: 10,
//     margin: 10,
//     borderRadius: 12,
//   },
//   userMessage: {
//     backgroundColor: colors.PRIMARY,
//     alignSelf: "flex-end",
//     borderBottomRightRadius: 2,
//   },
//   assistantMessage: {
//     backgroundColor: colors.LIGHT_GRAY,
//     alignSelf: "flex-start",
//     borderBottomLeftRadius: 2,
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   userText: {
//     color: colors.WHITE,
//   },
//   assistantText: {
//     color: colors.BLACK,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#CCC",
//     borderRadius: 20,
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#CCC",
//     backgroundColor: colors.WHITE,
//     marginRight: 8,
//     paddingHorizontal: 15,
//   },
// });

import colors from "@/shared/colors";
import { AIChatModel } from "@/shared/GlobalApi";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Camera, Copy, Plus, Send } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export default function ChatUI() {
  const navigation = useNavigation();
  const { agentName, agentPrompt, initialText } = useLocalSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: agentName || "Chat",
      headerRight: () => <Plus />,
    });
  }, []);

  // 👇 Add system prompt only once
  useEffect(() => {
    // @ts-ignore
    setInput(initialText);

    if (agentPrompt) {
      setMessages([{ role: "system", content: agentPrompt.toString() }]);
    }
  }, [agentPrompt]);

  const onSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { role: "user", content: input.trim() };

    // Update message list immediately (user message + typing placeholder)
    setMessages((prev) => [
      ...prev,
      newMessage,
      { role: "assistant", content: "..." },
    ]);
    setInput("");

    try {
      // Use latest messages safely (not stale state)
      const response = await AIChatModel([...messages, newMessage]);

      console.log("AI Response:", response);

      // Remove loading placeholder
      setMessages((prev) => {
        const updated = prev.filter((msg) => msg.content !== "...");
        return [
          ...updated,
          { role: "assistant", content: response.aiResponse },
        ];
      });
    } catch (err) {
      console.error("AIChatModel error:", err);
      setMessages((prev) => {
        const updated = prev.filter((msg) => msg.content !== "...");
        return [
          ...updated,
          { role: "assistant", content: "⚠️ Something went wrong!" },
        ];
      });
    }
  };

  const CopyToClipboard = async (message: string) => {
    await Clipboard.setStringAsync(message);
    alert("Copied to clipboard!");
    ToastAndroid.show("Copied to clipboard!", ToastAndroid.BOTTOM);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 10,
      }}
    >
      <FlatList
        data={messages.filter((m) => m.role !== "system")}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.role === "user"
                ? styles.userMessage
                : styles.assistantMessage,
            ]}
          >
            {item.content == "..." ? (
              <ActivityIndicator size={"small"} color={colors.BLACK} />
            ) : (
              <Text
                style={[
                  styles.messageText,
                  item.role === "user" ? styles.userText : styles.assistantText,
                ]}
              >
                {item.content}
              </Text>
            )}
            {item.role == "assistant" && (
              <Pressable onPress={() => CopyToClipboard(item.content)}>
                <Copy color={colors.GRAY} />
              </Pressable>
            )}
          </View>
        )}
      />

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={{ marginRight: 10 }}>
          <Camera size={27} color={colors.PRIMARY} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          onChangeText={setInput}
          value={input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
          <Send color={colors.WHITE} size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 6,
    padding: 10,
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
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: colors.PRIMARY,
    padding: 8,
    borderRadius: 99,
  },
});
