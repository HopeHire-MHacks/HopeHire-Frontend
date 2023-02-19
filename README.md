# HopeHire Frontend

HopeHire is a job portal that's specifically designed with the health and physical conditions of kidney patients in mind. Our recommendation AI serves potential job opportunities that match their skillset, experience, and their health needs.

This repository contains the frontend code for HopeHire. We built this frontend using React and Tailwind CSS, making use of their respective features to create a responsive and user-friendly interface. The code is organized into reusable components, making it easy to maintain and add new features.

The frontend is integrated with the HopeHire backend, which runs on Express. The backend provides the API for our recommendation AI and handles user authentication and job applications. If you'd like to explore/contribute to the backend, please see the [HopeHire Backend](https://github.com/HopeHire-MHacks/HopeHire-Backend) repository.

## Getting Started

**Prerequisites NodeJS LTS v18.14.0**

1. Install nvm on your machine
2. run `nvm install v18.14.0`
3. run `nvm use`
4. Run `npm install` in the working directory to install required packages
5. Reference `.env.example` and create your own `.env` file
6. Run `npm run start` to start the server on localhost

## Documentation

- [**Live Site**](https://hopehire.netlify.app/) - Try it out!
- [**Figma Design**](https://www.figma.com/file/VPFHrIqfnLzlkXe09shSU3/HopeHire-MHacks?node-id=0%3A1&t=G6MDG9Qt7TWcVDED-0) - Take a look at our design!

## Contributing

### File Structure and Naming Convention

```
src/
├─ api/
│  ├─ ApiHandler.ts
│  ├─ ApiService.ts
├─ assets/
├─ components/
│  ├─ ExampleComponent/
│  │  ├─ ExampleComponent.tsx
│  │  ├─ index.ts
├─ constants/
├─ pages/
│  ├─ Home/
│  │  ├─ Home.tsx
│  │  ├─ index.ts
├─ utils/
│  ├─ hooks/
│  ├─ contexts/
│  ├─ miscellaneous.ts
```

### Commit Message Convention

- Use [Gitmoji](https://gitmoji.dev/) to add emojis to your commit messages
- Use the following format for your commit messages
  - :sparkles: `feat: add new feature`
  - :bug: `fix: fix a bug`
  - :recycle: `refactor: refactor code`
  - :art: `style: change styling`
  - :fire: `chore: remove unused code`
  - :memo: `docs: update documentation`
  - :package: `package: update package`
  - :rocket: `deploy: deploy to production`
  - :wastebasket: `waste: remove unused code`

## Screenshots

![Screenshot 2023-02-19 at 10 57 04 PM](https://user-images.githubusercontent.com/29945147/219957429-a606bcc9-3b23-435e-879c-ca1699cd0929.png)
