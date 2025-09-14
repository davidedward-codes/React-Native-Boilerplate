import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
    FC,
  } from 'react';
  import {
    StyleSheet,
    PanResponder,
    View,
    I18nManager,
    ImageBackground,
    Text,
    PanResponderGestureState,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageSourcePropType,
  } from 'react-native';
  
  // Interfaces
  interface StepConfig {
    index: number;
    stepLabel?: string | number;
    suffix?: string;
    prefix?: string;
  }
  
  interface TouchDimensions {
    height: number;
    width: number;
    borderRadius: number;
    slipDisplacement: number;
  }
  
  interface MultiSliderProps {
    values: number[];
    onValuesChangeStart?: () => void;
    onValuesChange?: (values: number[]) => void;
    onValuesChangeFinish?: (values: number[]) => void;
    onMarkersPosition?: (positions: number[]) => void;
    step?: number;
    min?: number;
    max?: number;
    touchDimensions?: TouchDimensions;
    customMarker?: React.ComponentType<any>;
    customMarkerLeft?: React.ComponentType<any>;
    customMarkerRight?: React.ComponentType<any>;
    customLabel?: React.ComponentType<any>;
    markerOffsetX?: number;
    markerOffsetY?: number;
    markerSize?: number;
    sliderLength?: number;
    onToggleOne?: () => void;
    onToggleTwo?: () => void;
    stepsAs?: StepConfig[];
    showSteps?: boolean;
    showStepMarkers?: boolean;
    showStepLabels?: boolean;
    enabledOne?: boolean;
    enabledTwo?: boolean;
    allowOverlap?: boolean;
    snapped?: boolean;
    smoothSnapped?: boolean;
    vertical?: boolean;
    minMarkerOverlapDistance?: number;
    minMarkerOverlapStepDistance?: number;
    testID?: string;
    containerStyle?: StyleProp<ViewStyle>;
    trackStyle?: StyleProp<ViewStyle>;
    selectedStyle?: StyleProp<ViewStyle>;
    unselectedStyle?: StyleProp<ViewStyle>;
    markerStyle?: StyleProp<ViewStyle>;
    pressedMarkerStyle?: StyleProp<ViewStyle>;
    disabledMarkerStyle?: StyleProp<ViewStyle>;
    markerContainerStyle?: StyleProp<ViewStyle>;
    stepStyle?: StyleProp<ViewStyle>;
    stepMarkerStyle?: StyleProp<ViewStyle>;
    stepLabelStyle?: StyleProp<TextStyle>;
    valuePrefix?: string;
    valueSuffix?: string;
    enableLabel?: boolean;
    imageBackgroundSource?: ImageSourcePropType;
    isMarkersSeparated?: boolean;
    optionsArray?: number[];
  }
  
  interface StepData {
    stepLabel: string | number;
    suffix: string;
    prefix: string;
  }
  
  // Helper functions
  const createArray = (start: number, end: number, step: number): number[] => {
    const array = [];
    for (let i = start; i <= end; i += step) {
      array.push(i);
    }
    return array;
  };
  
  const valueToPosition = (
    value: number,
    optionsArray: number[],
    sliderLength: number,
    markerSize: number = 0
  ): number => {
    const index = optionsArray.indexOf(value);
    if (index === -1) return 0;
    return (sliderLength * index) / (optionsArray.length - 1) - markerSize / 2;
  };
  
  const positionToValue = (
    position: number,
    optionsArray: number[],
    sliderLength: number,
    markerSize: number = 0
  ): number => {
    const index = Math.round(
      (position + markerSize / 2) * (optionsArray.length - 1) / sliderLength
    );
    return optionsArray[Math.max(0, Math.min(index, optionsArray.length - 1))];
  };
  
  const MultiSlider: FC<MultiSliderProps> = (props) => {
    // Destructure props with defaults
    const {
      values = [0],
      onValuesChangeStart = () => {},
      onValuesChange = () => {},
      onValuesChangeFinish = () => {},
      onMarkersPosition = () => {},
      step = 1,
      min = 0,
      max = 10,
      touchDimensions = {
        height: 50,
        width: 50,
        borderRadius: 15,
        slipDisplacement: 200,
      },
      customMarker: Marker = DefaultMarker,
      customMarkerLeft: MarkerLeft = DefaultMarker,
      customMarkerRight: MarkerRight = DefaultMarker,
      customLabel: Label = DefaultLabel,
      markerOffsetX = 0,
      markerOffsetY = 0,
      markerSize = 0,
      sliderLength = 280,
      onToggleOne,
      onToggleTwo,
      stepsAs = [],
      showSteps = false,
      showStepMarkers = true,
      showStepLabels = true,
      enabledOne = true,
      enabledTwo = true,
      allowOverlap = false,
      snapped = false,
      smoothSnapped = false,
      vertical = false,
      minMarkerOverlapDistance = 0,
      minMarkerOverlapStepDistance = 0,
      testID = '',
      selectedStyle,
      unselectedStyle,
      trackStyle,
      markerStyle,
      pressedMarkerStyle,
      disabledMarkerStyle,
      markerContainerStyle,
      stepStyle,
      stepMarkerStyle,
      stepLabelStyle,
      valuePrefix,
      valueSuffix,
      enableLabel,
      imageBackgroundSource,
      isMarkersSeparated = false,
      optionsArray: propOptionsArray,
      containerStyle,
    } = props;
  
    // State
    const [onePressed, setOnePressed] = useState(false);
    const [twoPressed, setTwoPressed] = useState(false);
    const [valueOne, setValueOne] = useState(values[0]);
    const [valueTwo, setValueTwo] = useState(values[1] || values[0]);
    const [pastOne, setPastOne] = useState(0);
    const [pastTwo, setPastTwo] = useState(0);
    const [positionOne, setPositionOne] = useState(0);
    const [positionTwo, setPositionTwo] = useState(0);
  
    // Refs
    const markerOneRef = useRef<View>(null);
    const markerTwoRef = useRef<View>(null);
    
    // Memoized values
    const optionsArray = useMemo(() => {
      return propOptionsArray || createArray(min, max, step);
    }, [propOptionsArray, min, max, step]);
  
    const stepLength = useMemo(() => {
      return sliderLength / (optionsArray.length - 1);
    }, [sliderLength, optionsArray]);
  
    const stepsData = useMemo(() => {
      const data: Record<number, StepData> = {};
      const tempSteps: Record<number, StepData> = {};
  
      stepsAs.forEach(step => {
        if (step?.index !== undefined) {
          tempSteps[step.index] = {
            stepLabel: step.stepLabel ?? optionsArray[step.index],
            suffix: step.suffix ?? '',
            prefix: step.prefix ?? '',
          };
        }
      });
  
      optionsArray.forEach((val, index) => {
        data[index] = tempSteps[index] || {
          stepLabel: val,
          suffix: '',
          prefix: '',
        };
      });
  
      return data;
    }, [stepsAs, optionsArray]);
  
    // Initialize positions
    useEffect(() => {
      const initialPositions = values.map(value => 
        valueToPosition(value, optionsArray, sliderLength, markerSize)
      );
  
      setPositionOne(initialPositions[0]);
      setPastOne(initialPositions[0]);
      setValueOne(values[0]);
  
      if (values.length > 1) {
        setPositionTwo(initialPositions[1]);
        setPastTwo(initialPositions[1]);
        setValueTwo(values[1]);
      }
    }, []);
  
    // Update positions when props change
    useEffect(() => {
      if (!onePressed && !twoPressed) {
        const newPositions = values.map(value => 
          valueToPosition(value, optionsArray, sliderLength, markerSize)
        );
  
        setPositionOne(newPositions[0]);
        setPastOne(newPositions[0]);
        setValueOne(values[0]);
  
        if (values.length > 1) {
          setPositionTwo(newPositions[1]);
          setPastTwo(newPositions[1]);
          setValueTwo(values[1]);
        }
      }
    }, [values, optionsArray, sliderLength, markerSize, onePressed, twoPressed]);
  
    // Event handlers
    const startOne = useCallback(() => {
      if (enabledOne) {
        onValuesChangeStart();
        setOnePressed(true);
      }
    }, [enabledOne, onValuesChangeStart]);
  
    const startTwo = useCallback(() => {
      if (enabledTwo) {
        onValuesChangeStart();
        setTwoPressed(true);
      }
    }, [enabledTwo, onValuesChangeStart]);
  
    const moveOne = useCallback((gestureState: PanResponderGestureState) => {
      if (!enabledOne) return;
  
      const accumDistance = vertical ? -Number(gestureState.dy) : Number(gestureState.dx);
      const accumDistanceDisplacement = vertical ? Number(gestureState.dx) : Number(gestureState.dy);
  
      const unconfined = I18nManager.isRTL
        ? pastOne - accumDistance
        : accumDistance + pastOne;
  
      const trueTop = positionTwo - (
        allowOverlap ? 0 :
        minMarkerOverlapDistance > 0 ? 
          minMarkerOverlapDistance : 
          (minMarkerOverlapStepDistance || 1) * stepLength
      );
  
      const top = trueTop || sliderLength - markerSize / 2;
      const bottom = markerSize / 2;
      const confined = Math.max(bottom, Math.min(unconfined, top));
      const slipDisplacement = touchDimensions.slipDisplacement;
  
      if (Math.abs(accumDistanceDisplacement) < slipDisplacement || !slipDisplacement) {
        const value = positionToValue(
          confined,
          optionsArray,
          sliderLength,
          markerSize
        );
        
        const snappedPosition = valueToPosition(
          value,
          optionsArray,
          sliderLength,
          markerSize
        );
        
        const newPosition = snapped ? snappedPosition : confined;
        setPositionOne(newPosition);
  
        if (value !== valueOne) {
          setValueOne(value);
          const newValues = [value, valueTwo].filter(v => v !== undefined) as number[];
          onValuesChange(newValues);
          onMarkersPosition([newPosition, positionTwo]);
        }
      }
    }, [
      enabledOne, pastOne, positionTwo, allowOverlap, 
      minMarkerOverlapDistance, minMarkerOverlapStepDistance, 
      stepLength, sliderLength, markerSize, touchDimensions, 
      optionsArray, snapped, valueOne, valueTwo, 
      onValuesChange, onMarkersPosition, vertical
    ]);
  
    const moveTwo = useCallback((gestureState: PanResponderGestureState) => {
      if (!enabledTwo) return;
  
      const accumDistance = vertical ? -Number(gestureState.dy) : Number(gestureState.dx);
      const accumDistanceDisplacement = vertical ? Number(gestureState.dx) : Number(gestureState.dy);
  
      const unconfined = I18nManager.isRTL
        ? pastTwo - accumDistance
        : accumDistance + pastTwo;
  
      const bottom = positionOne + (
        allowOverlap ? 0 :
        minMarkerOverlapDistance > 0 ? 
          minMarkerOverlapDistance : 
          (minMarkerOverlapStepDistance || 1) * stepLength
      );
  
      const top = sliderLength - markerSize / 2;
      const confined = Math.max(bottom, Math.min(unconfined, top));
      const slipDisplacement = touchDimensions.slipDisplacement;
  
      if (Math.abs(accumDistanceDisplacement) < slipDisplacement || !slipDisplacement) {
        const value = positionToValue(
          confined,
          optionsArray,
          sliderLength,
          markerSize
        );
        
        const snappedPosition = valueToPosition(
          value,
          optionsArray,
          sliderLength,
          markerSize
        );
        
        const newPosition = snapped ? snappedPosition : confined;
        setPositionTwo(newPosition);
  
        if (value !== valueTwo) {
          setValueTwo(value);
          onValuesChange([valueOne, value]);
          onMarkersPosition([positionOne, newPosition]);
        }
      }
    }, [
      enabledTwo, pastTwo, positionOne, allowOverlap, 
      minMarkerOverlapDistance, minMarkerOverlapStepDistance, 
      stepLength, sliderLength, markerSize, touchDimensions, 
      optionsArray, snapped, valueOne, valueTwo, 
      onValuesChange, onMarkersPosition, vertical
    ]);
  
    const endOne = useCallback((gestureState: PanResponderGestureState) => {
      if (gestureState.moveX === 0 && onToggleOne) {
        onToggleOne();
        return;
      }
  
      const snappedPosition = valueToPosition(
        valueOne,
        optionsArray,
        sliderLength
      );
  
      setPastOne(smoothSnapped ? snappedPosition : positionOne);
      if (smoothSnapped) {
        setPositionOne(snappedPosition);
      }
      setOnePressed(false);
  
      const values = [valueOne, valueTwo].filter(v => v !== undefined) as number[];
      onValuesChangeFinish(values);
    }, [valueOne, valueTwo, optionsArray, sliderLength, 
        smoothSnapped, positionOne, onToggleOne, onValuesChangeFinish]);
  
    const endTwo = useCallback((gestureState: PanResponderGestureState) => {
      if (gestureState.moveX === 0 && onToggleTwo) {
        onToggleTwo();
        return;
      }
  
      const snappedPosition = valueToPosition(
        valueTwo,
        optionsArray,
        sliderLength
      );
  
      setPastTwo(smoothSnapped ? snappedPosition : positionTwo);
      if (smoothSnapped) {
        setPositionTwo(snappedPosition);
      }
      setTwoPressed(false);
  
      onValuesChangeFinish([valueOne, valueTwo]);
    }, [valueTwo, optionsArray, sliderLength, smoothSnapped, 
        positionTwo, onToggleTwo, onValuesChangeFinish, valueOne]);
  
    // Pan responders
    const panResponderBetween = useMemo(() => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        startOne();
        startTwo();
      },
      onPanResponderMove: (_, gestureState) => {
        moveOne(gestureState);
        moveTwo(gestureState);
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_, gestureState) => {
        endOne(gestureState);
        endTwo(gestureState);
      },
      onPanResponderTerminate: (_, gestureState) => {
        endOne(gestureState);
        endTwo(gestureState);
      },
      onShouldBlockNativeResponder: () => true,
    }), [startOne, startTwo, moveOne, moveTwo, endOne, endTwo]);
  
    const panResponderOne = useMemo(() => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: startOne,
      onPanResponderMove: (_, gestureState) => moveOne(gestureState),
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_, gestureState) => endOne(gestureState),
      onPanResponderTerminate: (_, gestureState) => endOne(gestureState),
      onShouldBlockNativeResponder: () => true,
    }), [startOne, moveOne, endOne]);
  
    const panResponderTwo = useMemo(() => PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: startTwo,
      onPanResponderMove: (_, gestureState) => moveTwo(gestureState),
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_, gestureState) => endTwo(gestureState),
      onPanResponderTerminate: (_, gestureState) => endTwo(gestureState),
      onShouldBlockNativeResponder: () => true,
    }), [startTwo, moveTwo, endTwo]);
  
    // Steps rendering
    const getSteps = useCallback(() => {
      const textStyles: StyleProp<TextStyle> = [
        styles.stepLabel,
        stepLabelStyle,
        ...(vertical ? [{ transform: [{ rotate: '90deg' }] }] : []),
      ];
  
      const trackStyleObj = StyleSheet.flatten(trackStyle);
      const markerHeight = Number(trackStyleObj?.height ?? styles.track.height!);
      
      const markerStyles: StyleProp<ViewStyle> = [
        styles.stepMarker,
        {
          height: markerHeight,
          width: markerHeight,
          borderRadius: markerHeight / 2,
        },
        stepMarkerStyle,
      ];
  
      return optionsArray.map((number, index) => {
        const step = stepsData[index];
        return (
          <View
            key={number}
            style={[
              styles.step,
              stepStyle,
              { left: stepLength * index },
            ]}
          >
            {showStepMarkers && 
              index !== 0 && 
              index !== optionsArray.length - 1 && (
                <View style={markerStyles} />
              )}
            {showStepLabels && (
              <Text style={textStyles}>
                {`${step.prefix}${step.stepLabel}${step.suffix}`}
              </Text>
            )}
          </View>
        );
      });
    }, [
      optionsArray, stepsData, stepLength, 
      showStepMarkers, showStepLabels, 
      stepLabelStyle, stepStyle, stepMarkerStyle, 
      trackStyle, vertical
    ]);
  
    // Calculate track lengths
    const twoMarkers = values.length === 2;
    const trackOneLength = positionOne;
    const trackThreeLength = twoMarkers ? sliderLength - positionTwo : 0;
    const trackTwoLength = sliderLength - trackOneLength - trackThreeLength;
  
    // Touch style
    const touchStyle = {
      borderRadius: touchDimensions.borderRadius || 0,
      height: touchDimensions.height,
      width: touchDimensions.width,
    };
  
    // Marker positions
    const markerContainerOne = {
      top: markerOffsetY - 24,
      left: trackOneLength + markerOffsetX - 24,
    };
  
    const markerContainerTwo = {
      top: markerOffsetY - 24,
      right: trackThreeLength + markerOffsetX - 24,
    };
  
    // Container style
    const containerStyles = [
      styles.container,
      containerStyle,
      vertical && { transform: [{ rotate: '-90deg' }] },
    ];
  
    return (
      <View testID={testID}>
        {enableLabel && (
          <Label
            oneMarkerValue={valueOne}
            twoMarkerValue={valueTwo}
            oneMarkerLeftPosition={positionOne}
            twoMarkerLeftPosition={positionTwo}
            oneMarkerPressed={onePressed}
            twoMarkerPressed={twoPressed}
          />
        )}
  
        {imageBackgroundSource ? (
          <ImageBackground
            source={imageBackgroundSource}
            style={containerStyles}
          >
            <View style={[styles.fullTrack, { width: sliderLength }]}>
              <View
                style={[
                  styles.track,
                  twoMarkers ? unselectedStyle : selectedStyle || styles.selectedTrack,
                  trackStyle,
                  { width: trackOneLength },
                ]}
              />
              <View
                style={[
                  styles.track,
                  twoMarkers ? selectedStyle || styles.selectedTrack : unselectedStyle,
                  trackStyle,
                  { width: trackTwoLength },
                ]}
                {...(twoMarkers ? panResponderBetween.panHandlers : {})}
              />
              {twoMarkers && (
                <View
                  style={[
                    styles.track,
                    trackStyle,
                    unselectedStyle,
                    { width: trackThreeLength },
                  ]}
                />
              )}
  
              {showSteps && getSteps()}
  
              <View
                style={[
                  styles.markerContainer,
                  markerContainerStyle,
                  positionOne > sliderLength / 2 && styles.topMarkerContainer,
                  markerContainerOne,
                ]}
              >
                <View
                  style={[styles.touch, touchStyle]}
                  ref={markerOneRef}
                  {...panResponderOne.panHandlers}
                >
                  {isMarkersSeparated ? (
                    <MarkerLeft
                      enabled={enabledOne}
                      pressed={onePressed}
                      markerStyle={markerStyle}
                      pressedMarkerStyle={pressedMarkerStyle}
                      disabledMarkerStyle={disabledMarkerStyle}
                      currentValue={valueOne}
                      valuePrefix={valuePrefix}
                      valueSuffix={valueSuffix}
                    />
                  ) : (
                    <Marker
                      enabled={enabledOne}
                      pressed={onePressed}
                      markerStyle={markerStyle}
                      pressedMarkerStyle={pressedMarkerStyle}
                      disabledMarkerStyle={disabledMarkerStyle}
                      currentValue={valueOne}
                      valuePrefix={valuePrefix}
                      valueSuffix={valueSuffix}
                    />
                  )}
                </View>
              </View>
  
              {twoMarkers && (
                <View
                  style={[
                    styles.markerContainer,
                    markerContainerStyle,
                    markerContainerTwo,
                  ]}
                >
                  <View
                    style={[styles.touch, touchStyle]}
                    ref={markerTwoRef}
                    {...panResponderTwo.panHandlers}
                  >
                    {isMarkersSeparated ? (
                      <MarkerRight
                        pressed={twoPressed}
                        markerStyle={markerStyle}
                        pressedMarkerStyle={pressedMarkerStyle}
                        disabledMarkerStyle={disabledMarkerStyle}
                        currentValue={valueTwo}
                        enabled={enabledTwo}
                        valuePrefix={valuePrefix}
                        valueSuffix={valueSuffix}
                      />
                    ) : (
                      <Marker
                        pressed={twoPressed}
                        markerStyle={markerStyle}
                        pressedMarkerStyle={pressedMarkerStyle}
                        disabledMarkerStyle={disabledMarkerStyle}
                        currentValue={valueTwo}
                        enabled={enabledTwo}
                        valuePrefix={valuePrefix}
                        valueSuffix={valueSuffix}
                      />
                    )}
                  </View>
                </View>
              )}
            </View>
          </ImageBackground>
        ) : (
          <View style={containerStyles}>
            <View style={[styles.fullTrack, { width: sliderLength }]}>
              <View
                style={[
                  styles.track,
                  twoMarkers ? unselectedStyle : selectedStyle || styles.selectedTrack,
                  trackStyle,
                  { width: trackOneLength },
                ]}
              />
              <View
                style={[
                  styles.track,
                  twoMarkers ? selectedStyle || styles.selectedTrack : unselectedStyle,
                  trackStyle,
                  { width: trackTwoLength },
                ]}
                {...(twoMarkers ? panResponderBetween.panHandlers : {})}
              />
              {twoMarkers && (
                <View
                  style={[
                    styles.track,
                    trackStyle,
                    unselectedStyle,
                    { width: trackThreeLength },
                  ]}
                />
              )}
  
              {showSteps && getSteps()}
  
              <View
                style={[
                  styles.markerContainer,
                  markerContainerStyle,
                  positionOne > sliderLength / 2 && styles.topMarkerContainer,
                  markerContainerOne,
                ]}
              >
                <View
                  style={[styles.touch, touchStyle]}
                  ref={markerOneRef}
                  {...panResponderOne.panHandlers}
                >
                  {isMarkersSeparated ? (
                    <MarkerLeft
                      enabled={enabledOne}
                      pressed={onePressed}
                      markerStyle={markerStyle}
                      pressedMarkerStyle={pressedMarkerStyle}
                      disabledMarkerStyle={disabledMarkerStyle}
                      currentValue={valueOne}
                      valuePrefix={valuePrefix}
                      valueSuffix={valueSuffix}
                    />
                  ) : (
                    <Marker
                      enabled={enabledOne}
                      pressed={onePressed}
                      markerStyle={markerStyle}
                      pressedMarkerStyle={pressedMarkerStyle}
                      disabledMarkerStyle={disabledMarkerStyle}
                      currentValue={valueOne}
                      valuePrefix={valuePrefix}
                      valueSuffix={valueSuffix}
                    />
                  )}
                </View>
              </View>
  
              {twoMarkers && (
                <View
                  style={[
                    styles.markerContainer,
                    markerContainerStyle,
                    markerContainerTwo,
                  ]}
                >
                  <View
                    style={[styles.touch, touchStyle]}
                    ref={markerTwoRef}
                    {...panResponderTwo.panHandlers}
                  >
                    {isMarkersSeparated ? (
                      <MarkerRight
                        pressed={twoPressed}
                        markerStyle={markerStyle}
                        pressedMarkerStyle={pressedMarkerStyle}
                        disabledMarkerStyle={disabledMarkerStyle}
                        currentValue={valueTwo}
                        enabled={enabledTwo}
                        valuePrefix={valuePrefix}
                        valueSuffix={valueSuffix}
                      />
                    ) : (
                      <Marker
                        pressed={twoPressed}
                        markerStyle={markerStyle}
                        pressedMarkerStyle={pressedMarkerStyle}
                        disabledMarkerStyle={disabledMarkerStyle}
                        currentValue={valueTwo}
                        enabled={enabledTwo}
                        valuePrefix={valuePrefix}
                        valueSuffix={valueSuffix}
                      />
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };
  
  // DefaultLabel Component
  const DefaultLabel: FC<{
    oneMarkerValue?: number;
    twoMarkerValue?: number;
    oneMarkerLeftPosition?: number;
    twoMarkerLeftPosition?: number;
    oneMarkerPressed?: boolean;
    twoMarkerPressed?: boolean;
  }> = (props) => {
    const {
      oneMarkerValue,
      twoMarkerValue,
      oneMarkerLeftPosition,
      twoMarkerLeftPosition,
      oneMarkerPressed,
      twoMarkerPressed,
    } = props;
  
    return (
      <View style={{ position: 'relative' }}>
        {typeof oneMarkerLeftPosition === 'number' && (
          <View
            style={[
              styles.sliderLabel,
              { left: oneMarkerLeftPosition - 25 },
              oneMarkerPressed && styles.markerPressed,
            ]}
          >
            <Text style={styles.sliderLabelText}>{oneMarkerValue}</Text>
          </View>
        )}
  
        {typeof twoMarkerLeftPosition === 'number' && (
          <View
            style={[
              styles.sliderLabel,
              { left: twoMarkerLeftPosition - 25 },
              twoMarkerPressed && styles.markerPressed,
            ]}
          >
            <Text style={styles.sliderLabelText}>{twoMarkerValue}</Text>
          </View>
        )}
      </View>
    );
  };
  
  // DefaultMarker Component
  const DefaultMarker: FC<{
    enabled?: boolean;
    pressed?: boolean;
    markerStyle?: StyleProp<ViewStyle>;
    pressedMarkerStyle?: StyleProp<ViewStyle>;
    disabledMarkerStyle?: StyleProp<ViewStyle>;
    currentValue?: number;
    valuePrefix?: string;
    valueSuffix?: string;
  }> = (props) => {
    return (
      <View
        style={
          props.enabled
            ? [
                styles.markerStyle,
                props.markerStyle,
                props.pressed && styles.pressedMarkerStyle,
                props.pressed && props.pressedMarkerStyle,
              ]
            : [
                styles.markerStyle,
                styles.disabled,
                props.disabledMarkerStyle,
              ]
        }
      />
    );
  };
  
  // Styles
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      height: 50,
      justifyContent: 'center',
    },
    fullTrack: {
      flexDirection: 'row',
    },
    track: {
      height: 2,
      borderRadius: 2,
      backgroundColor: '#A7A7A7',
    },
    selectedTrack: {
      backgroundColor: '#095FFF',
    },
    markerContainer: {
      position: 'absolute',
      width: 48,
      height: 48,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    topMarkerContainer: {
      zIndex: 1,
    },
    touch: {
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    step: {
      position: 'absolute',
      marginLeft: -5,
    },
    stepMarker: {
      position: 'absolute',
      left: 2,
      width: 6,
      height: 6,
      backgroundColor: '#0000008c',
      borderRadius: 3,
    },
    stepLabel: {
      position: 'absolute',
      top: 15,
      color: '#333',
    },
    sliderLabel: {
      position: 'absolute',
      bottom: 0,
      minWidth: 50,
      padding: 8,
      backgroundColor: '#f1f1f1',
    },
    sliderLabelText: {
      alignItems: 'center',
      textAlign: 'center',
      fontStyle: 'normal',
      fontSize: 11,
    },
    markerPressed: {
      borderWidth: 2,
      borderColor: '#999',
    },
    markerStyle: {
      height: 30,
      width: 30,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 1,
      shadowOpacity: 0.2,
    },
    pressedMarkerStyle: {},
    disabled: {
      backgroundColor: '#d3d3d3',
    },
  });
  
  export default MultiSlider;