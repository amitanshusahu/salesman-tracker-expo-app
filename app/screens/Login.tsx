import { postLogin } from "@/lib/http/mutations";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConfig } from "@/constants/AppConfig";
import { primary } from "@/constants/Colors";
import SignupScreen from "./Signup";
import { useUserStore } from "@/state";

export default function LoginScreen({setRender}: {setRender: Function}) {

  const {setIsLogedIn} = useUserStore();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const loginMutation = useMutation({
    mutationFn: postLogin,
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
    console.log(email, password);
    if (email && password) {
      loginMutation.mutate({ email, password });
    }
  }

  const handleInputEmailChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setEmail(e.nativeEvent.text);
  }

  const handleInputPasswordChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPassword(e.nativeEvent.text);
  }

  return (
    <View style={{backgroundColor: 'white', padding: 30, width: "100%", gap: 20, height: "50%"}}>
      <TextInput placeholder="email" onChange={handleInputEmailChange}  style={style.input}/>
      <TextInput placeholder="password" onChange={handleInputPasswordChange} style={style.input}/>
      <Button title="Login" onPress={handleLoginPress} btnStyle={{backgroundColor: primary}} textStyle={{color: "white"}}/>
      <Button title="back" onPress={() => {setRender(<SignupScreen setRender={setRender}/>)}}/>
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