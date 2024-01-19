import type { PlaybackInfo } from "livepeer/dist/models/components/playbackinfo";

import { MimeType, getMimeType } from "./mime";
import { ElementSize, MediaSizing } from "./controller";

type AudioExtension =
  | "m4a"
  | "mp4a"
  | "mpga"
  | "mp2"
  | "mp2a"
  | "mp3"
  | "m2a"
  | "m3a"
  | "wav"
  | "weba"
  | "aac"
  | "oga"
  | "spx";
type VideoExtension = "mp4" | "ogv" | "webm" | "mov" | "m4v" | "avi" | "m3u8";
type HlsExtension = "m3u8";

type OptionalQueryParams = `?${string}` | "";

type BaseSrc = {
  type: "audio" | "video" | "hls" | "webrtc" | "image";
  src: string;
  mime: MimeType | null;
  width: number | null;
  height: number | null;
};
export interface AudioSrc extends BaseSrc {
  type: "audio";
  src: `${string}${AudioExtension}${OptionalQueryParams}`;
}
export interface VideoSrc extends BaseSrc {
  type: "video";
  src: `${string}${VideoExtension}${OptionalQueryParams}`;
}
export interface ImageSrc extends BaseSrc {
  type: "image";
  src: `${string}${OptionalQueryParams}`;
}

export interface Base64Src extends BaseSrc {
  type: "video";
  src: `${string}`;
}
export interface HlsSrc extends BaseSrc {
  type: "hls";
  src: `${string}${HlsExtension}${OptionalQueryParams}`;
}
export interface WebRTCSrc extends BaseSrc {
  type: "webrtc";
  src: `${string}${OptionalQueryParams}`;
}
export type Src =
  | AudioSrc
  | HlsSrc
  | VideoSrc
  | Base64Src
  | WebRTCSrc
  | ImageSrc;

export type AccessControlParams = {
  jwt?: string | null;
  accessKey?: string | null;
};

/**
 * Represents a single track selector
 */
export type SingleTrackSelector =
  /** Selects no tracks */
  | "none"
  /** Selects all tracks */
  | "all"
  /** Selects all tracks */
  | "*"
  /** Specific track ID */
  | `${number}`
  /** Highest bit rate */
  | "maxbps"
  /** Lowest bit rate */
  | "minbps"
  /** Specific bit rate */
  | `${number}bps`
  /** Specific bit rate */
  | `${number}kbps`
  /** Specific bit rate */
  | `${number}mbps`
  /** Greater than specific bit rate */
  | `>${number}bps`
  /** Greater than specific bit rate */
  | `>${number}kbps`
  /** Greater than specific bit rate */
  | `>${number}mbps`
  /** Less than specific bit rate */
  | `<${number}bps`
  /** Less than specific bit rate */
  | `<${number}kbps`
  /** Less than specific bit rate */
  | `<${number}mbps`
  /** Max less than specific bit rate */
  | `max<${number}bps`
  /** Max less than specific bit rate */
  | `max<${number}kbps`
  /** Max less than specific bit rate */
  | `max<${number}mbps`;

/**
 * Represents a single audio track selector
 */
export type SingleAudioTrackSelector =
  | SingleTrackSelector
  /** Channel count */
  | "surround"
  /** Channel count */
  | "mono"
  /** Channel count */
  | "stereo"
  /** Channel count */
  | `${number}ch`;

/**
 * Represents a single video track selector
 */
export type SingleVideoTrackSelector =
  | SingleTrackSelector
  /** Highest pixel surface area */
  | "maxres"
  /** Lowest pixel surface area */
  | "minres"
  /** Specific pixel surface area */
  | `${number}x${number}`
  /** Closest to specific pixel surface area */
  | `~${number}x${number}`
  /** Greater than pixel surface area */
  | `>${number}x${number}`
  /** Less than pixel surface area */
  | `<${number}x${number}`
  /** Resolution */
  | "720p"
  /** Resolution */
  | "1080p"
  /** Resolution */
  | "1440p"
  /** Resolution */
  | "2k"
  /** Resolution */
  | "4k"
  /** Resolution */
  | "5k"
  /** Resolution */
  | "8k";

/**
 * Generic track selector for a given type
 */
type TrackSelector<T extends string> =
  | T
  /** Union of selectors */
  | `${T},${T}`
  /** Difference of selectors */
  | `${T},!${T}`
  /** Intersection of selectors */
  | `${T},|${T}`;

export type VideoTrackSelector = TrackSelector<SingleVideoTrackSelector>;
export type AudioTrackSelector = TrackSelector<SingleAudioTrackSelector>;

const audioExtensions =
  /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
const videoExtensions = /\.(mp4|ogv|webm|mov|m4v|avi|m3u8)($|\?)/i;
const base64String = /data:video/i;
const hlsExtensions = /\.(m3u8)($|\?)/i;
const webrtcExtensions = /(webrtc|sdp)/i;
const mimeFromBase64Pattern = /data:(.+?);base64/;
const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)($|\?)/i;

export const getMediaSourceType = (
  src: string | null,
  opts?: {
    sizing?: ElementSize;
  },
): Src | null => {
  if (!src) {
    return null;
  }

  const base64Mime = src.match(mimeFromBase64Pattern);
  const resolvedWidth = opts?.sizing?.width ?? null;
  const resolvedHeight = opts?.sizing?.height ?? null;

  return webrtcExtensions.test(src)
    ? {
        type: "webrtc",
        src: src as WebRTCSrc["src"],
        mime: "video/h264",
        width: resolvedWidth,
        height: resolvedHeight,
      }
    : hlsExtensions.test(src)
      ? {
          type: "hls",
          src: src as HlsSrc["src"],
          mime: getMimeType(hlsExtensions.exec(src)?.[1] ?? ""),
          width: resolvedWidth,
          height: resolvedHeight,
        }
      : videoExtensions.test(src)
        ? {
            type: "video",
            src: src as VideoSrc["src"],
            mime: getMimeType(videoExtensions.exec(src)?.[1] ?? ""),
            width: resolvedWidth,
            height: resolvedHeight,
          }
        : audioExtensions.test(src)
          ? {
              type: "audio",
              src: src as AudioSrc["src"],
              mime: getMimeType(audioExtensions.exec(src)?.[1] ?? ""),
              width: resolvedWidth,
              height: resolvedHeight,
            }
          : base64String.test(src)
            ? {
                type: "video",
                src: src as Base64Src["src"],
                mime: base64Mime ? (base64Mime[1] as MimeType) : "video/mp4",
                width: resolvedWidth,
                height: resolvedHeight,
              }
            : imageExtensions.test(src)
              ? {
                  type: "image",
                  src: src as ImageSrc["src"],
                  mime: getMimeType(imageExtensions.exec(src)?.[1] ?? ""),
                  width: resolvedWidth,
                  height: resolvedHeight,
                }
              : null;
};

export const parsePlaybackInfo = (
  playbackInfo: PlaybackInfo | null | undefined,
): Src[] | null => {
  const sources = playbackInfo?.meta?.source
    ?.map((s) =>
      getMediaSourceType(s?.url ?? null, {
        sizing:
          s.height && s.width
            ? {
                width: s.width,
                height: s.height,
              }
            : undefined,
      }),
    )
    ?.filter((source) => source?.src)
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    ?.map((source) => source!);

  return sources ?? null;
};
