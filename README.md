# ServerBee Status

Serverless status api for ServerBee.

## API

### GET /version
> Get the latest release version that excludes pre-release versions.

```bash
curl https://status.serverbee.app/api/version
```

response:
```bash
v1.2.6
```

### GET /pre-version
> Get the latest release version that includes pre-release versions.

```bash
curl https://status.serverbee.app/api/pre-version
```

response:
```bash
v1.2.6
```

## Development

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

## Snapshot

![](./snapshot.png)
