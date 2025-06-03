import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: '2h4b4cv1',
  dataset: 'mithport56',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
