import {useEffect} from 'react';
import {Linking} from 'react-native';
import {useNavigate} from 'react-router';

const URLEventType = 'url';

/**
 * Enables deep linking, both on the initial app launch and for
 * subsequent incoming links.
 */
export function useDeepLinking() {
  const navigate = useNavigate();

  // Navigate to the initial link
  useEffect(() => {
    let current = true;
    Linking.getInitialURL().then((url) => {
      if (current && url) {
        navigate(trimScheme(url));
      }
    });
    return () => {
      current = false;
    };
  }, [navigate]);

  // Listen for incoming links
  useEffect(() => {
    const handleLink = (event: {url: string}) => navigate(trimScheme(event.url));
    return Linking.addEventListener(URLEventType, handleLink).remove;
  }, [navigate]);
}

function trimScheme(url: string) {
  return url.replace(/^.*?:\/\//, '');
}
