"use client";

import { composeEventHandlers } from "@radix-ui/primitive";

import React from "react";

import { useStore } from "zustand";
import { PlayerScopedProps, usePlayerContext } from "../context";

import { useShallow } from "zustand/react/shallow";
import * as Radix from "./primitive";

const MUTE_TRIGGER_NAME = "MuteTrigger";

type MuteTriggerElement = React.ElementRef<typeof Radix.Primitive.button>;

interface MuteTriggerProps
  extends Radix.ComponentPropsWithoutRef<typeof Radix.Primitive.button> {}

const MuteTrigger = React.forwardRef<MuteTriggerElement, MuteTriggerProps>(
  (props: PlayerScopedProps<MuteTriggerProps>, forwardedRef) => {
    const { __scopePlayer, ...playProps } = props;

    const context = usePlayerContext(MUTE_TRIGGER_NAME, __scopePlayer);

    const { volume, toggleMute } = useStore(
      context.store,
      useShallow(({ volume, __controlsFunctions }) => ({
        volume,
        toggleMute: __controlsFunctions.requestToggleMute,
      })),
    );

    const toggleMuteComposed = React.useCallback(
      () => toggleMute(),
      [toggleMute],
    );

    const title = React.useMemo(
      () => (volume === 0 ? "Unmute (m)" : "Mute (m)"),
      [volume],
    );

    return (
      <Radix.Primitive.button
        type="button"
        aria-pressed={volume === 0}
        aria-label={title}
        title={title}
        {...playProps}
        onClick={composeEventHandlers(props.onClick, toggleMuteComposed)}
        ref={forwardedRef}
        data-livepeer-player-controls-play-button=""
        data-muted={String(volume === 0)}
      />
    );
  },
);

export { MuteTrigger };
export type { MuteTriggerProps };
