import {useState} from 'react';
import {useLingui} from 'react-exo/i18n';
import {Motion} from 'react-exo/motion';
import {Slider} from 'react-exo/slider';
import {Text} from 'react-native';
import {Page} from 'core/components/Page';
import {getGreeting} from 'core/utils/date';

export default function ScreenHome() {
  const [slider, setSlider] = useState(0);
  useLingui();
  return (
    <Page title="Home">
      <Text style={{color: 'white'}}>
        {getGreeting()}
      </Text>
      <Motion.View
        initial={{y: -50}}
        animate={{x: 1 * 100, y: 0}}
        transition={{type: 'spring'}}
        whileHover={{scale: 1.2}}
        whileTap={{y: 20}}
      />
      <Slider
        step={10}
        value={50}
        minimumValue={0}
        maximumValue={100}
        onChange={value => {
          setSlider(value);
        }}
      />
      <Text>{slider}</Text>
    </Page>
  );
}
