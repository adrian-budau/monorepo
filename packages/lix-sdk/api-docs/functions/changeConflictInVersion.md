[**@lix-js/sdk**](../README.md)

***

[@lix-js/sdk](../README.md) / changeConflictInVersion

# Function: changeConflictInVersion()

> **changeConflictInVersion**(`version`): (`eb`) => `ExpressionWrapper`\<[`LixDatabaseSchema`](../type-aliases/LixDatabaseSchema.md), `"change_conflict"`, `SqlBool`\>

Defined in: [packages/lix-sdk/src/query-filter/change-conflict-in-version.ts:15](https://github.com/opral/monorepo/blob/53ab73e26c8882477681775708373fdf29620a50/packages/lix-sdk/src/query-filter/change-conflict-in-version.ts#L15)

Filters if a conflict is in the given version.

## Parameters

### version

`Pick`\<\{ `id`: `string`; `name`: `string`; \}, `"id"`\>

## Returns

`Function`

### Parameters

#### eb

`ExpressionBuilder`\<[`LixDatabaseSchema`](../type-aliases/LixDatabaseSchema.md), `"change_conflict"`\>

### Returns

`ExpressionWrapper`\<[`LixDatabaseSchema`](../type-aliases/LixDatabaseSchema.md), `"change_conflict"`, `SqlBool`\>

## Example

```ts
  const conflicts = await lix.db.selectFrom("change_conflict")
     .where(changeConflictInVersion(currentVersion))
     .selectAll()
     .execute();
  ```
