# @livepeer/core-react

## 3.2.8

### Patch Changes

- Updated dependencies [[`0e5a036`](https://github.com/livepeer/ui-kit/commit/0e5a0365fe9d685271bc96ff5d750ee19fe6406b)]:
  - @livepeer/core@3.2.8

## 3.2.7

### Patch Changes

- [#577](https://github.com/livepeer/ui-kit/pull/577) [`3b41b4d`](https://github.com/livepeer/ui-kit/commit/3b41b4d30c9ce7dfade6e6360bcc464421e17af0) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added `oldest_buffer_timestamp` to heartbeat events.

- Updated dependencies [[`3b41b4d`](https://github.com/livepeer/ui-kit/commit/3b41b4d30c9ce7dfade6e6360bcc464421e17af0)]:
  - @livepeer/core@3.2.7

## 3.2.6

### Patch Changes

- [#575](https://github.com/livepeer/ui-kit/pull/575) [`a3a5034`](https://github.com/livepeer/ui-kit/commit/a3a503497803f54fddef0fd0dffee96872944ffa) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** updated all dependencies and changed to have a single heartbeat event when multiple heartbeats are attempted to be sent.

- Updated dependencies [[`a3a5034`](https://github.com/livepeer/ui-kit/commit/a3a503497803f54fddef0fd0dffee96872944ffa)]:
  - @livepeer/core@3.2.6

## 3.2.5

### Patch Changes

- [#573](https://github.com/livepeer/ui-kit/pull/573) [`2a1b4e4`](https://github.com/livepeer/ui-kit/commit/2a1b4e499fe829face2606d2ae2a23443db2ff1e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** moved to using `nanoid` for generating secure IDs and added IDs to all metrics.

- Updated dependencies [[`2a1b4e4`](https://github.com/livepeer/ui-kit/commit/2a1b4e499fe829face2606d2ae2a23443db2ff1e)]:
  - @livepeer/core@3.2.5

## 3.2.4

### Patch Changes

- [#571](https://github.com/livepeer/ui-kit/pull/571) [`96ab02b`](https://github.com/livepeer/ui-kit/commit/96ab02b18b4cd68aa25b2c589e78a42dfa8c8ff1) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed logic for falling back to HLS.

- Updated dependencies [[`96ab02b`](https://github.com/livepeer/ui-kit/commit/96ab02b18b4cd68aa25b2c589e78a42dfa8c8ff1)]:
  - @livepeer/core@3.2.4

## 3.2.3

### Patch Changes

- [#569](https://github.com/livepeer/ui-kit/pull/569) [`cd68707`](https://github.com/livepeer/ui-kit/commit/cd687070233cce45580a2f5394ed74f5d7d497e9) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added fallback to HLS if webrtc is not possible for one track, or if bframes is 0.

- Updated dependencies [[`cd68707`](https://github.com/livepeer/ui-kit/commit/cd687070233cce45580a2f5394ed74f5d7d497e9)]:
  - @livepeer/core@3.2.3

## 3.2.2

### Patch Changes

- [`abf18d6`](https://github.com/livepeer/ui-kit/commit/abf18d6f07529fe37440ddde2f718611350c51f5) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** Add a new `onPlaybackEvents` callback to the `Player` and `Broadcast`. This allows you to integrate with other analytics providers.

- [#566](https://github.com/livepeer/ui-kit/pull/566) [`7a3d1f3`](https://github.com/livepeer/ui-kit/commit/7a3d1f316ae146f889758387bcfc5997dccec5c3) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolved an issue where using `disableProgressListener` would cause the player to continue to increment waittime when the player was playing.

- Updated dependencies [[`abf18d6`](https://github.com/livepeer/ui-kit/commit/abf18d6f07529fe37440ddde2f718611350c51f5), [`7a3d1f3`](https://github.com/livepeer/ui-kit/commit/7a3d1f316ae146f889758387bcfc5997dccec5c3)]:
  - @livepeer/core@3.2.2

## 3.2.1

### Patch Changes

- [#564](https://github.com/livepeer/ui-kit/pull/564) [`2811223`](https://github.com/livepeer/ui-kit/commit/2811223502a3c751f2264840e02429d17e758e21) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolved an issue where a `storage` override was not being respected.

- Updated dependencies [[`2811223`](https://github.com/livepeer/ui-kit/commit/2811223502a3c751f2264840e02429d17e758e21)]:
  - @livepeer/core@3.2.1

## 3.2.0

### Minor Changes

- [#552](https://github.com/livepeer/ui-kit/pull/552) [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:**: added metrics event reporting with POST requests, using `sendBeacon` for end-of-session metrics.

  ```tsx
  export type HeartbeatEvent = {
    // The properties below are sent on every heartbeat.

    /** The event type. */
    type: "heartbeat";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The number of errors that have occurred since last heartbeat. */
    errors: number;

    /** The number of times the current playback has stalled, since last heartbeat. */
    stalled_count: number;
    /** The *total* number of times the current playback has waited, since last heartbeat. */
    waiting_count: number;

    /** The time the playback has spent in an errored state, in ms, since last heartbeat. */
    time_errored_ms: number;
    /** The time the playback has spent stalled, in ms, since last heartbeat. */
    time_stalled_ms: number;
    /** The time the playback has spent playing, in ms, since last heartbeat. */
    time_playing_ms: number;
    /** The time the playback has spent waiting, in ms, since last heartbeat. */
    time_waiting_ms: number;

    // The properties below are only sent once.

    /** The state of autoplay of the video. */
    autoplay_status?: "autoplay" | "none";

    /** The time from when the metrics were added to play, in milliseconds. */
    mount_to_play_ms?: number;
    /** The time from when the metrics were added to the first frame, in milliseconds. */
    mount_to_first_frame_ms?: number;
    /** The time from the first play event to the first frame, in milliseconds. Also called TTFF. */
    play_to_first_frame_ms?: number;

    /** The duration of the video, in milliseconds. */
    duration_ms?: number;
    /** The offset of the live video head compared to the server time, in milliseconds. */
    offset_ms?: number;

    // The properties below are only sent when they change.

    /** The height of the player element, in px. */
    player_height_px?: number;
    /** The width of the player element, in px. */
    player_width_px?: number;
    /** The height of the source video, in px. */
    video_height_px?: number;
    /** The width of the source video, in px. */
    video_width_px?: number;
    /** The height of the window, in px. */
    window_height_px?: number;
    /** The width of the window, in px. */
    window_width_px?: number;
  };

  export type ErrorEvent = {
    /** The event type. */
    type: "error";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The raw event error message. */
    error_message: string;
    /** The category of the error. */
    category:
      | "offline"
      | "access-control"
      | "fallback"
      | "permissions"
      | "unknown";
  };

  export type HtmlEvent = {
    /** The event type. */
    type:
      | "play"
      | "pause"
      | "enter-fullscreen"
      | "exit-fullscreen"
      | "enter-pip"
      | "exit-pip"
      | "can-play"
      | "ended"
      | "first-frame";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
  };

  export type RateChangeEvent = {
    /** The event type. */
    type: "rate";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The playback rate. */
    payload: PlaybackRate;
  };

  export type SeekEvent = {
    /** The event type. */
    type: "seek";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The seek timestamp. */
    payload: number;
  };

  export type VideoQualityEvent = {
    /** The event type. */
    type: "video-quality";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The video playback quality enum. */
    payload: VideoQuality;
  };

  export type PlaybackEvent =
    | HeartbeatEvent
    | ErrorEvent
    | HtmlEvent
    | RateChangeEvent
    | SeekEvent
    | VideoQualityEvent;

  export type SessionData = {
    session_id: string;
    playback_id: string;
    protocol?: MimeType;
    page_url: string;
    source_url: string;
    player: `${"audio" | "hls" | "video" | "webrtc" | "unknown"}-${string}`;
    user_agent?: string;
    uid?: string;
    events: PlaybackEvent[];
    live: boolean;
  };
  ```

### Patch Changes

- [#552](https://github.com/livepeer/ui-kit/pull/552) [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** changed duration to integer ms.

- [#552](https://github.com/livepeer/ui-kit/pull/552) [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added `time_warning_ms` to metrics snapshot with a timer when a warning is encountered.

- [#552](https://github.com/livepeer/ui-kit/pull/552) [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** merged fixes from `main`.

- [#552](https://github.com/livepeer/ui-kit/pull/552) [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** moved `warning` events to `warning` event type and counter.

- [#552](https://github.com/livepeer/ui-kit/pull/552) [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** broke `version` and `player` out into different fields, improved `play`/`pause` events to be triggered on HTML events, added `clip` event.

- [#552](https://github.com/livepeer/ui-kit/pull/552) [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** split out the `page_url` to be: `domain`, `path`, `params`, and `hash`.

- Updated dependencies [[`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb), [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb), [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb), [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb), [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb), [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb), [`187d26c`](https://github.com/livepeer/ui-kit/commit/187d26cb6f7e355440e5a8d1819f9cc060a28ccb)]:
  - @livepeer/core@3.2.0

## 3.2.0-next.6

### Patch Changes

- [#561](https://github.com/livepeer/ui-kit/pull/561) [`822b94d`](https://github.com/livepeer/ui-kit/commit/822b94d506a3a4b5607c814f506d5c1a9d2a41c9) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added `time_warning_ms` to metrics snapshot with a timer when a warning is encountered.

- Updated dependencies [[`822b94d`](https://github.com/livepeer/ui-kit/commit/822b94d506a3a4b5607c814f506d5c1a9d2a41c9)]:
  - @livepeer/core@3.2.0-next.6

## 3.2.0-next.5

### Patch Changes

- [#559](https://github.com/livepeer/ui-kit/pull/559) [`dff0c23`](https://github.com/livepeer/ui-kit/commit/dff0c2353d4267e70a4f58ef560d8f429f3f2685) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** moved `warning` events to `warning` event type and counter.

- Updated dependencies [[`dff0c23`](https://github.com/livepeer/ui-kit/commit/dff0c2353d4267e70a4f58ef560d8f429f3f2685)]:
  - @livepeer/core@3.2.0-next.5

## 3.2.0-next.4

### Patch Changes

- [#523](https://github.com/livepeer/ui-kit/pull/523) [`f05608e`](https://github.com/livepeer/ui-kit/commit/f05608ed400c0e81c3e5bebc0f78aeeb5584fd95) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** merged fixes from `main`.

- Updated dependencies [[`f05608e`](https://github.com/livepeer/ui-kit/commit/f05608ed400c0e81c3e5bebc0f78aeeb5584fd95)]:
  - @livepeer/core@3.2.0-next.4

## 3.2.0-next.3

### Patch Changes

- [#513](https://github.com/livepeer/ui-kit/pull/513) [`2dbac23`](https://github.com/livepeer/ui-kit/commit/2dbac2358b52520963c1e3f73ba4bed5014de1b2) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** split out the `page_url` to be: `domain`, `path`, `params`, and `hash`.

- Updated dependencies [[`2dbac23`](https://github.com/livepeer/ui-kit/commit/2dbac2358b52520963c1e3f73ba4bed5014de1b2)]:
  - @livepeer/core@3.2.0-next.3

## 3.2.0-next.2

### Patch Changes

- [`9665a46`](https://github.com/livepeer/ui-kit/commit/9665a46e8ef6f511b1b393cb73eb7cbc0c127800) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** changed duration to integer ms.

- Updated dependencies [[`9665a46`](https://github.com/livepeer/ui-kit/commit/9665a46e8ef6f511b1b393cb73eb7cbc0c127800)]:
  - @livepeer/core@3.2.0-next.2

## 3.2.0-next.1

### Patch Changes

- [#507](https://github.com/livepeer/ui-kit/pull/507) [`5802873`](https://github.com/livepeer/ui-kit/commit/58028734de512fff59e98b2c7bcd2058a7db420b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** broke `version` and `player` out into different fields, improved `play`/`pause` events to be triggered on HTML events, added `clip` event.

- Updated dependencies [[`5802873`](https://github.com/livepeer/ui-kit/commit/58028734de512fff59e98b2c7bcd2058a7db420b)]:
  - @livepeer/core@3.2.0-next.1

## 3.2.0-next.0

### Minor Changes

- [#500](https://github.com/livepeer/ui-kit/pull/500) [`92d67e1`](https://github.com/livepeer/ui-kit/commit/92d67e1d0e89c52ea8bde16b735f2400e8897bde) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:**: added metrics event reporting with POST requests, using `sendBeacon` for end-of-session metrics.

  ```tsx
  export type HeartbeatEvent = {
    // The properties below are sent on every heartbeat.

    /** The event type. */
    type: "heartbeat";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The number of errors that have occurred since last heartbeat. */
    errors: number;

    /** The number of times the current playback has stalled, since last heartbeat. */
    stalled_count: number;
    /** The *total* number of times the current playback has waited, since last heartbeat. */
    waiting_count: number;

    /** The time the playback has spent in an errored state, in ms, since last heartbeat. */
    time_errored_ms: number;
    /** The time the playback has spent stalled, in ms, since last heartbeat. */
    time_stalled_ms: number;
    /** The time the playback has spent playing, in ms, since last heartbeat. */
    time_playing_ms: number;
    /** The time the playback has spent waiting, in ms, since last heartbeat. */
    time_waiting_ms: number;

    // The properties below are only sent once.

    /** The state of autoplay of the video. */
    autoplay_status?: "autoplay" | "none";

    /** The time from when the metrics were added to play, in milliseconds. */
    mount_to_play_ms?: number;
    /** The time from when the metrics were added to the first frame, in milliseconds. */
    mount_to_first_frame_ms?: number;
    /** The time from the first play event to the first frame, in milliseconds. Also called TTFF. */
    play_to_first_frame_ms?: number;

    /** The duration of the video, in milliseconds. */
    duration_ms?: number;
    /** The offset of the live video head compared to the server time, in milliseconds. */
    offset_ms?: number;

    // The properties below are only sent when they change.

    /** The height of the player element, in px. */
    player_height_px?: number;
    /** The width of the player element, in px. */
    player_width_px?: number;
    /** The height of the source video, in px. */
    video_height_px?: number;
    /** The width of the source video, in px. */
    video_width_px?: number;
    /** The height of the window, in px. */
    window_height_px?: number;
    /** The width of the window, in px. */
    window_width_px?: number;
  };

  export type ErrorEvent = {
    /** The event type. */
    type: "error";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The raw event error message. */
    error_message: string;
    /** The category of the error. */
    category:
      | "offline"
      | "access-control"
      | "fallback"
      | "permissions"
      | "unknown";
  };

  export type HtmlEvent = {
    /** The event type. */
    type:
      | "play"
      | "pause"
      | "enter-fullscreen"
      | "exit-fullscreen"
      | "enter-pip"
      | "exit-pip"
      | "can-play"
      | "ended"
      | "first-frame";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
  };

  export type RateChangeEvent = {
    /** The event type. */
    type: "rate";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The playback rate. */
    payload: PlaybackRate;
  };

  export type SeekEvent = {
    /** The event type. */
    type: "seek";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The seek timestamp. */
    payload: number;
  };

  export type VideoQualityEvent = {
    /** The event type. */
    type: "video-quality";
    /** The timestamp of the event, in milliseconds. */
    timestamp: number;
    /** The video playback quality enum. */
    payload: VideoQuality;
  };

  export type PlaybackEvent =
    | HeartbeatEvent
    | ErrorEvent
    | HtmlEvent
    | RateChangeEvent
    | SeekEvent
    | VideoQualityEvent;

  export type SessionData = {
    session_id: string;
    playback_id: string;
    protocol?: MimeType;
    page_url: string;
    source_url: string;
    player: `${"audio" | "hls" | "video" | "webrtc" | "unknown"}-${string}`;
    user_agent?: string;
    uid?: string;
    events: PlaybackEvent[];
    live: boolean;
  };
  ```

### Patch Changes

- Updated dependencies [[`92d67e1`](https://github.com/livepeer/ui-kit/commit/92d67e1d0e89c52ea8bde16b735f2400e8897bde)]:
  - @livepeer/core@3.2.0-next.0

## 3.1.20

### Patch Changes

- [#557](https://github.com/livepeer/ui-kit/pull/557) [`2045585`](https://github.com/livepeer/ui-kit/commit/2045585b2a5ca6cd9972bd297793ad173895d67d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `cacheWebRTCFailureMs` to the player. This allows the player to remember to fall back to HLS if a WebRTC connection times out.

- Updated dependencies [[`2045585`](https://github.com/livepeer/ui-kit/commit/2045585b2a5ca6cd9972bd297793ad173895d67d)]:
  - @livepeer/core@3.1.20

## 3.1.19

### Patch Changes

- [#553](https://github.com/livepeer/ui-kit/pull/553) [`2018b09`](https://github.com/livepeer/ui-kit/commit/2018b0900f6f8eadd069ee0697ba166357ccd77d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixes a bug where the metrics listener would not send logs in some situations after the player fell back to HLS playback.

- Updated dependencies [[`2018b09`](https://github.com/livepeer/ui-kit/commit/2018b0900f6f8eadd069ee0697ba166357ccd77d)]:
  - @livepeer/core@3.1.19

## 3.1.18

### Patch Changes

- [#540](https://github.com/livepeer/ui-kit/pull/540) [`17fed82`](https://github.com/livepeer/ui-kit/commit/17fed8284b61ad94cc7eab34b4310ef2536f237f) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolved issue with WebRTC cleanup interfering with HLS.js playback when peer connection offer takes a long time to resolve.

- [#540](https://github.com/livepeer/ui-kit/pull/540) [`17fed82`](https://github.com/livepeer/ui-kit/commit/17fed8284b61ad94cc7eab34b4310ef2536f237f) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** updated dependencies to latest versions.

- Updated dependencies [[`17fed82`](https://github.com/livepeer/ui-kit/commit/17fed8284b61ad94cc7eab34b4310ef2536f237f), [`17fed82`](https://github.com/livepeer/ui-kit/commit/17fed8284b61ad94cc7eab34b4310ef2536f237f)]:
  - @livepeer/core@3.1.18

## 3.1.17

### Patch Changes

- [#535](https://github.com/livepeer/ui-kit/pull/535) [`8684ce1`](https://github.com/livepeer/ui-kit/commit/8684ce1ad8ba8afeaadaa394e71306f697c13311) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed an issue where `onError` gets called with `null` in the `addMediaMetrics` plugin, when there is no error.

- Updated dependencies [[`8684ce1`](https://github.com/livepeer/ui-kit/commit/8684ce1ad8ba8afeaadaa394e71306f697c13311)]:
  - @livepeer/core@3.1.17

## 3.1.16

### Patch Changes

- [#533](https://github.com/livepeer/ui-kit/pull/533) [`c0aa640`](https://github.com/livepeer/ui-kit/commit/c0aa640ceba06187d964e66c1be174f4bae801ed) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed metrics to report `preloadTime` as the time between connecting `addMediaMetrics` and the first `play` event.

- Updated dependencies [[`c0aa640`](https://github.com/livepeer/ui-kit/commit/c0aa640ceba06187d964e66c1be174f4bae801ed)]:
  - @livepeer/core@3.1.16

## 3.1.15

### Patch Changes

- [#530](https://github.com/livepeer/ui-kit/pull/530) [`adbd11b`](https://github.com/livepeer/ui-kit/commit/adbd11b404888af813c7dcea04a76c9e9a450124) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fix for metrics using `disableProgressListener` where the metrics does not register a `playing` event.

- Updated dependencies [[`adbd11b`](https://github.com/livepeer/ui-kit/commit/adbd11b404888af813c7dcea04a76c9e9a450124)]:
  - @livepeer/core@3.1.15

## 3.1.14

### Patch Changes

- [#526](https://github.com/livepeer/ui-kit/pull/526) [`3f0c10a`](https://github.com/livepeer/ui-kit/commit/3f0c10ab285af7818d196299868432a7e566f590) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added `playing` event listener to `addMediaMetrics`, in addition to the existing `play` event listener.

- Updated dependencies [[`3f0c10a`](https://github.com/livepeer/ui-kit/commit/3f0c10ab285af7818d196299868432a7e566f590)]:
  - @livepeer/core@3.1.14

## 3.1.13

### Patch Changes

- [#521](https://github.com/livepeer/ui-kit/pull/521) [`6082120`](https://github.com/livepeer/ui-kit/commit/6082120c32e2f0417fb6473637840ccda18f1225) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added audio and video constraints to the Broadcast Root component.

- Updated dependencies [[`6082120`](https://github.com/livepeer/ui-kit/commit/6082120c32e2f0417fb6473637840ccda18f1225)]:
  - @livepeer/core@3.1.13

## 3.1.12

### Patch Changes

- [#518](https://github.com/livepeer/ui-kit/pull/518) [`95b9592`](https://github.com/livepeer/ui-kit/commit/95b959276dd5d23b1a26baa2ba881e149492c9f7) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** removed `element.load()` side effect from the `addEventListeners` function.

- Updated dependencies [[`95b9592`](https://github.com/livepeer/ui-kit/commit/95b959276dd5d23b1a26baa2ba881e149492c9f7)]:
  - @livepeer/core@3.1.12

## 3.1.11

### Patch Changes

- [#515](https://github.com/livepeer/ui-kit/pull/515) [`922ff14`](https://github.com/livepeer/ui-kit/commit/922ff141ce496f78843b6fc211847725d2e57d80) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `disableProgressListener` to `addMediaMetrics` so progress events from an HTML5 video element can be ignored when monitoring for playing/paused.

- Updated dependencies [[`922ff14`](https://github.com/livepeer/ui-kit/commit/922ff141ce496f78843b6fc211847725d2e57d80)]:
  - @livepeer/core@3.1.11

## 3.1.10

### Patch Changes

- [#511](https://github.com/livepeer/ui-kit/pull/511) [`5da507e`](https://github.com/livepeer/ui-kit/commit/5da507e9db8ea823fbb49dcc62eb43ac11e9ccee) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed no-op localstorage when the `storage` prop is null.

- Updated dependencies [[`5da507e`](https://github.com/livepeer/ui-kit/commit/5da507e9db8ea823fbb49dcc62eb43ac11e9ccee)]:
  - @livepeer/core@3.1.10

## 3.1.9

### Patch Changes

- [#505](https://github.com/livepeer/ui-kit/pull/505) [`0875372`](https://github.com/livepeer/ui-kit/commit/08753720d424dde1e7f1c335f67838f6ecee8e25) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `backoff` and `backoffMax` to the Player, which defines the time which the Player waits before attempting, as well as the cap for exponential backoff.

  ```tsx
  /**
   * Controls the initial value for exponential backoff, in ms. Defaults to 500ms, which is subsequently multiplied by 2^n power on each error.
   */
  backoff: number;

  /**
   * Controls the maximum backoff when an error is encountered, in ms. Defaults to 30s.
   */
  backoffMax: number;
  ```

- Updated dependencies [[`0875372`](https://github.com/livepeer/ui-kit/commit/08753720d424dde1e7f1c335f67838f6ecee8e25)]:
  - @livepeer/core@3.1.9

## 3.1.8

### Patch Changes

- [#498](https://github.com/livepeer/ui-kit/pull/498) [`511ae87`](https://github.com/livepeer/ui-kit/commit/511ae87168416448b1e7035a3898add0c0a9c544) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed the mouse interactions to not hide when a Radix Popover is open, and not flash when a user hovers over the video element.

- Updated dependencies [[`511ae87`](https://github.com/livepeer/ui-kit/commit/511ae87168416448b1e7035a3898add0c0a9c544)]:
  - @livepeer/core@3.1.8

## 3.1.7

### Patch Changes

- [#496](https://github.com/livepeer/ui-kit/pull/496) [`faf536b`](https://github.com/livepeer/ui-kit/commit/faf536bad1998ade0a2f362066f64517afcab492) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added FLV mime typing to allow for FLV URLs to be passed into `getMediaMetrics`.

- Updated dependencies [[`faf536b`](https://github.com/livepeer/ui-kit/commit/faf536bad1998ade0a2f362066f64517afcab492)]:
  - @livepeer/core@3.1.7

## 3.1.6

### Patch Changes

- [#494](https://github.com/livepeer/ui-kit/pull/494) [`b8220d9`](https://github.com/livepeer/ui-kit/commit/b8220d9b2e3e2d837b732a7d05370e17b45be5be) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** changed `getUserMedia` to override to request video when both audio and video are disabled, so that the Broadcast doesn't get stuck in a pending state.

- [#494](https://github.com/livepeer/ui-kit/pull/494) [`b8220d9`](https://github.com/livepeer/ui-kit/commit/b8220d9b2e3e2d837b732a7d05370e17b45be5be) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed issue with `muted` Video prop and volume getting out of sync.

- Updated dependencies [[`b8220d9`](https://github.com/livepeer/ui-kit/commit/b8220d9b2e3e2d837b732a7d05370e17b45be5be), [`b8220d9`](https://github.com/livepeer/ui-kit/commit/b8220d9b2e3e2d837b732a7d05370e17b45be5be)]:
  - @livepeer/core@3.1.6

## 3.1.5

### Patch Changes

- [#492](https://github.com/livepeer/ui-kit/pull/492) [`11bf3cc`](https://github.com/livepeer/ui-kit/commit/11bf3cc1614ac71eab2950f33179b467cdd65dd6) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added `playbackId` prop to `addMediaMetrics`.

- Updated dependencies [[`11bf3cc`](https://github.com/livepeer/ui-kit/commit/11bf3cc1614ac71eab2950f33179b467cdd65dd6)]:
  - @livepeer/core@3.1.5

## 3.1.4

### Patch Changes

- [`0b7d85b`](https://github.com/livepeer/ui-kit/commit/0b7d85b92e4d5c7dc788346462d31fab288a08bc) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixes for `addMediaMetrics` to report metrics properly when `blob:...` or no `src` is set on custom media players.

- Updated dependencies [[`0b7d85b`](https://github.com/livepeer/ui-kit/commit/0b7d85b92e4d5c7dc788346462d31fab288a08bc)]:
  - @livepeer/core@3.1.4

## 3.1.3

### Patch Changes

- [#489](https://github.com/livepeer/ui-kit/pull/489) [`d012808`](https://github.com/livepeer/ui-kit/commit/d012808035a2dcb7f9bc8aeb08ecc5faf73efee3) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed issue with JWT not being included headers for static assets.

- [#487](https://github.com/livepeer/ui-kit/pull/487) [`8c066f1`](https://github.com/livepeer/ui-kit/commit/8c066f18b9430993053d2ea7fb92ab275e8a608f) Thanks [@0xcadams](https://github.com/0xcadams)! - **Types:** small fix for type usability for `useMediaContext` and `useBroadcastContext`.

- Updated dependencies [[`d012808`](https://github.com/livepeer/ui-kit/commit/d012808035a2dcb7f9bc8aeb08ecc5faf73efee3), [`8c066f1`](https://github.com/livepeer/ui-kit/commit/8c066f18b9430993053d2ea7fb92ab275e8a608f)]:
  - @livepeer/core@3.1.3

## 3.1.2

### Patch Changes

- [#485](https://github.com/livepeer/ui-kit/pull/485) [`8ff0b19`](https://github.com/livepeer/ui-kit/commit/8ff0b1943aad7d804ec1ead8c8b9ea70d5c5eab1) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** usability fixes for muted state.

- Updated dependencies [[`8ff0b19`](https://github.com/livepeer/ui-kit/commit/8ff0b1943aad7d804ec1ead8c8b9ea70d5c5eab1)]:
  - @livepeer/core@3.1.2

## 3.1.1

### Patch Changes

- [#483](https://github.com/livepeer/ui-kit/pull/483) [`5406f98`](https://github.com/livepeer/ui-kit/commit/5406f989e89d6959fdc734d798152d79430dc265) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** usability fixes for muted state.

- Updated dependencies [[`5406f98`](https://github.com/livepeer/ui-kit/commit/5406f989e89d6959fdc734d798152d79430dc265)]:
  - @livepeer/core@3.1.1

## 3.1.0

### Minor Changes

- [#481](https://github.com/livepeer/ui-kit/pull/481) [`44420a5`](https://github.com/livepeer/ui-kit/commit/44420a584920cbd4ebcd2b3d26cce4e7f401f557) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** moved back to `tsup` from `bunchee` for the build system, due to import issues across various projects.

### Patch Changes

- [#481](https://github.com/livepeer/ui-kit/pull/481) [`44420a5`](https://github.com/livepeer/ui-kit/commit/44420a584920cbd4ebcd2b3d26cce4e7f401f557) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed type entrypoints for `node` resolution.

- [#481](https://github.com/livepeer/ui-kit/pull/481) [`44420a5`](https://github.com/livepeer/ui-kit/commit/44420a584920cbd4ebcd2b3d26cce4e7f401f557) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added back `typesVersions` for node module resolution.

- [#481](https://github.com/livepeer/ui-kit/pull/481) [`44420a5`](https://github.com/livepeer/ui-kit/commit/44420a584920cbd4ebcd2b3d26cce4e7f401f557) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** removed `browser` entrypoint for web and react packages for maximum `moduleResolution` compatibility.

- Updated dependencies [[`44420a5`](https://github.com/livepeer/ui-kit/commit/44420a584920cbd4ebcd2b3d26cce4e7f401f557), [`44420a5`](https://github.com/livepeer/ui-kit/commit/44420a584920cbd4ebcd2b3d26cce4e7f401f557), [`44420a5`](https://github.com/livepeer/ui-kit/commit/44420a584920cbd4ebcd2b3d26cce4e7f401f557), [`44420a5`](https://github.com/livepeer/ui-kit/commit/44420a584920cbd4ebcd2b3d26cce4e7f401f557)]:
  - @livepeer/core@3.1.0

## 3.1.0-next.3

### Patch Changes

- [`4f0303c`](https://github.com/livepeer/ui-kit/commit/4f0303c7e0ed2088d34a6ec98b4ea50342dba387) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added back `typesVersions` for node module resolution.

- Updated dependencies [[`4f0303c`](https://github.com/livepeer/ui-kit/commit/4f0303c7e0ed2088d34a6ec98b4ea50342dba387)]:
  - @livepeer/core@3.1.0-next.3

## 3.1.0-next.2

### Patch Changes

- [`bddfbdc`](https://github.com/livepeer/ui-kit/commit/bddfbdc8ee77bae8b6ac45924ccc32288b238a2d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed type entrypoints for `node` resolution.

- Updated dependencies [[`bddfbdc`](https://github.com/livepeer/ui-kit/commit/bddfbdc8ee77bae8b6ac45924ccc32288b238a2d)]:
  - @livepeer/core@3.1.0-next.2

## 3.1.0-next.1

### Patch Changes

- [`b618eb6`](https://github.com/livepeer/ui-kit/commit/b618eb60e90e41703d90d0e993dc10d6cced39e9) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** removed `browser` entrypoint for web and react packages for maximum `moduleResolution` compatibility.

- Updated dependencies [[`b618eb6`](https://github.com/livepeer/ui-kit/commit/b618eb60e90e41703d90d0e993dc10d6cced39e9)]:
  - @livepeer/core@3.1.0-next.1

## 3.1.0-next.0

### Minor Changes

- [#477](https://github.com/livepeer/ui-kit/pull/477) [`1e670ae`](https://github.com/livepeer/ui-kit/commit/1e670ae160afd347fd8234ee24c473d86f7fe8f9) Thanks [@github-actions](https://github.com/apps/github-actions)! - **Fix:** moved back to `tsup` from `bunchee` for the build system, due to import issues across various projects.

### Patch Changes

- Updated dependencies [[`1e670ae`](https://github.com/livepeer/ui-kit/commit/1e670ae160afd347fd8234ee24c473d86f7fe8f9)]:
  - @livepeer/core@3.1.0-next.0

## 3.0.3

### Patch Changes

- [#475](https://github.com/livepeer/ui-kit/pull/475) [`a922f9b`](https://github.com/livepeer/ui-kit/commit/a922f9bd7afe3995fcf59bbc3f6e8fb25ba76f5b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `Broadcast.StatusIndicator` and moved `LiveIndicator` as a Player-only primitive.

  The `LiveIndicator` was not providing an accurate representation of the stream state, and `Broadcast.StatusIndicator` was
  added to represent the third possible state, `pending`, which is when the stream is pending negotiation
  with the WebRTC WHIP endpoint. `LiveIndicator` is now `Player.LiveIndicator` since this only applies to live/not-live
  playback.

- Updated dependencies [[`a922f9b`](https://github.com/livepeer/ui-kit/commit/a922f9bd7afe3995fcf59bbc3f6e8fb25ba76f5b)]:
  - @livepeer/core@3.0.3

## 3.0.2

### Patch Changes

- [#472](https://github.com/livepeer/livepeer-kit/pull/472) [`89aec9c`](https://github.com/livepeer/livepeer-kit/commit/89aec9c5cf0deecf483130dae2036980bd456c97) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added `hlsConfig` to `<Player.Video />`, `autohide` to `<Controls />`, and miscellaneous fixes for player and broadcast.

- Updated dependencies [[`89aec9c`](https://github.com/livepeer/livepeer-kit/commit/89aec9c5cf0deecf483130dae2036980bd456c97)]:
  - @livepeer/core@3.0.2

## 3.0.1

### Patch Changes

- [#470](https://github.com/livepeer/livepeer-react/pull/470) [`81ead35`](https://github.com/livepeer/livepeer-react/commit/81ead3529e3522993cbf2ca6737c601e735ad2ec) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed the interface for broadcasting (and player) to be vendor agnostic. This now uses `getIngest` similar to the `getSrc` for Player, which attempts to parse out a WHIP ingest URL.
  This has been tested against Cloudflare's WHIP/WHEP offering.
- Updated dependencies [[`81ead35`](https://github.com/livepeer/livepeer-react/commit/81ead3529e3522993cbf2ca6737c601e735ad2ec)]:
  - @livepeer/core@3.0.1

## 3.0.0

### Major Changes

- [#459](https://github.com/livepeer/livepeer-react/pull/459) [`8463de1`](https://github.com/livepeer/livepeer-react/commit/8463de1dfb77394e009ce4938cf8ea94cefce250) Thanks [@0xcadams](https://github.com/0xcadams)! - **Major release:** first preview release of the unstyled, composable `<Player />` and `<Broadcast />` primitives based on [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction).

### The motivation

This is a ground-up rewrite of most of the `@livepeer/react` library. In this release, we had some problems we wanted to solve:

1. The `<Player />`/`<Broadcast />` components are not very composable. They essentially break with any type of customization.
2. They encapsulate a lot of application logic (fetching data from the backend, auto-upload, etc) and the Player pushes CORS API keys, which are not a good security practice and cause a lot of developer confusion.
3. The styling is difficult and hard to rework as a developer (and not compatible with Server Components).
4. The react native package is under-maintained and far behind the web player in terms of features/support.

### Our approach

1. Break out the logic of the components to be more composable. Instead of a single `<Player />`, there is now a `<Player.Root />`, `<Player.Container />`, `<Player.Video />`, `<Player.LoadingIndicator />`, `<Player.FullscreenTrigger />`, `<Player.FullscreenIndicator />`, etc. Very similar to Radix, which we use under the hood.
   - This means that instead of one giant component with a lot of logic baked into it, we have a bunch of composable primitives which you can build your apps on top of. We hope you like it!
   - This also brings us much closer to web standards - we don't want to hide the internals from you. You can pass props directly to the video element, like `poster`, and it will "just work" as expected.
   - We still provide a lot of auto-wiring for the components and event listeners - very similar to the previous versions.
2. We removed all API data fetching on the Player (e.g. all of the hooks like `useCreateAsset`), and now provide helpers to use the new [`livepeer`](https://github.com/livepeer/livepeer-js) SDK with the React components.
   - [`getSrc`](https://github.com/livepeer/livepeer-react/blob/f3da0ffd9578932bc9d4e4ce0119cdb90432d84a/packages/core/src/media/external.ts#L18) takes in the response from the playback info endpoint and parses it into something the Player can understand.
   - The only web requests are for pure playback or broadcasting (WHEP/WHIP and metrics reporting) - **there are no more API requests to Livepeer Studio from any components.**
   - This means that you **do not need to configure** a `LivepeerProvider` with an API key. Keep those keys on the backend.
3. The components are now completely unstyled, and the docs will provide examples of how to style them similarly to how they were in the previous releases. You can copy-pasta and then tweak from there.
4. We deprecated the React Native package, for now. It would have been a huge lift to bring it up to feature parity with the React package, and is less straightforward than web to do the WebRTC/HLS fallback and all of the advanced features in the React web package.
   - We want to have first-class support for React Native in the future, but for now, we want to only ship software that we're 100% confident our users will benefit from.

### New features & fixes

- **Composable components** - all components are extremely narrow in their scope, and support the [`asChild` pattern](https://www.radix-ui.com/primitives/docs/guides/composition) popularized by Radix UI. When `asChild` is set to true, we will not render a default DOM element, instead cloning the part's child and passing it the props and behavior required to make it functional.
- **Automatic poster images** - if you pass in the playback info response directly into `getSrc`, it will automatically parse the thumbnail image and pass it into the `poster` for the video.
- **Resume progress on fallback** - now, when an error happens during playback for any reason, we resume playback where it left off.
- **BYOC** - bring your own components. `useMediaContext` is now much easier to use - since the `<Player.Root />` is now just a simple React Context provider, you can build out your own components inside of it which consume the video controller. We have some examples to help avoid the footgunning.

### Callouts

- We are dropping support for `autoUrlUpload` and the fallback to playing directly from IPFS. We understand some users rely on that, and we will work with them to provide docs for how to implement that outside of the player.
- We moved to a new build system which includes `use client` and `use server` directives in the output. If you don't use React Server Components, this doesn't affect you. But this means that you can directly import the client components into a RSC and you don't need to wrap them.

### Patch Changes

- [#459](https://github.com/livepeer/livepeer-react/pull/459) [`8463de1`](https://github.com/livepeer/livepeer-react/commit/8463de1dfb77394e009ce4938cf8ea94cefce250) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed the broadcast experience to handle display media and included a settings popover in the demo Next.js app.

- [#459](https://github.com/livepeer/livepeer-react/pull/459) [`8463de1`](https://github.com/livepeer/livepeer-react/commit/8463de1dfb77394e009ce4938cf8ea94cefce250) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** small fixes for ARIA keyboard shortcuts, resizing CSS variables, permissions errors in broadcasting, and usability fixes.

- [#459](https://github.com/livepeer/livepeer-react/pull/459) [`8463de1`](https://github.com/livepeer/livepeer-react/commit/8463de1dfb77394e009ce4938cf8ea94cefce250) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed syncing of MediaStream with audio/video enabled, UI tweaks, CSS variables for media width/height, and more.

- Updated dependencies [[`8463de1`](https://github.com/livepeer/livepeer-react/commit/8463de1dfb77394e009ce4938cf8ea94cefce250), [`8463de1`](https://github.com/livepeer/livepeer-react/commit/8463de1dfb77394e009ce4938cf8ea94cefce250), [`8463de1`](https://github.com/livepeer/livepeer-react/commit/8463de1dfb77394e009ce4938cf8ea94cefce250), [`8463de1`](https://github.com/livepeer/livepeer-react/commit/8463de1dfb77394e009ce4938cf8ea94cefce250)]:
  - @livepeer/core@3.0.0

## 3.0.0-next.2

### Patch Changes

- [#465](https://github.com/livepeer/livepeer-react/pull/465) [`158f13f`](https://github.com/livepeer/livepeer-react/commit/158f13fd3d883ea71aeb80fdec2185f558de1267) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** small fixes for ARIA keyboard shortcuts, resizing CSS variables, permissions errors in broadcasting, and usability fixes.

- [#463](https://github.com/livepeer/livepeer-react/pull/463) [`cea94f5`](https://github.com/livepeer/livepeer-react/commit/cea94f50bea84c81f0049bd9aeb3c20f2db38631) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed syncing of MediaStream with audio/video enabled, UI tweaks, CSS variables for media width/height, and more.

- Updated dependencies [[`158f13f`](https://github.com/livepeer/livepeer-react/commit/158f13fd3d883ea71aeb80fdec2185f558de1267), [`cea94f5`](https://github.com/livepeer/livepeer-react/commit/cea94f50bea84c81f0049bd9aeb3c20f2db38631)]:
  - @livepeer/core@3.0.0-next.2

## 3.0.0-next.1

### Patch Changes

- [#460](https://github.com/livepeer/livepeer-react/pull/460) [`4847132`](https://github.com/livepeer/livepeer-react/commit/4847132c1ce5acbf3cb8b5a9526f7149ec86063f) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed the broadcast experience to handle display media and included a settings popover in the demo Next.js app.

- Updated dependencies [[`4847132`](https://github.com/livepeer/livepeer-react/commit/4847132c1ce5acbf3cb8b5a9526f7149ec86063f)]:
  - @livepeer/core@3.0.0-next.1

## 3.0.0-next.0

### Major Changes

- [#456](https://github.com/livepeer/livepeer-react/pull/456) [`4669aaf`](https://github.com/livepeer/livepeer-react/commit/4669aaff3c142fbad99c1ae350eda0229f33df72) Thanks [@0xcadams](https://github.com/0xcadams)! - **Major release:** first preview release of the unstyled, composable `<Player />` and `<Broadcast />` primitives based on [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction).

### The motivation

This is a ground-up rewrite of most of the `@livepeer/react` library. In this release, we had some problems we wanted to solve:

1. The `<Player />`/`<Broadcast />` components are not very composable. They essentially break with any type of customization.
2. They encapsulate a lot of application logic (fetching data from the backend, auto-upload, etc) and the Player pushes CORS API keys, which are not a good security practice and cause a lot of developer confusion.
3. The styling is difficult and hard to rework as a developer (and not compatible with Server Components).
4. The react native package is under-maintained and far behind the web player in terms of features/support.

### Our approach

1. Break out the logic of the components to be more composable. Instead of a single `<Player />`, there is now a `<Player.Root />`, `<Player.Container />`, `<Player.Video />`, `<Player.LoadingIndicator />`, `<Player.FullscreenTrigger />`, `<Player.FullscreenIndicator />`, etc. Very similar to Radix, which we use under the hood.
   - This means that instead of one giant component with a lot of logic baked into it, we have a bunch of composable primitives which you can build your apps on top of. We hope you like it!
   - This also brings us much closer to web standards - we don't want to hide the internals from you. You can pass props directly to the video element, like `poster`, and it will "just work" as expected.
   - We still provide a lot of auto-wiring for the components and event listeners - very similar to the previous versions.
2. We removed all API data fetching on the Player (e.g. all of the hooks like `useCreateAsset`), and now provide helpers to use the new [`livepeer`](https://github.com/livepeer/livepeer-js) SDK with the React components.
   - [`getSrc`](https://github.com/livepeer/livepeer-react/blob/f3da0ffd9578932bc9d4e4ce0119cdb90432d84a/packages/core/src/media/external.ts#L18) takes in the response from the playback info endpoint and parses it into something the Player can understand.
   - The only web requests are for pure playback or broadcasting (WHEP/WHIP and metrics reporting) - **there are no more API requests to Livepeer Studio from any components.**
   - This means that you **do not need to configure** a `LivepeerProvider` with an API key. Keep those keys on the backend.
3. The components are now completely unstyled, and the docs will provide examples of how to style them similarly to how they were in the previous releases. You can copy-pasta and then tweak from there.
4. We deprecated the React Native package, for now. It would have been a huge lift to bring it up to feature parity with the React package, and is less straightforward than web to do the WebRTC/HLS fallback and all of the advanced features in the React web package.
   - We want to have first-class support for React Native in the future, but for now, we want to only ship software that we're 100% confident our users will benefit from.

### New features & fixes

- **Composable components** - all components are extremely narrow in their scope, and support the [`asChild` pattern](https://www.radix-ui.com/primitives/docs/guides/composition) popularized by Radix UI. When `asChild` is set to true, we will not render a default DOM element, instead cloning the part's child and passing it the props and behavior required to make it functional.
- **Automatic poster images** - if you pass in the playback info response directly into `getSrc`, it will automatically parse the thumbnail image and pass it into the `poster` for the video.
- **Resume progress on fallback** - now, when an error happens during playback for any reason, we resume playback where it left off.
- **BYOC** - bring your own components. `useMediaContext` is now much easier to use - since the `<Player.Root />` is now just a simple React Context provider, you can build out your own components inside of it which consume the video controller. We have some examples to help avoid the footgunning.

### Callouts

- We are dropping support for `autoUrlUpload` and the fallback to playing directly from IPFS. We understand some users rely on that, and we will work with them to provide docs for how to implement that outside of the player.
- We moved to a new build system which includes `use client` and `use server` directives in the output. If you don't use React Server Components, this doesn't affect you. But this means that you can directly import the client components into a RSC and you don't need to wrap them.

### Patch Changes

- Updated dependencies [[`4669aaf`](https://github.com/livepeer/livepeer-react/commit/4669aaff3c142fbad99c1ae350eda0229f33df72)]:
  - @livepeer/core@3.0.0-next.0

## 2.1.9

### Patch Changes

- [#448](https://github.com/livepeer/livepeer-react/pull/448) [`26204f4`](https://github.com/livepeer/livepeer-react/commit/26204f4706798ce2db37ba11f620a867ca778b4d) Thanks [@suhailkakar](https://github.com/suhailkakar)! - Added .quicktime extension to mime.ts and src.ts to allow .quicktime video playback

- Updated dependencies [[`26204f4`](https://github.com/livepeer/livepeer-react/commit/26204f4706798ce2db37ba11f620a867ca778b4d)]:
  - @livepeer/core@2.1.9

## 2.1.8

### Patch Changes

- [#446](https://github.com/livepeer/livepeer-react/pull/446) [`373e3ac`](https://github.com/livepeer/livepeer-react/commit/373e3acf54d5952ac08085a0a60ea6efa73cf064) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added access control headers to every request for HLS VOD.

- Updated dependencies [[`373e3ac`](https://github.com/livepeer/livepeer-react/commit/373e3acf54d5952ac08085a0a60ea6efa73cf064)]:
  - @livepeer/core@2.1.8

## 2.1.7

### Patch Changes

- [#444](https://github.com/livepeer/livepeer-react/pull/444) [`6057932`](https://github.com/livepeer/livepeer-react/commit/60579322fb387f60e86ebb93fecb289172496e64) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed an issue where all HLS requests with JWT headers will time out.

- Updated dependencies [[`6057932`](https://github.com/livepeer/livepeer-react/commit/60579322fb387f60e86ebb93fecb289172496e64)]:
  - @livepeer/core@2.1.7

## 2.1.6

### Patch Changes

- [#442](https://github.com/livepeer/livepeer-react/pull/442) [`f6ddf09`](https://github.com/livepeer/livepeer-react/commit/f6ddf097290549fb360996aaa5638d7691071a2d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolves issue with VPNs transparently blocking WebRTC playback and failing to start.

  The timeout for playback can be customized with `webrtcConfig.canPlayTimeout`:

  ```tsx
  import { Player, WebRTCVideoConfig } from "@livepeer/react";

  const webrtcConfig: WebRTCVideoConfig = {
    canPlayTimeout: 8000,
  };

  const Page = () => {
    return <Player playbackId={playbackId} webrtcConfig={webrtcConfig} />;
  };
  ```

- Updated dependencies [[`f6ddf09`](https://github.com/livepeer/livepeer-react/commit/f6ddf097290549fb360996aaa5638d7691071a2d)]:
  - @livepeer/core@2.1.6

## 2.1.5

### Patch Changes

- [#439](https://github.com/livepeer/livepeer-react/pull/439) [`d9104a3`](https://github.com/livepeer/livepeer-react/commit/d9104a32c64ab15646c1c777f266b41f653f2b62) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed playback on iOS for JWT-protected HLS playback.

- Updated dependencies [[`d9104a3`](https://github.com/livepeer/livepeer-react/commit/d9104a32c64ab15646c1c777f266b41f653f2b62)]:
  - @livepeer/core@2.1.5

## 2.1.4

### Patch Changes

- [#437](https://github.com/livepeer/livepeer-react/pull/437) [`714f354`](https://github.com/livepeer/livepeer-react/commit/714f3547a4c55d40b8ea0ab9e8f3d2bead0d18f8) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added back `webrtcConfig` to the dependencies for WebRTC negotiation useEffect.

- Updated dependencies [[`714f354`](https://github.com/livepeer/livepeer-react/commit/714f3547a4c55d40b8ea0ab9e8f3d2bead0d18f8)]:
  - @livepeer/core@2.1.4

## 2.1.3

### Patch Changes

- [#434](https://github.com/livepeer/livepeer-react/pull/434) [`ad3009c`](https://github.com/livepeer/livepeer-react/commit/ad3009c71bc713a0fa43f2f04ed8f51fe294f12f) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** removed `?recordings=true` parameter on playback info endpoint and fixed HLS CORS issues with JWT headers.

- [#432](https://github.com/livepeer/livepeer-react/pull/432) [`b3081f3`](https://github.com/livepeer/livepeer-react/commit/b3081f34158544b42ef2135d6c7a177d20636873) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** changed to use `HEAD` instead of `GET` and removed listener for changes to `webrtcConfig` to reduce developer confusion.

- [#435](https://github.com/livepeer/livepeer-react/pull/435) [`b83480c`](https://github.com/livepeer/livepeer-react/commit/b83480c6256e4dfe0311434890ffcfe74a0b7fde) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fix for metrics reporting when switching quickly between streams.

- Updated dependencies [[`ad3009c`](https://github.com/livepeer/livepeer-react/commit/ad3009c71bc713a0fa43f2f04ed8f51fe294f12f), [`b3081f3`](https://github.com/livepeer/livepeer-react/commit/b3081f34158544b42ef2135d6c7a177d20636873), [`b83480c`](https://github.com/livepeer/livepeer-react/commit/b83480c6256e4dfe0311434890ffcfe74a0b7fde)]:
  - @livepeer/core@2.1.3

## 2.1.2

### Patch Changes

- [#430](https://github.com/livepeer/livepeer-react/pull/430) [`82fbbd6`](https://github.com/livepeer/livepeer-react/commit/82fbbd6b488b897ee5d91a21d22534b7a98a57a7) Thanks [@0xcadams](https://github.com/0xcadams)! - **Revert:** revert VPN playback hanging.

- Updated dependencies [[`82fbbd6`](https://github.com/livepeer/livepeer-react/commit/82fbbd6b488b897ee5d91a21d22534b7a98a57a7)]:
  - @livepeer/core@2.1.2

## 2.1.1

### Patch Changes

- [#423](https://github.com/livepeer/livepeer-react/pull/423) [`2743a30`](https://github.com/livepeer/livepeer-react/commit/2743a30b4e07a8b686a0937a10af106b01ff1415) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added header-based access control for webrtc and hls.

- Updated dependencies [[`2743a30`](https://github.com/livepeer/livepeer-react/commit/2743a30b4e07a8b686a0937a10af106b01ff1415)]:
  - @livepeer/core@2.1.1

## 2.1.0

### Minor Changes

- [#426](https://github.com/livepeer/livepeer-react/pull/426) [`ab4da5f`](https://github.com/livepeer/livepeer-react/commit/ab4da5f1203f6dd235389cbe9d2e0b49583c536d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added track selectors to WebRTC so developers can override video and audio tracks.

  ```tsx
  <Player
    webrtcConfig={{
      videoTrackSelector: "~1280x720",
    }}
  />
  ```

  See [here](https://docs.mistserver.org/mistserver/concepts/track_selectors/) for more documentation.

### Patch Changes

- [#424](https://github.com/livepeer/livepeer-react/pull/424) [`c1a871a`](https://github.com/livepeer/livepeer-react/commit/c1a871af1f2a7c616496f889a8359db1748527b7) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added timeout for VPN playback blocking ICE candidates and stalling indefinitely. The default is 5000ms with an override with:

  ```tsx
  <Player
    webrtcConfig={{
      iceCandidateTimeout: 2000,
    }}
  />
  ```

- [#427](https://github.com/livepeer/livepeer-react/pull/427) [`d453ebc`](https://github.com/livepeer/livepeer-react/commit/d453ebce05404ebabe1ba4847f2fb135f7c07740) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed a rare bug where coturn could be located in a different region from playback, resulting in playback failing.

- Updated dependencies [[`c1a871a`](https://github.com/livepeer/livepeer-react/commit/c1a871af1f2a7c616496f889a8359db1748527b7), [`d453ebc`](https://github.com/livepeer/livepeer-react/commit/d453ebce05404ebabe1ba4847f2fb135f7c07740), [`ab4da5f`](https://github.com/livepeer/livepeer-react/commit/ab4da5f1203f6dd235389cbe9d2e0b49583c536d)]:
  - @livepeer/core@2.1.0

## 2.0.9

### Patch Changes

- [#418](https://github.com/livepeer/livepeer-react/pull/418) [`7b6b1d7`](https://github.com/livepeer/livepeer-react/commit/7b6b1d782abf2a2b8bcfa7f74fa11c2d8d31e7e7) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed WebRTC negotiation endpoint to reduce hops to assigned node.

- Updated dependencies [[`7b6b1d7`](https://github.com/livepeer/livepeer-react/commit/7b6b1d782abf2a2b8bcfa7f74fa11c2d8d31e7e7)]:
  - @livepeer/core@2.0.10

## 2.0.8

### Patch Changes

- [#416](https://github.com/livepeer/livepeer-react/pull/416) [`d4f9abe`](https://github.com/livepeer/livepeer-react/commit/d4f9abee791cc7c41c7b78572f10b6ed495e93a1) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added redirect URL caching for faster WebRTC playback switching times.

- Updated dependencies [[`d4f9abe`](https://github.com/livepeer/livepeer-react/commit/d4f9abee791cc7c41c7b78572f10b6ed495e93a1)]:
  - @livepeer/core@2.0.9

## 2.0.7

### Patch Changes

- [#413](https://github.com/livepeer/livepeer-react/pull/413) [`b8ba1f3`](https://github.com/livepeer/livepeer-react/commit/b8ba1f37772b3a35719d581344ff7d0acd44ea91) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed random `Stream is offline` errors occurring on live stream playback, and reporting to websocket metrics.

- Updated dependencies [[`b8ba1f3`](https://github.com/livepeer/livepeer-react/commit/b8ba1f37772b3a35719d581344ff7d0acd44ea91)]:
  - @livepeer/core@2.0.7

## 2.0.6

### Patch Changes

- [#411](https://github.com/livepeer/livepeer-react/pull/411) [`c627b39`](https://github.com/livepeer/livepeer-react/commit/c627b39d4708090ba87eb9fda90f29f4a5478d04) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed properly closing the playback websocket when a new playback ID is passed into the Player.

- Updated dependencies [[`c627b39`](https://github.com/livepeer/livepeer-react/commit/c627b39d4708090ba87eb9fda90f29f4a5478d04)]:
  - @livepeer/core@2.0.6

## 2.0.5

### Patch Changes

- [#408](https://github.com/livepeer/livepeer-react/pull/408) [`f396e37`](https://github.com/livepeer/livepeer-react/commit/f396e37a477ce8ee38853b3a6e5ec78265d2c914) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed parsing of playback IDs from a pinned playback URL.

- Updated dependencies [[`f396e37`](https://github.com/livepeer/livepeer-react/commit/f396e37a477ce8ee38853b3a6e5ec78265d2c914)]:
  - @livepeer/core@2.0.5

## 2.0.4

### Patch Changes

- [#406](https://github.com/livepeer/livepeer-react/pull/406) [`570342f`](https://github.com/livepeer/livepeer-react/commit/570342fc3e4570006c458a161f6edff9ef4de004) Thanks [@victorges](https://github.com/victorges)! - **Fix:** fixed metrics to only send values when they are defined, to avoid filtering on the backend.

- Updated dependencies [[`570342f`](https://github.com/livepeer/livepeer-react/commit/570342fc3e4570006c458a161f6edff9ef4de004)]:
  - @livepeer/core@2.0.4

## 2.0.3

### Patch Changes

- [#403](https://github.com/livepeer/livepeer-react/pull/403) [`2d29716`](https://github.com/livepeer/livepeer-react/commit/2d297160a42dc17893e15342e0344139e385d873) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed a race condition when b-frames are present in a stream, and fallback happens to HLS while SDP negotiation is still pending.

- Updated dependencies [[`2d29716`](https://github.com/livepeer/livepeer-react/commit/2d297160a42dc17893e15342e0344139e385d873)]:
  - @livepeer/core@2.0.3

## 2.0.2

### Patch Changes

- [#401](https://github.com/livepeer/livepeer-react/pull/401) [`06095b6`](https://github.com/livepeer/livepeer-react/commit/06095b61ce6d2171f7aced300d7cf00566fdd597) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolved issues with WebRTC not playing back correctly on Firefox.

- Updated dependencies [[`06095b6`](https://github.com/livepeer/livepeer-react/commit/06095b61ce6d2171f7aced300d7cf00566fdd597)]:
  - @livepeer/core@2.0.2

## 2.0.1

### Patch Changes

- [#398](https://github.com/livepeer/livepeer-react/pull/398) [`8ce5d5c`](https://github.com/livepeer/livepeer-react/commit/8ce5d5ccd6b69f5783783b4abdc00c69c648030e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added loading states to the clipping button in the Player, with better callbacks for users to implement UIs on top of clipping.

- Updated dependencies [[`8ce5d5c`](https://github.com/livepeer/livepeer-react/commit/8ce5d5ccd6b69f5783783b4abdc00c69c648030e)]:
  - @livepeer/core@2.0.1

## 2.0.0

### Major Changes

- [#395](https://github.com/livepeer/livepeer-react/pull/395) [`119c28b`](https://github.com/livepeer/livepeer-react/commit/119c28b64d6f6d0e0948d0477feb7999f6e331d5) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** moved `livepeer` to `@livepeer/core-web`, which will be aligned with our `livepeer` packages that are 1-1 with the backend API.

### Patch Changes

- Updated dependencies [[`119c28b`](https://github.com/livepeer/livepeer-react/commit/119c28b64d6f6d0e0948d0477feb7999f6e331d5)]:
  - @livepeer/core@2.0.0

## 1.9.2

### Patch Changes

- [#394](https://github.com/livepeer/livepeer-react/pull/394) [`5d5048d`](https://github.com/livepeer/livepeer-react/commit/5d5048d4854c55f8f452ce969d2adcaf4c5b5dc3) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** updated clipping to include an optional session ID.

- Updated dependencies [[`5d5048d`](https://github.com/livepeer/livepeer-react/commit/5d5048d4854c55f8f452ce969d2adcaf4c5b5dc3)]:
  - @livepeer/core@1.9.2

## 1.9.1

### Patch Changes

- [#392](https://github.com/livepeer/livepeer-react/pull/392) [`b8e2831`](https://github.com/livepeer/livepeer-react/commit/b8e2831ffde3b7cc87dde7e5030dfcee10adb57c) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added better error handling for HLS.js buffer append errors.

- Updated dependencies [[`b8e2831`](https://github.com/livepeer/livepeer-react/commit/b8e2831ffde3b7cc87dde7e5030dfcee10adb57c)]:
  - @livepeer/core@1.9.1

## 1.9.0

### Minor Changes

- [#390](https://github.com/livepeer/livepeer-react/pull/390) [`961772d`](https://github.com/livepeer/livepeer-react/commit/961772da5eb0dc85da045841aef14b7c6b9386ac) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** removed `playbackUrl` from stream responses. Developers should migrate to using `playbackId` to query stream playback URLs.

### Patch Changes

- Updated dependencies [[`961772d`](https://github.com/livepeer/livepeer-react/commit/961772da5eb0dc85da045841aef14b7c6b9386ac)]:
  - @livepeer/core@1.9.0

## 1.8.8

### Patch Changes

- [#388](https://github.com/livepeer/livepeer-react/pull/388) [`6095d73`](https://github.com/livepeer/livepeer-react/commit/6095d73fbfd469f5148479d757d90e81ed8569db) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `onClipStarted` and ensured overridden `liveSyncDurationCount` in HLS config does not throw errors in HLS.js.

- Updated dependencies [[`6095d73`](https://github.com/livepeer/livepeer-react/commit/6095d73fbfd469f5148479d757d90e81ed8569db)]:
  - @livepeer/core@1.8.8

## 1.8.7

### Patch Changes

- [#386](https://github.com/livepeer/livepeer-react/pull/386) [`1dc5657`](https://github.com/livepeer/livepeer-react/commit/1dc56579028acafcdcb5c45a79fed34855bad1d3) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added constant to WebRTCConfig to allow constant playback speed in the Player, and prevent audio distortion.

- [#383](https://github.com/livepeer/livepeer-react/pull/383) [`9264eee`](https://github.com/livepeer/livepeer-react/commit/9264eee8e6b4b33329f0777db481e77de564bc4c) Thanks [@iameli-streams](https://github.com/iameli-streams)! - **Fix:** added single SDP negotiation when performing WHEP.

- Updated dependencies [[`1dc5657`](https://github.com/livepeer/livepeer-react/commit/1dc56579028acafcdcb5c45a79fed34855bad1d3), [`9264eee`](https://github.com/livepeer/livepeer-react/commit/9264eee8e6b4b33329f0777db481e77de564bc4c)]:
  - @livepeer/core@1.8.7

## 1.8.6

### Patch Changes

- [#379](https://github.com/livepeer/livepeer-react/pull/379) [`b29684d`](https://github.com/livepeer/livepeer-react/commit/b29684dfcf3259af2637a0d98059ba2a774084b4) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added custom components to render in place of the default error components, for when a stream is offline: `streamOfflineErrorComponent`, when an access control error occurs (like an invalid JWT is passed): `accessControlErrorComponent`, and when playback fails another unknown error: `playbackFailedErrorComponent`.

  Also added a callback for when these errors occur: `onPlaybackError`. This can be used like:

  ```tsx
  onPlaybackError={(e) => {
    if (e === null) {
      doSomethingWithErrorResolved();
    } else if (e?.type === 'offline') {
      doSomethingWithOfflineError();
    }
  }}
  ```

- Updated dependencies [[`b29684d`](https://github.com/livepeer/livepeer-react/commit/b29684dfcf3259af2637a0d98059ba2a774084b4)]:
  - @livepeer/core@1.8.6

## 1.8.5

### Patch Changes

- [`17f84fd`](https://github.com/livepeer/livepeer-react/commit/17f84fd5dc9091555e240f45c0c54ae90b9e5a3d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** bumping version due to intermittent release error.

- Updated dependencies [[`17f84fd`](https://github.com/livepeer/livepeer-react/commit/17f84fd5dc9091555e240f45c0c54ae90b9e5a3d)]:
  - @livepeer/core@1.8.5

## 1.8.4

### Patch Changes

- [#376](https://github.com/livepeer/livepeer-react/pull/376) [`3301827`](https://github.com/livepeer/livepeer-react/commit/33018273c81b6a0482ce1cbb9441b7a1f100bf46) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed to have a cleaner fallback for 406 response from WebRTC negotiation.

- Updated dependencies [[`3301827`](https://github.com/livepeer/livepeer-react/commit/33018273c81b6a0482ce1cbb9441b7a1f100bf46)]:
  - @livepeer/core@1.8.4

## 1.8.3

### Patch Changes

- [#374](https://github.com/livepeer/livepeer-react/pull/374) [`5cbf402`](https://github.com/livepeer/livepeer-react/commit/5cbf4021ce3771d52bc69f2667f1431f6238e44d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed the fallback when b-frames exist to not show a playback error until HLS has been attempted.

- Updated dependencies [[`5cbf402`](https://github.com/livepeer/livepeer-react/commit/5cbf4021ce3771d52bc69f2667f1431f6238e44d)]:
  - @livepeer/core@1.8.3

## 1.8.2

### Patch Changes

- [`d809f28`](https://github.com/livepeer/livepeer-react/commit/d809f28ea71dd0317ae57973a4f85c5d65ad5d0a) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added changes to strip a non-standard port number from the WebRTC redirect host, if present.

- Updated dependencies [[`d809f28`](https://github.com/livepeer/livepeer-react/commit/d809f28ea71dd0317ae57973a4f85c5d65ad5d0a)]:
  - @livepeer/core@1.8.2

## 1.8.1

### Patch Changes

- [#370](https://github.com/livepeer/livepeer-react/pull/370) [`269d3a3`](https://github.com/livepeer/livepeer-react/commit/269d3a3f37845ea643e3c4f281de62347529b988) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fix for TTFF reporting, to measure the difference between the `play` event and the first progress update.

- Updated dependencies [[`269d3a3`](https://github.com/livepeer/livepeer-react/commit/269d3a3f37845ea643e3c4f281de62347529b988)]:
  - @livepeer/core@1.8.1

## 1.8.0

### Minor Changes

- [#364](https://github.com/livepeer/livepeer-react/pull/364) [`37c97e7`](https://github.com/livepeer/livepeer-react/commit/37c97e7cfce433e95cb790965acfd069634e66bd) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `lowLatency` option of `force` - this requires WebRTC to be used, if a WebRTC playback source exists (which is only for livestreams). It disables the automatic fallback to HLS.

  Fixed issue when `lowLatency` is `true` where it would immediately fall back to HLS - it should now retry if the stream is offline, and fall back to HLS only when there is an unknown error (this could be a variety of causes - intermittent network issues, browser failure, etc).

  The default `lowLatency` option is now `true` - to opt out of low latency, pass `lowLatency=false` to the Player or the lvpr.tv search params.

### Patch Changes

- Updated dependencies [[`37c97e7`](https://github.com/livepeer/livepeer-react/commit/37c97e7cfce433e95cb790965acfd069634e66bd)]:
  - @livepeer/core@1.8.0

## 1.7.0

### Minor Changes

- [#362](https://github.com/livepeer/livepeer-react/pull/362) [`5c905ce`](https://github.com/livepeer/livepeer-react/commit/5c905cea6d4375a42403fe0eb95b6e522832741b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Chore:** update downstream packages and changed the default icon for microphone mute/unmute in `<Broadcast />`.

  Package updates include:

  - `hls.js` upgraded from "^1.4.0" to "^1.4.9", to include a fix from Livepeer's @Thulinma for missing AUD units
  - `core-js` upgraded from "^3.27.2" to "^3.31.1".
  - `cross-fetch` upgraded from "^3.1.5" to "^4.0.0".
  - `tus-js-client` upgraded from "^3.0.1" to "^3.1.0".
  - `zustand` upgraded from "^4.3.2" to "^4.3.9".
  - `@tanstack/query-async-storage-persister`, `@tanstack/query-core`, `@tanstack/react-query`, `@tanstack/react-query-persist-client` all upgraded from "4.22.4" to "4.29.23".

### Patch Changes

- Updated dependencies [[`5c905ce`](https://github.com/livepeer/livepeer-react/commit/5c905cea6d4375a42403fe0eb95b6e522832741b)]:
  - @livepeer/core@1.7.0

## 1.6.1

### Patch Changes

- [`a89e71c`](https://github.com/livepeer/livepeer-react/commit/a89e71c5ed24a0b9ba967f844f5dcf148d004837) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** small styling fix for the video/audio source dropdowns.

- Updated dependencies [[`a89e71c`](https://github.com/livepeer/livepeer-react/commit/a89e71c5ed24a0b9ba967f844f5dcf148d004837)]:
  - @livepeer/core@1.6.1

## 1.6.0

### Minor Changes

- [#358](https://github.com/livepeer/livepeer-react/pull/358) [`50551ce`](https://github.com/livepeer/livepeer-react/commit/50551cebf04ff64307c95fdce3119ce29dae695b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added basic `<Broadcast />` component to kick off WebRTC broadcasting testing.

- [#358](https://github.com/livepeer/livepeer-react/pull/358) [`50551ce`](https://github.com/livepeer/livepeer-react/commit/50551cebf04ff64307c95fdce3119ce29dae695b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added controls for `<Broadcast />` - `<BroadcastSettings />`, `<AudioToggle />`, and `<VideoToggle />`.

- [#358](https://github.com/livepeer/livepeer-react/pull/358) [`50551ce`](https://github.com/livepeer/livepeer-react/commit/50551cebf04ff64307c95fdce3119ce29dae695b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `<Screenshare />` component for Broadcast, which allows a user to share a screen with their WebRTC broadcast.

### Patch Changes

- [#358](https://github.com/livepeer/livepeer-react/pull/358) [`50551ce`](https://github.com/livepeer/livepeer-react/commit/50551cebf04ff64307c95fdce3119ce29dae695b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `renderChildrenOutsideContainer` to both Broadcast and Player, which determines whether the children should be rendered outside of the aspect ratio container. This is used for custom controls, so children of the Player/Broadcast can use
  `useMediaController` without any parent elements.

  Also added `onPlaybackStatusUpdate`, which is a callback that is called when the broadcast status updates.
  **This should be used with `playbackStatusSelector` to limit state updates.**

- Updated dependencies [[`50551ce`](https://github.com/livepeer/livepeer-react/commit/50551cebf04ff64307c95fdce3119ce29dae695b), [`50551ce`](https://github.com/livepeer/livepeer-react/commit/50551cebf04ff64307c95fdce3119ce29dae695b), [`50551ce`](https://github.com/livepeer/livepeer-react/commit/50551cebf04ff64307c95fdce3119ce29dae695b), [`50551ce`](https://github.com/livepeer/livepeer-react/commit/50551cebf04ff64307c95fdce3119ce29dae695b)]:
  - @livepeer/core@1.6.0

## 1.6.0-next.2

### Minor Changes

- [#356](https://github.com/livepeer/livepeer-react/pull/356) [`ac886fb`](https://github.com/livepeer/livepeer-react/commit/ac886fb0dd3a6aade0da257cf225503d4fb05f00) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `<Screenshare />` component for Broadcast, which allows a user to share a screen with their WebRTC broadcast.

### Patch Changes

- [#356](https://github.com/livepeer/livepeer-react/pull/356) [`ac886fb`](https://github.com/livepeer/livepeer-react/commit/ac886fb0dd3a6aade0da257cf225503d4fb05f00) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `renderChildrenOutsideContainer` to both Broadcast and Player, which determines whether the children should be rendered outside of the aspect ratio container. This is used for custom controls, so children of the Player/Broadcast can use
  `useMediaController` without any parent elements.

  Also added `onPlaybackStatusUpdate`, which is a callback that is called when the broadcast status updates.
  **This should be used with `playbackStatusSelector` to limit state updates.**

- Updated dependencies [[`ac886fb`](https://github.com/livepeer/livepeer-react/commit/ac886fb0dd3a6aade0da257cf225503d4fb05f00), [`ac886fb`](https://github.com/livepeer/livepeer-react/commit/ac886fb0dd3a6aade0da257cf225503d4fb05f00)]:
  - @livepeer/core@1.6.0-next.2

## 1.6.0-next.1

### Minor Changes

- [`60b46ad`](https://github.com/livepeer/livepeer-react/commit/60b46add0f0661ab1b95ccf4887ced8f91cb3541) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added controls for `<Broadcast />` - `<BroadcastSettings />`, `<AudioToggle />`, and `<VideoToggle />`.

### Patch Changes

- Updated dependencies [[`60b46ad`](https://github.com/livepeer/livepeer-react/commit/60b46add0f0661ab1b95ccf4887ced8f91cb3541)]:
  - @livepeer/core@1.6.0-next.1

## 1.6.0-next.0

### Minor Changes

- [#349](https://github.com/livepeer/livepeer-react/pull/349) [`82429d8`](https://github.com/livepeer/livepeer-react/commit/82429d8bd6dbc92d5f7136f445ca408660533d94) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added basic `<Broadcast />` component to kick off WebRTC broadcasting testing.

### Patch Changes

- Updated dependencies [[`82429d8`](https://github.com/livepeer/livepeer-react/commit/82429d8bd6dbc92d5f7136f445ca408660533d94)]:
  - @livepeer/core@1.6.0-next.0

## 1.5.8

### Patch Changes

- [`4811b3e`](https://github.com/livepeer/livepeer-react/commit/4811b3e42aeb4d42858d2e81b4af127175a722e0) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** thanks @martincik - added `assetId` to the asset upload progress.

- [`7dcda99`](https://github.com/livepeer/livepeer-react/commit/7dcda99453cb204b76f93f5b881c89e1af0cc79d) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed bug with `navigator.mediaDevices.getUserMedia` throwing an undefined error in a secure context.

- Updated dependencies [[`4811b3e`](https://github.com/livepeer/livepeer-react/commit/4811b3e42aeb4d42858d2e81b4af127175a722e0), [`7dcda99`](https://github.com/livepeer/livepeer-react/commit/7dcda99453cb204b76f93f5b881c89e1af0cc79d)]:
  - @livepeer/core@1.5.8

## 1.5.7

### Patch Changes

- [`9811490`](https://github.com/livepeer/livepeer-react/commit/981149007660ab63d7d09d2d30e9f12aa32c0dfa) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** hotfix to improve handling of player version.

- Updated dependencies [[`9811490`](https://github.com/livepeer/livepeer-react/commit/981149007660ab63d7d09d2d30e9f12aa32c0dfa)]:
  - @livepeer/core@1.5.7

## 1.5.6

### Patch Changes

- [#345](https://github.com/livepeer/livepeer-react/pull/345) [`af16f6d`](https://github.com/livepeer/livepeer-react/commit/af16f6dda2360f0734a224fce8ef6326a7e2e513) Thanks [@0xcadams](https://github.com/0xcadams)! - **Chore:** added version identifiers to the playback websocket to help narrow issues related to specific Livepeer UI Kit releases.

- Updated dependencies [[`af16f6d`](https://github.com/livepeer/livepeer-react/commit/af16f6dda2360f0734a224fce8ef6326a7e2e513)]:
  - @livepeer/core@1.5.6

## 1.5.5

### Patch Changes

- [#342](https://github.com/livepeer/livepeer-react/pull/342) [`e36b570`](https://github.com/livepeer/livepeer-react/commit/e36b57025246682d1396226fadf665cf12afed86) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed [Safari not emitting `canplay` event](https://github.com/video-dev/hls.js/issues/1686) with autoplay disabled, and replaced this event with `loadedmetadata` to know when the video is ready for playback.

- Updated dependencies [[`e36b570`](https://github.com/livepeer/livepeer-react/commit/e36b57025246682d1396226fadf665cf12afed86)]:
  - @livepeer/core@1.5.5

## 1.5.4

### Patch Changes

- [#340](https://github.com/livepeer/livepeer-react/pull/340) [`99321fb`](https://github.com/livepeer/livepeer-react/commit/99321fb44e130c89fa6e2a0f24082d8a88df9bf7) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed WebRTC playback on Safari and removed redundant `HEAD` request in SDP negotiation.

- Updated dependencies [[`99321fb`](https://github.com/livepeer/livepeer-react/commit/99321fb44e130c89fa6e2a0f24082d8a88df9bf7)]:
  - @livepeer/core@1.5.4

## 1.5.3

### Patch Changes

- [#338](https://github.com/livepeer/livepeer-react/pull/338) [`8efce52`](https://github.com/livepeer/livepeer-react/commit/8efce520a6c5f1c240356360671a434088cab7dd) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `creatorId` to useCreateStream, useUpdateStream, and useUpdateAsset.

- Updated dependencies [[`8efce52`](https://github.com/livepeer/livepeer-react/commit/8efce520a6c5f1c240356360671a434088cab7dd)]:
  - @livepeer/core@1.5.3

## 1.5.2

### Patch Changes

- [#336](https://github.com/livepeer/livepeer-react/pull/336) [`effc06b`](https://github.com/livepeer/livepeer-react/commit/effc06bd2c578ca1a4688108062badd9f6a9c802) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed TTFF bug with the Player reporting an inaccurate TTFF when `priority` was used with a Player which is below the fold. This was happening on the lvpr.tv player, since it is always set to `priority` even though the Player can be below the fold.

- Updated dependencies [[`effc06b`](https://github.com/livepeer/livepeer-react/commit/effc06bd2c578ca1a4688108062badd9f6a9c802)]:
  - @livepeer/core@1.5.2

## 1.5.1

### Patch Changes

- [#334](https://github.com/livepeer/livepeer-react/pull/334) [`8cd5537`](https://github.com/livepeer/livepeer-react/commit/8cd5537fd19e585cb69c9c1f7fb775a76fae9f25) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added a prop, `lowLatency`, to the Player, to allow for opting-in to low latency WebRTC.

- Updated dependencies [[`8cd5537`](https://github.com/livepeer/livepeer-react/commit/8cd5537fd19e585cb69c9c1f7fb775a76fae9f25)]:
  - @livepeer/core@1.5.1

## 1.5.0

### Minor Changes

- [#314](https://github.com/livepeer/livepeer-react/pull/314) [`49c4c99`](https://github.com/livepeer/livepeer-react/commit/49c4c99f9b044afc37072517db8eda1d94b4c377) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** Added WebRTC playback for the web Player, which uses the new endpoint from the Studio provider to play back WebRTC livestreams, if they are available. If these do not succeed in playing back, the Player will automatically fall back to HLS playback. Also, if the stream contains "bframes" (which are common for users streaming with OBS or other streaming providers), the Player will automatically fall back.

### Patch Changes

- [#332](https://github.com/livepeer/livepeer-react/pull/332) [`7924cb5`](https://github.com/livepeer/livepeer-react/commit/7924cb5276697386a131046cffe1552347ce27bb) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** changed default track selector to `first` and loosened video track selector type defs to allow any string.

- [#320](https://github.com/livepeer/livepeer-react/pull/320) [`c49706d`](https://github.com/livepeer/livepeer-react/commit/c49706d816bc9048db29e6eac9fa44135ccd71fd) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed error reporting for metrics websocket with MP4 playback.

- [#329](https://github.com/livepeer/livepeer-react/pull/329) [`be5a1cc`](https://github.com/livepeer/livepeer-react/commit/be5a1cc701065150f35271bff1259dd3dbe06692) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed bugs on iOS - use native playback for HLS (instead of HLS.js) and fixed single touch not seeking on Progress.

- [#324](https://github.com/livepeer/livepeer-react/pull/324) [`4c6e1c7`](https://github.com/livepeer/livepeer-react/commit/4c6e1c781d362e2cf43cf18d200491ee652a1213) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolved continuous restart on playback errors and reworked player to only create a single websocket across playbacks.

- [#330](https://github.com/livepeer/livepeer-react/pull/330) [`24111d4`](https://github.com/livepeer/livepeer-react/commit/24111d4902058dbcec6ef3d2e73e396e7ffe8604) Thanks [@0xcadams](https://github.com/0xcadams)! - **Chore:** enable prioritization of WebRTC playback over HLS.

- [#333](https://github.com/livepeer/livepeer-react/pull/333) [`ad1781c`](https://github.com/livepeer/livepeer-react/commit/ad1781c42eab5a6eb41564bea3f8c3ab287cca1e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** removed the video track selector due to an upstream bug, and added configurable timeout for SDP negotiation.

- [#325](https://github.com/livepeer/livepeer-react/pull/325) [`d2c76a6`](https://github.com/livepeer/livepeer-react/commit/d2c76a68b789df066880e62f2713d8a06fa1ea1c) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added debouncing to the error handler to increment the source index with exponential backoff, to prevent any fast reloads.

- [#327](https://github.com/livepeer/livepeer-react/pull/327) [`bbb2727`](https://github.com/livepeer/livepeer-react/commit/bbb27278ece20acda11c8fb1a78d1f26d9f73f0e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolve tus upload issue with large uploads (>1GB) going over nginx limit.

- [#322](https://github.com/livepeer/livepeer-react/pull/322) [`e15a399`](https://github.com/livepeer/livepeer-react/commit/e15a3993e9a3e9b6d6517f0af01405f1057654ad) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed issue with release not using the latest changes to MP4 restart.

- Updated dependencies [[`7924cb5`](https://github.com/livepeer/livepeer-react/commit/7924cb5276697386a131046cffe1552347ce27bb), [`c49706d`](https://github.com/livepeer/livepeer-react/commit/c49706d816bc9048db29e6eac9fa44135ccd71fd), [`be5a1cc`](https://github.com/livepeer/livepeer-react/commit/be5a1cc701065150f35271bff1259dd3dbe06692), [`4c6e1c7`](https://github.com/livepeer/livepeer-react/commit/4c6e1c781d362e2cf43cf18d200491ee652a1213), [`24111d4`](https://github.com/livepeer/livepeer-react/commit/24111d4902058dbcec6ef3d2e73e396e7ffe8604), [`ad1781c`](https://github.com/livepeer/livepeer-react/commit/ad1781c42eab5a6eb41564bea3f8c3ab287cca1e), [`d2c76a6`](https://github.com/livepeer/livepeer-react/commit/d2c76a68b789df066880e62f2713d8a06fa1ea1c), [`bbb2727`](https://github.com/livepeer/livepeer-react/commit/bbb27278ece20acda11c8fb1a78d1f26d9f73f0e), [`e15a399`](https://github.com/livepeer/livepeer-react/commit/e15a3993e9a3e9b6d6517f0af01405f1057654ad), [`49c4c99`](https://github.com/livepeer/livepeer-react/commit/49c4c99f9b044afc37072517db8eda1d94b4c377)]:
  - @livepeer/core@1.5.0

## 1.5.0-next.4

### Patch Changes

- [#329](https://github.com/livepeer/livepeer-react/pull/329) [`be5a1cc`](https://github.com/livepeer/livepeer-react/commit/be5a1cc701065150f35271bff1259dd3dbe06692) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed bugs on iOS - use native playback for HLS (instead of HLS.js) and fixed single touch not seeking on Progress.

- [#327](https://github.com/livepeer/livepeer-react/pull/327) [`bbb2727`](https://github.com/livepeer/livepeer-react/commit/bbb27278ece20acda11c8fb1a78d1f26d9f73f0e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolve tus upload issue with large uploads (>1GB) going over nginx limit.

- Updated dependencies [[`be5a1cc`](https://github.com/livepeer/livepeer-react/commit/be5a1cc701065150f35271bff1259dd3dbe06692), [`bbb2727`](https://github.com/livepeer/livepeer-react/commit/bbb27278ece20acda11c8fb1a78d1f26d9f73f0e)]:
  - @livepeer/core@1.5.0-next.4

## 1.5.0-next.3

### Patch Changes

- [#325](https://github.com/livepeer/livepeer-react/pull/325) [`d2c76a6`](https://github.com/livepeer/livepeer-react/commit/d2c76a68b789df066880e62f2713d8a06fa1ea1c) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added debouncing to the error handler to increment the source index with exponential backoff, to prevent any fast reloads.

- Updated dependencies [[`d2c76a6`](https://github.com/livepeer/livepeer-react/commit/d2c76a68b789df066880e62f2713d8a06fa1ea1c)]:
  - @livepeer/core@1.5.0-next.3

## 1.5.0-next.2

### Patch Changes

- [#324](https://github.com/livepeer/livepeer-react/pull/324) [`4c6e1c7`](https://github.com/livepeer/livepeer-react/commit/4c6e1c781d362e2cf43cf18d200491ee652a1213) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** resolved continuous restart on playback errors and reworked player to only create a single websocket across playbacks.

- [#322](https://github.com/livepeer/livepeer-react/pull/322) [`e15a399`](https://github.com/livepeer/livepeer-react/commit/e15a3993e9a3e9b6d6517f0af01405f1057654ad) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed issue with release not using the latest changes to MP4 restart.

- Updated dependencies [[`4c6e1c7`](https://github.com/livepeer/livepeer-react/commit/4c6e1c781d362e2cf43cf18d200491ee652a1213), [`e15a399`](https://github.com/livepeer/livepeer-react/commit/e15a3993e9a3e9b6d6517f0af01405f1057654ad)]:
  - @livepeer/core@1.5.0-next.2

## 1.5.0-next.1

### Patch Changes

- [#320](https://github.com/livepeer/livepeer-react/pull/320) [`c49706d`](https://github.com/livepeer/livepeer-react/commit/c49706d816bc9048db29e6eac9fa44135ccd71fd) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed error reporting for metrics websocket with MP4 playback.

- Updated dependencies [[`c49706d`](https://github.com/livepeer/livepeer-react/commit/c49706d816bc9048db29e6eac9fa44135ccd71fd)]:
  - @livepeer/core@1.5.0-next.1

## 1.5.0-next.0

### Minor Changes

- [#314](https://github.com/livepeer/livepeer-react/pull/314) [`49c4c99`](https://github.com/livepeer/livepeer-react/commit/49c4c99f9b044afc37072517db8eda1d94b4c377) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** Added WebRTC playback for the web Player, which uses the new endpoint from the Studio provider to play back WebRTC livestreams, if they are available. If these do not succeed in playing back, the Player will automatically fall back to HLS playback. Also, if the stream contains "bframes" (which are common for users streaming with OBS or other streaming providers), the Player will automatically fall back.

### Patch Changes

- Updated dependencies [[`49c4c99`](https://github.com/livepeer/livepeer-react/commit/49c4c99f9b044afc37072517db8eda1d94b4c377)]:
  - @livepeer/core@1.5.0-next.0

## 1.4.4

### Patch Changes

- [#315](https://github.com/livepeer/livepeer-react/pull/315) [`f7246ca`](https://github.com/livepeer/livepeer-react/commit/f7246ca6e4d62758f46bf6c282c632ac97ffc654) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added creator ID to create asset, so users can provide either a string (which is an unverified address) or an object with a `type`. We currently only support `unverified` types, which means that passing a verified signature to verify the address is not yet possible.

  ```tsx
  type CreateAssetCreatorId =
    | {
        /**
         * The `type` of the identifier - unverified means that the value is not signed, and is an address
         * that is blindly trusted.
         */
        type: "unverified";
        /**
         * Developer-managed ID of the user who created the asset.
         */
        value: string;
      }
    | string;
  ```

- Updated dependencies [[`f7246ca`](https://github.com/livepeer/livepeer-react/commit/f7246ca6e4d62758f46bf6c282c632ac97ffc654)]:
  - @livepeer/core@1.4.4

## 1.4.3

### Patch Changes

- [#310](https://github.com/livepeer/livepeer-react/pull/310) [`f840c70`](https://github.com/livepeer/livepeer-react/commit/f840c70f25a4688d66453db778931db029691866) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed blank source URLs on lvpr.tv.

- [`c8050be`](https://github.com/livepeer/livepeer-react/commit/c8050be34e8056abccaae595df6c6d3153e44fef) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:**: added the ability to pass in a `viewerId` to the Player to pass along to the metrics endpoint, for application builders to be able to query viewership by wallet.

- Updated dependencies [[`f840c70`](https://github.com/livepeer/livepeer-react/commit/f840c70f25a4688d66453db778931db029691866), [`c8050be`](https://github.com/livepeer/livepeer-react/commit/c8050be34e8056abccaae595df6c6d3153e44fef), [`c8050be`](https://github.com/livepeer/livepeer-react/commit/c8050be34e8056abccaae595df6c6d3153e44fef)]:
  - @livepeer/core@1.4.3

## 1.4.2

### Patch Changes

- [#306](https://github.com/livepeer/livepeer-react/pull/306) [`07f4a6e`](https://github.com/livepeer/livepeer-react/commit/07f4a6e3e257834611481325cbe7c7617ec9bf43) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed access control error not resetting when livestream starts.

- Updated dependencies [[`07f4a6e`](https://github.com/livepeer/livepeer-react/commit/07f4a6e3e257834611481325cbe7c7617ec9bf43)]:
  - @livepeer/core@1.4.2

## 1.4.1

### Patch Changes

- [#304](https://github.com/livepeer/livepeer-react/pull/304) [`d2522dd`](https://github.com/livepeer/livepeer-react/commit/d2522dd5d9dffce55c1c9d6f18c4db2b1b7eccda) Thanks [@spreadzp](https://github.com/spreadzp)! - **Feature:** added support for base64 video sources - this allows for a video source like `data:video/webm;base64,GkX...AUL3` to be passed into the `src` prop and the Player will handle it properly.

- Updated dependencies [[`d2522dd`](https://github.com/livepeer/livepeer-react/commit/d2522dd5d9dffce55c1c9d6f18c4db2b1b7eccda)]:
  - @livepeer/core@1.4.1

## 1.4.0

### Minor Changes

- [#299](https://github.com/livepeer/livepeer-react/pull/299) [`ec96b12`](https://github.com/livepeer/livepeer-react/commit/ec96b12243b3688ddff9a55db1a03454d0af0e25) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `accessKey` and `onAccessKeyRequest` props to the Player, to support the `webhook` playback policy which allows users to play back streams/assets with webhook authentication. The access key is appended to the query string in the source URL of the video, and this access key is passed along to a user-defined webhook which validates the payload to make sure the user has access to the content.

### Patch Changes

- [#303](https://github.com/livepeer/livepeer-react/pull/303) [`8f65da8`](https://github.com/livepeer/livepeer-react/commit/8f65da8771771629da6c9fa5a55cce0447966d32) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** updated the metrics to send the `pageUrl` as the `document.referrer` when used in an iFrame context, to be able to attribute metrics to a page which uses an iFrame.

- [#302](https://github.com/livepeer/livepeer-react/pull/302) [`4ebec15`](https://github.com/livepeer/livepeer-react/commit/4ebec150d92f64be31fcb78e9db64c8af6a24f79) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added an `onError` callback to the Player to allow users to catch and handle miscellaneous errors which occur in the Player, which are not already handled.

- Updated dependencies [[`ec96b12`](https://github.com/livepeer/livepeer-react/commit/ec96b12243b3688ddff9a55db1a03454d0af0e25), [`8f65da8`](https://github.com/livepeer/livepeer-react/commit/8f65da8771771629da6c9fa5a55cce0447966d32), [`4ebec15`](https://github.com/livepeer/livepeer-react/commit/4ebec150d92f64be31fcb78e9db64c8af6a24f79)]:
  - @livepeer/core@1.4.0

## 1.3.2

### Patch Changes

- [#298](https://github.com/livepeer/livepeer-react/pull/298) [`b79c11b`](https://github.com/livepeer/livepeer-react/commit/b79c11bb051d85bf47caa98d574eb0b1dff35e0b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added the ability to autoplay videos without forcing mute. This works only in certain conditions where the site is considered "trusted" and the user has interacted with the site - see [Chrome](https://developer.chrome.com/blog/autoplay/) and [Safari](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/) docs for further details on when this is allowed. We recommend testing on your site to ensure that the media will autoplay under the conditions that you expect the user to engage with your content.

- [#295](https://github.com/livepeer/livepeer-react/pull/295) [`3f653f7`](https://github.com/livepeer/livepeer-react/commit/3f653f716ed03b587389cda330541cb30a5f3b4a) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed the user agent string to be sanitized before passing to the metrics websocket.

- [#297](https://github.com/livepeer/livepeer-react/pull/297) [`1d34ea4`](https://github.com/livepeer/livepeer-react/commit/1d34ea483e8b5e2bfb01d009e376055deab4fe24) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added IPFS upload on creation of an asset, so no subsequent calls need to be made to upload to IPFS.

- [#298](https://github.com/livepeer/livepeer-react/pull/298) [`b79c11b`](https://github.com/livepeer/livepeer-react/commit/b79c11bb051d85bf47caa98d574eb0b1dff35e0b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** changed the default Player volume level to 1.0, from 0.2. To continue with the previous behavior, use `defaultVolume` in the [controls](https://docs.livepeer.org/reference/livepeer-js/Player#controls) prop.

- Updated dependencies [[`b79c11b`](https://github.com/livepeer/livepeer-react/commit/b79c11bb051d85bf47caa98d574eb0b1dff35e0b), [`3f653f7`](https://github.com/livepeer/livepeer-react/commit/3f653f716ed03b587389cda330541cb30a5f3b4a), [`1d34ea4`](https://github.com/livepeer/livepeer-react/commit/1d34ea483e8b5e2bfb01d009e376055deab4fe24), [`b79c11b`](https://github.com/livepeer/livepeer-react/commit/b79c11bb051d85bf47caa98d574eb0b1dff35e0b)]:
  - @livepeer/core@1.3.2

## 1.3.1

### Patch Changes

- [#293](https://github.com/livepeer/livepeer-react/pull/293) [`8e28a01`](https://github.com/livepeer/livepeer-react/commit/8e28a016fb77059524b9a21cddf9e06df699a749) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added `sourceUrl` reporting to the Player.

- Updated dependencies [[`8e28a01`](https://github.com/livepeer/livepeer-react/commit/8e28a016fb77059524b9a21cddf9e06df699a749)]:
  - @livepeer/core@1.3.1

## 1.3.0

### Minor Changes

- [#289](https://github.com/livepeer/livepeer-react/pull/289) [`20879a4`](https://github.com/livepeer/livepeer-react/commit/20879a4900e277642674f0dada3b7fc78736ea90) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** changed the Player on React and React Native to hide the progress bar when viewing a livestream. Also improved the live stream experience with better HLS.js defaults for lower latency.

### Patch Changes

- [#291](https://github.com/livepeer/livepeer-react/pull/291) [`2c9bb91`](https://github.com/livepeer/livepeer-react/commit/2c9bb91eb9b09a8d113b47368afc3c89ecc2070e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed the styling of the stream error image on small displays (<400px).

- [#289](https://github.com/livepeer/livepeer-react/pull/289) [`20879a4`](https://github.com/livepeer/livepeer-react/commit/20879a4900e277642674f0dada3b7fc78736ea90) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed an error where HLS errors would not provide detail and the Player would throw an `object undefined` error.

- Updated dependencies [[`2c9bb91`](https://github.com/livepeer/livepeer-react/commit/2c9bb91eb9b09a8d113b47368afc3c89ecc2070e), [`20879a4`](https://github.com/livepeer/livepeer-react/commit/20879a4900e277642674f0dada3b7fc78736ea90), [`20879a4`](https://github.com/livepeer/livepeer-react/commit/20879a4900e277642674f0dada3b7fc78736ea90)]:
  - @livepeer/core@1.3.0

## 1.2.5

### Patch Changes

- [#286](https://github.com/livepeer/livepeer-react/pull/286) [`cd502da`](https://github.com/livepeer/livepeer-react/commit/cd502da49908d70ceab241a84a4a670b1a54f701) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** renamed the `protocol` field to `sourceType` to align with the backend metrics websocket.

- Updated dependencies [[`cd502da`](https://github.com/livepeer/livepeer-react/commit/cd502da49908d70ceab241a84a4a670b1a54f701)]:
  - @livepeer/core@1.2.3

## 1.2.4

### Patch Changes

- [#279](https://github.com/livepeer/livepeer-react/pull/279) [`1db99c7`](https://github.com/livepeer/livepeer-react/commit/1db99c782fd1f367d303668c18acdca1c10cda5b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** tuned the button APIs to be easier to customize for custom controls.

- [#276](https://github.com/livepeer/livepeer-react/pull/276) [`25c1bb6`](https://github.com/livepeer/livepeer-react/commit/25c1bb6d572a237cc73ff7d3528673f1e703fcfa) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fix for re-render bug in the Player, which caused a forced re-render on every refresh of a video.

- [#284](https://github.com/livepeer/livepeer-react/pull/284) [`620751e`](https://github.com/livepeer/livepeer-react/commit/620751efbf1108ce207e5b83f67e28f9e7dd263e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added better logs for failure on `create` in Studio provider.

- Updated dependencies [[`620751e`](https://github.com/livepeer/livepeer-react/commit/620751efbf1108ce207e5b83f67e28f9e7dd263e)]:
  - @livepeer/core@1.2.2

## 1.2.4-next.1

### Patch Changes

- [#279](https://github.com/livepeer/livepeer-react/pull/279) [`1db99c7`](https://github.com/livepeer/livepeer-react/commit/1db99c782fd1f367d303668c18acdca1c10cda5b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** tuned the button APIs to be easier to customize for custom controls.

## 1.2.4-next.0

### Patch Changes

- [#276](https://github.com/livepeer/livepeer-react/pull/276) [`25c1bb6`](https://github.com/livepeer/livepeer-react/commit/25c1bb6d572a237cc73ff7d3528673f1e703fcfa) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fix for re-render bug in the Player, which caused a forced re-render on every refresh of a video.

## 1.2.3

### Patch Changes

- [#274](https://github.com/livepeer/livepeer-react/pull/274) [`aac6a02`](https://github.com/livepeer/livepeer-react/commit/aac6a02653de8361492f4b8c28725b98246159e2) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added further props for the `ViewabilityConfig` for maximum compatibility with existing FlatList implementations.

## 1.2.2

### Patch Changes

- [`99ceff1`](https://github.com/livepeer/livepeer-react/commit/99ceff19bdb22b033ba84944b903c1494dd0eb28) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed sorting of sources to use the width generated from the playback info endpoint.

## 1.2.1

### Patch Changes

- [#270](https://github.com/livepeer/livepeer-react/pull/270) [`68f2e64`](https://github.com/livepeer/livepeer-react/commit/68f2e64241dd6917a638f9d44216531d8b3437e7) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed `usePlayerList` to use a React ref to avoid dynamic runtime `onViewableItemsChanged` errors.

- [#270](https://github.com/livepeer/livepeer-react/pull/270) [`68f2e64`](https://github.com/livepeer/livepeer-react/commit/68f2e64241dd6917a638f9d44216531d8b3437e7) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed uploads in React Native environments by removing chunk size for tus.

- [#272](https://github.com/livepeer/livepeer-react/pull/272) [`b11ea90`](https://github.com/livepeer/livepeer-react/commit/b11ea90bb3e488bd6d6661846313849adf389cdf) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `allowCrossOriginCredentials` to the React Player to allow cookies to be sent with playback requests.

- [#270](https://github.com/livepeer/livepeer-react/pull/270) [`68f2e64`](https://github.com/livepeer/livepeer-react/commit/68f2e64241dd6917a638f9d44216531d8b3437e7) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed `getIsVolumeChangeSupported` check to not fail for negative volume values.

- Updated dependencies [[`68f2e64`](https://github.com/livepeer/livepeer-react/commit/68f2e64241dd6917a638f9d44216531d8b3437e7), [`68f2e64`](https://github.com/livepeer/livepeer-react/commit/68f2e64241dd6917a638f9d44216531d8b3437e7), [`b11ea90`](https://github.com/livepeer/livepeer-react/commit/b11ea90bb3e488bd6d6661846313849adf389cdf), [`68f2e64`](https://github.com/livepeer/livepeer-react/commit/68f2e64241dd6917a638f9d44216531d8b3437e7)]:
  - @livepeer/core@1.2.1

## 1.2.0

### Minor Changes

- [#267](https://github.com/livepeer/livepeer-react/pull/267) [`85e4c05`](https://github.com/livepeer/livepeer-react/commit/85e4c0563802d737bda5d2b76cd36e069da1c61c) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added MP4 rendition prioritization to the React and React Native Player.

  This is for support of MP4 renditions returned from `playbackInfo` from the Studio provider. If an MP4 rendition exists for an Asset, it will be prioritized over HLS, since this has been introduced as a performance improvement over HLS for short-form video.

The MP4 renditions will be chosen with the following algorithm: the device screen width and multiplied by a static multiplier (currently set to x2.5). This value is then compared to the rendition widths, and the renditions are prioritized based on the distance between these values. This results in a choice of a rendition which is close to the screen size without visual quality issues. For instance, a device with a 1280 pixel width would compute `1280px * 2.5 = 3200px`, and then sort the MP4 renditions by which are closest to this value.

### Patch Changes

- [#267](https://github.com/livepeer/livepeer-react/pull/267) [`85e4c05`](https://github.com/livepeer/livepeer-react/commit/85e4c0563802d737bda5d2b76cd36e069da1c61c) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** added `pageUrl`, `protocol`, `preloadTime`, and `autoplay` to metrics to track performance of video load under specific conditions.

- Updated dependencies [[`85e4c05`](https://github.com/livepeer/livepeer-react/commit/85e4c0563802d737bda5d2b76cd36e069da1c61c), [`85e4c05`](https://github.com/livepeer/livepeer-react/commit/85e4c0563802d737bda5d2b76cd36e069da1c61c)]:
  - @livepeer/core@1.2.0

## 1.1.5

### Patch Changes

- [#265](https://github.com/livepeer/livepeer-react/pull/265) [`318c082`](https://github.com/livepeer/livepeer-react/commit/318c0824a62cffa69c92ba4eb6c45afbb9920958) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** change the metrics reporting port for staging to use 443.

- Updated dependencies [[`318c082`](https://github.com/livepeer/livepeer-react/commit/318c0824a62cffa69c92ba4eb6c45afbb9920958)]:
  - @livepeer/core@1.1.5

## 1.1.4

### Patch Changes

- [#259](https://github.com/livepeer/livepeer-react/pull/259) [`9568500`](https://github.com/livepeer/livepeer-react/commit/95685009dcb4a2d86b2def2325ade9ddd6d13d1b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added Time to First Frame, Autoplay, and User Agent to metrics reporting. Fixed bugs with play time metrics reporting.

- Updated dependencies [[`9568500`](https://github.com/livepeer/livepeer-react/commit/95685009dcb4a2d86b2def2325ade9ddd6d13d1b)]:
  - @livepeer/core@1.1.4

## 1.1.3

### Patch Changes

- [#255](https://github.com/livepeer/livepeer-react/pull/255) [`0e5cbc9`](https://github.com/livepeer/livepeer-react/commit/0e5cbc98116332260178de3aa188db53b9f5f22c) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed Node.js issue with `File` not being defined globally.

- Updated dependencies [[`0e5cbc9`](https://github.com/livepeer/livepeer-react/commit/0e5cbc98116332260178de3aa188db53b9f5f22c)]:
  - @livepeer/core@1.1.3

## 1.1.2

### Patch Changes

- [`a8a2c58`](https://github.com/livepeer/livepeer-react/commit/a8a2c582da2eb49ef33fca27587129ce1c1bfaa6) Thanks [@0xcadams](https://github.com/0xcadams)! - **Chore:** downgraded packages due to versioning conflicts and upgraded `zustand`.

- Updated dependencies [[`a8a2c58`](https://github.com/livepeer/livepeer-react/commit/a8a2c582da2eb49ef33fca27587129ce1c1bfaa6)]:
  - @livepeer/core@1.1.2

## 1.1.1

### Patch Changes

- [#248](https://github.com/livepeer/livepeer-react/pull/248) [`5a1c060`](https://github.com/livepeer/livepeer-react/commit/5a1c0606fc3ab1703a74ca02b18acfa93937d684) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed version headers to reference the correct package names.

- [#243](https://github.com/livepeer/livepeer-react/pull/243) [`89de148`](https://github.com/livepeer/livepeer-react/commit/89de148ea4e9037c0375142db89b9ffea46e96d2) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** moved to using HLS.js on Safari (when supported) instead of the native video player.

- [#251](https://github.com/livepeer/livepeer-react/pull/251) [`686fb51`](https://github.com/livepeer/livepeer-react/commit/686fb5178a5746210cc16f1efb77f2c1273f4527) Thanks [@0xcadams](https://github.com/0xcadams)! - **Chore:** updated dependencies to latest versions.

- Updated dependencies [[`5a1c060`](https://github.com/livepeer/livepeer-react/commit/5a1c0606fc3ab1703a74ca02b18acfa93937d684), [`686fb51`](https://github.com/livepeer/livepeer-react/commit/686fb5178a5746210cc16f1efb77f2c1273f4527)]:
  - @livepeer/core@1.1.1

## 1.1.1-next.0

### Patch Changes

- [#243](https://github.com/livepeer/livepeer-react/pull/243) [`89de148`](https://github.com/livepeer/livepeer-react/commit/89de148ea4e9037c0375142db89b9ffea46e96d2) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** moved to using HLS.js on Safari (when supported) instead of the native video player.

## 1.1.0

### Minor Changes

- [#240](https://github.com/livepeer/livepeer-react/pull/240) [`c4cb597`](https://github.com/livepeer/livepeer-react/commit/c4cb59762a31c865bb8ada9a4176caa614f6be7a) Thanks [@clacladev](https://github.com/clacladev)! - **Fix:** added clearer Player error handling instead of an infinite loading spinner. The Player now shows error states for gated streams which do not have a proper JWT and streams which are currently offline.

### Patch Changes

- Updated dependencies [[`c4cb597`](https://github.com/livepeer/livepeer-react/commit/c4cb59762a31c865bb8ada9a4176caa614f6be7a)]:
  - @livepeer/core@1.1.0

## 1.0.0

### Major Changes

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** removed the default API key in the SDK for Studio with sunset plan of Jan 6th, 2023, to discourage spam use.

### Minor Changes

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Refactor:** moved the web logic out of `livepeer` into `@livepeer/core` to prevent polyfills from conflicting with React Native.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** removed the peer dependency on `ethers` and `typechain` in favor of exporting const ABIs which can be used with tools like [abitype](https://github.com/wagmi-dev/abitype).

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Refactor:** added `@livepeer/core-react` package which includes all cross-environment hooks, utilities, and types. These are exported as `usePlayer`, `useControlsContainer`, etc.

### Patch Changes

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Chore:** updated `@livepeer/core-react` package.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** publish `@livepeer/core-react` package.

- [`85dc1f7`](https://github.com/livepeer/livepeer-react/commit/85dc1f7faa35ad36c7209b17a081b62ceefba798) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed `priority` boolean to not reset when video is not shown on screen.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed dStorage fallback to only use IPFS when `playbackId` does not exist.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** changed the default `objectFit` for the Player to be `contain` instead of `cover`.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed IPFS auto-playback with `src`.

- [#218](https://github.com/livepeer/livepeer-react/pull/218) [`07ef48e`](https://github.com/livepeer/livepeer-react/commit/07ef48ea3703bfc9fe715f8583bd91585d63e807) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed regression with slider thumb not showing in correct position, add React Native video customization props, and fixed Player getting stuck in "play" after exit of fullscreen.

- [#218](https://github.com/livepeer/livepeer-react/pull/218) [`07ef48e`](https://github.com/livepeer/livepeer-react/commit/07ef48ea3703bfc9fe715f8583bd91585d63e807) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `priority` boolean to Player to enable lazy loading for content.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `loading` color override to ThemeConfig.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added further theming overrides to progress and volume sliders.

- [#213](https://github.com/livepeer/livepeer-react/pull/213) [`7f5202d`](https://github.com/livepeer/livepeer-react/commit/7f5202dec42b14dd77546823c8e3c9dd7fe3983b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed player to display hours correctly and added version headers to API requests for debugging errors.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature**: added native file URI uploading for React Native, default volume config for the Player, and fixed the slider thumb to not extend past the left boundary.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `showUploadingIndicator` for displaying the uploading text when `autoUrlUpload` is enabled, and renamed`shouldShowLoadingSpinner`to`showLoadingSpinner`.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed regression with IPFS auto-playback and mime type checking in browser.

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed core-react to use callback refs to ensure that the consuming code gets the updated ref on mount.

- [#223](https://github.com/livepeer/livepeer-react/pull/223) [`451d304`](https://github.com/livepeer/livepeer-react/commit/451d3045b17938ebe3037d371cf949904285f48b) Thanks [@Ahmed-Aghadi](https://github.com/Ahmed-Aghadi)! - **Fix:** added missing `usePlaybackInfo` export to React/React Native.

- Updated dependencies [[`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52), [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52), [`07ef48e`](https://github.com/livepeer/livepeer-react/commit/07ef48ea3703bfc9fe715f8583bd91585d63e807), [`07ef48e`](https://github.com/livepeer/livepeer-react/commit/07ef48ea3703bfc9fe715f8583bd91585d63e807), [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52), [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52), [`7f5202d`](https://github.com/livepeer/livepeer-react/commit/7f5202dec42b14dd77546823c8e3c9dd7fe3983b), [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52)]:
  - @livepeer/core@1.0.0

## 1.0.0-next.17

### Minor Changes

- [#212](https://github.com/livepeer/livepeer-react/pull/212) [`da28e70`](https://github.com/livepeer/livepeer-react/commit/da28e7037a50e4a3ac3711581cc762f516e5f31a) Thanks [@clacladev](https://github.com/clacladev)! - **Fix:** added clearer Player error handling instead of an infinite loading spinner. The Player now shows error states for gated streams which do not have a proper JWT and streams which are currently offline.

### Patch Changes

- [#223](https://github.com/livepeer/livepeer-react/pull/223) [`451d304`](https://github.com/livepeer/livepeer-react/commit/451d3045b17938ebe3037d371cf949904285f48b) Thanks [@Ahmed-Aghadi](https://github.com/Ahmed-Aghadi)! - **Fix:** added missing `usePlaybackInfo` export to React/React Native.

- Updated dependencies [[`da28e70`](https://github.com/livepeer/livepeer-react/commit/da28e7037a50e4a3ac3711581cc762f516e5f31a)]:
  - @livepeer/core@1.0.0-next.6

## 1.0.0-next.16

### Patch Changes

- [`85dc1f7`](https://github.com/livepeer/livepeer-react/commit/85dc1f7faa35ad36c7209b17a081b62ceefba798) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed `priority` boolean to not reset when video is not shown on screen.

## 1.0.0-next.15

### Patch Changes

- [#218](https://github.com/livepeer/livepeer-react/pull/218) [`07ef48e`](https://github.com/livepeer/livepeer-react/commit/07ef48ea3703bfc9fe715f8583bd91585d63e807) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed regression with slider thumb not showing in correct position, add React Native video customization props, and fixed Player getting stuck in "play" after exit of fullscreen.

- [#218](https://github.com/livepeer/livepeer-react/pull/218) [`07ef48e`](https://github.com/livepeer/livepeer-react/commit/07ef48ea3703bfc9fe715f8583bd91585d63e807) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `priority` boolean to Player to enable lazy loading for content.

- Updated dependencies [[`07ef48e`](https://github.com/livepeer/livepeer-react/commit/07ef48ea3703bfc9fe715f8583bd91585d63e807), [`07ef48e`](https://github.com/livepeer/livepeer-react/commit/07ef48ea3703bfc9fe715f8583bd91585d63e807)]:
  - @livepeer/core@1.0.0-next.5

## 1.0.0-next.14

### Patch Changes

- [#213](https://github.com/livepeer/livepeer-react/pull/213) [`7f5202d`](https://github.com/livepeer/livepeer-react/commit/7f5202dec42b14dd77546823c8e3c9dd7fe3983b) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed player to display hours correctly and added version headers to API requests for debugging errors.

- Updated dependencies [[`7f5202d`](https://github.com/livepeer/livepeer-react/commit/7f5202dec42b14dd77546823c8e3c9dd7fe3983b)]:
  - @livepeer/core@1.0.0-next.4

## 1.0.0-next.13

### Patch Changes

- [#204](https://github.com/livepeer/livepeer-react/pull/204) [`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature**: added native file URI uploading for React Native, default volume config for the Player, and fixed the slider thumb to not extend past the left boundary.

- Updated dependencies [[`9ce1fa4`](https://github.com/livepeer/livepeer-react/commit/9ce1fa460985d4301c06df88698e7e3e746c4d52)]:
  - @livepeer/core@1.0.0-next.3

## 1.0.0-next.12

### Patch Changes

- [#197](https://github.com/livepeer/livepeer-react/pull/197) [`748ddfa`](https://github.com/livepeer/livepeer-react/commit/748ddfa8ffc458c0a91e536a74a1933e57909745) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** changed the default `objectFit` for the Player to be `contain` instead of `cover`.

## 1.0.0-next.11

### Patch Changes

- [#195](https://github.com/livepeer/livepeer-react/pull/195) [`e866579`](https://github.com/livepeer/livepeer-react/commit/e86657964e2dd9d141d7d06023207ae88d5c4169) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `loading` color override to ThemeConfig.

- Updated dependencies [[`e866579`](https://github.com/livepeer/livepeer-react/commit/e86657964e2dd9d141d7d06023207ae88d5c4169)]:
  - @livepeer/core@1.0.0-next.2

## 1.0.0-next.10

### Patch Changes

- [#193](https://github.com/livepeer/livepeer-react/pull/193) [`fa5d2c6`](https://github.com/livepeer/livepeer-react/commit/fa5d2c62bd1a45ae8a12052973e9ae097ce6b0f2) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added `showUploadingIndicator` for displaying the uploading text when `autoUrlUpload` is enabled, and renamed`shouldShowLoadingSpinner`to`showLoadingSpinner`.

## 1.0.0-next.9

### Patch Changes

- [`d4b4264`](https://github.com/livepeer/livepeer-react/commit/d4b42644fdbf8d4d50e74798bdc0df6e2ceee9b4) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed IPFS auto-playback with `src`.

## 1.0.0-next.8

### Patch Changes

- [`3cada35`](https://github.com/livepeer/livepeer-react/commit/3cada350006426a006c6722f28623e25a1fda2b4) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed dStorage fallback to only use IPFS when `playbackId` does not exist.

## 1.0.0-next.7

### Patch Changes

- [#189](https://github.com/livepeer/livepeer-react/pull/189) [`0f6bb63`](https://github.com/livepeer/livepeer-react/commit/0f6bb636f96ded681f9d02947f4ff022bab2a7cd) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed regression with IPFS auto-playback and mime type checking in browser.

## 1.0.0-next.6

### Patch Changes

- [#187](https://github.com/livepeer/livepeer-react/pull/187) [`44adf29`](https://github.com/livepeer/livepeer-react/commit/44adf2940ae3621038d87f1444b18398a57d399e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Feature:** added further theming overrides to progress and volume sliders.

- Updated dependencies [[`44adf29`](https://github.com/livepeer/livepeer-react/commit/44adf2940ae3621038d87f1444b18398a57d399e)]:
  - @livepeer/core@1.0.0-next.1

## 1.0.0-next.5

### Minor Changes

- [#182](https://github.com/livepeer/livepeer-react/pull/182) [`16b1307`](https://github.com/livepeer/livepeer-react/commit/16b1307471bccaf645e623631ca6695ac0218912) Thanks [@0xcadams](https://github.com/0xcadams)! - **Refactor:** moved the web logic out of `livepeer` into `@livepeer/core` to prevent polyfills from conflicting with React Native.

- [#182](https://github.com/livepeer/livepeer-react/pull/182) [`16b1307`](https://github.com/livepeer/livepeer-react/commit/16b1307471bccaf645e623631ca6695ac0218912) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** removed the peer dependency on `ethers` and `typechain` in favor of exporting const ABIs which can be used with tools like [abitype](https://github.com/wagmi-dev/abitype).

### Patch Changes

- Updated dependencies [[`16b1307`](https://github.com/livepeer/livepeer-react/commit/16b1307471bccaf645e623631ca6695ac0218912), [`16b1307`](https://github.com/livepeer/livepeer-react/commit/16b1307471bccaf645e623631ca6695ac0218912)]:
  - @livepeer/core@1.0.0-next.0

## 1.0.0-next.4

### Patch Changes

- [`e656367`](https://github.com/livepeer/livepeer-react/commit/e6563674369549a5335a511009165698748bc67e) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** fixed core-react to use callback refs to ensure that the consuming code gets the updated ref on mount.

## 1.0.0-next.3

### Patch Changes

- [#179](https://github.com/livepeer/livepeer-react/pull/179) [`a04136e`](https://github.com/livepeer/livepeer-react/commit/a04136efd4d315e6122b6a307c21ee400564cbbb) Thanks [@github-actions](https://github.com/apps/github-actions)! - **Chore:** updated `@livepeer/core-react` package.

## 1.0.0-next.2

### Patch Changes

- [`9feaf08`](https://github.com/livepeer/livepeer-react/commit/9feaf08f3c087d9fea9bfc5b10139c3dfdcebe54) Thanks [@0xcadams](https://github.com/0xcadams)! - **Fix:** publish `@livepeer/core-react` package.

## 1.0.0-next.1

### Major Changes

- [#172](https://github.com/livepeer/livepeer-react/pull/172) [`f2b5ed2`](https://github.com/livepeer/livepeer-react/commit/f2b5ed28bdbaf327609a845745637da0e010696c) Thanks [@0xcadams](https://github.com/0xcadams)! - **Breaking:** removed the default API key in the SDK for Studio with sunset plan of Jan 6th, 2023, to discourage spam use.

### Patch Changes

- Updated dependencies [[`f2b5ed2`](https://github.com/livepeer/livepeer-react/commit/f2b5ed28bdbaf327609a845745637da0e010696c)]:
  - livepeer@2.0.0-next.1

## 0.1.0-next.0

### Minor Changes

- [`cc4f4e8`](https://github.com/livepeer/livepeer-react/commit/cc4f4e87d48cbefaabcfa6dd867544a43584657f) Thanks [@0xcadams](https://github.com/0xcadams)! - **Refactor:** added `@livepeer/core-react` package which includes all cross-environment hooks, utilities, and types. These are exported as `usePlayer`, `useControlsContainer`, etc.

### Patch Changes

- Updated dependencies [[`cc4f4e8`](https://github.com/livepeer/livepeer-react/commit/cc4f4e87d48cbefaabcfa6dd867544a43584657f), [`cc4f4e8`](https://github.com/livepeer/livepeer-react/commit/cc4f4e87d48cbefaabcfa6dd867544a43584657f)]:
  - livepeer@1.5.0-next.0
