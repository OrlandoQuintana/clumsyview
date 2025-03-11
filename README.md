# **Clumsy View**

**Clumsy View** is a full-stack web application that allows users to look up in-game assets associated with a given blockchain wallet. It was built as a community tool for tracking and displaying game characters and assets.

## **Features**
- **Wallet Lookup**: Enter a wallet address to see all associated game assets.
- **Asset Display**: View characters, plots, and watches with metadata.
- **Interactive UI**: React-based frontend for seamless user experience.

## **Tech Stack**
- **Frontend**: Next.js (React), hosted on **Vercel**
- **Backend**: Node.js with Express.js, hosted on **Heroku**
- **Database**: SQLite for structured asset data
- **API Integration**: Blockfrost API for blockchain wallet lookups

## **How It Works**
1. **User enters a wallet address** in the search bar.
2. **Frontend sends API request** to the backend.
3. **Backend queries the database & Blockfrost API** for asset ownership.
4. **Results are displayed dynamically** in the UI.

## **Deployment**
- **Frontend**: [Vercel](https://clumsyview.vercel.app)
- **Backend**: Hosted on **Heroku** (Express API with SQLite)

---

For any questions or contributions, feel free to reach out! 🚀
