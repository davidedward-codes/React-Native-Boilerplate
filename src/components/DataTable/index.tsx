import * as React from 'react';
import {
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  ColorValue,
  I18nManager,
  Animated,
  PixelRatio,
  Pressable,
  PressableProps,
  Text as RNText,
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

// Helper functions for color manipulation
const hexToRgb = (hex: string) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

const withAlpha = (color: string, alpha: number) => {
  if (color.startsWith('#')) {
    const { r, g, b } = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  const namedColors: Record<string, string> = {
    black: 'rgba(0, 0, 0, 1)',
    white: 'rgba(255, 255, 255, 1)',
  };
  
  if (namedColors[color]) {
    return namedColors[color].replace('1)', `${alpha})`);
  }
  
  return `rgba(0, 0, 0, ${alpha})`;
};

// Theme types
interface ThemeColors {
  text: string;
  primary: string;
  onSurface: string;
  surfaceVariant: string;
}

interface Theme {
  dark: boolean;
  colors: ThemeColors;
  isV3?: boolean;
}

type ThemeProp = Theme | undefined;

// Theme Context
const ThemeContext = React.createContext<Theme>({ 
  dark: false, 
  colors: { 
    text: '#000', 
    primary: '#6200ee', 
    onSurface: '#000', 
    surfaceVariant: '#e0e0e0' 
  },
  isV3: false
});

const useInternalTheme = (themeOverrides?: ThemeProp): Theme => {
  const contextTheme = React.useContext(ThemeContext);
  return themeOverrides || contextTheme;
};

// TouchableRipple component with proper typing
type TouchableRippleProps = PressableProps & {
  borderless?: boolean;
  background?: Object;
  rippleColor?: ColorValue;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const TouchableRipple: React.FC<TouchableRippleProps> = ({ 
  children, 
  style, 
  onPress, 
  ...rest 
}) => (
  <Pressable 
    onPress={onPress} 
    style={({ pressed }) => [
      style, 
      pressed && { backgroundColor: 'rgba(0,0,0,0.12)' }
    ]}
    {...rest}
  >
    {children}
  </Pressable>
);

// Button component with proper typing
type ButtonProps = {
  children: React.ReactNode;
  mode?: 'outlined' | 'contained';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: string;
  contentStyle?: StyleProp<ViewStyle>;
};

const Button: React.FC<ButtonProps> = ({ 
  children, 
  mode, 
  onPress, 
  style, 
  icon, 
  contentStyle 
}) => (
  <Pressable onPress={onPress} style={[styles.button, style]}>
    <View style={[styles.buttonContent, contentStyle]}>
      {icon && <MaterialCommunityIcon name={icon} size={16} />}
      <RNText>{children}</RNText>
    </View>
  </Pressable>
);

// Menu components with proper typing
type MenuProps = {
  visible: boolean;
  onDismiss: () => void;
  anchor: React.ReactNode;
  children: React.ReactNode;
  theme?: ThemeProp;
};

const Menu: React.FC<MenuProps> = ({ 
  visible, 
  onDismiss, 
  anchor, 
  children 
}) => {
  if (!visible) return <>{anchor}</>;
  
  return (
    <View style={styles.menuContainer}>
      {anchor}
      <View style={styles.menu}>
        {children}
      </View>
    </View>
  );
};

type MenuItemProps = {
  title: string;
  onPress: () => void;
  titleStyle?: StyleProp<TextStyle>;
};

const MenuItem: React.FC<MenuItemProps> = ({ 
  title, 
  onPress, 
  titleStyle 
}) => (
  <Pressable onPress={onPress} style={styles.menuItem}>
    <RNText style={titleStyle}>{title}</RNText>
  </Pressable>
);

// DataTableCell Component
interface DataTableCellProps extends TouchableRippleProps {
  children: React.ReactNode;
  numeric?: boolean;
  textStyle?: StyleProp<TextStyle>;
  maxFontSizeMultiplier?: number;
  testID?: string;
}

const DataTableCell: React.FC<DataTableCellProps> = ({
  children,
  textStyle,
  style,
  numeric,
  maxFontSizeMultiplier,
  testID,
  ...rest
}) => {
  return (
    <TouchableRipple
      {...rest}
      testID={testID}
      style={[styles.cellContainer, numeric && styles.right, style]}
    >
      <CellContent
        textStyle={textStyle}
        testID={testID}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
      >
        {children}
      </CellContent>
    </TouchableRipple>
  );
};

interface CellContentProps {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
  maxFontSizeMultiplier?: number;
}

const CellContent: React.FC<CellContentProps> = ({
  children,
  textStyle,
  maxFontSizeMultiplier,
  testID,
}) => {
  if (React.isValidElement(children)) {
    return children;
  }

  return (
    <RNText
      style={textStyle}
      numberOfLines={1}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      testID={testID ? `${testID}-text-container` : undefined}
    >
      {children}
    </RNText>
  );
};

// DataTableHeader Component
interface DataTableHeaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  theme?: ThemeProp;
}

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  children,
  style,
  theme: themeOverrides,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const borderBottomColor = theme.isV3
    ? theme.colors.surfaceVariant
    : withAlpha(theme.dark ? '#ffffff' : '#000000', 0.12);

  return (
    <View {...rest} style={[styles.header, { borderBottomColor }, style]}>
      {children}
    </View>
  );
};

// DataTableTitle Component
interface DataTableTitleProps {
  children: React.ReactNode;
  numeric?: boolean;
  sortDirection?: 'ascending' | 'descending';
  numberOfLines?: number;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  maxFontSizeMultiplier?: number;
  theme?: ThemeProp;
}

const DataTableTitle: React.FC<DataTableTitleProps> = ({
  numeric,
  children,
  onPress,
  sortDirection,
  textStyle,
  style,
  theme: themeOverrides,
  numberOfLines = 1,
  maxFontSizeMultiplier,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const { current: spinAnim } = React.useRef<Animated.Value>(
    new Animated.Value(sortDirection === 'ascending' ? 0 : 1)
  );

  React.useEffect(() => {
    Animated.timing(spinAnim, {
      toValue: sortDirection === 'ascending' ? 0 : 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [sortDirection, spinAnim]);

  const textColor = theme.isV3 ? theme.colors.onSurface : theme.colors.text;
  const alphaTextColor = withAlpha(textColor || '#000000', 0.6);
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const icon = sortDirection ? (
    <Animated.View style={[styles.icon, { transform: [{ rotate: spin }] }]}>
      <MaterialCommunityIcon
        name="arrow-up"
        size={16}
        color={textColor}
        style={I18nManager.isRTL ? { transform: [{ scaleX: -1 }] } : undefined}
      />
    </Animated.View>
  ) : null;

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      {...rest}
      style={[styles.titleContainer, numeric && styles.right, style]}
    >
      {icon}
      <RNText
        style={[
          styles.cell,
          { maxHeight: 24 * PixelRatio.getFontScale() * numberOfLines },
          numberOfLines > 1
            ? numeric
              ? I18nManager.isRTL
                ? styles.leftText
                : styles.rightText
              : styles.centerText
            : {},
          sortDirection ? styles.sorted : { color: alphaTextColor },
          textStyle,
        ]}
        numberOfLines={numberOfLines}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
      >
        {children}
      </RNText>
    </Pressable>
  );
};

// DataTableRow Component
interface DataTableRowProps extends TouchableRippleProps {
  children: React.ReactNode;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
  theme?: ThemeProp;
}

const DataTableRow: React.FC<DataTableRowProps> = ({
  onPress,
  style,
  children,
  pointerEvents,
  theme: themeOverrides,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const borderBottomColor = theme.isV3
    ? theme.colors.surfaceVariant
    : withAlpha(theme.dark ? '#ffffff' : '#000000', 0.12);

  return (
    <TouchableRipple
      {...rest}
      onPress={onPress}
      style={[styles.rowContainer, { borderBottomColor }, style]}
    >
      <View style={styles.content} pointerEvents={pointerEvents}>
        {children}
      </View>
    </TouchableRipple>
  );
};

// DataTablePagination Component
interface PaginationControlsProps {
  page: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
  showFastPaginationControls?: boolean;
  theme?: ThemeProp;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  numberOfPages,
  onPageChange,
  showFastPaginationControls,
  theme: themeOverrides,
}) => {
  const theme = useInternalTheme(themeOverrides);
  const textColor = theme.isV3 ? theme.colors.onSurface : theme.colors.text;

  return (
    <>
      {showFastPaginationControls ? (
        <Pressable
          onPress={() => page !== 0 && onPageChange(0)}
          disabled={page === 0}
          style={styles.iconButton}
        >
          <MaterialCommunityIcon
            name="page-first"
            color={page === 0 ? '#ccc' : textColor}
            size={24}
          />
        </Pressable>
      ) : null}
      <Pressable
        onPress={() => page > 0 && onPageChange(page - 1)}
        disabled={page === 0}
        style={styles.iconButton}
      >
        <MaterialCommunityIcon
          name="chevron-left"
          color={page === 0 ? '#ccc' : textColor}
          size={24}
        />
      </Pressable>
      <Pressable
        onPress={() => page < numberOfPages - 1 && onPageChange(page + 1)}
        disabled={numberOfPages === 0 || page === numberOfPages - 1}
        style={styles.iconButton}
      >
        <MaterialCommunityIcon
          name="chevron-right"
          color={
            numberOfPages === 0 || page === numberOfPages - 1 ? '#ccc' : textColor
          }
          size={24}
        />
      </Pressable>
      {showFastPaginationControls ? (
        <Pressable
          onPress={() =>
            numberOfPages > 0 && page !== numberOfPages - 1 && onPageChange(numberOfPages - 1)
          }
          disabled={numberOfPages === 0 || page === numberOfPages - 1}
          style={styles.iconButton}
        >
          <MaterialCommunityIcon
            name="page-last"
            color={
              numberOfPages === 0 || page === numberOfPages - 1 ? '#ccc' : textColor
            }
            size={24}
          />
        </Pressable>
      ) : null}
    </>
  );
};

interface PaginationDropdownProps {
  numberOfItemsPerPage?: number;
  numberOfItemsPerPageList?: Array<number>;
  onItemsPerPageChange?: (numberOfItemsPerPage: number) => void;
}

const PaginationDropdown: React.FC<PaginationDropdownProps> = ({
  numberOfItemsPerPageList,
  numberOfItemsPerPage,
  onItemsPerPageChange,
}) => {
  const [showSelect, toggleSelect] = React.useState<boolean>(false);

  return (
    <Menu
      visible={showSelect}
      onDismiss={() => toggleSelect(!showSelect)}
      anchor={
        <Button
          mode="outlined"
          onPress={() => toggleSelect(true)}
          style={styles.button}
          icon="menu-down"
          contentStyle={styles.contentStyle}
        >
          {`${numberOfItemsPerPage}`}
        </Button>
      }
    >
      {numberOfItemsPerPageList?.map((option) => (
        <MenuItem
          key={option}
          title={`${option}`}
          onPress={() => {
            onItemsPerPageChange?.(option);
            toggleSelect(false);
          }}
        />
      ))}
    </Menu>
  );
};

interface DataTablePaginationProps {
  label?: React.ReactNode;
  accessibilityLabel?: string;
  page: number;
  numberOfPages: number;
  onPageChange: (page: number) => void;
  style?: StyleProp<ViewStyle>;
  showFastPaginationControls?: boolean;
  numberOfItemsPerPage?: number;
  numberOfItemsPerPageList?: Array<number>;
  onItemsPerPageChange?: (numberOfItemsPerPage: number) => void;
  selectPageDropdownLabel?: React.ReactNode;
  selectPageDropdownAccessibilityLabel?: string;
  theme?: ThemeProp;
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  label,
  accessibilityLabel,
  page,
  numberOfPages,
  onPageChange,
  style,
  showFastPaginationControls = false,
  numberOfItemsPerPageList,
  numberOfItemsPerPage,
  onItemsPerPageChange,
  selectPageDropdownLabel,
  selectPageDropdownAccessibilityLabel,
  theme: themeOverrides,
  ...rest
}) => {
  const theme = useInternalTheme(themeOverrides);
  const baseColor = theme.isV3 ? theme.colors.onSurface : theme.colors.text;
  const labelColor = withAlpha(baseColor || '#000000', 0.6);

  return (
    <View {...rest} style={[styles.paginationContainer, style]}>
      {numberOfItemsPerPageList &&
        numberOfItemsPerPage &&
        onItemsPerPageChange && (
          <View style={styles.optionsContainer}>
            <RNText
              style={[styles.label, { color: labelColor }]}
              accessibilityLabel={
                selectPageDropdownAccessibilityLabel ||
                'selectPageDropdownLabel'
              }
            >
              {selectPageDropdownLabel}
            </RNText>
            <PaginationDropdown
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={numberOfItemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
            />
          </View>
        )}
      <RNText
        style={[styles.label, { color: labelColor }]}
        accessibilityLabel={accessibilityLabel || 'label'}
      >
        {label}
      </RNText>
      <View style={styles.iconsContainer}>
        <PaginationControls
          showFastPaginationControls={showFastPaginationControls}
          onPageChange={onPageChange}
          page={page}
          numberOfPages={numberOfPages}
          theme={theme}
        />
      </View>
    </View>
  );
};

// Main DataTable Component
interface DataTableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DataTable: React.FC<DataTableProps> & {
  Header: typeof DataTableHeader;
  Title: typeof DataTableTitle;
  Row: typeof DataTableRow;
  Cell: typeof DataTableCell;
  Pagination: typeof DataTablePagination;
} = ({ children, style, ...rest }) => (
  <View {...rest} style={[styles.container, style]}>
    {children}
  </View>
);

// Assign sub-components
DataTable.Header = DataTableHeader;
DataTable.Title = DataTableTitle;
DataTable.Row = DataTableRow;
DataTable.Cell = DataTableCell;
DataTable.Pagination = DataTablePagination;

export default DataTable;