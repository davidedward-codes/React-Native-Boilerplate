import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Appbar from '../../components/Appbar';
import Divider from '../../components/Divider';
import Checkbox from '../../components/CheckBox';
import styles from "../../theme/GobalStyles";

const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Appbar>
                <Text style={{ fontSize: 18 }}>Settings</Text>
            </Appbar>

            <Card style={styles.settingsCard}>
                <Card.Content>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <View style={styles.settingItem}>
                        <View>
                            <Text style={styles.settingLabel}>Enable Notifications</Text>
                            <Text style={styles.settingDescription}>Receive app notifications</Text>
                        </View>
                        <Checkbox
                            status={notificationsEnabled ? 'checked' : 'unchecked'}
                            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View>
                            <Text style={styles.settingLabel}>Dark Mode</Text>
                            <Text style={styles.settingDescription}>Switch to dark theme</Text>
                        </View>
                        <Checkbox
                            status={darkModeEnabled ? 'checked' : 'unchecked'}
                            onPress={() => setDarkModeEnabled(!darkModeEnabled)}
                        />
                    </View>

                    <Divider style={styles.divider} />

                    <Text style={styles.sectionTitle}>Account</Text>

                    <Button
                        title="Privacy Settings"
                        style={styles.button}
                        onPress={()=>{}}
                    />

                    <Button
                        title="Security"
                        onPress={()=>{}}
                        style={styles.button}
                    />

                    <Button
                        title="Logout"
                        style={styles.button}
                        onPress={()=>{}}
                    />
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

export default SettingsScreen
