import * as _ from '@evolu/react-native';
import * as S from '@effect/schema/Schema';
import * as $ from './schema';

export * from './schema';

export const createDatabase = () => _.createEvolu($.Database, {
  indexes: $.indexes,
  ...(__DEV__ && {syncUrl: 'http://localhost:4000'}),
  initialData: (evolu) => {
    const {id: categoryId} = evolu.create('todoCategory', {
      name: S.decodeSync($.NonEmptyString50)('Not Urgent'),
    });
    evolu.create('todo', {
      title: S.decodeSync(_.NonEmptyString1000)('Try React Suspense'),
      categoryId,
    });
  },
  // minimumLogLevel: 'trace',
});

export const evolu = createDatabase();

export const todoCategories = evolu.createQuery((db) => db
  .selectFrom('todoCategory')
  .select(['id', 'name', 'json'])
  .where('isDeleted', 'is not', _.cast(true))
  // Filter null value and ensure non-null type.
  .where('name', 'is not', null)
  .$narrowType<{name: _.NotNull}>()
  .orderBy('createdAt'),
);

// Evolu queries should be collocated. If necessary, they can be preloaded.
export const todosWithCategories = evolu.createQuery((db) => db
  .selectFrom('todo')
  .select(['id', 'title', 'isCompleted', 'categoryId'])
  .where('isDeleted', 'is not', _.cast(true))
  // Filter null value and ensure non-null type.
  .where('title', 'is not', null)
  .$narrowType<{title: _.NotNull}>()
  .orderBy('createdAt')
  // https://kysely.dev/docs/recipes/relations
  .select((eb) => [
    _.jsonArrayFrom(eb
      .selectFrom('todoCategory')
      .select(['todoCategory.id', 'todoCategory.name'])
      .where('isDeleted', 'is not', _.cast(true))
      .orderBy('createdAt'),
    ).as('categories'),
  ]), {
    // logQueryExecutionTime: true,
    // logExplainQueryPlan: true,
  },
);

export function Database(props: React.PropsWithChildren) {
  return (
    <_.EvoluProvider value={evolu}>
      {props.children}
    </_.EvoluProvider>
  )
}
