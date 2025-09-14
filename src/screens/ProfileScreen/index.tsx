import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Appbar from '../../components/Appbar';
import Snackbar from '../../components/Snackbar';
import IconButton from '../../components/IconButton';
import HelperText from '../../components/HelperText';
import DialogBox from '../../components/DialogBox';
import Checkbox from '../../components/CheckBox';
import RadioButton from '../../components/RadioButton';
import InputText from '../../components/InputText';
import styles from "../../theme/GobalStyles";

const ProfileScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('john.doe@example.com');
    const [emailError, setEmailError] = useState(false);
    const [selectedOption, setSelectedOption] = useState('option2');
    const [snackVisible, setSnackVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [values, setValues] = useState([25, 75]);
    const [checked, setChecked] = useState<'checked' | 'unchecked'>('checked');

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    const handleEmailChange = (text: string) => {
        setEmail(text);
        setEmailError(!text.includes('@'));
    };

    const showToast = () => {
        setSnackVisible(true);
        setTimeout(() => setSnackVisible(false), 3000);
    };

    const toggleCheckbox = () => {
        setChecked(prev => prev === 'checked' ? 'unchecked' : 'checked');
    };

    return (
        <ScrollView style={styles.container}>
            <Appbar dark>
                <Text style={{ color: 'white', fontSize: 18 }}>My Profile</Text>
            </Appbar>

            <View style={styles.avatarContainer}>
                <Avatar
                    size={120}
                    name="John Doe"
                    backgroundColor="#4a6572"
                    textColor="white"
                    onPress={() => console.log('Avatar pressed')}
                />
                <IconButton
                    icon="edit"
                    iconColor="#fff"
                    containerColor="#2196F3"
                    size={32}
                    onPress={() => console.log('Edit pressed')}
                    style={styles.editIcon}
                />
            </View>

            <Card style={styles.profileCard}>
                <Card.Content>
                    <Text style={styles.sectionTitle}>Account Information</Text>

                    <InputText
                        label="Full Name"
                        placeholder="Enter your name"
                        value="John Doe"
                        leftIcon={<Icon name="person" size={20} color="#555" />}
                    />

                    <InputText
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={handleEmailChange}
                        leftIcon={<Icon name="email" size={20} color="#555" />}
                        error={"emailError"}
                        keyboardType="email-address"
                    />

                    <HelperText
                        type="error"
                        visible={emailError}
                        padding="normal"
                    >
                        Valid email is required (must contain '@')
                    </HelperText>

                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <View style={styles.preferenceRow}>
                        <Text>Email Notifications</Text>
                        <Checkbox
                            status={checked}
                            onPress={toggleCheckbox}
                            color="#2196F3"
                            uncheckedColor="#757575"
                        />
                    </View>

                    <Text style={styles.sectionTitle}>Subscription Plan</Text>

                    <View style={styles.radioGroup}>
                        {options.map((option) => (
                            <View key={option.value} style={styles.radioOption}>
                                <RadioButton
                                    selected={selectedOption === option.value}
                                    onPress={() => setSelectedOption(option.value)}
                                    color="#4A90E2"
                                    size={24}
                                />
                                <Text style={styles.radioLabel}>{option.label}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>Account Actions</Text>

                    <Button
                        title="Save Changes"
                        style={styles.button}
                        onPress={showToast}
                    />

                    <Button
                        title="Change Password"
                        style={styles.button}
                        onPress={()=>{}}
                    />

                    <Button
                        title="Delete Account"
                        style={styles.button}
                        onPress={() => setDialogVisible(true)}
                    />
                </Card.Content>
            </Card>

            <DialogBox
                visible={dialogVisible}
                onDismiss={() => setDialogVisible(false)}
                style={styles.dialog}
            >
                <DialogBox.Title>Confirm Account Deletion</DialogBox.Title>
                <DialogBox.Content>
                    <Text style={{ fontSize: 16 }}>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </Text>
                </DialogBox.Content>
                <DialogBox.Actions>
                    <Button title="Cancel" onPress={() => setDialogVisible(false)} />
                    <Button title="Delete"  onPress={() => setDialogVisible(false)} />
                </DialogBox.Actions>
            </DialogBox>

            <Snackbar
                message="Profile updated successfully!"
                visible={snackVisible}
                onDismiss={() => setSnackVisible(false)}
                position="bottom"
                duration={3000}
            />
        </ScrollView>
    );
};

export default ProfileScreen