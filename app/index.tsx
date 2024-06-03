import { Text } from '@/components/Themed';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'expo-router';
import {useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import FontAwesome from '@expo/vector-icons/FontAwesome';

function getPathFromUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (e) {
    console.error('URL inválida:', e);
    return '';
  }
}

export default function HomeScreen() {
  const router = useRouter()

  const webviewRef = useRef(null)

  const { token, setToken } = useAuthStore()

  function logOut() {
    setToken(null)
    router.push('/login')
  }

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message === 'leaveButtonClicked') {
      logOut();
    }
  };

  const injectJavaScript = `
    (function() {
      document.cookie="access-token=${token}"

      const leaveButton = document.getElementById('leave');

      if(leaveButton) {
        leaveButton.addEventListener('click', () => {
          window.ReactNativeWebView.postMessage('leaveButtonClicked');
        });
      }

      true;
    })();
  `

  function handleNavigationStateChange() {
    if (webviewRef.current) {
      // @ts-ignore
      webviewRef.current.injectJavaScript(injectJavaScript);
    }
  }

  return (
    <WebView
      style={styles.container}
      ref={webviewRef}
      source={{ 
        uri: 'http://192.168.0.14:5001/queues', 
        headers: {
          Cookie: `access-token=${token};`,
        },
      }}
      incognito
      injectedJavaScriptBeforeContentLoaded={injectJavaScript}
      injectedJavaScript={injectJavaScript}
      onNavigationStateChange={handleNavigationStateChange}
      onLoadStart={() => !token && router.replace('/login')}
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
