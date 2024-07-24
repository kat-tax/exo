import config from 'config';
import * as _ from '@evolu/react-native';
import * as S from 'app/data/schema';
export * from './schema';

export const evolu = _.createEvolu(S.DB, {
  name: `${config.APP_NAME}::0001`,
  syncUrl: __DEV__ ? 'http://localhost:6306' : config.SYNC_HOST,
  minimumLogLevel: __DEV__ ? 'trace' : 'warning',
  indexes: S.indexes,
  initialData: (init) => {
    init.create('profile', {
      name: null,
      groqKey: null,
      groqModel: S.decodeSync(S.String50)('llama3-8b-8192'),
    });
  },
});

export function Database(props: React.PropsWithChildren) {
  return (
    <_.EvoluProvider value={evolu}>
      {props.children}
    </_.EvoluProvider>
  )
}

export const useDevices = () => _.useQuery(devices).rows;
export const devices = evolu.createQuery(db => db
  .selectFrom('device')
  .select(['id', 'uuid', 'name', 'coords', 'online'])
  .where('isDeleted', 'is not', _.cast(true))
  .orderBy('createdAt')
);

export const useDevice = (uuid: S.String50) => _.useQuery(device(uuid)).row;
export const device = (uuid: S.String50) => evolu.createQuery(db => db
  .selectFrom('device')
  .select(['id', 'uuid', 'name', 'coords', 'online'])
  .where('isDeleted', 'is not', _.cast(true))
  .where('uuid', '=', uuid)
  .limit(1)
);

export const useProfile = () => _.useQuery(profile).row;
export const profile = evolu.createQuery(db => db
  .selectFrom('profile')
  .select(['id', 'name', 'groqKey', 'groqModel'])
  .where('isDeleted', 'is not', _.cast(true))
  .orderBy('createdAt')
  .limit(1)
);

export const useLabels = () => _.useQuery(labels).rows;
export const labels = evolu.createQuery(db => db
  .selectFrom('label')
  .select(['id', 'name', 'data'])
  .where('isDeleted', 'is not', _.cast(true))
  .where('name', 'is not', null)
  .$narrowType<{name: _.NotNull}>()
  .orderBy('createdAt')
);

export const usePrompts = () => _.useQuery(prompts).rows;
export const prompts = evolu.createQuery(db => db
  .selectFrom('aiPrompt')
  .select(['id'])
  .where('isDeleted', 'is not', _.cast(true))
  .orderBy('createdAt')
);

export const usePrompt = (id: S.IdAiPrompt) => _.useQuery(prompt(id)).row;
export const prompt = (id: S.IdAiPrompt) => evolu.createQuery(db => db
  .selectFrom('aiPrompt')
  .select(['id', 'model', 'prompt', 'response', 'isMultiline', 'createdAt'])
  .where('isDeleted', 'is not', _.cast(true))
  .where('id', '=', id)
  .limit(1)
);

export const useNotes = () => _.useQuery(notes).rows;
export const notes = evolu.createQuery(db => db
  .selectFrom('todo')
  .select(['id', 'title', 'isCompleted', 'labelId'])
  .where('isDeleted', 'is not', _.cast(true))
  .where('title', 'is not', null)
  .$narrowType<{title: _.NotNull}>()
  .orderBy('createdAt')
  // https://kysely.dev/docs/recipes/relations
  .select((eb) => [
    _.jsonArrayFrom(eb
      .selectFrom('label')
      .select(['label.id', 'label.name'])
      .where('isDeleted', 'is not', _.cast(true))
      .orderBy('createdAt'),
    ).as('categories')
  ]), {
    // logQueryExecutionTime: true,
    // logExplainQueryPlan: true,
  },
);
