<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/rmoise/document-management-app">
    <img src="img/logo-readme.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Document Management App - Technical Case Study</h1>

  <p align="center">
    <a href="https://github.com/rmoise/document-management-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/rmoise/document-management-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#objective">Objective</a>
    </li>
    <li><a href="#context">Context</a></li>
    <li>
      <a href="#the-5-ws">The 5 Ws</a>
    </li>
    <li><a href="#user-stories">User Stories</a></li>
    <li><a href="#technical-requirements">Technical Requirements</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#built-with">Built With</a></li>
  </ol>
</details>

## Objective

Build a document management app that allows users to upload, preview, download, and share documents. The app should provide a user-friendly interface for managing documents and offer features such as document preview, download tracking, and document sharing with expiration time.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Context

In today's digital age, managing documents efficiently is crucial for individuals and businesses. Traditional paper-based document management systems are being replaced by digital solutions that offer convenience, accessibility, and improved organization. The document management app aims to provide users with a seamless experience for handling documents, whether it's for personal or professional use.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## The 5 Ws

- **Who?** — The document management app targets individuals, professionals, and businesses who need a digital solution to manage their documents effectively.
- **What?** — The document management app built with React and ASP.NET Core, along with the relevant documentation.
- **When?** — Users can use the app anytime they need to upload, preview, download, or share documents.
- **Where?** — The app is accessible on both web and mobile platforms, supporting various devices such as desktops, tablets, and smartphones.
- **Why?** — The document management app aims to simplify the process of managing documents, providing a centralized platform for document storage, organization, and collaboration. It offers convenience, security, and enhanced productivity for users.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Stories

- As a user, I want to be able to upload documents to the app, so I can store them securely and access them from anywhere.
- As a user, I want to be able to preview documents within the app, so I can quickly review the content without downloading them.
- As a user, I want to be able to download documents, so I can have a local copy on my device.
- As a user, I want to be able to track the number of downloads for each document, so I can monitor its popularity or usage.
- As a user, I want to be able to generate share links for documents, so I can easily share them with others.
- As a user, I want the ability to set an expiration time for share links, so I can control the duration of document access.
- As a user, I want to be able to delete documents, so I can remove unnecessary or outdated files.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technical Requirements

- The app must be built using React or React Native to support web and mobile platforms.
- The app should have a backend developed using ASP.NET Core, providing API endpoints for document management.
- Document storage should be implemented using a PostgreSQL database to ensure reliable and scalable storage.
- Azure Blob Storage should be used to store the actual document files, providing secure and cost-effective storage.
- User authentication and authorization should be implemented using ASP.NET Core Identity for secure document access.
- The app should implement file upload functionality, allowing users to upload documents to Azure Blob Storage.
- Document previews should be generated on the server side using suitable libraries or components.
- Download tracking should be implemented using the PostgreSQL database to record and display the number of document downloads.
- Share links should be generated with unique URLs and should expire after a specified time.
- The app should provide a user-friendly interface for managing documents, including features such as document search and sorting.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

To run the Document Management API locally, follow these steps:

1. Clone the repository: `git clone https://github.com/rmoise/document-management-app.git`
2. Navigate to the project directory: `cd document-management-app`
3. Install the dependencies: `npm install`
4. Set up the required environment variables for Azure Blob Storage and PostgreSQL.
5. Start the API: `npm start`
6. The website will be accessible at `http://localhost:3000`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- User authentication: Users should be able to create accounts, log in, and log out.
- Document upload: Users should be able to upload documents to the app for storage in Azure Blob Storage.
- Document preview: Users should be able to preview documents within the app without downloading them.
- Document download: Users should be able to download documents to their local devices.
- Download tracking: The app should track the number of downloads for each document and display the download count.
- Share link generation: Users should be able to generate share links for documents to share with others.
- Share link expiration: Share links should expire after a specified time to control document access.
- Document deletion: Users should be able to delete documents from the app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<!-- prettier-ignore -->
* [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
* [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
* [![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-512BD4?style=for-the-badge&logo=.net&logoColor=white)](https://dotnet.microsoft.com/)
* [![Azure Blob Storage](https://img.shields.io/badge/Azure%20Blob%20Storage-0078D4?style=for-the-badge&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/services/storage/blobs/)
* [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>