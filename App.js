import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';

export default function App() {
  return (
      <AppContainer>
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyALEuMCDeRSF3MDgzodpV3Ec2n4QGbsxXI&callback=initMap&libraries=&v=weekly"
            async
        ></script>
      </AppContainer>
  );
}
