import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Alert, View, TextInput, Dimensions,Image} from 'react-native';
import MapView,{PROVIDER_GOOGLE, Callout} from 'react-native-maps';

const {width, height} = Dimensions.get('window')

export default class App extends Component {
 constructor(){
   super()

   this.state={
     region:{
       latitude: '',
       longitude: '',
       latitudeDelta: '',
       longitudeDelta: '',
       destination:'',
     },

     markers:[],

 
  enjoy: [
   {
   title:'',
     coordinates:{
       latitude:0,
       longitude:0
     }
   }
 ]
   }
 }

  calcDelta(lat, lon, acc){
     const oneDegOfLongInMeters = 111.32;
     const circumference = (40075/360)
     const latDelta = acc * (1/(Math.cos(lat) * circumference))
     const lonDelta = (acc / oneDegOfLongInMeters)

     this.setState({
       region:{
         latitude: lat,
         longitude: lon,
         latitudeDelta: latDelta,
         longitudeDelta: lonDelta
       }
     })
 }

 componentWillMount(){

 
//fetch('http://192.168.43.89/same/crjunction1.php',
fetch('https://rajyamelec99.000webhostapp.com/crjunction.php',
{ 
 

  method: 'POST', 
  headers: 
  { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
  }
}
).then((response) => response.json())
.then((responseJson) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const  acc= position.coords.accuracy

      this.calcDelta(lat, lon, acc)

    }
  )

   responseJson.map ((x) => this.state.markers.push(x));
 
 
   this.state.markers.map(marker => (console.log(marker.title)))
   this.state.markers.map(marker => (console.log(marker.coordinates)))
  })
   .catch((error) =>{
     console.log("error");
     console.error(error);
   });

   }
  marker(){
    return{
      latitude : this.state.region.latitude,
      longitude: this.state.region.longitude
    }
  }

 render() {
   return (
     <View style={styles.container}>
     {this.state.region.latitude ?
     <MapView
     style={styles.map}
     initialRegion = {this.state.region}
      >
    
    {this.state.markers.map(marker => (console.log(marker.title)))}
    {this.state.markers.map(marker => (console.log(marker.coordinates)))}
 
    {this.state.markers.map(marker => (
      
          <MapView.Marker
            //   source={require('./Images/car1.jpg')}
               key={marker.title} coordinate={marker.coordinates}
               title={marker.title}>
             
            <View  >
              <Image
               source={require('./Images/car1.jpg')} 
               style={{width: 25, height: 25}}/>
              </View> 

              </MapView.Marker>
                 ))}
            
     </MapView>    : null }

    
   
</View>
  
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
 },

 map:{
   flex: 1,
   width: width
 },
});