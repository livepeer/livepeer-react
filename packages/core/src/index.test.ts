import { expect, it } from 'vitest';

import * as Exports from './';

it('should expose correct exports', () => {
  expect(Object.keys(Exports).sort()).toMatchInlineSnapshot(`
    [
      "Client",
      "HttpError",
      "b64Decode",
      "b64Encode",
      "b64UrlDecode",
      "b64UrlEncode",
      "clearClient",
      "createAsset",
      "createClient",
      "createControllerStore",
      "createStorage",
      "createStream",
      "deepMerge",
      "defaultStudioConfig",
      "defaultTranscodingProfiles",
      "getAsset",
      "getAssetMetrics",
      "getLivepeerProvider",
      "getMediaSourceType",
      "getPlaybackInfo",
      "getStream",
      "getStreamSession",
      "getStreamSessions",
      "noopStorage",
      "omit",
      "pick",
      "updateAsset",
      "updateStream",
      "watchLivepeerProvider",
    ]
  `);
});
