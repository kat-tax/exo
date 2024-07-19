import * as _ from '@evolu/common';
import * as S from '@effect/schema/Schema';

// Primitives

export type String50 = typeof String50.Type;
export const String50 = _.String.pipe(
  S.minLength(1),
  S.maxLength(50),
  S.brand('String50'),
);

// Data

export type Coords = typeof Coords.Type;
export const Coords = S.Tuple(S.Number, S.Number);

export type Label = typeof Label.Type;
export const Label = S.Struct({
  icon: S.String,
  color: S.String,
});

// Ids

export type ProfileId = typeof ProfileId.Type;
export const ProfileId = _.id('Profile');

export type DeviceId = typeof DeviceId.Type;
export const DeviceId = _.id('Device');

export type AiPromptId = typeof AiPromptId.Type;
export const AiPromptId = _.id('AiPrompt');

export type TodoId = typeof TodoId.Type;
export const TodoId = _.id('Todo');

export type LabelId = typeof LabelId.Type;
export const LabelId = _.id('Label');

// Tables

export type ProfileTable = typeof ProfileTable.Type;
export const ProfileTable = _.table({
  id: ProfileId,
  name: S.NullOr(String50),
  groqKey: S.NullOr(_.NonEmptyString1000),
  groqModel: S.NullOr(String50),
});

export type DeviceTable = typeof DeviceTable.Type;
export const DeviceTable = _.table({
  id: DeviceId,
  uuid: String50,
  name: S.NullOr(String50),
  coords: S.NullOr(Coords),
  online: S.NullOr(_.SqliteBoolean),
});

export type AiPromptTable = typeof AiPromptTable.Type;
export const AiPromptTable = _.table({
  id: AiPromptId,
  model: String50,
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
  name: String50,
  data: S.NullOr(Label),
});

// Databases

export type Database = typeof Database.Type;
export const Database = _.database({
  aiPrompt: AiPromptTable,
  profile: ProfileTable,
  device: DeviceTable,
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
  create('indexDeviceUuid').on('device').column('uuid'),
  create('indexTodoCreatedAt').on('todo').column('createdAt'),
  create('indexLabelCreatedAt').on('label').column('createdAt'),
  create('indexAiPromptCreatedAt').on('aiPrompt').column('createdAt'),
]);
