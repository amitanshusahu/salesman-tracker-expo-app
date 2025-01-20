import Button from "@/components/ui/Button";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginScreen from "./Login";
import SignupScreen from "./Signup";

export default function LoginAndSignup() {
  const [render, setRender] = useState(
    <View style={{
      width: "100%",
      gap: 20,
      padding: 30,
    }}>
      <Button
        title="Login"
        btnStyle={styles.loginButton}
        textStyle={styles.loginbuttonText}
        onPress={() => setRender(<LoginScreen setRender={setRender}/>)}
      />
      <View style={{ height: 20 }}>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
      <Button
        title="Signup"
        btnStyle={styles.signupButton}
        textStyle={styles.signupButtonText}
        onPress={() => setRender(<SignupScreen setRender={setRender}/>)}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headingHolder}>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Salesman</Text>
        <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'white' }}>Track</Text>
        <Text style={{ fontSize: 14, color: 'white' }}>we track sales this is just a prototype application</Text>
      </View>
      {render}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#2b7cff",
    justifyContent: "flex-end",
    alignItems: "baseline",
  },
  headingHolder: {
    marginBottom: 50,
    padding: 30,
  },
  buttonHolder: {
    width: "100%",
    gap: 20,
    padding: 30,
  },
  loginButton: {
    width: "100%"
  },
  loginbuttonText: {
    color: "#aaa"
  },
  signupButton: {
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "transparent",
    width: "100%",
  },
  signupButtonText: {
    color: "white"
  }
})