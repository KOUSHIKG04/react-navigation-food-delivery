import { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../state/theme-context";

type ScreenShellProps = PropsWithChildren<{
  contentStyle?: StyleProp<ViewStyle>;
  safeTop?: boolean;
}>;

export function ScreenShell({ children, contentStyle, safeTop = true }: ScreenShellProps) {
  const { height, width } = useWindowDimensions();
  const isCompact = height < 720;
  const contentWidth = Math.min(width - 40, 390);
  const { colors } = useAppTheme();

  return (
    <SafeAreaView
      edges={safeTop ? ["top", "left", "right"] : ["left", "right"]}
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={[styles.content, isCompact && styles.compactContent]}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={[styles.screen, { backgroundColor: colors.background }]}
        >
          <View style={[styles.inner, { width: contentWidth }, contentStyle]}>{children}</View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    flexGrow: 1,
    padding: 20,
  },
  compactContent: {
    paddingVertical: 14,
  },
  inner: {
    flexGrow: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  screen: {
    backgroundColor: "#fffaf7",
    flex: 1,
  },
  safeArea: {
    backgroundColor: "#fffaf7",
    flex: 1,
  },
});
