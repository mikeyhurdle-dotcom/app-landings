"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { TeacherAssetVars, PALETTE, isLightColor } from "./types";

export function StudentWelcomePDF({ vars }: { vars: TeacherAssetVars }) {
  const accent = vars.accentColor;
  const onAccent = isLightColor(accent) ? "#1A1A2E" : "#FFFFFF";
  const styles = createStyles(accent, onAccent);

  return (
    <Document title={`${vars.studioName} on Mewstro - Student Welcome`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoBlock}>
            <View style={styles.logoMark}>
              <Text style={styles.logoMarkText}>M</Text>
            </View>
            <View>
              <Text style={styles.brandName}>Mewstro</Text>
              <Text style={styles.brandTag}>
                Every practice deserves an encore.
              </Text>
            </View>
          </View>
          <View style={styles.studioBadge}>
            <Text style={styles.studioBadgeLabel}>WELCOME TO</Text>
            <Text style={styles.studioBadgeName}>{vars.studioName}</Text>
            <Text style={styles.studioBadgeRole}>on Mewstro</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>A NOTE FROM {vars.teacherName.toUpperCase()}</Text>
          <Text style={styles.heroBody}>
            I&apos;ve signed our studio up to a practice app called Mewstro,
            and this page is everything you need to get going with it.
            Should take about three minutes.
          </Text>
          <Text style={styles.heroBody}>
            The reason I&apos;ve gone with this one: it gives me a little
            window into how the week&apos;s gone before our next lesson, so
            I can be more useful to you. It also takes care of the bit I
            always nag you about, which is just noticing what you&apos;ve
            practised. The app does the noticing for you.
          </Text>
          <Text style={styles.heroBody}>
            It&apos;s free for you. My subscription covers everyone in{" "}
            {vars.studioName}.
          </Text>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>What it actually is</Text>
        </View>
        <Text style={styles.body}>
          A practice app with a cat conductor called Mewstro who reacts to
          what you do. Start a session, log what you played, and he
          celebrates. Skip a few days and he goes to sleep. He&apos;s not
          judging, he&apos;s just keeping you company.
        </Text>

        <View style={styles.bulletList}>
          <Bullet accent={accent}>
            It works for whatever instrument you&apos;re learning.
          </Bullet>
          <Bullet accent={accent}>
            I can see how often you&apos;ve practised and what you&apos;ve
            been working on, which gives us better lessons without you
            having to remember everything that happened in the week.
          </Bullet>
          <Bullet accent={accent}>
            Streaks, badges, and a studio leaderboard. If those motivate you,
            brilliant. If not, ignore them and the timer still works fine.
          </Bullet>
          <Bullet accent={accent}>
            Free for you. No card, no sign-up fee, no in-app purchases.
          </Bullet>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>How to get set up</Text>
        </View>

        <Step
          n={1}
          title="Download Mewstro"
          body={`Search "Mewstro" on the App Store, or scan the QR at the bottom of page two. iPhone only at the moment.`}
          accent={accent}
          onAccent={onAccent}
        />
        <Step
          n={2}
          title="Make an account"
          body="Sign in with Apple, Google, or an email and password. Whichever's easiest."
          accent={accent}
          onAccent={onAccent}
        />
        <Step
          n={3}
          title="Enter your invite code"
          body={`When the app asks if you have one, tap "I have an invite code" and enter the code below. That's the bit that links you to ${vars.studioName}, so I can see your practice and you don't get billed for anything.`}
          accent={accent}
          onAccent={onAccent}
        />

        <View style={[styles.codeBox, { borderColor: accent }]}>
          <Text style={styles.codeLabel}>YOUR INVITE CODE</Text>
          <Text style={[styles.codeValue, { color: accent }]}>
            {vars.inviteCode}
          </Text>
        </View>

        <Step
          n={4}
          title="Pick your instrument(s)"
          body="Add what you're actually learning. You can have more than one."
          accent={accent}
          onAccent={onAccent}
        />
        <Step
          n={5}
          title="Start your first session"
          body="Tap the big start button next time you sit down to practise. Honestly, I'd suggest just doing this once and seeing how it feels before fiddling with anything else."
          accent={accent}
          onAccent={onAccent}
        />

        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>
            {vars.studioName} on Mewstro · Welcome handout
          </Text>
          <Text style={styles.footerRight}>mewstro.com</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>
            Things you&apos;ll probably wonder about
          </Text>
        </View>

        <Faq
          q="Do I have to log every practice?"
          a="Only the ones you log show up on my view, so yes, ideally. But there's no penalty if you forget, the app just gives you fewer streaks and the cat naps a bit more."
        />
        <Faq
          q={`What can ${vars.teacherName} actually see?`}
          a="Your session times, what you've been practising, and any Milestone Moment recordings you choose to send. I can't see anything you don't put in the app."
        />
        <Faq
          q="Can I record myself playing?"
          a="Yes. Milestone Moments are short audio clips you save when something clicks. Keep them private, send one to me, or post one to the studio if you're feeling brave."
        />
        <Faq
          q="What if I miss a day and lose my streak?"
          a="The streak resets, the cat sleeps for a bit, and you start again. Practice you missed is gone, practice today still counts. I'd rather you came back after a week off than felt guilty enough to stop."
        />
        <Faq
          q="I have an Apple Watch."
          a="There's a watch app with a haptic metronome, which I think is genuinely useful. You can also start sessions from your wrist."
        />

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionHeadingText}>
            If something&apos;s not working
          </Text>
        </View>
        <Text style={styles.body}>
          For anything to do with the app itself (it crashed, the timer&apos;s
          behaving oddly, you can&apos;t log in), email mikey@mewstro.app.
          That&apos;s Mikey, who built it. He&apos;s a one-person operation
          and gets back to people quickly.
        </Text>
        <Text style={styles.body}>
          For anything to do with what to practise or how a piece is going,
          just ask me at our next lesson or message me the way you normally
          do.
        </Text>

        <View style={styles.signoff}>
          <Text style={styles.signoffName}>— {vars.teacherName}</Text>
          <Text style={styles.signoffRole}>{vars.studioName}</Text>
        </View>

        <View style={[styles.aboutBox, { borderLeftColor: accent }]}>
          <Text style={styles.aboutTitle}>A bit of context on the app</Text>
          <Text style={styles.aboutBody}>
            Mewstro was built by Mikey Hurdle, a piano student in Oxford who
            started lessons at 40 and made a spreadsheet to track his own
            practice. His piano teacher suggested turning it into an app her
            other students could use. That&apos;s how Mewstro exists.
            There&apos;s no big company behind it, no advertising, no data
            sales, just one person trying to make practice tracking less of a
            chore. You can read the whole story at mewstro.com/story.
          </Text>
        </View>

        <View style={styles.qrBlock}>
          <View style={[styles.qrPlaceholder, { borderColor: accent }]}>
            <Text style={styles.qrPlaceholderText}>
              QR code{"\n"}(App Store)
            </Text>
          </View>
          <Text style={styles.qrCaption}>
            Scan to download Mewstro from the App Store, or search Mewstro
            on iPhone.
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerLeft}>
            {vars.studioName} on Mewstro · Welcome handout
          </Text>
          <Text style={styles.footerRight}>mewstro.com</Text>
        </View>
      </Page>
    </Document>
  );
}

