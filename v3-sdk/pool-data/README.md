## Overview

This is an example of:

1. Constructing a Pool with full Tick Data.
2. Visualizing Active Liquidity in a chart.

The core functionality of the Pool guide can be found in [pool-data.ts](./src/libs/pool-data.ts).
The core functionality of the Active Liquidity guide can be found in [active-liquidity.ts](./src/libs/active-liquidity.ts)

## Configuration

This application can be run with the Ethereum Mainnet.

The configuration includes control of the environment as well as inputs to the example's functionality. The rest of the code should need no modification to function.

## Setup

### Install dependencies

1. Run `yarn install` to install the project dependencies

### Get a mainnet RPC URL

1. Set that as the value of the `mainnet` `rpc` value inside the [config](./src/config.ts).

### Choose tokens and fee

By default, this example displays the USDC/HLUSD pool with MEDIUM fee. To display any other deployed [pool](https://info.cytoswap.com/#/pools), overwrite the values in the [config](./src/config.ts).

### Start the web interface

Run `yarn start` and navigate to [http://localhost:3000/](http://localhost:3000/)
