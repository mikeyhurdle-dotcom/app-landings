import { getActiveStudioName } from "@/lib/teacher-auth";
import {
  listStudioResources,
  getStudioOverview,
  type StudioResourceRow,
} from "@/lib/teacher-queries";
import { redirect } from "next/navigation";
import Link from "next/link";
import MaterialsManager, { type StudentOption } from "./MaterialsManager";

export const metadata = {
  title: "Studio materials · Mewstro Teacher",
  robots: { index: false, follow: false },
};

type AudienceType = "studio" | "instrument" | "student";

const AUDIENCE_BADGE: Record<AudienceType, string> = {
  studio: "bg-[#2D8B7E]/10 text-[#2D8B7E] border-[#2D8B7E]/30",
  instrument: "bg-blue-50 text-blue-700 border-blue-200",
  student: "bg-amber-50 text-amber-700 border-amber-200",
};

function audienceLabel(
  resource: StudioResourceRow,
  students: StudentOption[],
): string {
  if (resource.audience === "studio") return "Whole studio";
  if (resource.audience === "instrument")
    return resource.audienceInstrument
      ? resource.audienceInstrument.charAt(0).toUpperCase() +
          resource.audienceInstrument.slice(1)
      : "Instrument";
  if (resource.audience === "student") {
    const s = students.find(
      (st) => st.userId === resource.audienceStudentUserId,
    );
    return s ? s.displayName : "A student";
  }
  return resource.audience;
}

function errorMessageFor(code: string | undefined): string | null {
  if (!code) return null;
  switch (code) {
    case "title":
      return "A title is required.";
    case "url":
      return "A URL is required for link and embed materials.";
    case "type":
      return "Invalid material type.";
    case "audience":
      return "Invalid audience selection.";
    case "student":
      return "Please select a student.";
    case "instrument":
      return "Please select an instrument.";
    case "scope":
      return "That student does not belong to your studio.";
    case "doc_not_supported":
      return "Document (PDF) upload is not yet available. Use a link or embed for now.";
    case "server":
      return "Something went wrong. Please try again.";
    default:
      return null;
  }
}

export default async function StudioMaterialsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; student?: string; studentName?: string }>;
}) {
  const studioName = await getActiveStudioName();
  if (!studioName) {
    redirect("/teacher/login");
  }

  const [resources, overview] = await Promise.all([
    listStudioResources(studioName),
    getStudioOverview(studioName),
  ]);

  const params = await searchParams;
  const errorMessage = errorMessageFor(params.error);

  // When arriving from a student's dashboard via "Add material", pre-select
  // audience=student with that student — teacher can still change it.
  const preStudentId = params.student;
  const preStudentName = params.studentName
    ? decodeURIComponent(params.studentName)
    : undefined;

  const students: StudentOption[] = overview.students.map((s) => ({
    userId: s.userId,
    displayName: s.displayName,
  }));

  // Group resources by audience for the read-only display
  const studioResources = resources.filter((r) => r.audience === "studio");
  const instrumentResources = resources.filter(
    (r) => r.audience === "instrument",
  );
  const studentResources = resources.filter((r) => r.audience === "student");

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/teacher"
        className="mb-6 inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#2D8B7E] transition-colors"
      >
        <span>←</span> Back to dashboard
      </Link>

      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-[#2D8B7E]">{studioName}</p>
          <h1 className="mt-1 text-3xl font-bold text-[#1A1A2E]">
            Studio materials
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Links and embeds you share with your students. They appear in the
            Mewstro app and the practice portal.
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Read-only summary by audience */}
      {resources.length > 0 && (
        <div className="mb-8 space-y-6">
          {studioResources.length > 0 && (
            <Section
              title="For the whole studio"
              resources={studioResources}
              students={students}
            />
          )}
          {instrumentResources.length > 0 && (
            <Section
              title="By instrument"
              resources={instrumentResources}
              students={students}
            />
          )}
          {studentResources.length > 0 && (
            <Section
              title="For a specific student"
              resources={studentResources}
              students={students}
            />
          )}
        </div>
      )}

      {/* Interactive manager (add / edit / delete) */}
      <div className="rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-[#1A1A2E]">
          Manage materials
        </h2>
        <MaterialsManager
          resources={resources}
          students={students}
          initialStudentId={preStudentId}
          initialStudentName={preStudentName}
        />
      </div>
    </div>
  );
}

function Section({
  title,
  resources,
  students,
}: {
  title: string;
  resources: StudioResourceRow[];
  students: StudentOption[];
}) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#6B7280]">
        {title}
      </h2>
      <div className="space-y-2">
        {resources.map((r) => (
          <ResourceCard key={r.id} resource={r} students={students} />
        ))}
      </div>
    </div>
  );
}

function ResourceCard({
  resource,
  students,
}: {
  resource: StudioResourceRow;
  students: StudentOption[];
}) {
  const badgeClass =
    AUDIENCE_BADGE[resource.audience as AudienceType] ?? AUDIENCE_BADGE.studio;
  const label = audienceLabel(resource, students);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#E8DFD3] bg-[#FFFBF7] px-4 py-3">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium text-[#1A1A2E]">{resource.title}</span>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium flex-shrink-0 ${badgeClass}`}
          >
            {label}
          </span>
          <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500 flex-shrink-0 capitalize">
            {resource.type}
          </span>
        </div>
        {resource.description && (
          <p className="mt-0.5 text-sm text-[#6B7280]">{resource.description}</p>
        )}
        {resource.url && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-0.5 block truncate text-xs text-[#2D8B7E] hover:underline"
          >
            {resource.url}
          </a>
        )}
      </div>
    </div>
  );
}
