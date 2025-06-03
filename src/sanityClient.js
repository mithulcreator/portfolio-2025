import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '2h4b4cv1', // Replace with your project ID
  dataset: 'mithport56',
  apiVersion: '2024-01-01', // Use today's date or your preferred version
  useCdn: true, // `false` if you want to ensure fresh data
  token: import.meta.env.VITE_SANITY_TOKEN, // Updated to use Vite's env syntax
  ignoreBrowserTokenWarning: true,
  perspective: 'published'
})