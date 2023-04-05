# RWR Server ping

![license](https://badgen.net/github/license/Kreedzt/rwr-server-ping)
![latest release](https://badgen.net/github/release/Kreedzt/rwr-server-ping)
![commits count](https://badgen.net/github/commits/Kreedzt/rwr-server-ping)
![last commit](https://badgen.net/github/last-commit/Kreedzt/rwr-server-ping)

Quick query server status by rwr official url.

## Quick Start

Download latest [Release](https://github.com/Kreedzt/rwr-server-ping/releases), double-click exe to run app.

Available features:

-   [x] Latency test
-   [x] Join game / Copy join game command
-   [x] Favorites

## Development

This project is based on [tauri](https://tauri.app/),  depend on the following 2 language environments at the same time:

-   [Nodejs](https://nodejs.org/en/)
-   [Rust](https://www.rust-lang.org/)

After installing the environment, this project relies on `pnpm` for front-end package management

1. Install `pnpm`

```bash
npm i -g pnpm
```

2. Use `pnpm` install dependencies

```bash
pnpm i
```

3. Start development server

```
pnpm tauri dev
```

## Build

Refer to the [tauri](https://tauri.app/zh/v1/guides/building/) documentation, and use the following command to build.

```bash
pnpm tauri build
```

## License

-   [GPLv3](https://opensource.org/licenses/GPL-3.0)


