import {Database} from 'app/data';
import {Provider} from 'app/provider';
import {Locales} from 'app/locales';
import {Layout} from 'app/layout';
import {Router} from 'app/router';

export default () => {
  return (
    <Database>
      <Locales>
        <Provider>
          <Layout>
            <Router/>
          </Layout>
        </Provider>
      </Locales>
    </Database>
  )
}
