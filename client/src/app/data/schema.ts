import * as _ from '@evolu/common';
import * as S from '@effect/schema/Schema';

export * from '@effect/schema/Schema';
export type {NotNull} from '@evolu/react-native';

// Data

export type String50 = typeof String50.Type;
export const String50 = _.String.pipe(
  S.minLength(1),
  S.maxLength(50),
  S.brand('String50'),
);

export type Coords = typeof Coords.Type;
export const Coords = S.Tuple(S.Number, S.Number);

export type Label = typeof Label.Type;
export const Label = S.Struct({
  icon: S.String,
  color: S.String,
});

// Ids

export type IdProfile = typeof IdProfile.Type;
export const IdProfile = _.id('Profile');

export type IdDevice = typeof IdDevice.Type;
export const IdDevice = _.id('Device');

export type IdAiPrompt = typeof IdAiPrompt.Type;
export const IdAiPrompt = _.id('AiPrompt');

export type IdTodo = typeof IdTodo.Type;
export const IdTodo = _.id('Todo');

export type IdLabel = typeof IdLabel.Type;
export const IdLabel = _.id('Label');

// Tables

export type TableProfile = typeof TableProfile.Type;
export const TableProfile = _.table({
  id: IdProfile,
  name: S.NullOr(String50),
  groqKey: S.NullOr(_.NonEmptyString1000),
  groqModel: S.NullOr(String50),
  maptilerUrl: S.NullOr(_.NonEmptyString1000),
  maptilerKey: S.NullOr(_.NonEmptyString1000),
  matrixUserId: S.NullOr(_.NonEmptyString1000),
  matrixBaseUrl: S.NullOr(_.NonEmptyString1000),
  matrixAccessToken: S.NullOr(_.NonEmptyString1000),
});

export type TableDevice = typeof TableDevice.Type;
export const TableDevice = _.table({
  id: IdDevice,
  uuid: String50,
  name: S.NullOr(String50),
  coords: S.NullOr(Coords),
  online: S.NullOr(_.SqliteBoolean),
});

export type TableAiPrompt = typeof TableAiPrompt.Type;
export const TableAiPrompt = _.table({
  id: IdAiPrompt,
  model: String50,
  prompt: _.NonEmptyString1000,
  response: _.NonEmptyString1000,
  isMultiline: S.NullOr(_.SqliteBoolean),
});

export type TableTodo = typeof TableTodo.Type;
export const TableTodo = _.table({
  id: IdTodo,
  title: _.NonEmptyString1000,
  labelId: S.NullOr(IdLabel),
  isCompleted: S.NullOr(_.SqliteBoolean),
});

export type TableLabel = typeof TableLabel.Type;
export const TableLabel = _.table({
  id: IdLabel,
  name: String50,
  data: S.NullOr(Label),
});

// Databases

export type DB = typeof DB.Type;
export const DB = _.database({
  aiPrompt: TableAiPrompt,
  profile: TableProfile,
  device: TableDevice,
  label: TableLabel,
  todo: TableTodo,
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
  create('indexDeviceUuid').on('device').column('uuid'),
  create('indexTodoCreatedAt').on('todo').column('createdAt'),
  create('indexLabelCreatedAt').on('label').column('createdAt'),
  create('indexAiPromptCreatedAt').on('aiPrompt').column('createdAt'),
]);
