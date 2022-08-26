import { ReadStream } from 'fs';

export type LivepeerProviderConfig = {
  /** Provider name */
  name: string;
  /** Base URL for the provider */
  baseUrl: string;
};

export interface LivepeerProvider {
  /** The config for this provider */
  getConfig(): LivepeerProviderConfig;

  /** Create a new stream */
  createStream(args: CreateStreamArgs): Promise<Stream>;
  /** Modify a stream */
  updateStream(args: UpdateStreamArgs): Promise<Stream>;
  /** Get a stream by ID */
  getStream(args: GetStreamArgs): Promise<Stream>;
  /** Get a stream session by ID */
  getStreamSession(args: GetStreamSessionArgs): Promise<StreamSession>;
  /** List sessions for a specific parent stream ID */
  getStreamSessions(args: GetStreamSessionsArgs): Promise<StreamSession[]>;

  /** Create a new asset */
  createAsset(args: CreateAssetArgs): Promise<Asset>;
  /** Get an asset by ID */
  getAsset(args: GetAssetArgs): Promise<Asset>;
  /** Modify an asset */
  updateAsset(args: UpdateAssetArgs): Promise<Asset>;
}

export type StreamIdOrString =
  | string
  | {
      /** The unique identifier for the stream */
      streamId: string;
    };

export type StreamSessionIdOrString =
  | string
  | {
      /** The unique identifier for the session */
      streamSessionId: string;
    };

export type CreateStreamArgs = {
  /** Name for the new stream */
  name: string;
  /** Transcoding profiles to use for the stream for ABR playback */
  profiles?: TranscodingProfile[];
  /** Whether to create recordings of the livestream sessions */
  record: boolean;
};

export type UpdateStreamArgs = {
  /** The unique identifier for the stream */
  streamId: string;
  /** Whether to immediately block ingest and playback of the stream */
  suspend?: boolean;
  /** Whether to create recordings of the livestream sessions */
  record?: boolean;
} & (
  | {
      suspend: boolean;
    }
  | {
      record: boolean;
    }
);

export type GetStreamArgs = StreamIdOrString;
export type GetStreamSessionsArgs = StreamIdOrString;
export type GetStreamSessionArgs = StreamSessionIdOrString;

export type AssetIdOrString =
  | string
  | {
      /** The unique identifier for the asset */
      assetId: string;
    };

export type CreateAssetArgs = {
  /** Name for the new asset */
  name: string;
  /** Content to be uploaded */
  file: File | ReadStream;
};

export type UpdateAssetArgs = {
  /** The unique identifier for the asset */
  assetId: string;
  /** The name of the asset */
  name?: string;
  /** What additional storages to replicate the asset to */
  storage?: {
    ipfs?: boolean;
  };
  /** Metadata associated with the asset */
  meta?: Record<string, string>;
} & (
  | {
      name: string;
    }
  | {
      storage?: { ipfs?: boolean };
    }
  | {
      meta: Record<string, string>;
    }
);

export type GetAssetArgs = AssetIdOrString;

export type Stream = {
  /** The unique identifier for the stream */
  id: string;
  /** The name of the stream */
  name: string;
  /** The transcoding profiles to use for the stream for ABR playback */
  profiles: TranscodingProfile[];
  /** Should this stream be recorded? */
  record?: boolean;

  // Stream information

  /** Secret used to create the RTMP and SRT ingest URLs */
  streamKey: string;
  /** URL for RTMP ingest */
  rtmpIngestUrl: string;
  /** ID used to create the playback URLs */
  playbackId: string;
  /** URL for HLS playback */
  playbackUrl: string;
  /** ID of the parent stream object. Only present for sessions. */
  parentId?: string;
  /** Unix timestamp (in milliseconds) at which the stream object was created */
  createdAt: number;

  // Stream current state

  /** Last time this stream was streamed to. Unix milliseconds timestamp. */
  lastSeen?: number;
  /** If the stream is currently active */
  isActive?: boolean;
  /** Rate at which sourceBytes is increasing in bytes per second */
  ingestRate?: number;
  /** Rate at which transcodedBytes is increasing in bytes second */
  outgoingRate?: number;

  // Stream metrics

  /** Number of source segments ever streamed */
  sourceSegments?: number;
  /** Duration of all the source segments in seconds */
  sourceSegmentsDuration?: number;
  /** Total amount of source bytes streamed */
  sourceBytes?: number;
  /** Number of transcoded segments ever created for this stream */
  transcodedSegments?: number;
  /** Duration of all the transcoded segments, sec */
  transcodedSegmentsDuration?: number;
  /** Total amount of transcoded bytes created */
  transcodedBytes?: number;
};

