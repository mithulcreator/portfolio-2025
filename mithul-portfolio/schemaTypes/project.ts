export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
      { name: 'role', title: 'Role', type: 'string' },
      { name: 'tools', title: 'Tools', type: 'array', of: [{ type: 'string' }] },
      { name: 'timeline', title: 'Timeline', type: 'string' },
      { name: 'type', title: 'Type', type: 'array', of: [{ type: 'string' }] },
      { name: 'cover', title: 'Cover Image', type: 'image', options: { hotspot: true } },
      {
        name: 'gallery',
        title: 'Gallery Images',
        type: 'array',
        of: [{ type: 'image', options: { hotspot: true } }]
      },
      {
        name: 'video',
        title: 'Project Video',
        type: 'file',
        options: {
          accept: 'video/mp4'
        }
      },
      { name: 'client', title: 'Client', type: 'string' },
      { name: 'problem', title: 'Problem', type: 'text' },
      {
        name: 'process',
        title: 'Process Steps',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'step', title: 'Step', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' }
            ]
          }
        ]
      },
      { name: 'solution', title: 'Solution', type: 'text' },
      { name: 'outcome', title: 'Outcome', type: 'string' },
      { name: 'learned', title: 'What I Learned', type: 'text' },
      {
        name: 'beforeText',
        title: 'Before / Challenge Description',
        type: 'text',
        description: 'Describe the challenge or situation before the project.'
      },
      {
        name: 'beforeImg',
        title: 'Before Image',
        type: 'image',
        description: 'Optional image showing the before/challenge state.'
      },
      {
        name: 'afterText',
        title: 'After / Result Description',
        type: 'text',
        description: 'Describe the result or situation after the project.'
      },
      {
        name: 'afterImg',
        title: 'After Image',
        type: 'image',
        description: 'Optional image showing the after/result state.'
      }
    ]
  }