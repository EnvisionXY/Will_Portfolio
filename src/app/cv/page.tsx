// src/app/cv/page.tsx
import { client } from "../../../sanity/lib/client";
import { SETTINGS_QUERY } from "../../../sanity/lib/queries";

export default async function CVPage() {
  const s = await client.fetch(SETTINGS_QUERY);
  const url = s?.cvFile?.asset?.url ?? s?.contact?.cvUrl;

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        No CV configured
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <iframe
        src={url}
        className="w-full max-w-5xl h-[90vh] border border-gray-700 rounded-lg"
      />
    </div>
  );
}
