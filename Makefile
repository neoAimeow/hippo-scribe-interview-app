ROOT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
NODE_BIN_DIR = ${ROOT_DIR}/node_modules/.bin

upgrade:
	bun x npm-check-updates -ui
install:
	bun install
ios:
	bun run ios
android:
	bun run android
web:
	bun run web