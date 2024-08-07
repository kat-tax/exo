import {Data} from 'app/data';
import {I18n} from 'app/locales';
import {Layout} from 'app/layout';
import {Router} from 'app/routes';

export default () => {
  return (
    <Data>
      <I18n>
        <Layout>
          <Router/>
        </Layout>
      </I18n>
    </Data>
  )
}
