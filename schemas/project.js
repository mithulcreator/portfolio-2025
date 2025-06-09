export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'UI/UX Design', value: 'UI/UX Design' },
          { title: 'Web Development', value: 'Web Development' },
          { title: 'Mobile App', value: 'Mobile App' },
          { title: 'Branding', value: 'Branding' },
          { title: 'Case Study', value: 'Case Study' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Project Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'UI/UX', value: 'UI/UX' },
          { title: 'Web Development', value: 'Web Development' },
          { title: 'Mobile App', value: 'Mobile App' },
          { title: 'Branding', value: 'Branding' }
        ]
      }
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string'
    },
    {
      name: 'tools',
      title: 'Tools Used',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          type: 'file',
          title: 'Video',
          options: {
            accept: 'video/*'
          }
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'cover'
    }
  }
} 