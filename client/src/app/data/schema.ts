import * as _ from '@evolu/react-native';
import * as S from '@effect/schema/Schema';

/**
 * Data
 */

export type SomeJson = typeof SomeJson.Type;
export const SomeJson = S.Struct({foo: S.String, bar: S.Boolean});

export type NonEmptyString50 = typeof NonEmptyString50.Type;
export const NonEmptyString50 = _.String.pipe(
  S.minLength(1),
  S.maxLength(50),
  S.brand('NonEmptyString50'),
);


/**
 * Ids
 */

export type TodoId = typeof TodoId.Type;
export const TodoId = _.id('Todo');

export type TodoCategoryId = typeof TodoCategoryId.Type;
export const TodoCategoryId = _.id('TodoCategory');


/**
 * Tables
 */

export type TodoTable = typeof TodoTable.Type;
export const TodoTable = _.table({
  id: TodoId,
  title: _.NonEmptyString1000,
  isCompleted: S.NullOr(_.SqliteBoolean),
  categoryId: S.NullOr(TodoCategoryId),
});

export type TodoCategoryTable = typeof TodoCategoryTable.Type;
export const TodoCategoryTable = _.table({
  id: TodoCategoryId,
  name: NonEmptyString50,
  json: S.NullOr(SomeJson),
});


/**
 * Databases
 */

export type Database = typeof Database.Type;
export const Database = _.database({
  todo: TodoTable,
  todoCategory: TodoCategoryTable,
});


/**
 * Indexes
 *
 * While not necessary for development, indexes are required for production.
 * Before adding an index, use `logExecutionTime` and `logExplainQueryPlan`
 * createQuery options.
 *
 * See https://www.evolu.dev/docs/indexes
 */
export const indexes = _.createIndexes((create) => [
  create('indexTodoCreatedAt').on('todo').column('createdAt'),
  create('indexTodoCategoryCreatedAt').on('todoCategory').column('createdAt'),
]);

export interface TodoCategoryForSelect {
  readonly id: TodoCategoryTable['id'];
  readonly name: TodoCategoryTable['name'] | null;
}
