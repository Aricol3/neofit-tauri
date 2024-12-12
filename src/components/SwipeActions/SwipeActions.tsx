import "./SwipeActions.scss";
import { motion, MotionValue, useMotionValueEvent, useTransform } from "framer-motion-legacy";
import { useSnap } from "../../hooks/useSnap.tsx";
import {
  ComponentProps,
  createContext,
  Dispatch,
  ReactNode,
  Ref,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState
} from "react";
import clsx from "clsx";
import { mergeRefs } from "react-merge-refs";
import useMotionMeasure from "react-use-motion-measure";

const SwipeActionsContext = createContext<{
  actionsWrapperInset: number,
  actionsWidth: number,
  setActionsWidth: Dispatch<SetStateAction<number>>,
  triggerRef: Ref<HTMLDivElement>,
  triggerHeight: MotionValue<number>,
  dragProps: ReturnType<typeof useSnap>["dragProps"],
  setOpen: (open: boolean) => void,
}>(null as any);

const useSwipeActionsContext = () => {
  const ctx = useContext(SwipeActionsContext);
  if (!ctx) throw new Error("SwipeActionsContext.Provider is missing");
  return ctx;
};

export type SwipeActionsRootProps = {
  className?: string,
  children?: ReactNode,
};

const Root = ({ className, children }: SwipeActionsRootProps) => {
  const [actionsWidth, setActionsWidth] = useState(0);
  const actionsWrapperInset = 2;

  const handleRef = useRef<HTMLDivElement>(null);
  const [triggerMeasureRef, triggerBounds] = useMotionMeasure();

  const constraints = useMemo(() => ({
    right: 0,
    left: -actionsWidth - actionsWrapperInset
  }), [actionsWidth, actionsWrapperInset]);

  const { dragProps, snapTo } = useSnap({
    direction: "x",
    ref: handleRef,
    snapPoints: {
      type: "constraints-box",
      points: [{ x: 0 }, { x: 1 }],
      unit: "percent"
    },
    constraints,
    dragElastic: { right: 0.04, left: 0.4 },
    springOptions: {
      bounce: 0.2
    }
  });

  return (<SwipeActionsContext.Provider value={{
    actionsWidth,
    setActionsWidth,
    triggerRef: mergeRefs([handleRef, triggerMeasureRef]),
    dragProps,
    triggerHeight: triggerBounds.height as unknown as MotionValue<number>,
    actionsWrapperInset,
    setOpen: (open) => snapTo(open ? 0 : 1)
  }}>
    <div className={clsx("SwipeActions", className)}>{children}</div>
  </SwipeActionsContext.Provider>);
};

export type SwipeActionsTriggerProps = {
  className?: string,
  children?: ReactNode,
};

const Trigger = ({ className, children }: SwipeActionsTriggerProps) => {
  const { dragProps, triggerRef } = useSwipeActionsContext();

  return (<motion.div
    role="button"
    tabIndex={0}
    className={clsx("trigger", className)}
    ref={triggerRef}
    {...dragProps}
  >
    {children}
  </motion.div>);
};

export type SwipeActionsActionsProps = {
  className?: string,
  wrapperClassName?: string,
  children?: ReactNode,
};

const Actions = ({ className, children, wrapperClassName }: SwipeActionsActionsProps) => {
  const { actionsWrapperInset, setOpen, triggerHeight, setActionsWidth } = useSwipeActionsContext();
  const actionsWrapperHeight = useTransform(triggerHeight, v => v - actionsWrapperInset);

  const [actionsMeasureRef, actionsBounds] = useMotionMeasure();
  // @ts-expect-error legacy type
  useMotionValueEvent(actionsBounds.width, "change", setActionsWidth);

  return (<motion.div
    className={clsx("actions-wrapper", wrapperClassName)}
    style={{
      height: actionsWrapperHeight,
      inset: actionsWrapperInset
    }}
  >
    <motion.div
      className={clsx("actions", className)}
      ref={actionsMeasureRef}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
    </motion.div>
  </motion.div>);
};

export type SwipeActionActionsProps = ComponentProps<typeof motion.button>;

const Action = ({ className, children, onClick, ...props }: SwipeActionActionsProps) => {
  const { setOpen } = useSwipeActionsContext();
  return (<motion.button
    className={clsx("action", className)}
    onClick={(e) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        setOpen(false);
        (document.activeElement as HTMLElement | null)?.blur();
      }
    }}
    {...props}
  >
    {children}
  </motion.button>);
};


export const SwipeActions = {
  Root,
  Trigger,
  Actions,
  Action
};