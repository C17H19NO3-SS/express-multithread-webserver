# Express.js Multithreaded Web Server

This project demonstrates a multithreaded Express.js web server using the `workers` module. This allows for handling multiple requests concurrently, improving performance under heavy load.

## Features

- Multithreading using Bun.js's `workers`
- Improved performance compared to single-threaded servers
- Handles multiple requests concurrently
- Clean and efficient code structure

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/C17H19NO3-ss/express-multithread-webserver.git
   ```

2. **Install dependencies:**

   ```bash
   cd express-multithread-webserver
   bun install
   ```

3. **Run the server:**
   ```bash
   bun run start
   ```

## Architecture

The server utilizes a master thread to manage worker threads. Each worker thread handles a subset of incoming requests. This distribution of workload significantly enhances the server's capacity to handle concurrent requests.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

Everyone is allowed to copy, distribute and modify this licence document verbatim.
