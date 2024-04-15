import {t} from '@lingui/macro';
import {Text} from 'react-native';
import {useState} from 'react';
import {useLingui} from '@lingui/react';
import {Motion} from 'react-exo/motion';
import {Slider} from 'react-exo/slider';
import {Page} from 'common/base/Page';
import {getGreeting} from 'common/utils/date';

export default function ScreenHome() {
  const [slider, setSlider] = useState(0);
  useLingui();
  return (
    <Page title={t`Home`}>
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
