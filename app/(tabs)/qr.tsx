import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
export default function qr() {
  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: "100%", padding: 30}}>

      <QRCode
      value={"latitue: 19, longitude: 186"}
    />
    </View>
  )
}