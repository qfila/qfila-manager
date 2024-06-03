import { Text } from '@/components/Themed';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'expo-router';
import {useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
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
  const [pathname, setPathname] = useState<string | null>('/')
  const router = useRouter()

  const webviewRef = useRef(null)

  const { token, setToken } = useAuthStore()

  const injectJavaScript = `
    (function() {
      document.cookie="access-token=${token}"

      const leaveButton = document.querySelector('button');
      if (leaveButton && leaveButton.innerText === 'Sair') {
        leaveButton.style.display = 'none';
        leaveButton.remove();
      }
    })();
  `

  function logOut() {
    setToken(null)
    router.push('/login')
  }

  function handleNavigationStateChange(navState: WebViewNavigation) {
    setPathname(getPathFromUrl(navState.url))

    if (webviewRef.current) {
      // @ts-ignore
      webviewRef.current.injectJavaScript(injectJavaScript);
    }
  }

  return (
    <>
      <WebView
        ref={webviewRef}
        source={{ 
          uri: 'http://192.168.0.101:5001', 
          headers: {
            Cookie: `access-token=${token};`,
          },
        }}
        incognito
        injectedJavaScriptBeforeContentLoaded={injectJavaScript}
        injectedJavaScript={injectJavaScript}
        onNavigationStateChange={handleNavigationStateChange}
        onLoadStart={() => !token && router.replace('/login')}
      />
      {pathname === '/' && (
        <TouchableOpacity style={styles.pressable} onPress={logOut}>
          <FontAwesome name='sign-out' size={24} color={'#044557'} />
          <Text style={styles.pressableText}>
            Sair
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24
  },
  pressable: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    top: 70,
  },
  pressableText: {
    color: '#044557',
    fontFamily: 'Poppins-Light',
    fontSize: 16
  },
});
