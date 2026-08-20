export const siteSearchQuery = `
  *[
    _type in ["post", "course", "service", "event"] &&
    (
      (
        $hasTerm && 
        (
          title match $term + "*" ||
          (defined(excerpt) && excerpt match $term + "*") ||
          (defined(description) && description match $term + "*")
        ) && 
        (length($matchTypes) == 0 || _type in $matchTypes)
      )
      ||
      (!$hasTerm && _type in $matchTypes)
      ||
      (
        title match $rawTerm + "*" ||
        (defined(excerpt) && excerpt match $rawTerm + "*") ||
        (defined(description) && description match $rawTerm + "*")
      )
    )
  ] | order(_type asc, title asc) [0...24] {
    _id,
    _type,
    title,
    excerpt,
    description,
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    "grandparentSlug": parent->parent->slug.current,
    "summary": coalesce(excerpt, description)
  }
`;
