import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import BackButton from '../components/BackButton'

export default function Dashboard({ navigation }) {
  return (
    
    <View style={styles.ff}>
    
    <Background>
      <BackButton goBack={navigation.goBack}/>
      {/* <Logo /> */}
      <Header>Ayo Beternak</Header>
      <Paragraph >
        Selamat Datang Sahabat Peternak Milineal
      </Paragraph>
      <Button style={styles.color}
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'BuatKandang' }],
          })
        }
      >
        Buat Kandang
      </Button>
      <Text style={styles.Paragraph}>* Buat Kandang Jika belum Punya Kandang</Text>
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
  },
  Paragraph:{
    fontSize:15,
    color :'#000000'
  },
  color:{
    color:'#164B60'
  }
 
})
