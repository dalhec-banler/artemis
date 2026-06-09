# artemis

urbit moon fleet manager

artemis is a modernized moon management app for Urbit. It lets you create moons, rotate keys, breach moons, organize them with names, roles, and tags, and keep the current boot key close at hand for recovery or deployment.

## What Artemis Manages

artemis exposes a poke api for moon operations:

- `|moon`
- `|moon-breach`
- `|moon-cycle-keys`

artemis only accepts pokes from `our.bowl`.

jael remains the source of truth for each moon's public key, life, and rift. when a moon is created or rekeyed through artemis, artemis keeps a copy of the current moon boot key so operators can immediately copy it, download a `.key` file, or boot the moon directly.

## Booting A Moon

moons can be initially booted with either the direct boot key or a downloaded `.key` file:

`./urbit -w <moon-name> -G <moon-boot-key> -c <pier-name>`

or

`./urbit -w sampel-sampel-palnet -k ./sampel-sampel-palnet.key -c sampel-sampel-palnet`

after the first boot, start the moon normally:

`./urbit <pier-name>`

## Using The Frontend

the `New Moon` flow creates a new moon and assigns it a name and role.

each moon card supports:

- copying the moon boot key
- downloading a `.key` file
- copying `-k` and direct `-G` boot commands
- cycling keys
- breaching
- forgetting the moon from artemis state
- renaming the moon
- assigning a role
- adding and removing tags

roles are intended to make a fleet easier to reason about at a glance:

- `mobile`
- `agent`
- `dev`
- `personal`

`mobile` moons are intended for NativePlanet Mobile phones. See
[`docs/mobile-provisioning.md`](docs/mobile-provisioning.md) for the current
phone provisioning direction.

## Using The API

artemis can be poked by other apps to create, breach, rekey, rename, retag, and reclassify moons.

to get a moon's data from artemis:

```hoon
+artemis!get ~sampel-sampel-palnet
```

the desk also includes simple CLI generators:

```hoon
:artemis|create 'sample moon' %personal
:artemis|rekey ~sampel-sampel-palnet
:artemis|breach ~sampel-sampel-palnet
:artemis|tag ~sampel-sampel-palnet 'edge-node'
```

## Installing The Desk From Source

in dojo:

```hoon
|merge %artemis our %base
|mount %artemis
```

copy the desk contents into the mounted desk, then in dojo:

```hoon
|commit %artemis
|install our %artemis
```

## UI Development

artemis is built with React, TypeScript, Tailwind CSS, and Vite.

to get started:

```sh
cd ui
npm install
```

for local development, create `ui/.env.local` with:

```sh
VITE_SHIP_URL={URL}
```

then run:

```sh
npm run dev
```

to produce the distributable frontend bundle:

```sh
npm run build
```
