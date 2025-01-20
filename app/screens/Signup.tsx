import { postSignup } from "@/lib/http/mutations";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConfig } from "@/constants/AppConfig";
import { primary } from "@/constants/Colors";
import LoginScreen from "./Login";
import { useUserStore } from "@/state";

export default function SignupScreen({ setRender }: { setRender: Function }) {

  const [email, setEmail] = useState<string>();
  const {setIsLogedIn} = useUserStore();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const signupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: async (data: {token: string}) => {
      console.log(data);
      await AsyncStorage.setItem(AppConfig.TOKEN_NAME, JSON.stringify(data.token));
      setIsLogedIn(true);
    },
    onError: (error) => {
      console.log(error.stack);
    }
  })

  const handleLoginPress = () => {
    console.log(email, password, name);
    if (email && password && name) {
      signupMutation.mutate({ name,  email, password });
    }
  }

  const handleInputEmailChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setEmail(e.nativeEvent.text);
  }

  const handleInputPasswordChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPassword(e.nativeEvent.text);
  }

  const handleInputNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setName(e.nativeEvent.text);
  }

  return (
    <View style={{ backgroundColor: 'white', padding: 30, width: "100%", gap: 20, height: "50%" }}>
      <TextInput placeholder="name" onChange={handleInputNameChange} style={style.input} />
      <TextInput placeholder="email" onChange={handleInputEmailChange} style={style.input} />
      <TextInput placeholder="password" onChange={handleInputPasswordChange} style={style.input} />
      <Button title="Signup" onPress={handleLoginPress} btnStyle={{ backgroundColor: primary }} textStyle={{ color: "white" }} />
      <Button title="back" onPress={() => { setRender(<LoginScreen setRender={setRender} />) }} />
    </View>
  )
}

const style = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  }
})