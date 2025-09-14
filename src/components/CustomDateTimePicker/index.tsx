import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import styles from './styles';

// Types
interface DateTimePickerProps {
  onDateTimeSelect: (date: Date) => void;
  daysToShow?: number;
  timeSlotInterval?: number;
}

interface DateItem {
  date: Date;
  day: string;
  dateNum: number;
  month: string;
}

// Constants
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onDateTimeSelect,
  daysToShow = 7,
  timeSlotInterval = 15
}) => {
  // States
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Generate date list
  const dates = useMemo<DateItem[]>(() => {
    const today = new Date();
    return Array.from({ length: daysToShow }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return {
        date,
        day: DAYS[date.getDay()],
        dateNum: date.getDate(),
        month: MONTHS[date.getMonth()]
      };
    });
  }, [daysToShow]);

  // Generate time slots
  const timeSlots = useMemo<string[]>(() => {
    const slots: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += timeSlotInterval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  }, [timeSlotInterval]);

  // Check if time slot is available
  const isTimeEnabled = (time: string): boolean => {
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = new Date(selectedDate);
    slotTime.setHours(hours, minutes);
    
    return slotTime >= now;
  };

  // Get initial time selection
  const getInitialTimeSelection = (): string => {
    const now = new Date();
    const currentMinutes = now.getMinutes();
    const currentHour = now.getHours();
    
    // Round up to nearest interval
    const roundedMinutes = Math.ceil(currentMinutes / timeSlotInterval) * timeSlotInterval;
    let initialHour = currentHour;
    let initialMinute = roundedMinutes;
    
    if (initialMinute >= 60) {
      initialHour += 1;
      initialMinute = 0;
    }
    
    // Handle next day
    if (initialHour >= 24) return timeSlots[0];
    
    return `${initialHour.toString().padStart(2, '0')}:${initialMinute.toString().padStart(2, '0')}`;
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const newTime = getInitialTimeSelection();
    setSelectedTime(newTime);
    onDateTimeSelect(combineDateTime(date, newTime));
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    if (!isTimeEnabled(time)) return;
    setSelectedTime(time);
    onDateTimeSelect(combineDateTime(selectedDate, time));
  };

  // Combine date and time
  const combineDateTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes);
    return newDate;
  };

  // Initialize selections
  useEffect(() => {
    const initialDate = dates[0]?.date || new Date();
    const initialTime = getInitialTimeSelection();
    
    setSelectedDate(initialDate);
    setSelectedTime(initialTime);
    onDateTimeSelect(combineDateTime(initialDate, initialTime));
  }, []);

  return (
    <View style={styles.container}>
      {/* Date Picker */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateContainer}
      >
        {dates.map((item, index) => {
          const isSelected = selectedDate.toDateString() === item.date.toDateString();
          return (
            <TouchableOpacity
              key={index}
              style={[styles.dateItem, isSelected && styles.selectedDateItem]}
              onPress={() => handleDateSelect(item.date)}
            >
              <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
                {item.day}
              </Text>
              <Text style={[styles.dateNum, isSelected && styles.selectedDateText]}>
                {item.dateNum}
              </Text>
              <Text style={[styles.monthText, isSelected && styles.selectedDateText]}>
                {item.month}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Time Picker */}
      <ScrollView contentContainerStyle={styles.timeContainer}>
        <View style={styles.timeGrid}>
          {timeSlots.map((time, index) => {
            const isSelected = time === selectedTime;
            const enabled = isTimeEnabled(time);
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeItem,
                  isSelected && styles.selectedTimeItem,
                  !enabled && styles.disabledTimeItem
                ]}
                onPress={() => handleTimeSelect(time)}
                disabled={!enabled}
              >
                <Text style={[
                  styles.timeText,
                  isSelected && styles.selectedTimeText,
                  !enabled && styles.disabledTimeText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default DateTimePicker;