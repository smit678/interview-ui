import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Greeting = () => {
  return (
   
       
       <View style={styles.container}>
          <Text style={styles.title}>Thank You....!</Text>
          <Text style={{fontSize: 15}}>Have a Good Day</Text>
       
      
    </View>
  )
}

export default Greeting

const styles = StyleSheet.create({
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    title: {
        color:'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor:'#7e57c2',
      },
      container: {
        flex: 1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,
        gap:10,
        backgroundColor: '#fff',
      },
})
