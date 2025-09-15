import colors from "@/shared/colors";
import { useAuth, useSSO, useUser } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isSignedIn) {
      //redirect to home screen
    }
    if (isSignedIn != undefined) {
      setLoading(false);
    }
  }, [isSignedIn]);

  useWarmUpBrowser();

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();

  const onLoginPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          // For web, defaults to current path
          // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
          // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return;
            }

            router.push("/");
          },
        });
      } else {
        console.log("-", signIn);
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

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
      {!loading && (
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 15,
            backgroundColor: colors.PRIMARY,
            borderRadius: 12,
            marginTop: 50,
          }}
          onPress={onLoginPress}
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
      )}

      {loading == undefined && <ActivityIndicator size={"large"} />}
    </View>
  );
}

// import colors from "@/shared/colors";
// import { useAuth, useSSO, useUser } from "@clerk/clerk-expo";
// import * as AuthSession from "expo-auth-session";
// import { useRouter } from "expo-router";
// import * as WebBrowser from "expo-web-browser";
// import { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   Dimensions,
//   Image,
//   Platform,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // Hook to warm up browser for Android
// export const useWarmUpBrowser = () => {
//   useEffect(() => {
//     void WebBrowser.warmUpAsync();
//     return () => {
//       void WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// WebBrowser.maybeCompleteAuthSession();

// export default function Index() {
//   const { isSignedIn } = useAuth();
//   const { user } = useUser();
//   const { startSSOFlow } = useSSO();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   useWarmUpBrowser();

//   useEffect(() => {
//     if (isSignedIn) {
//       router.push("/"); // If already signed in, go to Home
//     }
//   }, [isSignedIn]);

//   const onLoginPress = useCallback(async () => {
//     setLoading(true);

//     try {
//       console.log("Starting SSO flow");

//       const { createdSessionId, setActive, signIn, signUp } =
//         await startSSOFlow({
//           strategy: "oauth_google",
//           redirectUrl: AuthSession.makeRedirectUri({
//             scheme: "your.app.scheme", // 👈 Change this to your app scheme
//           }),
//         });

//       console.log("SSO flow result:", { createdSessionId, signIn, signUp });

//       if (createdSessionId) {
//         console.log("Session created, activating now...");

//         setActive!({
//           session: createdSessionId,
//           navigate: async ({ session }) => {
//             console.log("Navigating after session activation:", session);

//             if (session?.currentTask) {
//               console.log("Pending session task:", session.currentTask);
//               return;
//             }

//             router.push("/");
//           },
//         });
//       } else {
//         console.warn("No session ID created, please check configuration", {
//           signIn,
//           signUp,
//         });
//       }
//     } catch (err) {
//       console.error("SSO Flow error:", JSON.stringify(err, null, 2));
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Show loading spinner if user data not yet available
//   if (!user && !isSignedIn) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color={colors.PRIMARY} />
//       </View>
//     );
//   }

//   return (
//     <View
//       style={{
//         flex: 1,
//         padding: 20,
//         paddingTop: Platform.OS === "android" ? 30 : 40,
//         justifyContent: "center",
//       }}
//     >
//       <Image
//         source={require("./../assets/images/login.jpg")}
//         style={{
//           width: Dimensions.get("screen").width * 0.9,
//           height: 280,
//           resizeMode: "contain",
//           marginTop: 100,
//         }}
//       />

//       <View>
//         <Text
//           style={{
//             fontSize: 28,
//             fontWeight: "bold",
//             textAlign: "center",
//             marginBottom: 10,
//             color: colors.PRIMARY,
//           }}
//         >
//           Welcome to AI Pocket Agent
//         </Text>

//         <Text
//           style={{
//             fontSize: 18,
//             textAlign: "center",
//             color: colors.GRAY,
//           }}
//         >
//           Your Ultimate AI Personal Agent to make life easier. Try it Today,
//           Completely Free!
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={{
//           width: "100%",
//           padding: 15,
//           backgroundColor: colors.PRIMARY,
//           borderRadius: 12,
//           marginTop: 50,
//         }}
//         onPress={onLoginPress}
//         disabled={loading}
//       >
//         <Text
//           style={{
//             color: colors.WHITE,
//             textAlign: "center",
//             fontSize: 16,
//           }}
//         >
//           {loading ? "Loading..." : "Get Started"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
