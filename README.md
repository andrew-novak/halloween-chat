<img src="https://github.com/andrew-novak/halloween-chat/raw/main/clientWeb/src/assets/brand-icon.svg" alt="Halloween Chat app logo" width="128" height="128">

# Halloween Chat

An app where users choose their own usernames and engage in chat conversations with Halloween-themed emojis, all while leveraging Socket.IO for real-time communication between the client and server.

## To run demo:

[Demo Halloween Chat](https://andrewnovak.co.uk/demos/halloween-chat/)

## To run in development:

1. Clone the project:

```
git clone https://github.com/andrew-novak/halloween-chat cloned-halloween-chat
```

where `cloned-halloween-chat` represents the name of the destination directory where the repository will be cloned.

2. Navigate to the project root directory `cd ./cloned-halloween-chat`.

3. Install dependencies `npm run install:all`

4. Create `api/.env` file based on `api/example.env`.

5. Run `npm run start:all`

## To deploy for production:

Note that the following instructions do not include configuring standalone web servers like Nginx, Apache, etc.

1. Clone the project:

```
git clone https://andrewnovak.co.uk/halloween-chat cloned-halloween-chat
```

where `cloned-halloween-chat` represents the name of the destination directory where the repository will be cloned.

2. Navigate to the project root directory `cd ./cloned-halloween-chat`.

3. Install dependencies: `npm run install:all`

### API:

4. Set variables on your server based on `api/example.env` with your own production variables, e.g., in the default `~/.bashrc`, your custom `~/.bashrc.d` directory, or some other env file.

5. Rename and move `api` subdirectory to a desired location.

6. Start server using PM2:

```
NODE_ENV=production pm2 start YOUR_API_DIRECTORY/server.js --name YOUR_PM2_APP_NAME
```

`YOUR_API_DIRECTORY` is your renamed API directory

### Client:

7. Navigate back to the project's root directory and then go to the `/client` subdirectory.

8. To set the homepage, use the command:

```
json -I -f package.json -e "this.homepage="<your-homepage-here>"
```

If the website is located in the root location, you can set it as the current directory with:

```
json -I -f package.json -e "this.homepage="."
```

For websites in sublocations, specify the full URL like:

```
json -I -f package.json -e "this.homepage="https://example.com/apps/halloween-chat"
```

9. Build with environment variables, e.g.:

```
export REACT_APP_API_URL='https://example.com/api'
export REACT_APP_SOCKET_IO_BASE="https://example.com"
# Optional env var
export REACT_APP_SOCKET_IO_PATH='/socket.io'
npm run build:clientWeb
```

7. Rename and move `client/build` directory to a desired location (e.g. somewhere in `/usr/share/nginx`).

### Clean up

8. After excluding both `api` and `client/build` directories, you can remove the rest of the cloned project.
