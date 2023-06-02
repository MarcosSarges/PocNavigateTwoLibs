import {Navigation} from 'react-native-navigation';
import App, {OldFlow} from './App';
import 'react-native-gesture-handler';

Navigation.registerComponent('WelcomeScreen', () => App);
Navigation.registerComponent('TesteSegunda', () => OldFlow);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'WelcomeScreen',
              options: {
                topBar: {visible: false},
              },
            },
          },
        ],
      },
    },
  });
});
