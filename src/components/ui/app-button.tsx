import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useAppTheme } from "../../state/theme-context";

type AppButtonProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  label: string;
  disabled?: boolean;
  onPress: () => void;
  secondary?: boolean;
  style?: ViewStyle;
};

export function AppButton({ disabled = false, icon, label, onPress, secondary = false, style }: AppButtonProps) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: colors.accent },
        secondary && styles.secondaryButton,
        secondary && { backgroundColor: colors.surface, borderColor: colors.border },
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon ? <Ionicons color={secondary ? colors.text : "#ffffff"} name={icon} size={18} /> : null}
      <Text style={[styles.label, secondary && styles.secondaryLabel, secondary && { color: colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#dc2626",
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 16,
  },
  label: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.65,
  },
  secondaryButton: {
    backgroundColor: "#ffffff",
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  secondaryLabel: {
    color: "#111827",
  },
});
