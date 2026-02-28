# Indie Royalty Web3 Platform

Initial scaffold for a Web3-powered royalty-splitting platform focused on indie artists.

## Current Structure

```
indie-royalty/
├─ README.md          # Project overview
├─ web/               # Next.js 14 (App Router) + Tailwind starter
│  ├─ src/app/
│  ├─ tailwind.config.ts
│  └─ ...
└─ (contracts/)      # Placeholder for future Solidity work
```

## Next Steps

1. Define detailed user journeys (artist onboarding, split setup, fan purchase flows).
2. Add smart contract workspace (Foundry/Hardhat) for royalty-split + NFT contracts.
3. Implement wallet connection (wagmi + WalletConnect) and mock data (JSON / Supabase) on the web app.
4. Design basic UI sections: hero, artist dashboard, fan marketplace.
5. Hook up Graph/subgraph or simple indexing service once contract events exist.

## Scripts

```
cd web
npm run dev    # local dev server on http://localhost:3000
npm run lint   # ESLint
npm run build  # production build
```

Feel free to extend the structure (e.g., `packages/contracts`, `packages/common`) as the project grows.
