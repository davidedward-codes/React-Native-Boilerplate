import React, { useState } from 'react';
import { View, ScrollView, Text, GestureResponderEvent, TouchableNativeFeedback, LayoutAnimation, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Appbar from '../../components/Appbar';
import Tooltip from '../../components/Tooltip';
import Divider from '../../components/Divider';
import MultiSlider from '../../components/MultiSlider';
import Accordion from '../../components/Accordion';
import CustomTopTabBar from '../../components/CustomTopTabBar';
import Calendar from '../../components/Calendar';
import DateTimePicker from '../../components/CustomDateTimePicker';
import IconButton from '../../components/IconButton';
import { ListAccordion, ListAccordionGroup } from '../../components/ListAccordion';
import FAB from '../../components/FAB';
import DialogBox from '../../components/DialogBox';
import DataTable from '../../components/DataTable';
import Checkbox from '../../components/CheckBox';
import Chip from '../../components/Chip';
import CustomDropdown from '../../components/CustomDropdown';
import RadioButton from '../../components/RadioButton';
import InputText from '../../components/InputText';
import { useToast } from '../../components/Toast';
import TouchableDebounce from '../../components/TouchableDebounce';
import { useTranslation } from 'react-i18next';
import styles from '../../theme/GobalStyles';

const ComponentsScreen = ({ navigation }: any) => {
    const { t, i18n } = useTranslation();
  console.log('I18n',i18n);
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const languages = [
    { name: 'english', code: 'en' },
    { name: 'hindi', code: 'hi' },
    { name: 'french', code: 'fr' },
    { name: 'mandarin', code: 'zh' },
  ]

  const [showLanguagesList, setOpenLanguagesList] = useState(false)

    const [values, setValues] = useState([25, 75]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [accordionExpanded, setAccordionExpanded] = useState(true);
    const [dropdownValue, setDropdownValue] = useState('');
    const [chipSelected, setChipSelected] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('option1');

    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];
  
    const { showToast } = useToast();

    const dropdownOptions = [
        { label: 'JavaScript', value: 'js' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Python', value: 'py' },
        { label: 'Java', value: 'java' },
    ];

    const tabs = [
        { id: '1', title: 'Components' },
        { id: '2', title: 'UI Elements' },
        { id: '3', title: 'Navigation' },
    ];

    const desserts = [
        { key: 1, name: 'Cupcake', calories: 356, fat: 16 },
        { key: 2, name: 'Eclair', calories: 262, fat: 16 },
        { key: 3, name: 'Frozen yogurt', calories: 159, fat: 6 },
    ];
    const handlePress = (event: GestureResponderEvent) => {
        console.log('Button pressed!', event.nativeEvent);
    };

    return (
        <ScrollView style={styles.container}>
            <Appbar>
                <Text style={{ fontSize: 18 }}>Component Library</Text>
            </Appbar>

            <CustomTopTabBar tabs={tabs} />
            <View style={{padding: 10, backgroundColor: 'white'}} />
          <TouchableNativeFeedback onPress={() => {
              setOpenLanguagesList(!showLanguagesList)
              LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
            }}>
              <View style={styles.button}>
                <Text style={{fontSize:16, color:"#000"}}>{t('changeLanguage')}</Text>
              </View>
          </TouchableNativeFeedback>
          {showLanguagesList && <>
            {languages.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.button, { paddingHorizontal: 24 }]}
                onPress={() => changeLanguage(item.code)}>
                <Text style={{fontSize:16, color:"#000"}}>{t(item.name)}</Text>
              </TouchableOpacity>
            ))}
          </>
          }
          <View style={{padding: 10, backgroundColor: 'white'}} />

            <Card style={styles.componentCard}>
                <Card.Content>
                    <Text style={styles.sectionTitle}>Buttons</Text>

                    <View style={styles.buttonGroup}>
                        <Button title="Primary" onPress={()=>{}} style={styles.componentButton} />
                        <Button title="Secondary" onPress={()=>{}} style={styles.componentButton} />
                        <Button title="Disabled" disabled onPress={()=>{}} style={styles.componentButton} />
                        <IconButton
                            icon="star"
                            iconColor="#FFD700"
                            containerColor="#333"
                            size={32}
                            onPress={() => console.log('Pressed!')}
                        />
                        <TouchableDebounce
                            onPress={handlePress}
                            style={{ padding: 15, backgroundColor: 'blue' }}
                        >
                            <Text style={{ color: 'white' }}>Press Me</Text>
                        </TouchableDebounce>
                        <FAB
                            icon="+"
                            size="small"
                            onPress={() => console.log('FAB Pressed')}
                            style={styles.smallFab}
                        />
                    </View>

                    <Divider style={styles.divider} />

                    <Text style={styles.sectionTitle}>Cards</Text>

                    <Card variant="elevated" style={styles.demoCard}>
                        <Card.Header>
                            <Text style={{ fontWeight: 'bold' }}>Card Title</Text>
                        </Card.Header>
                        <Card.Content>
                            <Text>This is a sample card with content</Text>
                        </Card.Content>
                    </Card>

                    <Card variant="outlined" style={styles.demoCard}>
                        <Card.Content>
                            <Text>Outlined card style</Text>
                        </Card.Content>
                    </Card>

                    <Divider style={styles.divider} />

                    <Text style={styles.sectionTitle}>Form Elements</Text>

                    <InputText
                        label="Email Address"
                        placeholder="Enter your email"
                        leftIcon={<Icon name="email" size={20} color="#555" />}
                        style={styles.formInput}
                    />

                    <CustomDropdown
                        options={dropdownOptions}
                        onSelect={setDropdownValue}
                        placeholder="Select a language"
                    />

                    <View style={styles.checkboxGroup}>
                        <Checkbox
                            status="checked"
                            onPress={() => { }}
                            style={styles.checkbox}
                        />
                        <Text>Accept terms and conditions</Text>
                    </View>

                    <View style={styles.radioGroup}>
                    <Text style={styles.title}>Select an Option:</Text>
      {options.map((option) => (
        <View key={option.value} style={styles.optionContainer}>
          <RadioButton
            selected={selectedOption === option.value}
            onPress={() => setSelectedOption(option.value)}
            color="#4A90E2"
            size={28}
            style={styles.radio}
          />
          <Text style={styles.label}>{option.label}</Text>
        </View>
      ))}
                    </View>

                    <MultiSlider
                        values={values}
                        min={0}
                        max={100}
                        step={5}
                        onValuesChange={setValues}
                        sliderLength={300}
                        markerSize={24}
                        enableLabel={true}
                    />

                    <Divider style={styles.divider} />

                    <Text style={styles.sectionTitle}>UI Components</Text>

                    <View style={styles.chipContainer}>
                        <Chip
                            mode="outlined"
                            onPress={() => setChipSelected(!chipSelected)}
                            selected={chipSelected}
                            style={styles.chip}
                        >
                            Selectable
                        </Chip>

                        <Chip
                            icon={<Icon name="star" size={16} color="#FFD700" />}
                            onClose={() => console.log('Closed')}
                            style={styles.chip}
                        >
                            With Icon
                        </Chip>
                    </View>

                    <Accordion
                        title="Accordion Section"
                        expanded={accordionExpanded}
                    >
                        <Text>Hidden content that appears when expanded</Text>
                    </Accordion>

                    <Tooltip title="This is a tooltip" enterTouchDelay={300}>
                        <Text style={styles.tooltipTarget}>Hover over me</Text>
                    </Tooltip>

                    <ListAccordionGroup>
                        <ListAccordion title="List Item 1" id="1">
                            <Text>Content for item 1</Text>
                        </ListAccordion>
                        <ListAccordion title="List Item 2" id="2">
                            <Text>Content for item 2</Text>
                        </ListAccordion>
                    </ListAccordionGroup>

                    <Button
                        title="Show Toast"
                        style={styles.button}
                        onPress={() => showToast("This is a toast message!")}
                    />

                    <Button
                        title="Open Dialog"
                        style={styles.button}
                        onPress={() => setDialogVisible(true)}
                    />

                    <DialogBox
                        visible={dialogVisible}
                        onDismiss={() => setDialogVisible(false)}
                        style={styles.dialog}
                    >
                        <DialogBox.Title>Sample Dialog</DialogBox.Title>
                        <DialogBox.Content>
                            <Text>This is a dialog box</Text>
                        </DialogBox.Content>
                        <DialogBox.Actions>
                            <Button title="Close" onPress={() => setDialogVisible(false)} />
                        </DialogBox.Actions>
                    </DialogBox>

                    <Divider style={styles.divider} />

                    <Text style={styles.sectionTitle}>Data Display</Text>

                    <DataTable style={styles.dataTable}>
                        <DataTable.Header>
                            <DataTable.Title>Dessert</DataTable.Title>
                            <DataTable.Title numeric>Calories</DataTable.Title>
                            <DataTable.Title numeric>Fat (g)</DataTable.Title>
                        </DataTable.Header>

                        {desserts.map((dessert) => (
                            <DataTable.Row key={dessert.key}>
                                <DataTable.Cell>{dessert.name}</DataTable.Cell>
                                <DataTable.Cell numeric>{dessert.calories}</DataTable.Cell>
                                <DataTable.Cell numeric>{dessert.fat}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>

                    <Calendar
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                    />

                    <DateTimePicker
                        onDateTimeSelect={(date) => console.log(date)}
                    />
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

export default ComponentsScreen