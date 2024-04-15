import {Store} from 'app/store';
import {Router} from 'app/router';
import {Layout} from 'app/layout';
import {Provider} from 'app/provider';

export default () => {
  return (
    <Store>
      <Provider>
        <Layout>
          <Router/>
        </Layout>
      </Provider>
    </Store>
  )
}
