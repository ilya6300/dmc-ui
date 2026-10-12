/**
 * Единственный источник цветов и размеров ДС для компонентов.
 * Потребителю не нужен отдельный CSS.
 */
export const tokens = {
  mainBlue1: "#2196f3",
  mastBlue: "#236192",
  mastYellow: "#f0b323",
  error: "#df2727",
  textMain: "#1e293b",
  textMuted: "#64748b",
  bgCard: "#ffffff",
  cardShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
  borderLight: "1px solid rgba(0, 0, 0, 0.08)",
  toggleTrackOff: "#cbd5e1",
  focusBg: "#f0f7ff",
  borderInput: "#e2e8f0",
};

export function mergeStyle(...styles) {
  return Object.assign({}, ...styles.filter(Boolean));
}
