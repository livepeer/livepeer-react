import { omit } from "@livepeer/core";
import {
  DEFAULT_VOLUME_LEVEL,
  DeviceInformation,
  getBoundedVolume,
} from "@livepeer/core/media";
import { ClientStorage } from "@livepeer/core/storage";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { StoreApi, createStore } from "zustand/vanilla";
import { ControlsOptions } from "./browser";

const defaultIngestUrl = "https://playback.livepeer.studio/webrtc";

export type BroadcastControlsState = {
  /** The last time that play/pause was requested */
  // requestedPlayPauseLastTime: number;

  /** The offset of the browser's livestream versus the server time (in ms). */
  // playbackOffsetMs: number | null;

  /** If the volume is muted */
  muted: boolean;
  /** The volume, doesn't change when muted */
  volume: number;
};

export type InitialBroadcastProps = {
  /** The aspect ratio for the container element */
  aspectRatio: number | null;

  /**
   * The stream key to use for the broadcast.
   */
  streamKey: string | null;
  /**
   * The ingest URL for the WHIP WebRTC broadcast.
   *
   * Defaults to Livepeer Studio (`https://playback.livepeer.studio/webrtc`).
   */
  ingestUrl: string;
  /** The creatorId for the broadcast component */
  creatorId: string | null;

  /** The volume that was passed in to the Player */
  volume: number;
};

const omittedKeys = [
  "__initialProps",
  "__device",
  "__controls",
  "__controlsFunctions",
] as const;

export const sanitizeBroadcastState = (
  state: BroadcastState,
): BroadcastCallbackState => omit(state, ...omittedKeys);

export type BroadcastCallbackState = Omit<
  BroadcastState,
  (typeof omittedKeys)[number]
>;

export type BroadcastAriaText = {
  start: string;
  videoTrigger: string;
};

export type BroadcastState = {
  /** The ARIA text for the current state */
  aria: BroadcastAriaText;

  /** The audio and video device IDs currently used (only applies to broadcasting) */
  deviceIds: {
    audio?: string;
    video?: string;
  } | null;

  /** Whether the broadcast is currently enabled, or in "preview" mode. */
  enabled: boolean;

  /** If video is enabled (only applies to broadcasting) */
  video: boolean | null;

  /** Current volume of the broadcast. 0 if it is muted. */
  volume: number;

  /** The initial props passed into the component. */
  __initialProps: InitialBroadcastProps;
  /** The device information and support. */
  __device: DeviceInformation;
  /** The controls state. */
  __controls: BroadcastControlsState;

  __controlsFunctions: {
    updateMediaStream: (
      mediaStream: MediaStream,
      ids?: { audio?: string; video?: string },
    ) => void;
    toggleVideo: () => void;
    requestVolume: (volume: number) => void;
    setVolume: (volume: number) => void;
    requestToggleMute: () => void;
    toggleEnabled: () => void;
  };
};

export type BroadcastStore = StoreApi<BroadcastState> & {
  subscribe: {
    (
      listener: (
        selectedState: BroadcastState,
        previousSelectedState: BroadcastState,
      ) => void,
    ): () => void;
    <U>(
      selector: (state: BroadcastState) => U,
      listener: (selectedState: U, previousSelectedState: U) => void,
      options?: {
        equalityFn?: (a: U, b: U) => boolean;
        fireImmediately?: boolean;
      },
    ): () => void;
  };
};

