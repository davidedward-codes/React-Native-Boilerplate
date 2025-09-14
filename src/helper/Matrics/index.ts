import { Dimensions, ScaledSize } from "react-native";
import DeviceInfo from "react-native-device-info";

/**
 * Scaling configuration interface
 */
interface ScalingConfig {
  readonly baseWidth: number;
  readonly baseHeight: number;
  readonly baseFontSize: number;
  readonly isSmallDevice: boolean;
  readonly hasNotch: boolean;
}

// --- Device Constants ---
const { width: initialWidth, height: initialHeight } = Dimensions.get("window");
const hasNotch = DeviceInfo.hasNotch();

// Thresholds
const SMALL_DEVICE_WIDTH = 375;
const LARGE_DEVICE_WIDTH = 410;

/**
 * Derives the scaling configuration based on device dimensions.
 */
const getScalingConfig = (): ScalingConfig => {
  if (initialWidth <= SMALL_DEVICE_WIDTH && !hasNotch) {
    return {
      baseWidth: 330,
      baseHeight: 550,
      baseFontSize: 380,
      isSmallDevice: true,
      hasNotch,
    };
  }

  if (initialWidth > LARGE_DEVICE_WIDTH) {
    return {
      baseWidth: 350,
      baseHeight: 620,
      baseFontSize: 430,
      isSmallDevice: false,
      hasNotch,
    };
  }

  return {
    baseWidth: 350,
    baseHeight: 680,
    baseFontSize: 400,
    isSmallDevice: false,
    hasNotch,
  };
};

const scalingConfig = getScalingConfig();

/**
 * Creates a scaling function.
 * @param base - reference base size
 * @param dimension - actual device dimension
 * @param maxScaleFactor - maximum scaling factor
 * @param precision - decimal precision
 */
const createScaler =
  (
    base: number,
    dimension: number,
    maxScaleFactor: number = 1.2,
    precision: number = 0
  ) =>
  (size: number): number => {
    const scaleFactor = Math.min(dimension / base, maxScaleFactor);
    return Number((size * scaleFactor).toFixed(precision));
  };

// --- Scalers ---
const horizontalScale = createScaler(
  scalingConfig.baseWidth,
  initialWidth,
  1.2,
  0
);
const verticalScale = createScaler(
  scalingConfig.baseHeight,
  initialHeight,
  1.2,
  0
);

/**
 * Font scaler with minimum size enforcement
 */
const scaleFontSize = (() => {
  const { baseFontSize } = scalingConfig;
  const maxScaleFactor = 1.3;
  const minSize = 12;

  const scaleFactor = Math.min(initialWidth / baseFontSize, maxScaleFactor);

  return (size: number): number =>
    Math.max(Number((size * scaleFactor).toFixed(0)), minSize);
})();

/**
 * Responsive scaler with orientation consideration.
 */
const responsiveScale = (size: number, factor: number = 0.5): number => {
  const widthBased = horizontalScale(size);
  const heightBased = verticalScale(size);

  return Number(
    (widthBased * (1 - factor) + heightBased * factor).toFixed(0)
  );
};

/**
 * Handle dimension changes (e.g., orientation).
 */
const handleDimensionChange = ({ window }: { window: ScaledSize }) => {
  console.log("Dimensions changed:", window);
};

// Register listener
const dimensionChangeListener = Dimensions.addEventListener(
  "change",
  handleDimensionChange
);

/**
 * Cleanup function for dimension listener.
 */
export const removeDimensionListener = (): void => {
  if (dimensionChangeListener?.remove) {
    dimensionChangeListener.remove();
  }
};

export {
  horizontalScale,
  verticalScale,
  scaleFontSize,
  responsiveScale,
  scalingConfig,
};
