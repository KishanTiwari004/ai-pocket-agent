import colors from "@/shared/colors";
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS == "android" ? 30 : 40,
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./../assets/images/login.jpg")}
        style={{
          width: Dimensions.get("screen").width * 0.9,
          height: 280,
          resizeMode: "contain",
          marginTop: 100,
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
            color: colors.PRIMARY,
          }}
        >
          Welcome to AI Pocket Agent
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: colors.GRAY,
          }}
        >
          Your Ultimate AI Personal Agent to make life easier. Try it Today,
          Completely Free!
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          backgroundColor: colors.PRIMARY,
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: colors.WHITE,
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}
