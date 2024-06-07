import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

export default function HomeScreen() {
  const router = useRouter()

  const webviewRef = useRef(null)

  const { token, setToken } = useAuthStore()

  function logOut() {
    setToken(null)
    router.push('/')
  }

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message === 'leaveButtonClicked') {
      logOut();
    }
  };

  const injectJavaScript = `
    document.cookie="access-token=${token}"

    const leaveButton = document.getElementById('leave');

    if(leaveButton) {
      leaveButton.addEventListener('click', () => {
        window.ReactNativeWebView.postMessage('leaveButtonClicked');
      });
    }

    true;
  `

  return (
    <WebView
      style={styles.container}
      ref={webviewRef}
      source={{ 
        uri: 'https://qfila.vercel.app/queues', 
        headers: {
          Cookie: `access-token=${token};`,
        },
      }}
      incognito
      injectedJavaScript={injectJavaScript}
      onMessage={handleMessage}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32
  },
});
