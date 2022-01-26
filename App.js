import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Linking,
} from "react-native";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [isVisible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [emailUrl, setEmailUrl] = useState("");

  //Fetch data on button click
  const handleFetch = async () => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=2ae80041831d4eabb99234451222301&q=${city}&aqi=no`
    );

    if (!response.ok) {
      const message = `Bad requests: ${response.status}`;
      alert(message);
      return;
    }

    const data = await response.json();
    setWeather(data);
    setVisible(true);
  };
  // Deal with the email if present
  const handleEmailClick = async () => {
    if (email) {
      const regex = /\S+@\S+\.\S+/; //regex to see if it is some valid email
      if (!regex.test(email)) {
        alert(`Please enter a valid email address!`);
        return;
      }

      if (!weather) {
        alert(`You should enter some city, first`);
        return;
      }

      const response = await fetch(`http://localhost:3000/mail`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify({ email, weather }),
      });
      const data = await response.json();
      setEmailUrl(data.response);
    } else {
      alert("Please enter email address!");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter city name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Example: Sofia"
        onChange={(event) => setCity(event.target.value)}
      />
      <Button
        variant="primary"
        type="button"
        onPress={() => handleFetch()}
        title="Check weather"
      ></Button>
      {isVisible && (
        <Text>
          {`The current time in ${weather.location.name} is ${weather.location.localtime} 
      and the temperature is ${weather.current.temp_c} degrees`}
        </Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email Adress:"
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button
        variant="primary"
        type="button"
        onPress={() => handleEmailClick()}
        title="Get email"
      />
      {isVisible && !!emailUrl && (
        <Text onPress={() => Linking.openURL(emailUrl)}>
          Click here to open email preview!
        </Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: `#777`,
    padding: 8,
    margin: 10,
    width: 150,
    alignContent: "center",
  },
});
