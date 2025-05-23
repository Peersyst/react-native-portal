import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { nanoid } from 'nanoid/non-secure';
import { usePortal } from '../../hooks/usePortal';
import type { PortalProps } from './types';
import { useContextBridge } from 'its-fine';

const IGNORED_CONTEXTS_DISPLAY_NAMES = [
  'TextAncestorContext',
  'RootTagContext',
  'ScrollViewContext',
  'VirtualizedListContext',
];

const PortalComponent = ({
  name: _providedName,
  hostName,
  handleOnMount: _providedHandleOnMount,
  handleOnUnmount: _providedHandleOnUnmount,
  handleOnUpdate: _providedHandleOnUpdate,
  children,
}: PortalProps) => {
  //#region hooks
  const { addPortal: addUpdatePortal, removePortal } = usePortal(hostName);
  //#endregion

  //#region variables
  const name = useMemo(() => _providedName || nanoid(), [_providedName]);
  // Get context bridge to forward contexts to the portal
  const ContextBridge = useContextBridge(IGNORED_CONTEXTS_DISPLAY_NAMES);
  const childrenWithContextBridge = useMemo(() => {
    return <ContextBridge key={name}>{children}</ContextBridge>;
  }, [name, children]);
  //#endregion

  //#region refs
  const handleOnMountRef = useRef<Function>();
  const handleOnUnmountRef = useRef<Function>();
  const handleOnUpdateRef = useRef<Function>();
  //#endregion

  //#region callbacks
  const handleOnMount = useCallback(() => {
    if (_providedHandleOnMount) {
      _providedHandleOnMount(() =>
        addUpdatePortal(name, childrenWithContextBridge)
      );
    } else {
      addUpdatePortal(name, childrenWithContextBridge);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_providedHandleOnMount, addUpdatePortal]);
  handleOnMountRef.current = handleOnMount;

  const handleOnUnmount = useCallback(() => {
    if (_providedHandleOnUnmount) {
      _providedHandleOnUnmount(() => removePortal(name));
    } else {
      removePortal(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_providedHandleOnUnmount, removePortal]);
  handleOnUnmountRef.current = handleOnUnmount;

  const handleOnUpdate = useCallback(() => {
    if (_providedHandleOnUpdate) {
      _providedHandleOnUpdate(() =>
        addUpdatePortal(name, childrenWithContextBridge)
      );
    } else {
      addUpdatePortal(name, childrenWithContextBridge);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_providedHandleOnUpdate, addUpdatePortal, childrenWithContextBridge]);
  handleOnUpdateRef.current = handleOnUpdate;
  //#endregion

  //#region effects
  useEffect(() => {
    handleOnMountRef.current?.();
    return () => {
      handleOnUnmountRef.current?.();

      // remove callbacks refs
      handleOnMountRef.current = undefined;
      handleOnUnmountRef.current = undefined;
      handleOnUpdateRef.current = undefined;
    };
  }, []);
  useEffect(() => {
    handleOnUpdateRef.current?.();
  }, [childrenWithContextBridge]);
  //#endregion

  return null;
};

export const Portal = memo(PortalComponent);
Portal.displayName = 'Portal';
