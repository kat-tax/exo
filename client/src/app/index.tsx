import {Store} from 'app/store';
import {Database} from 'app/data';
import {Provider} from 'app/provider';
import {Layout} from 'app/layout';
import {Router} from 'app/router';

export default () => {
  return (
    <Store>
      <Database>
        <Provider>
          <Layout>
            <Router/>
          </Layout>
        </Provider>
      </Database>
    </Store>
  )
}
