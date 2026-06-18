import { defineField, defineType } from 'sanity'

// Shared fields for every nav item at every level
const linkFields = [
  defineField({ name: 'label',    type: 'string',  title: 'Label',           validation: r => r.required() }),
  defineField({ name: 'href',     type: 'string',  title: 'Link',            placeholder: '/about  or  https://external.com' }),
  defineField({ name: 'external', type: 'boolean', title: 'Open in new tab', initialValue: false }),
]

const linkPreview = {
  select: { title: 'label', subtitle: 'href' },
  prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
    return { title: title || '(no label)', subtitle: subtitle || '' }
  },
}

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title', type: 'string', title: 'Nav Location',
      options: {
        list: [
          { title: 'Header', value: 'header' },
          { title: 'Footer', value: 'footer' },
        ],
      },
    }),

    defineField({
      name: 'items',
      type: 'array',
      title: 'Menu Items',
      description: '↕ Drag to reorder  •  Click an item and open "Sub-menu" to add dropdown children',
      of: [{
        type: 'object',
        name: 'navItem',
        fields: [
          ...linkFields,
          defineField({
            name: 'children',
            type: 'array',
            title: 'Sub-menu',
            description: 'Items that appear in the dropdown for this link',
            of: [{
              type: 'object',
              name: 'navSubItem',
              fields: [
                ...linkFields,
                defineField({
                  name: 'children',
                  type: 'array',
                  title: 'Sub-sub-menu',
                  description: 'Fly-out items for this sub-menu entry',
                  of: [{
                    type: 'object',
                    name: 'navSubSubItem',
                    fields: [
                      ...linkFields,
                      defineField({
                        name: 'children',
                        type: 'array',
                        title: 'Level 4',
                        of: [{
                          type: 'object',
                          name: 'navItemL4',
                          fields: linkFields,
                          preview: linkPreview,
                        }],
                      }),
                    ],
                    preview: linkPreview,
                  }],
                }),
              ],
              preview: linkPreview,
            }],
          }),
        ],
        preview: linkPreview,
      }],
    }),
  ],
})
