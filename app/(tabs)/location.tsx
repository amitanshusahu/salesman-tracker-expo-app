import Button from "@/components/ui/Button";
import { API_ROUTES } from "@/constants/ApiRoutes";
import { api } from "@/lib/axios/axios";
import { addLocation } from "@/lib/http/mutations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, ScrollView } from "react-native";
import * as Location from 'expo-location';
import QRCode from 'react-native-qrcode-svg';

interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface LocationData {
  data: Location[];
}

async function getLocationById(): Promise<LocationData> {
  const res = await api.get(API_ROUTES.LOCATION.GET_BY_MANAGER_ID);
  return res.data;
}

export default function LocationList() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [v, setV] = useState(0);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission Denied');
      return;
    }

    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      alert(
        `'Location Retrieved',
        Latitude: ${loc.coords.latitude}, Longitude: ${loc.coords.longitude}`
      );
      setLatitude(loc.coords.latitude);
      setLongitude(loc.coords.longitude);
      console.log(typeof (loc.coords.latitude));
    } catch (error) {
      alert('Error');
      console.error(error);
    }
  };

  const handleInputNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setName(e.nativeEvent.text);
  }

  const handleAddressChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setAddress(e.nativeEvent.text);
  }

  const mutation = useMutation({
    mutationFn: addLocation,
    onSuccess: (data) => {
      console.log(data);
      setV(Math.random());
    }
  })

  const handleAddSalesmen = () => {
    console.log(name, address, latitude, longitude);
    getLocation();
    if (latitude && longitude) {
      mutation.mutate({ name, address, latitude, longitude });
    }
  }

  const { data, isLoading, isError } = useQuery<LocationData>({
    queryKey: ["salesmen", v],
    queryFn: getLocationById
  })

  if (data) {
    console.log("query data", data);
  }

  return (
    <ScrollView>
      <View style={{ padding: 30, display: 'flex', alignItems: 'center', minHeight: '100%', gap: 20, position: 'relative' }}>
        <View style={{ padding: 30, display: 'flex', width: '100%', gap: 20 }}>
          <TextInput placeholder="name" onChange={handleInputNameChange} style={style.input} />
          <TextInput placeholder="address" onChange={handleAddressChange} style={style.input} />
          <Button title="add location" btnStyle={{ width: '100%', bottom: 20 }} onPress={() => handleAddSalesmen()} />

          {isLoading && <Text>Loading...</Text>}
          {isError && <Text>Error...</Text>}
          {data && data.data.map((item) =>
            <View style={{padding: 30, width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10'}}>
              <Text>{item.name}</Text>
              <QRCode
                value={`latitue: ${item.latitude}, longitude: ${item.longitude}`}
                size={230}
              />
            </View>)}
        </View>
      </View>
    </ScrollView>
  )
}


const style = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
  }
})