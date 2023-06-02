/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Navigation} from 'react-native-navigation';

type TPops = {
  componentId: string;
};

const Header = ({rnNav = false, modal = false, componentId = ''}) => {
  const nav = rnNav ? null : useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#C2c2c2',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        flexDirection: 'row',
        elevation: 5,
        // borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 0.125,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}>
      <Button
        title="voltar"
        onPress={() => {
          if (rnNav && modal && componentId) {
            Navigation.dismissModal(componentId);
            return;
          }
          if (rnNav) {
            Navigation.pop(componentId);
            return;
          }
          if (((rnNav && modal) || rnNav || modal) && !componentId) {
            throw new Error(
              'ComponentId é obrigatório no header quando usado com rnNav e/ou Modal',
            );
          }

          nav?.goBack();
        }}
      />
    </View>
  );
};

export function OldFlow({componentId}: TPops) {
  return (
    <View style={{flex: 1}}>
      <Header rnNav modal componentId={componentId} />
      <View
        style={{
          flex: 1,
        }}>
        <Button
          onPress={() => {
            Navigation.pop(componentId);
          }}
          title="OldFlow"
        />
      </View>
    </View>
  );
}

function HomeScreen() {
  const nav = useNavigation<any>();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
      }}>
      <Button
        onPress={() => {
          nav.navigate('Perfil');
        }}
        title=" To Perfil Screen"
      />
      <Button
        onPress={() => {
          Navigation.showModal({
            component: {
              name: 'TesteSegunda',
            },
          });
        }}
        title=" To Old Flow Screens"
      />
    </View>
  );
}
function PerfilScreen() {
  return (
    <View style={{flex: 1}}>
      <Header />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF',
        }}>
        <Text>Perfil Screen tackNavigation</Text>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App({componentId}: TPops): JSX.Element {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{
              componentId,
            }}
          />
          <Stack.Screen
            name="Perfil"
            component={PerfilScreen}
            options={{
              presentation: 'transparentModal',
              headerStyle: {
                // borderTopLeftRadius: 20,
                // borderTopRightRadius: 20,
              },
              cardStyle: {
                backgroundColor: 'rgba(0,0,0,0.2)',
                paddingTop: 40,
              },
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
