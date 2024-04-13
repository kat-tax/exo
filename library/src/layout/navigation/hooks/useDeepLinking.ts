import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import {Linking} from 'react-native';

/**
 * Enables deep linking, both on the initial app launch and for
 * subsequent incoming links.
 */
export function useDeepLinking() {
  const navigate = useNavigate();

  // Navigate to the initial link
  useEffect(() => {
    let current = true;
    Linking.getInitialURL().then(url => {
      if (current && url)
        navigate(trimScheme(url));
    });
    return () => {current = false};
  }, [navigate]);

  // Listen for incoming links
  useEffect(() =>
    Linking.addEventListener('url', (e: {url: string}) =>
      navigate(trimScheme(e.url))).remove
  , [navigate]);
}

function trimScheme(url: string) {
  return url.replace(/^.*?:\/\//, '');
}
