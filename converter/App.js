import { StyleSheet, Text, View } from 'react-native';
import Converter from './components/Converter';

export default function App() {
  return (
    <View style={styles.container}>
      <Converter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(5, 8, 22)'
  },
});
