import { defineField, defineType } from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication (Ebook)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Author / Compiler (Optional)',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Short Description',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'file',
      type: 'file',
      title: 'PDF File',
      description: 'Upload a PDF file. Leave empty if using an External Link.',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'externalLink',
      type: 'url',
      title: 'External PDF Link',
      description: 'Provide a direct link to the PDF (e.g., Google Drive link).',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      media: 'coverImage',
    },
  },
})
