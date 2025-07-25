'use client'

interface PlaceholderAvatarProps {
  name: string
  size?: number
  className?: string
}

export function PlaceholderAvatar({ name, size = 40, className = "" }: PlaceholderAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500', 
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
    ]
    
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
  }

  const initials = getInitials(name)
  const bgColor = getBackgroundColor(name)

  return (
    <div 
      className={`${bgColor} rounded-full flex items-center justify-center text-white font-medium text-sm ${className}`}
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  )
}