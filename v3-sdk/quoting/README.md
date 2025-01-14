# Quoting

## Overview

This is an example of getting a quote using the Cytoswap V3 guide and includes running against mainnet or a locally deployed chain.

The core functionality of this example can be found in [`quote.ts`](./src/libs/quote.ts).

## Configuration

This application is a read only quoting application that communicates with the HeLa mainnet. To configure the input token/amount and output token, edit the [configuration](./src/config.ts) file. The code should need no further modification to function.

## Setup

### Install dependencies

1. Run `yarn install` to install the project dependencies
2. Run `yarn install:chain` to download and install Foundry

### Get a mainnet RPC URL

1. Set that as the value of the `mainnet` `rpc` vale inside the [config](./src/config.ts).

### Start the web interface

Run `yarn start` and navigate to [http://localhost:3000/](http://localhost:3000/)
