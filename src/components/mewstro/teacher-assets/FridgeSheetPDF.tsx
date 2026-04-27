"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { TeacherAssetVars, PALETTE, isLightColor } from "./types";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function thisMonday(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function FridgeSheetPDF({ vars }: { vars: TeacherAssetVars }) {
  const accent = vars.accentColor;
  const onAccent = isLightColor(accent) ? "#1A1A2E" : "#FFFFFF";
  const styles = createStyles(accent);
  const weekStarting = thisMonday();

  return (
    <Document title={`${vars.studioName} - Practice tracker`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>This week I practised</Text>
            <Text style={styles.subtitle}>Week of {weekStarting}</Text>
          </View>
          <View style={styles.studioBadge}>
            <Text style={styles.studioBadgeLabel}>STUDIO</Text>
            <Text style={styles.studioBadgeName}>{vars.studioName}</Text>
          </View>
        </View>

        <View style={styles.nameRow}>
          <Text style={styles.nameLabel}>Name:</Text>
          <View style={styles.nameLine} />
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.thDay, { color: onAccent }]}>Day</Text>
          <Text style={[styles.thDone, { color: onAccent }]}>Done?</Text>
          <Text style={[styles.thWhat, { color: onAccent }]}>
            What I worked on
          </Text>
          <Text style={[styles.thHow, { color: onAccent }]}>How long</Text>
        </View>

        {DAYS.map((day, i) => (
          <View
            key={day}
            style={
              i % 2 === 0
                ? [styles.tableRow, styles.rowAlt]
                : styles.tableRow
            }
          >
            <Text style={styles.tdDay}>{day}</Text>
            <View style={styles.tdDoneBox}>
              <View style={[styles.checkbox, { borderColor: accent }]} />
            </View>
            <View style={styles.tdWhatLine} />
            <View style={styles.tdHowLine} />
          </View>
        ))}

        <View style={styles.streakRow}>
          <Text style={styles.streakLabel}>This week&apos;s streak:</Text>
          <View style={styles.starRow}>
            {Array.from({ length: 7 }).map((_, i) => (
              <Text key={i} style={[styles.star, { color: accent }]}>
                ☆
              </Text>
            ))}
          </View>
        </View>
        <Text style={styles.streakHint}>
          Colour in a star for every day you logged a session in Mewstro.
        </Text>

        <View style={styles.goalBox}>
          <Text style={styles.goalLabel}>
            One thing I want to nail by next lesson with {vars.teacherName}:
          </Text>
          <View style={styles.goalLine} />
          <View style={styles.goalLine} />
        </View>

        <View style={[styles.napBox, { backgroundColor: accent }]}>
          <Text style={[styles.napTitle, { color: onAccent }]}>
            Mewstro is napping.
          </Text>
          <Text style={[styles.napBody, { color: onAccent }]}>
            Wake him up by hitting Start in the app.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLeft}>
            Bring this to your next lesson with {vars.teacherName}.
          </Text>
          <Text style={styles.footerRight}>mewstro.com</Text>
        </View>
      </Page>
    </Document>
  );
}

function createStyles(accent: string) {
  return StyleSheet.create({
    page: {
      backgroundColor: PALETTE.background,
      padding: 36,
      color: PALETTE.text,
      fontSize: 11,
      fontFamily: "Helvetica",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 18,
    },
    title: {
      fontSize: 26,
      fontFamily: "Helvetica-Bold",
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: 11,
      color: PALETTE.textMuted,
      marginTop: 4,
    },
    studioBadge: {
      backgroundColor: PALETTE.panel,
      borderRadius: 10,
      padding: 8,
      paddingHorizontal: 12,
      maxWidth: 200,
      borderWidth: 1,
      borderColor: PALETTE.border,
    },
    studioBadgeLabel: {
      fontSize: 7,
      letterSpacing: 1,
      color: PALETTE.textMuted,
      fontFamily: "Helvetica-Bold",
    },
    studioBadgeName: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
      marginTop: 2,
    },

    nameRow: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 8,
      marginBottom: 16,
    },
    nameLabel: { fontSize: 12, fontFamily: "Helvetica-Bold" },
    nameLine: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: PALETTE.border,
      height: 18,
    },

    tableHeader: {
      flexDirection: "row",
      backgroundColor: accent,
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    thDay: { width: 90, fontSize: 11, fontFamily: "Helvetica-Bold" },
    thDone: { width: 60, fontSize: 11, fontFamily: "Helvetica-Bold" },
    thWhat: { flex: 1, fontSize: 11, fontFamily: "Helvetica-Bold" },
    thHow: { width: 70, fontSize: 11, fontFamily: "Helvetica-Bold" },

    tableRow: {
      flexDirection: "row",
      paddingVertical: 12,
      paddingHorizontal: 10,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: PALETTE.border,
    },
    rowAlt: { backgroundColor: PALETTE.panel },
    tdDay: { width: 90, fontSize: 11, fontFamily: "Helvetica-Bold" },
    tdDoneBox: { width: 60, alignItems: "flex-start" },
    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 1.5,
      borderRadius: 4,
    },
    tdWhatLine: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: PALETTE.border,
      height: 14,
      marginRight: 8,
    },
    tdHowLine: {
      width: 70,
      borderBottomWidth: 1,
      borderBottomColor: PALETTE.border,
      height: 14,
    },

    streakRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 18,
    },
    streakLabel: { fontSize: 12, fontFamily: "Helvetica-Bold" },
    starRow: { flexDirection: "row", gap: 4 },
    star: { fontSize: 22 },
    streakHint: {
      fontSize: 9,
      color: PALETTE.textMuted,
      marginTop: 4,
      fontStyle: "italic",
    },

    goalBox: {
      marginTop: 18,
      backgroundColor: PALETTE.surface,
      borderWidth: 1,
      borderColor: PALETTE.border,
      borderRadius: 10,
      padding: 14,
    },
    goalLabel: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 8 },
    goalLine: {
      borderBottomWidth: 1,
      borderBottomColor: PALETTE.border,
      height: 22,
    },

    napBox: {
      marginTop: 16,
      borderRadius: 12,
      padding: 14,
      alignItems: "center",
    },
    napTitle: { fontSize: 14, fontFamily: "Helvetica-Bold" },
    napBody: { fontSize: 11, marginTop: 2, opacity: 0.92 },

    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: PALETTE.border,
      paddingTop: 8,
      marginTop: 18,
    },
    footerLeft: { fontSize: 9, color: PALETTE.textMuted },
    footerRight: { fontSize: 9, color: PALETTE.textMuted },
  });
}
