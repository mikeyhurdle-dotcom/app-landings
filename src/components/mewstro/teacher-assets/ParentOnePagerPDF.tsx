"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { TeacherAssetVars, PALETTE, isLightColor } from "./types";

export function ParentOnePagerPDF({ vars }: { vars: TeacherAssetVars }) {
  const accent = vars.accentColor;
  const onAccent = isLightColor(accent) ? "#1A1A2E" : "#FFFFFF";
  const styles = createStyles(accent, onAccent);

  return (
    <Document title={`Mewstro - A note for parents (${vars.studioName})`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoBlock}>
            <View style={styles.logoMark}>
              <Text style={styles.logoMarkText}>M</Text>
            </View>
            <View>
              <Text style={styles.brandName}>Mewstro</Text>
              <Text style={styles.brandTag}>For parents and guardians</Text>
            </View>
          </View>
          <View style={styles.studioBadge}>
            <Text style={styles.studioBadgeLabel}>STUDENTS OF</Text>
            <Text style={styles.studioBadgeName}>{vars.studioName}</Text>
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.introTitle}>Hi, I&apos;m Mikey.</Text>
          <Text style={styles.introBody}>
            I&apos;m the person who built Mewstro. {vars.teacherName} has
            signed {vars.studioName} up to use it with their students, so I
            wanted to write a quick note so you know what your child is being
            asked to install and why.
          </Text>
          <Text style={styles.introBody}>
            I&apos;m a solo founder, based in Oxford. I started piano myself
            at 40 and built Mewstro on top of a spreadsheet I was using to
            track my own practice. My piano teacher suggested turning it into
            something her other students could use too. That&apos;s the whole
            story.
          </Text>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>What Mewstro is</Text>
        </View>
        <Text style={styles.body}>
          A practice tracker for instrument students. Your child opens the
          app when they sit down to practise, taps start, and the app times
          the session and logs what they worked on. {vars.teacherName} can
          see this in their teacher dashboard, which gives them a much
          better picture of how the week&apos;s gone before the next lesson.
        </Text>
        <Text style={styles.body}>
          There&apos;s a cat mascot called Mewstro who reacts to practice
          (celebrates after a session, falls asleep on quiet days), a few
          badges and streaks for motivation, and an optional studio
          leaderboard. None of those are required to use the app.
        </Text>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>
            What I&apos;d want to know if my child were using this
          </Text>
        </View>

        <Item
          title="It's free for your child."
          body={`${vars.teacherName}'s subscription covers every student in the studio. You won't be asked for a card and there are no in-app purchases for students.`}
          accent={accent}
          onAccent={onAccent}
        />
        <Item
          title="No advertising."
          body="The app is paid for by teacher subscriptions, so I have no need to put adverts in front of children, and I won't be doing that."
          accent={accent}
          onAccent={onAccent}
        />
        <Item
          title="Privacy."
          body="I store the bare minimum: your child's first name, the email or Apple ID they sign up with, and the practice sessions they log. None of it is sold or shared with third parties for marketing. Full privacy policy at mewstro.com/privacy."
          accent={accent}
          onAccent={onAccent}
        />
        <Item
          title="Age."
          body="Rated 4+ on the App Store. The content is benign (a cat, a timer, music notation), but for under-13s I'd recommend you helping with the initial sign-up using your own Apple ID, or using Apple's Family Sharing."
          accent={accent}
          onAccent={onAccent}
        />
        <Item
          title="Notifications."
          body={`The app can send a daily nudge to practise. They're easy to turn off in iPhone Settings, and ${vars.teacherName} can also disable notifications studio-wide if you'd prefer.`}
          accent={accent}
          onAccent={onAccent}
        />
        <Item
          title="Recording."
          body={`There's an optional feature called Milestone Moments where students can record short audio clips of themselves playing. Recordings live on your child's device by default, only shared with ${vars.teacherName} if your child explicitly chooses to send one.`}
          accent={accent}
          onAccent={onAccent}
        />

        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>
            A note for parents · {vars.studioName} on Mewstro
          </Text>
          <Text style={styles.footerRight}>mewstro.com</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>
            Helping your child get set up
          </Text>
        </View>
        <Text style={styles.body}>
          If your child is comfortable with iPhones, they can do this
          themselves with the student handout {vars.teacherName} has shared.
          If you&apos;d like to help:
        </Text>

        <Step
          n={1}
          title="Search Mewstro on the App Store"
          body="And download the app. iPhone only at the moment, no Android version yet."
          accent={accent}
          onAccent={onAccent}
        />
        <Step
          n={2}
          title="Sign in"
          body="Use Apple, Google, or email and password. If your child is under 13, sign in with your own Apple ID and use Apple's Family Sharing or Screen Time controls."
          accent={accent}
          onAccent={onAccent}
        />
        <Step
          n={3}
          title="Enter the invite code"
          body={`That ${vars.teacherName} has given you. This is what links your child to ${vars.studioName}.`}
          accent={accent}
          onAccent={onAccent}
        />
        <Step
          n={4}
          title="Pick the instrument(s)"
          body="And you're done. The app is ready to use for the next practice."
          accent={accent}
          onAccent={onAccent}
        />

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>
            If something&apos;s not right
          </Text>
        </View>
        <Text style={styles.body}>
          Email me at mikey@mewstro.app. I read every message myself, usually
          within a day. If you&apos;d rather not have your child use the app
          at all, that&apos;s fine, just let {vars.teacherName} know and they
          can carry on with whatever was working before.
        </Text>
        <Text style={styles.body}>
          Thanks for letting your child try this. {vars.teacherName} has been
          enormously helpful in shaping it, and the more studios like{" "}
          {vars.studioName} on Mewstro, the better the product gets.
        </Text>

        <View style={styles.signoff}>
          <Text style={styles.signoffName}>— Mikey</Text>
          <Text style={styles.signoffRole}>Founder, Mewstro</Text>
          <Text style={styles.signoffContact}>
            mikey@mewstro.app · mewstro.com
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>
            A note for parents · {vars.studioName} on Mewstro
          </Text>
          <Text style={styles.footerRight}>mewstro.com</Text>
        </View>
      </Page>
    </Document>
  );
}

