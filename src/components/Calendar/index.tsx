import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList 
} from 'react-native';
import styles from './styles';

type CalendarProps = {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
};

type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
};

const Calendar: React.FC<CalendarProps> = ({ 
  onDateSelect, 
  selectedDate = new Date() 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  
  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const generateCalendar = (): CalendarDay[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Days from previous month to show
    const prevMonthDays = firstDay.getDay();
    
    // Total days to display (including previous/next month overflow)
    const totalDays = 42; // 6 weeks
    
    const calendarDays: CalendarDay[] = [];
    const today = new Date();
    
    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      
      calendarDays.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected: 
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear(),
      });
    }
    
    // Next month days
    const remainingDays = totalDays - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      });
    }
    
    return calendarDays;
  };

  const handleDayPress = (day: CalendarDay) => {
    if (onDateSelect) {
      onDateSelect(day.date);
    }
  };

  const renderDay = ({ item }: { item: CalendarDay }) => (
    <TouchableOpacity
      style={[
        styles.day,
        item.isToday && styles.today,
        item.isSelected && styles.selectedDay,
        !item.isCurrentMonth && styles.nonCurrentMonth,
      ]}
      onPress={() => handleDayPress(item)}
      disabled={!item.isCurrentMonth}
    >
      <Text style={[
        styles.dayText,
        item.isToday && styles.todayText,
        item.isSelected && styles.selectedDayText,
        !item.isCurrentMonth && styles.nonCurrentMonthText
      ]}>
        {item.date.getDate()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth(-1)}>
          <Text style={styles.navButton}>‹</Text>
        </TouchableOpacity>
        
        <Text style={styles.monthText}>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        
        <TouchableOpacity onPress={() => navigateMonth(1)}>
          <Text style={styles.navButton}>›</Text>
        </TouchableOpacity>
      </View>
      
      {/* Week days header */}
      <View style={styles.weekDaysContainer}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekDayText}>{day}</Text>
        ))}
      </View>
      
      {/* Calendar grid */}
      <FlatList
        data={generateCalendar()}
        renderItem={renderDay}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        scrollEnabled={false}
      />
    </View>
  );
};

export default Calendar;