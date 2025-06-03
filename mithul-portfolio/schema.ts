import project from './schemaTypes/project'
import about from './schemaTypes/about'
import siteSettings from './schemaTypes/siteSettings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

export const schemaTypes = [
  project,
  about,
  siteSettings
]

export default defineConfig({
  name: 'default',
  title: 'Portfolio',
  projectId: 'your-project-id',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
}) 