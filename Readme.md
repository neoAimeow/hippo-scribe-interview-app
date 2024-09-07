## Getting Started

### Prerequisite

- [node](https://formulae.brew.sh/formula/node)
- [bun](https://bun.sh/)
- [make](https://formulae.brew.sh/formula/make)

### Running Locally

```bash
make install
make ios
```

### Information

* This demo is built using Expo and can currently run on the Expo Go app.
* The project uses Bun and Make as its execution tools, and Bun's superior performance makes it very worthwhile to use.
*
* In this project, I used zustand to manage the state for recording audios and the audio's list. with operations like
  starting and stopping the recording encapsulated within zustand's slices. This approach helps to better separate the
  UI from the
  logic.

