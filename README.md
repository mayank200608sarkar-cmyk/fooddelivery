# Craving - Vanilla JavaScript Food Delivery Application

Craving is a lightweight, single-page web application built to simulate a modern food ordering platform. The project focuses entirely on clean DOM manipulation, asynchronous UI updates, and local state management without relying on heavy external frameworks or libraries.

This repository showcases strong foundational mastery of native web technologies, browser APIs, and logic optimization.

---

## Core Engineering Highlights

* **Zero-Dependency Architecture:** Built completely with pure vanilla JavaScript, semantic HTML5, and CSS3.
* **State Persistence Engine:** Uses the Web Storage API (`localStorage`) to manage user profiles, active cart arrays, itemized item pricing, wallet states, active delivery tracking intervals, and historical receipts across full page refreshes.
* **Content Security Policy (CSP) Compliance:** Designed carefully without risky sinks or evaluated code strings like `eval()`, making the script lightweight, safe, and robust for rigid production environments.
* **Resilient DOM Lifecycle Management:** Handles safe query selectors and asynchronous script run sequences to ensure the application never throws null pointer errors if nodes load dynamically.

---

## Key Features & Logic Flows

### 1. Registration & Context Preservation

The application looks for existing session tokens inside storage when loading. If a user is registered, the registration container is cleanly dropped from the DOM view, mutating the layout to display personalized greetings and contextual shopping states.

### 2. Auto-Replenishing Wallet System

To ensure smooth transaction checking, the system maintains a running financial calculation engine:

* Computes remaining totals against current wallet assets.
* Automatically runs a calculation sub-routine if the total wallet drops below a strict critical threshold ($9.00).
* Generates calculated dynamic allowances through bounded pseudo-randomization algorithms, immediately pushing the updated states back to disk and forcing smooth UI rendering updates.

### 3. State-Driven Shopping Cart

* Trackers monitor unique identifiers within array buffers for items like gourmet burgers and sides.
* Granular functions scale pricing data mathematically per index addition, updating dynamic sub-totals, cart quantities, and layout indicators concurrently.
* Includes clear-cart features to wipe target data storage indices instantly while safely maintaining user records.

### 4. Live Milestone & History Trackers

* **Simulated Delivery Streams:** Uses precise countdown intervals to maintain live courier location metrics. The system stores active tracking durations, meaning the courier tracking remains active even if the user reloads or closes the tab mid-transit.
* **Order History Records:** Serializes successful transactions into stringified arrays, stacking item descriptions, timestamps, and expenditure summaries inside a persistent profile section.

---

## Technical Architecture Overview

* **State Management:** Native `localStorage` data structures acts as the unified application database.
* **View Routing:** Interactive event streaming hooks switch application states between Home, Cart, Live Tracker, and Profile without triggering traditional page routing or full-document layout flashes.
* **Scope Architecture:** Completely organized via isolated global state declarations and functional event targets.

---

## Getting Started

Because this application relies natively on client-side compilation systems built directly into web browsers, it requires no complicated environment installations or package installations.

1. Clone this repository to your desktop machine.
2. Launch the application by opening `index.html` in any modern desktop web browser.
3. or visit [live demo](https://fooddelivery-sigma-azure.vercel.app/) for live view
