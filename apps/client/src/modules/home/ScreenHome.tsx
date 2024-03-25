import {useState} from 'react';
import {useLingui} from '@lingui/react';
import {Slider} from 'react-exo/slider';
import {Text} from 'react-native';
import {Page} from 'common/base/Page';

import {getGreeting} from './utils/getGreeting';

export function ScreenHome() {
  const [slider, setSlider] = useState(0);
  useLingui();
  return (
    <Page title="Home">
      <Text style={{color: 'white'}}>
        {getGreeting()}
      </Text>
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
