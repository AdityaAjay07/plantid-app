export default function Toast({ message, type }) {
  return (
    <div className={`toast toast-${type}`}>
      {type === 'success' ? '✅' : '❌'} {message}
    </div>
  )
}