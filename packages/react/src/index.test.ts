import { expect, it } from 'vitest';

import * as Exports from './';

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "createAsset",
      "createStream",
      "getAsset",
      "getAssetMetrics",
      "getLivepeerProvider",
      "getPlaybackInfo",
      "getStream",
      "getStreamSession",
      "getStreamSessions",
      "updateAsset",
      "updateStream",
      "watchLivepeerProvider",
      "clearClient",
      "Client",
      "createClient",
      "defaultStudioConfig",
      "defaultTranscodingProfiles",
      "HttpError",
      "addMediaMetrics",
      "canPlayMediaNatively",
      "getMediaSourceType",
      "MetricsStatus",
      "PlaybackMonitor",
      "createStorage",
      "noopStorage",
      "b64Decode",
      "b64Encode",
      "b64UrlDecode",
      "b64UrlEncode",
      "deepMerge",
      "pick",
      "StudioLivepeerProvider",
      "studioProvider",
      "isPictureInPictureSupported",
      "defaultTheme",
      "getCssText",
      "styling",
      "createReactClient",
      "defaultQueryClient",
      "ControlsContainer",
      "FullscreenButton",
      "MediaControllerProvider",
      "PictureInPictureButton",
      "PlayButton",
      "Player",
      "Poster",
      "prefetchPlayer",
      "Progress",
      "ThemeProvider",
      "TimeDisplay",
      "Title",
      "useMediaController",
      "useTheme",
      "Volume",
      "Context",
      "LivepeerConfig",
      "useClient",
      "prefetchAsset",
      "prefetchAssetMetrics",
      "prefetchPlaybackInfo",
      "prefetchStream",
      "prefetchStreamSession",
      "prefetchStreamSessions",
      "useAsset",
      "useAssetMetrics",
      "useCreateAsset",
      "useCreateStream",
      "useLivepeerProvider",
      "useStream",
      "useStreamSession",
      "useStreamSessions",
      "useUpdateAsset",
      "useUpdateStream",
    ]
  `);
});
