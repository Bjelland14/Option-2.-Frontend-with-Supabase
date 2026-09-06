# Frontend with Supabase

Option 2. Frontend with Supabase

## Description

This project is a frontend application built with HTML, CSS, JavaScript, and Supabase.

Users can register, confirm their email address, log in, browse articles, create articles when authenticated, and delete their own articles.

The frontend is connected to Supabase for authentication and article storage.

## Features

- User registration and login
- Email confirmation
- Article browsing
- Article creation for authenticated users
- Delete own articles
- Authentication-based navigation
- Row Level Security
- Error handling and user feedback
- Responsive design

## Built With

- HTML
- CSS
- JavaScript
- Supabase
- Supabase JavaScript Client

## Getting Started

Open the project with a local development server such as Live Server in Visual Studio Code.

Then open `index.html` in the browser.

## AI Usage

ChatGPT was used for explanations, brainstorming, debugging assistance.

See [AI_LOG.md](./AI_LOG.md) for more information.

## Supabase RLS

Row Level Security is enabled on the `articles` table.

The policies allow:
- Anyone to read articles.
- Authenticated users to create articles.
- Users to delete only their own articles.

See [supabase-policies.sql](./supabase-policies.sql) for the RLS configuration.

### RLS Testing

The RLS policies are configured to ensure that:

- Unauthenticated users cannot insert articles.
- A logged-in user cannot delete an article owned by another user.

The frontend redirect is only used for navigation. The actual access restrictions are enforced by Supabase RLS policies.

## Author

Lloyd Bjelland