export default {
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    },
    {
      name: 'experience',
      title: 'Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'company', title: 'Company', type: 'string' },
            { name: 'period', title: 'Period', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'degree', title: 'Degree', type: 'string' },
            { name: 'institution', title: 'Institution', type: 'string' },
            { name: 'period', title: 'Period', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category', type: 'string' },
            { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] }
          ]
        }
      ]
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' }
          ]
        }
      ]
    }
  ]
} 