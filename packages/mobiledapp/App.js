import './shim.js'

import { Navigation } from 'react-native-navigation';
import { registerScreens } from "./app/registerScreens";

export function start() {
  registerScreens();

  Navigation.events().onAppLaunched(() => {

  //   Navigation.setRoot({
  //     stack: {
  //       children: [
  //         {
  //           component: {
  //             name: 'NewUserComponent'
  //           }
  //         }
  //       ]
  //     }
  //   });


    // Navigation.setRoot({
    //   sideMenu: {
    //     left: {
    //       component: {
    //         name: 'NewUserComponent',
    //         passProps: {
    //           text: 'This is a left side menu screen'
    //         }
    //       }
    //     },
    //     center: {
    //       component: {
    //         name: 'NewUserComponent'
    //       },
    //     },
    //     right: {
    //       component: {
    //         name: 'NewUserComponent',
    //         passProps: {
    //           text: 'This is a right side menu screen'
    //         }
    //       }
    //     }
    //   }
    // });

    Navigation.setRoot({
      bottomTabs: {
        children: [
          {
            component: {
              name: 'NewUserComponent',
              passProps: {
                text: 'This is tab 1',
                myFunction: () => 'Hello from a function!',
              },
            },
          },
          {
            component: {
              name: 'CreateAccountComponent',
              passProps: {
                text: 'This is tab 2',
              },
            },
          },
        ],
      },
    });

  });
}