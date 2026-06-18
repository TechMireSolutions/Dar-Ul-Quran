type JsonLdScriptsProps = {
  schemas: object | object[]
}

export default function JsonLdScripts({ schemas }: JsonLdScriptsProps) {
  const list = Array.isArray(schemas) ? schemas : [schemas]
  return (
    <>
      {list.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
