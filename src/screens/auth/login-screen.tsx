import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";

import { AppButton } from "../../components/ui/app-button";
import { ScreenShell } from "../../components/ui/screen-shell";
import { useAppState } from "../../state/app-context";
import { useAppTheme } from "../../state/theme-context";

export function LoginScreen() {
  const { login } = useAppState();
  const { colors } = useAppTheme();
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isCompact = height < 720;

  async function handleLogin() {
    Keyboard.dismiss();
    await login();
  }

  return (
    <ScreenShell contentStyle={[styles.content, isCompact && styles.compactContent]}>
      <View style={styles.brandRow}>
        <Ionicons color={colors.accent} name="restaurant-outline" size={32} />
        <Text style={[styles.brand, { color: colors.text }]}>PlateDrop</Text>
      </View>

      <View style={styles.heroCopy}>
        <Text style={[styles.eyebrow, { color: colors.accent }]}>Welcome back</Text>
        <Text style={[styles.title, { color: colors.text }]}>Good food, without the clutter</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>
          Pick a kitchen, build your cart, and get back to your last order in seconds.
        </Text>
      </View>

      <View style={styles.form}>
        <View style={[styles.inputRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons color={colors.mutedText} name="mail-outline" size={20} />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.mutedText}
            returnKeyType="next"
            style={[styles.input, { color: colors.text }]}
            textContentType="emailAddress"
            value={email}
          />
        </View>

        <View style={[styles.inputRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons color={colors.mutedText} name="lock-closed-outline" size={20} />
          <TextInput
            onChangeText={setPassword}
            onSubmitEditing={handleLogin}
            placeholder="Password"
            placeholderTextColor={colors.mutedText}
            returnKeyType="done"
            secureTextEntry
            style={[styles.input, { color: colors.text }]}
            textContentType="password"
            value={password}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <AppButton
          icon="log-in-outline"
          label="Login"
          onPress={handleLogin}
        />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  brand: {
    fontSize: 20,
    fontWeight: "900",
  },
  brandRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    transform: [{ translateY: -12 }],
  },
  compactContent: {
    justifyContent: "center",
  },
  content: {
    gap: 40,
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  footer: {
    width: "100%",
  },
  form: {
    gap: 12,
    width: "100%",
  },
  heroCopy: {
    alignItems: "center",
    alignSelf: "center",
    maxWidth: 340,
  },
  input: {
    flex: 1,
    fontSize: 15,
    minHeight: 48,
  },
  inputRow: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 14,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    lineHeight: 42,
    marginBottom: 12,
    textAlign: "center",
  },
});
