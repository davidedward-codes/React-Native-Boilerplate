/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigation from './src/navigators/MainNavigation';

function App() {
  try {

    return (

      <NavigationContainer>
        <GestureHandlerRootView>

          <MainNavigation />
        </GestureHandlerRootView>

      </NavigationContainer>
    );

  } catch (error) {
    console.log("App Error:", error)
  }

}
export default App;