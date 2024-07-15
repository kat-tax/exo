import * as _ from '@evolu/common';
import * as S from '@effect/schema/Schema';

/**
 * Data
 */

export type NonEmptyString50 = typeof NonEmptyString50.Type;
export const NonEmptyString50 = _.String.pipe(
  S.minLength(1),
  S.maxLength(50),
  S.brand('NonEmptyString50'),
);

export type LabelData = typeof LabelData.Type;
export const LabelData = S.Struct({icon: S.String, color: S.String});

/**
 * Ids
 */

export type ProfileId = typeof ProfileId.Type;
export const ProfileId = _.id('Profile');

export type AiPromptId = typeof AiPromptId.Type;
export const AiPromptId = _.id('AiPrompt');

export type TodoId = typeof TodoId.Type;
export const TodoId = _.id('Todo');

export type LabelId = typeof LabelId.Type;
export const LabelId = _.id('Label');

/**
 * Tables
 */

export type ProfileTable = typeof ProfileTable.Type;
export const ProfileTable = _.table({
  id: ProfileId,
  name: S.NullOr(NonEmptyString50),
  groqKey: S.NullOr(_.NonEmptyString1000),
  groqModel: S.NullOr(NonEmptyString50),
});

export type AiPromptTable = typeof AiPromptTable.Type;
export const AiPromptTable = _.table({
  id: AiPromptId,
  model: NonEmptyString50,
  prompt: _.NonEmptyString1000,
  response: _.NonEmptyString1000,
  isMultiline: S.NullOr(_.SqliteBoolean),
});

export type TodoTable = typeof TodoTable.Type;
export const TodoTable = _.table({
  id: TodoId,
  title: _.NonEmptyString1000,
  labelId: S.NullOr(LabelId),
  isCompleted: S.NullOr(_.SqliteBoolean),
});

export type LabelTable = typeof LabelTable.Type;
export const LabelTable = _.table({
  id: LabelId,
  name: NonEmptyString50,
  data: S.NullOr(LabelData),
});

/**
 * Databases
 */

export type Database = typeof Database.Type;
export const Database = _.database({
  profile: ProfileTable,
  aiPrompt: AiPromptTable,
  label: LabelTable,
  todo: TodoTable,
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
  create('indexLabelCreatedAt').on('label').column('createdAt'),
]);

export interface LabelForSelect {
  readonly id: LabelTable['id'];
  readonly name: LabelTable['name'] | null;
}
