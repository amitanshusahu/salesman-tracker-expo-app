import Button from "@/components/ui/Button";
import { API_ROUTES } from "@/constants/ApiRoutes";
import { api } from "@/lib/axios/axios";
import { addSalesMan } from "@/lib/http/mutations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

interface SalesMen {
  id: number;
  name: string;
  uid: string;
  phone: string;
  managerId: number;
}

interface SalesMenData {
  data: SalesMen[];
}

async function getSalesMenById(): Promise<SalesMenData> {
  const res = await api.get(API_ROUTES.SALESMEN.GET_BY_MANAGER_ID);
  return res.data;
}

export default function salesmen() {
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const [v, setV] = useState(0);

  const handleInputNameChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setName(e.nativeEvent.text);
  }

  const handleInputUidChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setUid(e.nativeEvent.text);
  }

  const mutation = useMutation({
    mutationFn: addSalesMan,
    onSuccess: (data) => {
      console.log(data);
      setV(Math.random());
    }
  })

  const handleAddSalesmen = () => {
    console.log(name, uid);
    mutation.mutate({name, userid: uid});
  }

  const { data, isLoading, isError } = useQuery<SalesMenData>({
    queryKey: ["salesmen", v],
    queryFn: getSalesMenById
  })

  if(data) {
    console.log(data);
  }

  return (
    <View style={{padding: 30, display: 'flex', alignItems: 'center', minHeight: '100%', gap: 20, position: 'relative'}}>
      <Button title="add salesmen" btnStyle={{ width: '100%', position: 'absolute', bottom: 20}} onPress={() => handleAddSalesmen()}/>
      <View style={{padding: 30, display: 'flex', width: '100%', gap: 20}}>
      <TextInput placeholder="name" onChange={handleInputNameChange} style={style.input} />
      <TextInput placeholder="uid" onChange={handleInputUidChange} style={style.input} />

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error...</Text>}
      {data && data.data.map((item) => <Text key={item.id}>{item.name}</Text>)}
      </View>
    </View>
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