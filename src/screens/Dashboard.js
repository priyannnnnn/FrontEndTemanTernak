import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { ScrollView, StyleSheet, View } from 'react-native'

export default function Dashboard({ navigation }) {
  return (
    
    <View style={styles.ff}>
    
    <Background>
      {/* <Logo /> */}
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'BuatKandang' }],
          })
        }
      >
        Start
      </Button>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'ListKandang' }],
          })
        }
      >
      Masuk Kandang
      </Button>

    </Background>
   
    </View>
   
  )
}
const styles=StyleSheet.create({
  ff:{
    flex:1
  }
})
