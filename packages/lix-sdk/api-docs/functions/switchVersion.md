[**@lix-js/sdk**](../README.md)

***

[@lix-js/sdk](../README.md) / switchVersion

# Function: switchVersion()

> **switchVersion**(`args`): `Promise`\<`void`\>

Defined in: [packages/lix-sdk/src/version/switch-version.ts:27](https://github.com/opral/monorepo/blob/53ab73e26c8882477681775708373fdf29620a50/packages/lix-sdk/src/version/switch-version.ts#L27)

Switches the current Version to the given Version.

The Version must already exist before calling this function.

## Parameters

### args

#### lix

`Pick`\<[`Lix`](../type-aliases/Lix.md), `"db"` \| `"plugin"`\>

#### to

`Pick`\<\{ `id`: `string`; `name`: `string`; \}, `"id"`\>

## Returns

`Promise`\<`void`\>

## Examples

```ts
  await switchVersion({ lix, to: otherVersion });
  ```

Switching Versiones to a newly created Version.

  ```ts
  await lix.db.transaction().execute(async (trx) => {
     const newVersion = await createVersion({ lix: { db: trx }, parent: currentVersion });
     await switchVersion({ lix: { db: trx }, to: newVersion });
  });
  ```
