import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View
} from 'react-native';

const Beefarming = () => {
  return (
    <View style={styles.container}>
    <Image style={{ position: 'absolute', width: '100%', height: '100%' }} blurRadius={5}source={require('../assets/Bg.png')} />
    <SafeAreaView>

      <ScrollView style={styles.scrollView}>

        <Text style={styles.heading}>
        How to do Bee Farming using technology
        </Text>

        <Image style={{ width: 150, height: 150, marginLeft:20,marginTop:10}} source={require('../assets/Pic-03.jpeg')} />

        <Text style={styles.Subheading}>
        Early Blight: 
        This disease is caused by the fungus Alternaria solani.
        It usually appears as dark brown or black spots with concentric rings on 
        lower leaves of the potato plant. Early blight can cause significant defoliation if not controlled.
        Cure methods
        </Text>
                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>1. Crop Rotation:</Text>
                  <Text style={styles.pointDescription}>
                    Crop rotation involves changing the type of crop grown in a particular 
                    area each season. This practice interrupts the life cycles of 
                    soil-borne diseases and pests. By rotating crops, especially avoiding 
                    those in the same family as potatoes (Solanaceae), you reduce the buildup
                    of early blight spores in the soil.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>2. Resistant Varieties:</Text>
                  <Text style={styles.pointDescription}>
                    Planting potato varieties that are bred to be resistant 
                    to early blight reduces the likelihood of infection. 
                    These varieties have genetic traits that either make them less attractive 
                    to the blight pathogen or better able to resist infection.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>3. Proper Spacing:</Text>
                  <Text style={styles.pointDescription}>
                    Proper spacing between plants allows air to circulate freely, 
                    educing humidity around the foliage. High humidity and poor air 
                    circulation create an ideal environment for the early blight fungus to thrive and spread.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>4. Mulching:</Text>
                  <Text style={styles.pointDescription}>
                    Mulching involves covering the soil around your plants with organic
                    materials like straw, grass clippings, or compost. 
                    This barrier prevents soil, which can harbor blight spores, 
                    from splashing onto the leaves during watering or rainfall, 
                    thus reducing the spread of the fungus.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>5. Neem Oil:</Text>
                  <Text style={styles.pointDescription}>
                    Neem oil is extracted from the seeds of the neem tree. It has antifungal 
                    that help prevent and control fungal diseases like early blight.
                     Regular application creates a protective layer on the plants that inhibits fungal growth.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>6. Compost Tea:</Text>
                  <Text style={styles.pointDescription}>
                    Compost tea is a liquid solution made by steeping compost in water.
                    It is rich in beneficial microorganisms that can outcompete harmful
                     fungi like the early blight pathogen. Applying compost tea to the 
                     plants can boost their immune system and enhance their ability to resist diseases.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>7. Baking Soda Solution:</Text>
                  <Text style={styles.pointDescription}>
                    Baking soda (sodium bicarbonate) creates an alkaline environment on the leaf surface,
                    which is unfavorable for fungal growth. Mixing baking soda
                     with vegetable oil and water and spraying it on plants helps
                      to prevent the fungus from establishing itself.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>8. Remove Infected Leaves:</Text>
                  <Text style={styles.pointDescription}>
                    Removing leaves that show symptoms of early blight (dark spots with concentric rings) 
                    an limit the spread of the disease. Infected leaves are a 
                    source of spores that can spread to healthy leaves, so timely removal is crucial.
                  </Text>
                </View>

        <Text style={styles.Subheading}>
        Late Blight
        Caused by the oomycete Phytophthora infestans, late blight is more severe 
        nd infamous for causing the Irish potato famine in the 1840s. 
        It appears as water-soaked lesions on leaves that can spread rapidly 
        to other parts of the plant, including the tubers. Late blight thrives in cool, wet conditions.
        </Text>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>1. Copper Fungicide:</Text>
                  <Text style={styles.pointDescription}>
                    Copper fungicides are effective in controlling late blight. 
                    hey work by interfering with the cellular processes of the fungus. 
                    While not entirely natural, copper fungicides are permitted in organic farming under certain conditions and are considered a viable option for controlling late blight.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>2. Garlic Spray:</Text>
                  <Text style={styles.pointDescription}>
                    Garlic contains sulfur compounds that have antifungal properties. 
                    a garlic spray involves crushing garlic cloves, steeping them in water, 
                    and then spraying the solution on the plants. This creates a protective layer that helps prevent fungal infections.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>3. Milk Spray:</Text>
                  <Text style={styles.pointDescription}>
                    Milk, particularly raw milk, contains beneficial bacteria 
                    nd compounds like lactoferrin that can inhibit fungal growth.
                     Diluting milk with water and spraying it on plant leaves 
                     can help control late blight by creating an environment unfavorable to the fungus.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>4. Hydrogen Peroxide Solution:</Text>
                  <Text style={styles.pointDescription}>
                    Hydrogen peroxide is a disinfectant that can kill fungal spores on contact. 
                    iluting it with water and spraying it on plants can help control 
                    the spread of late blight by killing spores before they can infect the plant.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>5. Watering Practices:</Text>
                  <Text style={styles.pointDescription}>
                    Wet leaves create an ideal environment for fungal 
                    spores to germinate and infect plants.
                    Watering plants at the base rather than from above keeps the leaves dry. 
                    Watering in the morning ensures that any water that does get on the
                    leaves can evaporate quickly during the day.
                  </Text>
                </View>

                <View style={styles.pointContainer}>
                  <Text style={styles.pointTitle}>6. Clean-Up Debris:</Text>
                  <Text style={styles.pointDescription}>
                    Late blight spores can survive in plant debris and soil over winter. 
                    emoving and destroying all plant debris at the end of the growing season 
                    reduces the chances of the pathogen surviving to infect new plants the following year.
                  </Text>
                </View>

                      </ScrollView>
                    </SafeAreaView>
                    </View>
                  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  
  

  },
  scrollView: {
    marginTop:25,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    marginHorizontal: 10,
    width: 350,
    alignSelf: 'center',
    height: 720,
    marginVertical: 100,
    borderRadius: 10,
  },
  
  heading:{
    marginTop:10,
    fontSize: 22,
    padding:10,
    textAlign:'center',
    fontWeight:'bold',
    color: 'black',

  },

  Subheading:{
    marginTop:10,
    fontSize: 15,
    padding:10,
    textAlign:'auto',
    fontWeight:'bold',
    marginBottom:10,
    color: 'black',

  },

  text: {
    fontSize: 20,
    padding:25,
    color: 'black',
  },

  pointTitle:{
    fontSize: 15,
    padding:10,
    textAlign:'auto',
    fontWeight:'bold',
    marginBottom:10,
    color: 'black',

  },
  pointDescription:{
    fontSize: 13,
    padding:2,
    textAlign:'auto',
    fontWeight:'bold',
    marginBottom:10,
    marginHorizontal:20,
    color: 'black',

  }
});


export default Beefarming;