function Bullet({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  const styles = createStyles(accent, "#fff");
  return (
    <View style={styles.bulletRow}>
      <Text style={[styles.bulletDot, { color: accent }]}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
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

function Faq({ q, a }: { q: string; a: string }) {
  const styles = createStyles("#000", "#fff");
  return (
    <View style={styles.faq}>
      <Text style={styles.faqQ}>{q}</Text>
      <Text style={styles.faqA}>{a}</Text>
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
      lineHeight: 1.5,
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
    studioBadgeRole: {
      fontSize: 9,
      color: PALETTE.textMuted,
      marginTop: 1,
    },

    hero: {
      backgroundColor: accent,
      borderRadius: 14,
      padding: 18,
      marginBottom: 16,
    },
    heroEyebrow: {
      fontSize: 8,
      letterSpacing: 1.4,
      color: onAccent,
      opacity: 0.8,
      fontFamily: "Helvetica-Bold",
      marginBottom: 8,
    },
    heroBody: {
      fontSize: 11,
      color: onAccent,
      opacity: 0.95,
      marginBottom: 6,
      lineHeight: 1.55,
    },

    sectionHeading: { marginTop: 14, marginBottom: 8 },
    sectionHeadingText: {
      fontSize: 14,
      fontFamily: "Helvetica-Bold",
      color: accent,
    },
    body: { fontSize: 11, color: PALETTE.textDim, marginBottom: 6 },

    bulletList: { marginTop: 6, marginBottom: 6 },
    bulletRow: { flexDirection: "row", marginBottom: 4 },
    bulletDot: {
      width: 10,
      fontFamily: "Helvetica-Bold",
    },
    bulletText: { flex: 1, fontSize: 11, color: PALETTE.textDim },

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

    codeBox: {
      backgroundColor: PALETTE.surface,
      borderWidth: 2,
      borderRadius: 10,
      padding: 12,
      marginVertical: 10,
      alignItems: "center",
    },
    codeLabel: {
      fontSize: 8,
      letterSpacing: 1.2,
      color: PALETTE.textMuted,
      fontFamily: "Helvetica-Bold",
    },
    codeValue: {
      fontSize: 26,
      fontFamily: "Courier-Bold",
      letterSpacing: 2,
      marginTop: 4,
    },

    faq: { marginBottom: 10 },
    faqQ: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 2 },
    faqA: { fontSize: 11, color: PALETTE.textDim, lineHeight: 1.5 },

    signoff: { marginTop: 16, marginBottom: 14 },
    signoffName: {
      fontSize: 12,
      fontFamily: "Helvetica-Bold",
    },
    signoffRole: { fontSize: 10, color: PALETTE.textMuted, marginTop: 2 },

    aboutBox: {
      backgroundColor: PALETTE.panel,
      borderLeftWidth: 3,
      borderRadius: 6,
      padding: 12,
      marginBottom: 14,
    },
    aboutTitle: {
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
      marginBottom: 4,
      color: PALETTE.text,
    },
    aboutBody: {
      fontSize: 10,
      color: PALETTE.textDim,
      lineHeight: 1.5,
    },

    qrBlock: {
      marginTop: 4,
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      borderWidth: 1,
      borderColor: PALETTE.border,
      borderRadius: 12,
      padding: 14,
      backgroundColor: PALETTE.surface,
    },
    qrPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: PALETTE.panel,
      justifyContent: "center",
      alignItems: "center",
    },
    qrPlaceholderText: {
      fontSize: 8,
      color: PALETTE.textMuted,
      textAlign: "center",
    },
    qrCaption: { flex: 1, fontSize: 10, color: PALETTE.textDim },

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