export type TranscodingProfile = {
  /** The name of the profile */
  name: string;
  /** Output width in pixels */
  width: number;
  /** Output height in pixels */
  height: number;
  /** Output bitrate in pixels in bits per second (bps) */
  bitrate: number;
  /** Output FPS of the video. Set to 0 to keep input FPS */
  fps: number;
  /** Denominator to divide the FPS by. Used for specifying exact FPS ratios */
  fpsDen?: number;
};

type StreamBase = Omit<
  Stream,
  'playbackId' | 'playbackUrl' | 'streamKey' | 'rtmpIngestUrl'
>;

export type StreamSession = StreamBase & {
  /** Status of the recording process of this stream session */
  recordingStatus?: 'waiting' | 'ready';
  /** URL for accessing the recording of this stream session */
  recordingUrl?: string;
  /** URL for the stream session recording packaged in an mp4 */
  mp4Url?: string;
};

export type Asset = {
  /** The unique identifier for the asset */
  id: string;
  /**
   * Name of the asset. This is not necessarily the filename, can be a custom
   * name or title
   */
  name: string;
  /** User-managed metadata associated with the asset */
  meta?: {
    [k: string]: string;
  };
  storage?: {
    ipfs?: {
      /** CID of the file on IPFS */
      cid?: string;
      /** URL with IPFS scheme for the file */
      url?: string;
      /** URL to access file via HTTP through an IPFS gateway */
      gatewayUrl?: string;
    };
    status?: {
      /** Phase of the asset storage */
      phase: 'waiting' | 'ready' | 'failed' | 'reverted';
      /**  Error message if the last storage update encountered an error. */
      errorMessage?: string;
    };
  };

  /** Type of the asset. */
  type?: 'video';
  /** Used to form playback URL and storage folder */
  playbackId?: string;
  /** URL for HLS playback */
  playbackUrl?: string;
  /** URL to download the raw MP4 file of the asset */
  downloadUrl?: string;

  /** Timestamp (in milliseconds) at which asset was created */
  createdAt?: number;
  /** Size of the asset in bytes */
  size?: number;
  /** List of content hashes calculated for the asset */
  hash?: {
    /** Hash algorithm used to compute the hash */
    algorithm?: string;
    /** Value of the hash */
    hash?: string;
  }[];
  /** Detailed information about the asset. */
  videoSpec?: {
    /** Format of the asset, also refered to as container (e.g. MP4) */
    format?: string;
    /** Duration of the asset in seconds (floating point) */
    duration?: number;
    /** Bitrate of the video in bits per second */
    bitrate?: number;
    /** List of tracks associated with the asset when the format allows */
    tracks?: {
      /** type of track */
      type: 'video' | 'audio';
      /** Codec of the track */
      codec: string;
      /** Start time of the track in seconds */
      startTime?: number;
      /** Duration of the track in seconds */
      duration?: number;
      /** Bitrate of the track in bits per second */
      bitrate?: number;
      /** Width of the track - only for video tracks */
      width?: number;
      /** Height of the track - only for video tracks */
      height?: number;
      /** Pixel format of the track - only for video tracks */
      pixelFormat?: string;
      /** Frame rate of the track - only for video tracks */
      fps?: number;
      /** Amount of audio channels in the track */
      channels?: number;
      /** Sample rate of the track in hertz - only for audio tracks */
      sampleRate?: number;
      /** Bit depth of the track - only for audio tracks */
      bitDepth?: number;
    }[];
  };
  /** Status of the asset */
  status?: {
    /** Status phase */
    phase: 'waiting' | 'ready' | 'failed';
    /** Timestamp (in milliseconds) at which the asset was last updated */
    updatedAt: number;
    /** Error message if the asset creation failed */
    errorMessage?: string;
  };
};
