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
      <Image style={{ position: 'absolute', width: '100%', height: '100%' }} blurRadius={5} source={require('../assets/Bg.png')} />
      <SafeAreaView>

        <ScrollView style={styles.scrollView}>

          <Text style={styles.heading}>
            How to do Bee Farming using technology
          </Text>

          <Image style={{ width: 150, height: 150, marginLeft: 20, marginTop: 10 }} source={require('../assets/Pic-03.jpeg')} />

          <Text style={styles.Subheading}>
            Introduction to Bee Farming:
          </Text>
          <Text style={styles.text}>
            Bee farming, also known as apiculture, is the practice of keeping and managing bee colonies for honey production, pollination services, and other bee products like beeswax and royal jelly. With the rapid advancement of technology, beekeepers can now integrate various tech solutions to monitor and enhance bee health, manage hives more effectively, and improve productivity. In this guide, we will explore how technology can play a pivotal role in modern bee farming practices.
          </Text>

          <Text style={styles.Subheading}>
            The Importance of Bee Farming:
          </Text>
          <Text style={styles.text}>
            Bees are crucial for pollination, which supports the production of many of the fruits, vegetables, and seeds we rely on for food. Apart from honey production, bees also help in pollinating plants and flowers, contributing to biodiversity. Bee farming not only provides economic benefits to farmers but also helps in sustaining global food production systems.
          </Text>

          <Text style={styles.Subheading}>
            Technological Tools in Bee Farming:
          </Text>

          <Text style={styles.text}>
            With the advent of smart agriculture, technology has significantly transformed bee farming. Some of the tools that have revolutionized the field include:
          </Text>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>1. Hive Monitoring Systems:</Text>
            <Text style={styles.pointDescription}>
              Hive monitoring systems include sensors that track temperature, humidity, and weight of the hives, providing real-time data to beekeepers. This helps in detecting any abnormalities such as sudden drops in weight, which could indicate a honey theft or a potential health issue among the bees.
            </Text>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>2. Digital Bee Health Monitoring:</Text>
            <Text style={styles.pointDescription}>
              Sensors placed inside the hives can track bee behavior, such as the activity level of bees and the presence of diseases or pests. With advanced AI algorithms, these systems can alert the beekeeper about any potential threats or health issues before they become major problems.
            </Text>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>3. Automated Hive Management:</Text>
            <Text style={styles.pointDescription}>
              Automation tools allow beekeepers to control hive temperature, ventilation, and humidity levels from a mobile device. This ensures optimal conditions for the bees, improving their productivity and overall health.
            </Text>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>4. GPS for Hive Location Tracking:</Text>
            <Text style={styles.pointDescription}>
              GPS-enabled devices help beekeepers track the locations of their hives, ensuring that they are placed in areas with ample forage and away from hazardous zones. This helps in improving bee productivity and prevents loss of hives due to theft or misplacement.
            </Text>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>5. Drones in Bee Farming:</Text>
            <Text style={styles.pointDescription}>
              Drones can be used to monitor the health of beehives, detect pests, and even help in the pollination process. They are especially useful in large-scale bee farming operations, where it's difficult to manually monitor each hive.
            </Text>
          </View>

          <Text style={styles.Subheading}>
            Challenges Faced in Bee Farming:
          </Text>
          <Text style={styles.text}>
            While bee farming offers numerous benefits, it is not without challenges. Some common issues faced by beekeepers include:
          </Text>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>1. Colony Collapse Disorder (CCD):</Text>
            <Text style={styles.pointDescription}>
              CCD is a phenomenon where the majority of worker bees in a colony disappear, leaving behind the queen, food, and a few nurse bees. This can be caused by various factors, including pesticide use, disease, and environmental stressors.
            </Text>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>2. Disease and Pest Control:</Text>
            <Text style={styles.pointDescription}>
              Bees are vulnerable to various diseases and pests, such as the Varroa mite. These pests can weaken the bee colony and affect honey production. Beekeepers need to use both organic and tech-based solutions to monitor and treat diseases and pests effectively.
            </Text>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>3. Climate Change:</Text>
            <Text style={styles.pointDescription}>
              Changes in climate, including rising temperatures and altered rainfall patterns, can affect the availability of forage for bees. It can also cause shifts in the timing of flowering plants, disrupting the bees' natural foraging patterns.
            </Text>
          </View>

          <Text style={styles.Subheading}>
            Sustainable Practices in Bee Farming:
          </Text>
          <Text style={styles.text}>
            To ensure the long-term success of bee farming, it is crucial to adopt sustainable practices that protect the environment and the health of bee colonies:
          </Text>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>1. Integrated Pest Management (IPM):</Text>
            <Text style={styles.pointDescription}>
              Integrated Pest Management (IPM) involves the use of biological, mechanical, and cultural methods to control pests. This reduces the need for harmful chemicals, making bee farming more sustainable.
            </Text>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>2. Organic Practices:</Text>
            <Text style={styles.pointDescription}>
              Organic bee farming focuses on using natural products to maintain healthy bee populations. This includes using natural predators to control pests and promoting biodiversity by planting a variety of flowering plants around the hives.
            </Text>
          </View>

          <View style={styles.pointContainer}>
            <Text style={styles.pointTitle}>3. Conservation of Wild Bees:</Text>
            <Text style={styles.pointDescription}>
              In addition to managing honeybee colonies, beekeepers can contribute to the conservation of wild bee populations by creating habitats that support pollinator diversity, such as planting wildflowers and protecting natural bee habitats.
            </Text>
          </View>

          <Text style={styles.Subheading}>
            Conclusion:
          </Text>
          <Text style={styles.text}>
            Bee farming, combined with the power of technology, can significantly enhance productivity, sustainability, and bee health. By utilizing modern tools and sustainable practices, beekeepers can ensure the success of their farms while also contributing to global biodiversity and food security.
          </Text>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    marginHorizontal: 10,
    width: 350,
    alignSelf: 'center',
    height: 720,
    marginVertical: 100,
    borderRadius: 10,
  },

  heading: {
    marginTop: 10,
    fontSize: 22,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },

  Subheading: {
   
    fontSize: 15,
    padding: 10,
    textAlign: 'auto',
    fontWeight: 'bold',
    marginBottom: -10,
    color: 'black',
  },

  text: {
    fontSize: 15,
    padding: 15,
    color: 'black',
  },

  pointTitle: {
    fontSize: 15,
    padding: 10,
    textAlign: 'auto',
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  pointDescription: {
    fontSize: 13,
    padding: 2,
    textAlign: 'auto',
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
    color: 'black',
  }
});

export default Beefarming;
