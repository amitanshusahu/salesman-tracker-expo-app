import { getMe } from "@/lib/http/quries";
import { useUserStore } from "@/state";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button, SafeAreaView, Text, TextInput, View } from "react-native";

export default function LoginScreen() {

  const {setIsLogedIn, isLogedIn} = useUserStore();
  const loginQuery = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !isLogedIn,
    retry: false,
  })

  useEffect( () => {
    if(!isLogedIn && loginQuery.isSuccess && loginQuery.data) {
      console.log(loginQuery.data);
      setIsLogedIn(true);
    }
    if(loginQuery.data) {
      console.log(loginQuery.data);
    }
    if(loginQuery.isError) {
      console.log(loginQuery.error.stack);
    }
  }, []);

  const handleLoginPress = () => {

  }

  return (
    <SafeAreaView>
      <View>
        <Text>Login Screen</Text>
        <TextInput placeholder="UID" />
        <Button title="Login" onPress={handleLoginPress} />
        <Text>login now</Text>
      </View>
    </SafeAreaView>
  )
}