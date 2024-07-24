import {Trans} from '@lingui/macro';
import {View} from 'react-native';
import {Icon} from 'react-exo/icon';
import {Page} from 'app/base/Page';
import {Frame} from 'dev/base/Frame';
import * as Design from 'design';

export default function ScreenDesign() {
  return (
    <Page
      title={<Trans>Design</Trans>}
      message={<Trans>{`${11} components`}</Trans>}>
      <Frame title="Button">
        <Design.Button
          mode="Primary"
          state="Default"
          label="Primary"
        />
        <Design.Button
          mode="Secondary"
          state="Default"
          label="Secondary"
        />
        <Design.Button
          mode="Destructive"
          state="Default"
          label="Destructive"
        />
        <Design.Button
          mode="Text"
          state="Default"
          label="Text"
        />
      </Frame>
      <Frame title="Badge">
        <Design.Badge label="Default"
          mode="Default"
          state="Default"
          showLabel={true}
        />
        <Design.Badge
          mode="Info"
          state="Default"
          label="Info"
          showLabel={true}
        />
        <Design.Badge
          mode="Success"
          state="Default"
          label="Success"
          showLabel={true}
        />
        <Design.Badge
          mode="Warning"
          state="Default"
          label="Warning"
          showLabel={true}
        />
        <Design.Badge
          mode="Error"
          label="Error"
          state="Default"
          showLabel={true}
        />
      </Frame>
      <Frame title="InputText">
        <Design.InputText
          state="Empty"
          caption=""
          label=""
          placeholder="User Name"
          icon={<Icon name="ph:user"/>}
          showLabel={false}
          showCaption={false}
        />
      </Frame>
      <Frame title="InputEmail">
        <Design.InputEmail
          state="Empty"
          caption=""
          label=""
          placeholder="Email Address"
          icon={<Icon name="ph:mail"/>}
          showLabel={false}
          showCaption={false}
        />
      </Frame>
      <Frame title="InputPassword">
        <Design.InputPassword
          state="Empty"
          caption=""
          label=""
          placeholder="Enter Password"
          icon={<Icon name="ph:lock"/>}
          showLabel={false}
          showCaption={false}
        />
      </Frame>
      <Frame title="Article">
        <Design.Article
          header="Lorem Ipsum"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          footer="Lorem ipsum dolor sit amet"
          hasFooter={true}
          hasTags={false}
        />
      </Frame>
      <Frame title="Panel">
        <Design.Panel
          header="Lorem Ipsum"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        />
      </Frame>
      <Frame title="Prompt">
        <View style={{flex: 1, maxWidth: 480}}>
          <Design.Prompt
            title="Lorem Ipsum"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
            showClose={true}
            confirmButton={
              <Design.Button
                mode="Primary"
                state="Default"
                label="Confirm"
              />
            }
          />
        </View>
      </Frame>
      <Frame title="Status">
        <Design.Status
          mode="Default"
          value="!"
          hasValue={true}
        />
        <Design.Status
          mode="Info"
          value="!"
          hasValue={true}
        />
        <Design.Status
          mode="Success"
          value="!"
          hasValue={true}
        />
        <Design.Status
          mode="Warning"
          value="!"
          hasValue={true}
        />
        <Design.Status
          mode="Error"
          value="!"
          hasValue={true}
        />
      </Frame>
      <Frame title="Alert">
        <Design.Alert
          mode="Default"
          header="Lorem Ipsum"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          hasIcon={true}
          icon={<Icon name="ph:info"/>}
        />
        <Design.Alert
          mode="Destructive"
          header="Lorem Ipsum"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          hasIcon={true}
          icon={<Icon name="ph:warning"/>}
        />
      </Frame>
    </Page>
  );
}
