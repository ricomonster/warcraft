type NounTriplet = [string, string, string]

export interface Template {
  style:  'Combat' | 'Trial' | 'Discovery'
  icon:   '⚔' | '🏛' | '🔮'
  color:  string
  bg:     string
  fn:     (nouns: NounTriplet) => string
}
