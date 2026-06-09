# Mobile Moon Provisioning

Artemis is the parent-side moon authority for NativePlanet Mobile.

The phone's first-run flow asks for a parent ship hosting URL and `+code`.
After Eyre login, the phone should ask Artemis to create a `%mobile` moon and
return only the fields needed to provision that moon locally:

- moon ship name
- parent ship name
- current moon boot key
- optional display name and role

## Existing Pieces

Artemis already supports:

- `[%make-moon nam=@t rol=%mobile]`
- a `%mobile` moon role
- `/moons` subscription facts
- JSON output containing `who`, `nam`, `rol`, and `sed`

The `sed` value is emitted as `%uw`, which is the boot key format consumed by
NativePlanet Mobile's manual provisioning path.

## Target Phone Flow

1. Phone logs into the parent ship with Eyre.
2. Phone verifies `/apps/artemis/` is reachable.
3. Phone requests a new `%mobile` moon.
4. Artemis creates the moon and returns the boot fields.
5. Phone writes a local boot package and starts Vere.

## API Direction

Two compatible paths are possible:

1. The phone speaks the same Urbit channel API used by the Artemis frontend.
2. Artemis adds a small authenticated mobile endpoint that creates a `%mobile`
   moon and returns the provisioning fields directly.

The second path is likely simpler for Android, as long as the endpoint stays
small and does not turn Artemis into a phone-specific app.

## Security Rules

- Do not log `+code` values.
- Do not log moon boot keys.
- Do not expose existing moon boot keys unless the authenticated operator asks.
- Treat `%mobile` as a first-class role, not a separate product fork.