export const createBroadcastStore = ({
  device,
  storage,
  initialProps,
}: {
  device: DeviceInformation;
  storage: ClientStorage;
  initialProps: Partial<InitialBroadcastProps>;
}): BroadcastStore => {
  const initialVolume = getBoundedVolume(
    initialProps.volume ?? DEFAULT_VOLUME_LEVEL,
  );

  const initialControls: BroadcastControlsState = {
    volume: initialVolume,
    muted: initialVolume === 0,
  };

  const store = createStore<
    BroadcastState,
    [
      ["zustand/subscribeWithSelector", Partial<BroadcastState>],
      ["zustand/persist", Partial<BroadcastState>],
    ]
  >(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          volume: initialVolume,

          enabled: false,

          /** The audio and video device IDs currently used (only applies to broadcasting) */
          deviceIds: null,
          /** If video is enabled (only applies to broadcasting) */
          video: null,

          aria: {
            start: "Start broadcasting (b)",
            videoTrigger: "Turn video off (v)",
          },

          __initialProps: {
            aspectRatio: initialProps?.aspectRatio ?? null,

            volume: initialVolume ?? null,

            creatorId: initialProps.creatorId ?? null,

            streamKey: initialProps?.streamKey ?? null,
            ingestUrl: initialProps?.ingestUrl ?? defaultIngestUrl,
          },

          __device: device,

          __controls: initialControls,

          __metadata: null,

          __controlsFunctions: {
            updateMediaStream: (_mediaStream, ids) =>
              set(({ deviceIds }) => ({
                _mediaStream,
                ...(ids?.video ? { video: true } : {}),
                deviceIds: {
                  ...deviceIds,
                  ...(ids?.audio ? { audio: ids.audio } : {}),
                  ...(ids?.video ? { video: ids.video } : {}),
                },
              })),

            toggleVideo: () =>
              set(({ video, aria }) => ({
                video: !video,
                aria: {
                  ...aria,
                  videoTrigger: !video
                    ? "Turn video off (v)"
                    : "Turn video on (v)",
                },
              })),

            requestVolume: (newVolume) =>
              set(({ __controls }) => ({
                volume: getBoundedVolume(newVolume),
                __controls: {
                  ...__controls,
                  volume:
                    newVolume === 0 ? newVolume : getBoundedVolume(newVolume),
                  muted: newVolume === 0,
                },
              })),
            setVolume: (newVolume) =>
              set(({ __controls }) => ({
                volume: getBoundedVolume(newVolume),
                __controls: {
                  ...__controls,
                  volume: getBoundedVolume(newVolume),
                },
              })),

            requestToggleMute: () =>
              set(({ volume, __controls }) => ({
                volume: volume !== 0 ? 0 : __controls.volume,
                __controls: {
                  ...__controls,
                  muted: !__controls.muted,
                },
              })),

            toggleEnabled: () =>
              set(({ enabled, aria }) => ({
                enabled: !enabled,
                aria: {
                  ...aria,
                  start: enabled
                    ? "Start broadcasting (b)"
                    : "Stop broadcasting (b)",
                },
              })),
          },
        }),
        {
          name: "livepeer-broadcast-controller",
          version: 1,
          // since these values are persisted across media, only persist volume and playbackRate
          partialize: ({ volume }) => ({
            volume,
          }),
          storage: createJSONStorage(() => storage),
        },
      ),
    ),
  );

  return store;
};

const MEDIA_BROADCAST_INITIALIZED_ATTRIBUTE =
  "data-livepeer-broadcast-initialized";

const allKeyTriggers = ["KeyL", "KeyV", "KeyB", "Space"] as const;
type KeyTrigger = (typeof allKeyTriggers)[number];

export const addBroadcastEventListeners = (
  element: HTMLMediaElement,
  store: BroadcastStore,
  { hotkeys = true }: ControlsOptions = {},
) => {
  const onKeyUp = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const code = e.code as KeyTrigger;

    if (allKeyTriggers.includes(code)) {
      if (code === "Space" || code === "KeyL") {
        store.getState().__controlsFunctions.requestToggleMute();
      } else if (code === "KeyV") {
        store.getState().__controlsFunctions.toggleVideo();
      } else if (code === "KeyB") {
        store.getState().__controlsFunctions.toggleEnabled();
      }
    }
  };

  const parentElementOrElement = element?.parentElement ?? element;

  if (element) {
    if (parentElementOrElement) {
      if (hotkeys) {
        parentElementOrElement.addEventListener("keyup", onKeyUp);
        parentElementOrElement.setAttribute("tabindex", "0");
      }
    }

    element.load();

    element.setAttribute(MEDIA_BROADCAST_INITIALIZED_ATTRIBUTE, "true");
  }

  // add effects
  const removeEffectsFromStore = addEffectsToStore(element, store);

  const destroy = () => {
    parentElementOrElement?.removeEventListener?.("keyup", onKeyUp);

    removeEffectsFromStore?.();

    element?.removeAttribute?.(MEDIA_BROADCAST_INITIALIZED_ATTRIBUTE);
  };

  return {
    destroy: () => {
      destroy?.();
    },
  };
};

let previousPromise:
  | Promise<void>
  // biome-ignore lint/suspicious/noExplicitAny: any
  | Promise<any>
  | Promise<null>
  | boolean
  | null;

const addEffectsToStore = (
  element: HTMLMediaElement,
  store: StoreApi<BroadcastState>,
) => {
  // add effects to store changes
  return store.subscribe(async (current, prev) => {
    try {
      if (element) {
        if (previousPromise) {
          try {
            // wait for the previous promise to execute before handling the next effect
            await previousPromise;
          } catch (e) {
            console.warn(e);
          }
        }

        if (current.volume !== prev.volume) {
          element.volume = current.volume;
        }

        // if (!current.__initialProps.streamKey) {
        element.muted = current.volume === 0;

        if (
          !current.__controls.muted &&
          current.__controls.muted !== prev.__controls.muted
        ) {
          element.volume = current.__controls.volume;
        }
        // }
      }
    } catch (e) {
      console.warn(e);
    }
  });
};
