import { StringInputProps } from 'sanity'

export function LtrStringInput(props: StringInputProps) {
  return (
    <div dir="ltr" style={{ direction: 'ltr', textAlign: 'left' }}>
      {props.renderDefault(props)}
    </div>
  )
}