function Item({
  title,
  body,
  accent,
  onAccent,
}: {
  title: string;
  body: string;
  accent: string;
  onAccent: string;
}) {
  const styles = createStyles(accent, onAccent);
  return (
    <View style={styles.item}>
      <Text style={[styles.itemTitle, { color: accent }]}>{title}</Text>
      <Text style={styles.itemBody}>{body}</Text>
    </View>
  );
}

function Step({
  n,
  title,
  body,
  accent,
  onAccent,
}: {
  n: number;
  title: string;
  body: string;
  accent: string;
  onAccent: string;
}) {
  const styles = createStyles(accent, onAccent);
  return (
    <View style={styles.step}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{n}</Text>
      </View>
      <View style={styles.stepBody}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepText}>{body}</Text>
      </View>
    </View>
  );
}

function createStyles(accent: string, onAccent: string) {
  return StyleSheet.create({
    page: {
      backgroundColor: PALETTE.background,
      padding: 36,
      paddingBottom: 60,
      color: PALETTE.text,
      fontSize: 11,
      lineHeight: 1.55,
      fontFamily: "Helvetica",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 18,
    },
    logoBlock: { flexDirection: "row", alignItems: "center", gap: 10 },
    logoMark: {
      width: 38,
      height: 38,
      borderRadius: 9,
      backgroundColor: accent,
      justifyContent: "center",
      alignItems: "center",
    },
    logoMarkText: {
      color: onAccent,
      fontSize: 22,
      fontFamily: "Helvetica-Bold",
    },
    brandName: {
      fontSize: 20,
      fontFamily: "Helvetica-Bold",
      letterSpacing: -0.3,
    },
    brandTag: { fontSize: 9, color: accent, marginTop: 2 },
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
      fontSize: 13,
      fontFamily: "Helvetica-Bold",
      marginTop: 2,
    },

    intro: {
      backgroundColor: PALETTE.panel,
      borderRadius: 12,
      padding: 16,
      marginBottom: 14,
    },
    introTitle: {
      fontSize: 16,
      fontFamily: "Helvetica-Bold",
      marginBottom: 6,
      color: PALETTE.text,
    },
    introBody: {
      fontSize: 11,
      color: PALETTE.textDim,
      marginBottom: 6,
      lineHeight: 1.55,
    },

    sectionHeading: { marginTop: 12, marginBottom: 8 },
    sectionHeadingText: {
      fontSize: 14,
      fontFamily: "Helvetica-Bold",
      color: accent,
    },
    body: {
      fontSize: 11,
      color: PALETTE.textDim,
      marginBottom: 8,
      lineHeight: 1.55,
    },

    item: { marginBottom: 10 },
    itemTitle: {
      fontSize: 11,
      fontFamily: "Helvetica-Bold",
      marginBottom: 2,
    },
    itemBody: {
      fontSize: 11,
      color: PALETTE.textDim,
      lineHeight: 1.5,
    },

    step: { flexDirection: "row", marginBottom: 10, gap: 10 },
    stepNumber: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: accent,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 2,
    },
    stepNumberText: {
      color: onAccent,
      fontSize: 11,
      fontFamily: "Helvetica-Bold",
    },
    stepBody: { flex: 1 },
    stepTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", marginBottom: 2 },
    stepText: { fontSize: 11, color: PALETTE.textDim },

    signoff: { marginTop: 16 },
    signoffName: { fontSize: 12, fontFamily: "Helvetica-Bold" },
    signoffRole: { fontSize: 10, color: PALETTE.textMuted, marginTop: 2 },
    signoffContact: {
      fontSize: 10,
      color: PALETTE.textMuted,
      marginTop: 2,
    },

    footer: {
      position: "absolute",
      bottom: 24,
      left: 36,
      right: 36,
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: PALETTE.border,
      paddingTop: 8,
    },
    footerLeft: { fontSize: 8, color: PALETTE.textMuted },
    footerRight: { fontSize: 8, color: PALETTE.textMuted },
  });
}
