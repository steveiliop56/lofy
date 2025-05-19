# Lofy

A simple logo generator that takes a transparent PNG logo and outputs an aligned 512x512 JPG for use in dashboards.

![Screenshot](/assets/screenshot.png)

## Usage

To use the app just go to the [website](https://lofy.doesmycode.work). The entire app runs client-side and no files are stored on the server.

## Running locally

Right now no docker images or deployment methods are provided. If you would like to run locally you will need to clone the repository with:

```sh
git clone https://github.com/steveiliop56/lofy
```

Install the requirements with bun:

```sh
bun install
```

And either run the development server with:

```sh
bun run dev
```

Or build the app:

```sh
bun run build
```

Once the build finishes, the output will be stored in the `dist` directory which you can deploy with a simple web server like nginx.

## License

Lofy is licensed under the GNU General Public License v3.0. TL;DR — You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions. For more information about the license check the [license](./LICENSE) file.
