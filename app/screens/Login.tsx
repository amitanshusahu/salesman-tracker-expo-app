import { postLogin } from "@/lib/http/mutations";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, NativeSyntheticEvent, SafeAreaView, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConfig } from "@/constants/AppConfig";

export default function LoginScreen() {

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async (data) => {
      console.log(data);
      await AsyncStorage.setItem(AppConfig.TOKEN_NAME, JSON.stringify(data));
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
    <View>
      <Text>Login Screen</Text>
      <TextInput placeholder="email" onChange={handleInputEmailChange} />
      <TextInput placeholder="password" onChange={handleInputPasswordChange} />
      <Button title="Login" onPress={handleLoginPress} />
      <Text>login sataus: </Text>
      <Link href={"/explore"}> Register </Link>
    </View>
  )
}