# Food Delivery Navigation App

## Project Overview

This Expo React Native app demonstrates the main React Navigation patterns in one small food-delivery flow:

- Conditional auth flow with persisted mock login state
- Onboarding before entering the main app
- Nested stack, tab, and drawer navigators
- Route params from Home to Restaurant Detail
- Cart-driven Orders badge
- Programmatic navigation with `navigate`, `goBack`, `replace`, and `reset`

## Tech Stack

- Expo SDK 55
- React Native
- TypeScript
- React Navigation
- Expo vector icons
- Light and dark theme support

## Run Locally

```bash
npm install
npm start
```

## Navigation Structure

```text
Root Stack
|-- Auth Stack
|   `-- Login
|-- Onboarding
`-- Main Drawer
    |-- Tabs
    |   |-- Home Tab
    |   |   `-- Restaurant Stack
    |   |       |-- Home
    |   |       |-- Restaurant Detail
    |   |       `-- Cart
    |   |-- Search
    |   |-- Orders
    |   `-- Profile Stack
    |       |-- Profile
    |       |-- My Orders
    |       |-- Settings
    |       `-- Help
    |-- My Orders
    |-- Settings
    `-- Help
```

## Assignment Coverage

- Login flow persists through app reload.
- `replace` is used from Cart to return to Home without keeping Cart in the stack.
- `reset` is used from Cart to return to a clean Home stack.
- `navigate` is used for restaurant and cart transitions.
- `goBack` is exposed from detail/cart screens.
- Orders tab shows a badge when cart count is greater than zero.
- Bottom tabs are hidden on Restaurant Detail and Cart screens.
- Drawer is accessible from Profile and includes avatar, name, My Orders, Settings, Help, and Logout.
- Restaurant cards use local food photography assets and the profile screen includes a theme toggle.

## TLDraw

- Navigation sketch: https://www.tldraw.com/

## Submission Links

- Public GitHub repository: https://github.com/KOUSHIKG04/react-navigation-food-delivery
- 2-minute demo video: https://github.com/user-attachments/assets/a1e272a6-fe40-49f4-b5e9-dd7d7c8427df

## Demo Checklist

- Login/auth flow
- Onboarding to Home flow
- Bottom tabs
- Restaurant Detail navigation with params
- Cart navigation
- Drawer from Profile
- Orders badge
- App reload with persisted auth state

## Screenshots

Add screenshots here after recording the demo.

## Assumptions

- Authentication is intentionally mocked for the assignment.
- Cart state is in memory; only the required mock auth/onboarding state is persisted.

## Project Structure

```text
src/
|-- components/ui/        reusable UI pieces
|-- data/                 restaurant data
|-- navigation/           stack, tab, and drawer setup
|-- screens/auth/         login flow
|-- screens/onboarding/   onboarding flow
|-- screens/home/         home stack screens
|-- screens/tabs/         bottom-tab screens
|-- screens/profile/      profile stack and drawer secondary screens
`-- state/                app state and persistence
```
