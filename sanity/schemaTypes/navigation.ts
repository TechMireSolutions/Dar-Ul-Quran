import { defineField, defineType } from 'sanity'

// Level 3 — leaf (no further nesting)
const level3Fields = [
  defineField({ name: 'label',    type: 'string' }),
  defineField({ name: 'href',     type: 'string', placeholder: '/page or https://…' }),
  defineField({ name: 'external', type: 'boolean', initialValue: false }),
]

// Level 2 — can have level-3 children
const level2Fields = [
  defineField({ name: 'label',    type: 'string' }),
  defineField({ name: 'href',     type: 'string', placeholder: '/page or https://…' }),
  defineField({ name: 'external', type: 'boolean', initialValue: false }),
  defineField({
    name: 'children', type: 'array', title: 'Sub-sub-menu Items',
    of: [{
      type: 'object',
      name: 'level3Item',
      fields: level3Fields,
      preview: { select: { title: 'label', subtitle: 'href' } },
    }],
  }),
]

// Level 1 — can have level-2 children
const level1Fields = [
  defineField({ name: 'label',    type: 'string' }),
  defineField({ name: 'href',     type: 'string', placeholder: '/page or https://… (leave empty if parent-only)' }),
  defineField({ name: 'external', type: 'boolean', initialValue: false }),
  defineField({
    name: 'children', type: 'array', title: 'Sub-menu Items',
    of: [{
      type: 'object',
      name: 'level2Item',
      fields: level2Fields,
      preview: {
        select: { title: 'label', subtitle: 'href', children: 'children' },
        prepare({ title, subtitle, children }: any) {
          const n = children?.length
          return { title, subtitle: n ? `${subtitle ?? ''}  (${n} sub-items)` : subtitle }
        },
      },
    }],
  }),
]

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
      name: 'items', type: 'array', title: 'Menu Items',
      of: [{
        type: 'object',
        name: 'level1Item',
        fields: level1Fields,
        preview: {
          select: { title: 'label', subtitle: 'href', children: 'children' },
          prepare({ title, subtitle, children }: any) {
            const n = children?.length
            return { title, subtitle: n ? `${subtitle ?? ''}  (${n} sub-items)` : subtitle }
          },
        },
      }],
    }),
  ],
})
