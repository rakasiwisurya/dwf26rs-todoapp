import React from "react";
import { StatusBar } from "expo-status-bar";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";

// Import 'NativeBaseProvider' component
import { NativeBaseProvider, extendTheme } from "native-base";

// Import font with Expo
import AppLoading from "expo-app-loading";
import {
  useFonts,
  BalsamiqSans_400Regular,
  BalsamiqSans_700Bold,
} from "@expo-google-fonts/balsamiq-sans";

// Import Container
import Container from "./Container";

export default function App() {
  // Load Font with Expo
  let [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_700Bold,
  });

  // Setup Font
  const fontConfig = {
    BalsamiqSans: {
      400: {
        normal: "BalsamiqSans_400Regular",
      },
      700: {
        normal: "BalsamiqSans_700Bold",
      },
    },
  };

  // Setup Custome Theme
  const customeColor = {
    primary: {
      50: "#E3F2F9",
      100: "#C5E4F3",
      200: "#A2D4EC",
      300: "#7AC1E4",
      400: "#47A9DA",
      500: "#0088CC",
      600: "#007AB8",
      700: "#006BA1",
      800: "#005885",
      900: "#003F5E",
    },
    amber: {
      400: "#d97706",
    },
  };

  // Configuration Native Base Custom Theme
  const theme = extendTheme({
    colors: customeColor,
    fontConfig,
    fonts: {
      heading: "BalsamiqSans",
      body: "BalsamiqSans",
      mono: "BalsamiqSans",
    },
    config: { initialColorMode: "dark" },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <StatusBar style="light" />
        <Container />
        <FlashMessage
          style={{
            position: "absolute",
            top: 50,
            alignItems: "center",
            paddingVertical: 10,
          }}
          titleStyle={{ fontSize: 18, textAlign: "center" }}
          position="center"
          useRef="myLocalFlashMessage"
          icon="auto"
          duration={500}
        />
      </NativeBaseProvider>
    );
  }
}
