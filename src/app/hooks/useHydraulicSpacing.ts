// hooks/useHydraulicSpacing.ts
import { useState, useEffect, useRef } from "react";

interface HydraulicSpacingConfig {
  /** Animation duration to sync with CSS transitions */
  animationDuration?: number;
  /** Whether to apply smooth transitions */
  smooth?: boolean;
}

interface HydraulicSpacingReturn {
  /** Current negative margin value to apply */
  compensationMargin: number;
  /** Function to call when an item expands */
  onExpand: (itemId: string | null) => void;
  /** Current expanded item ID */
  expandedItem: string | null;
  /** Inline style object for the container */
  containerStyle: React.CSSProperties;
  /** Ref to attach to the container for measurements */
  containerRef: React.RefObject<HTMLElement | null>;
}

export function useHydraulicSpacing({
  animationDuration = 400,
  smooth = true,
}: HydraulicSpacingConfig = {}): HydraulicSpacingReturn {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [compensationMargin, setCompensationMargin] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const initialHeightRef = useRef<number>(0);

  // Measure height when expansion state changes
  useEffect(() => {
    if (!containerRef.current) return;

    if (expandedItem && initialHeightRef.current === 0) {
      // Store initial height when first item expands
      initialHeightRef.current = containerRef.current.scrollHeight;
    }

    // Use ResizeObserver for precise measurement
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry && initialHeightRef.current > 0) {
        const currentHeight = entry.contentRect.height;
        const heightDifference = currentHeight - initialHeightRef.current;

        // Only apply compensation if content has actually expanded
        if (heightDifference > 0) {
          setCompensationMargin(heightDifference);
        } else {
          setCompensationMargin(0);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [expandedItem]);

  // Reset measurements when no items are expanded
  useEffect(() => {
    if (!expandedItem) {
      initialHeightRef.current = 0;
      setCompensationMargin(0);
    }
  }, [expandedItem]);

  const onExpand = (itemId: string | null) => {
    setExpandedItem(itemId);
  };

  const containerStyle: React.CSSProperties = {
    marginBottom: `-${compensationMargin}px`,
    ...(smooth && {
      transition: `margin-bottom ${animationDuration}ms ease-out`,
    }),
  };

  return {
    compensationMargin,
    onExpand,
    expandedItem,
    containerStyle,
    containerRef,
  };
}
