# Bee Cafe - Customer

In Participation for We Are Millions Hackathon, a submission for [Best Demonstration Of Data Interoperability Using Swarm](https://gitcoin.co/issue/fairdatasociety/wam/2/100027831)

## Descriptions

Bee Cafe is a simple DApp for demonstrating how data in SWARM can be used interoperably for communicating between DApps.
Bee Cafe consist of 2 DApps, with the following Repository :

1. [Bee Cafe - Customer](https://github.com/hnihsan/bee-cafe-customer)
2. [Bee Cafe - Cashier](https://github.com/hnihsan/bee-cafe-cashier)

Please setup the other Repo to achieve demonstration result completely.

## How It Works

This DApps will demonstrate how we use SWARM to basically upload and download data, in a use case of a Cafe.
User can choose a variety of items, and then order it. The DApp will then upload the selected menu items data to SWARM, generating it's Order Reference code and then the Cashier DApp will accepting the reference code, downloading and converting the data from SWARM to a list of _New Orders_ to be processed and served.

## Demonstrations Video

You can see how the DApps works here:
https://youtu.be/HD11h_fE9BE

## Team Members

- hnihsan - [GitHub](https://github.com/hnihsan) - [Gitcoin](https://gitcoin.co/hnihsan) - Email: [helmi.n.ihsan@gmail.com](mailto:helmi.n.ihsan@gmail.com) - Discord: [hnihsan#8820](https://discordapp.com/users/513001948098723864)
- NicoSiput - [GitHub](https://github.com/NicoSiput) - [Gitcoin](https://gitcoin.co/nicosiput) - Email: [nicosiput@gmail.com](mailto:nicosiput@gmail.com) - Discord: [NicoSiput#2643](https://discordapp.com/users/524064020437925888)

# Installation

## Requirement

- NodeJS + NPM
- Bee SWARM Node running locally (see [Bee Factory](https://github.com/ethersphere/bee-factory) to setup your own node for Development Environment)

## Getting Started

First, install, build and start the project:

```bash
npm install
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Bee Cafe - Customer DApp.
