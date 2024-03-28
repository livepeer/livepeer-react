import { BroadcastWithControls } from "@/components/broadcast/Broadcast";
import type { Booleanish } from "@/lib/types";
import { coerceToBoolean } from "@/lib/utils";
import { getIngest } from "@livepeer/react/external";

type BroadcastSearchParams = {
  forceEnabled?: Booleanish;
};

export default async function BroadcastPage({
  params,
  searchParams,
}: { params: { key?: string }; searchParams: Partial<BroadcastSearchParams> }) {
  const ingestUrl = getIngest(params.key, {
    baseUrl:
      process.env.NEXT_PUBLIC_WEBRTC_INGEST_BASE_URL ??
      "https://playback.livepeer.studio/webrtc",
  });

  return (
    <main className="absolute inset-0 gap-2 flex flex-col justify-center items-center bg-black">
      <BroadcastWithControls
        ingestUrl={ingestUrl}
        forceEnabled={coerceToBoolean(searchParams?.forceEnabled, true)}
      />
    </main>
  );
}
